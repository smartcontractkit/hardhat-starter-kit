'use strict';

import 'mocha';
import { expect } from 'chai';
import { Finally, Try, delay } from 'already';

import * as jsdom from "jsdom";

import { API } from '../../';

// Tests the default-import to work
import u2fApi from '../../';


const ErrorCodesEnum = {
	CANCELLED: -1,
	OK: 0,
	OTHER_ERROR: 1,
	BAD_REQUEST: 2,
	CONFIGURATION_UNSUPPORTED: 3,
	DEVICE_INELIGIBLE: 4,
	TIMEOUT: 5,
};

const { JSDOM } = jsdom;

const appId = "https://example.org/";

interface KeyValue
{
	key: string;
	value: any;
}
type KeyValues = Array< KeyValue >;

class MonkeyPatcher
{
	_object: any;
	_values: Array< string >;
	_overwrittenValues: KeyValues;

	constructor( obj: any )
	{
		this._object = obj;
		this.clear( );
	}

	patch( obj: any, overwrite = false )
	{
		Object.keys( obj ).forEach( key =>
		{
			const ownProp = this._object.hasOwnProperty( key );

			if ( !ownProp || overwrite )
			{
				const value = obj[ key ];

				if ( !ownProp )
					this._values.push( key );
				else
					this._overwrittenValues.push(
						{ key, value: this._object[ key ] } );

				this._object[ key ] = value;
			}
		} );
	}

	restore( )
	{
		this._values.forEach( key =>
		{
			delete this._object[ key ];
		} );
		this._overwrittenValues.forEach( ( { key, value } ) =>
		{
			this._object[ key ] = value;
		} );
		this.clear( );
	}

	clear( )
	{
		this._values = [ ];
		this._overwrittenValues = [ ];
	}
}

class GlobalMonkeyPatcher extends MonkeyPatcher
{
	constructor( )
	{
		super( global );
	}
}

function deleteModule( moduleName: string ): void
{
	try
	{
		const solvedName = require.resolve( moduleName );
		const nodeModule = require.cache[ solvedName ];

		if ( nodeModule )
		{
			for ( let i = 0; i < nodeModule.children.length; ++i )
			{
				const child = nodeModule.children[ i ];
				deleteModule( child.filename );
			}
			delete require.cache[ solvedName ];
		}
	}
	catch ( err ) { }
}

function getNewU2FApi( ): API
{
	deleteModule( '../../' );
	return require( '../../' );
}

interface MockProps
{
	appId?: string;
	delay?: number;
}

function handleTimeout(
	props: MockProps,
	timeout,
	fn: ( ) => any
)
: Promise< any >
{
	const timeoutPromise = timeout
		? delay( timeout ).then( ( ) =>
			( { errorCode: ErrorCodesEnum.TIMEOUT } ) )
		: null;

	const flowPromise = delay( props.delay || 0 ).then( fn );

	return Promise.race(
		[
			timeoutPromise,
			flowPromise,
		]
		.filter( exists => exists )
	);
}

type FakeRequest = { request: string; appId: string; };
function u2fMock( props: MockProps = { } )
{
	const store: Array< FakeRequest > = [ ];

	return {
		sign(
			appId,
			challenge,
			signRequests: Array< FakeRequest >,
			cbNative,
			timeout
		)
		{
			return handleTimeout( props, timeout, ( ) =>
			{
				if ( props.appId && props.appId !== appId )
					return { errorCode: ErrorCodesEnum.BAD_REQUEST };

				const found = signRequests.some( req =>
					store.some( storeReq =>
						storeReq.request === req.request
						&&
						storeReq.appId === req.appId
					)
				);

				if ( !found )
					return { errorCode: ErrorCodesEnum.BAD_REQUEST };
			} )
			.then( value => value || { } )
			.then( cbNative );
		},
		register(
			appId,
			registerRequests: Array< FakeRequest >,
			signRequests: Array< FakeRequest >,
			cbNative,
			timeout
		)
		{
			return handleTimeout( props, timeout, ( ) =>
			{
				if ( props.appId && props.appId !== appId )
					return { errorCode: ErrorCodesEnum.BAD_REQUEST };

				registerRequests.forEach( req =>
				{
					store.push( req );
				} );
			} )
			.then( value => value || { } )
			.then( cbNative );
		},
	};
}

function wrappedTest(
	props: any,
	fn: ( api: API ) => Promise< void >
)
: ( ) => Promise< void >
{
	return ( ): Promise< void > =>
	{
		const dom = new JSDOM(
			"",
			Object.assign( {
				url: appId,
				userAgent: "FakeBrowser/1",
			}, props )
		);

		if ( !props || !props.mock || !props.mock.disable )
		{
			const mock = ( props || { } ).mock || { };

			dom.window.u2f = u2fMock( );
		}

		const gmp = new GlobalMonkeyPatcher( );
		gmp.patch( dom.window );

		const api = getNewU2FApi( );

		return Try( ( ) => fn( api ) )
		.then( ...Finally( ( ) =>
		{
			gmp.restore( );
		} ) );
	};
}

describe( 'general', ( ) =>
{
	it( 'isSupported should be false for unsupported browsers',
		wrappedTest( { mock: { disable: true } }, async api =>
	{
		const supported = await api.isSupported( );
		expect( supported ).to.be.false;
	} ) );

	it( 'isSupported should be false for Safari',
		wrappedTest( { userAgent: "Safari/10" }, async api =>
	{
		const supported = await api.isSupported( );
		expect( supported ).to.be.false;
	} ) );

	it( 'isSupported should be true with fake window.u2f',
		wrappedTest( { }, async api =>
	{
		const supported = await api.isSupported( );
		expect( supported ).to.be.true;
	} ) );

	it( 'the flow of register + sign should run through',
		wrappedTest( { }, async api =>
	{
		await api.ensureSupport( );

		const request = "req";

		await api.register( { appId, request } );

		await api.sign( { appId, request } );
	} ) );
} );
