[![npm version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

# u2f-api

U2F API for browsers

## API

### Support

U2F has for a long time been supported in Chrome, although not with the standard `window.u2f` methods, but through a built-in extension. Nowadays, browsers seem to use `window.u2f` to expose the functionality.

Supported browsers are:
  * Chrome, using Chrome-specific hacks
  * Opera, using Chrome-specific hacks

Firefox, Safari and other browsers still lack U2F support.

Since 0.1.0, this library supports the standard `window.u2f` methods.

The library should be complemented with server-side functionality, e.g. using the [`u2f`](https://www.npmjs.com/package/u2f) package.

### Basics

`u2f-api` exports two main functions and an error "enum". The main functions are `register()` and `sign()`, although since U2F isn't widely supported, the functions `isSupported()` as well as `ensureSupport()` helps you build applications which can use U2F only when the client supports it.

The `register()` and `sign()` functions return *cancellable promises*, i.e. promises you can cancel manually. This helps you to ensure your code doesn't continue in success flow and by mistake accept a registration or authentification request. The returned promise has a function `cancel()` which will immediately reject the promise.

#### Check or ensure support

```ts
import { isSupported } from 'u2f-api'

isSupported(): Promise< Boolean > // Doesn't throw/reject
```

```ts
import { ensureSupport } from 'u2f-api'

ensureSupport(): Promise< void > // Throws/rejects if not supported
```

#### Register

```ts
import { register } from 'u2f-api'

register(
  registerRequests: RegisterRequest[],
  signRequests: SignRequest[], // optional
  timeout: number // optional
): Promise< RegisterResponse >
```

The `registerRequests` can be either a RegisterRequest or an array of such. The optional `signRequests` must be, unless ignored, an array of SignRequests. The optional `timeout` is in seconds, and will default to an implementation specific value, e.g. 30.

#### Sign

```ts
import { sign } from 'u2f-api'

sign(
  signRequests: SignRequest[],
  timeout: number // optional
): Promise< SignResponse >
```

The values and interpretation of the arguments are the same as with `register( )`.

#### Errors

`register()` and `sign()` can return rejected promises. The rejection error is an `Error` object with a `metaData` property containing `code` and `type`. The `code` is a numerical value describing the type of the error, and `type` is the name of the error, as defined by the `ErrorCodes` enum in the "FIDO U2F Javascript API" specification. They are:

```js
OK = 0 // u2f-api will never throw errors with this code
OTHER_ERROR = 1
BAD_REQUEST = 2
CONFIGURATION_UNSUPPORTED = 3
DEVICE_INELIGIBLE = 4
TIMEOUT = 5
CANCELLED = -1 // Added by this library
```

## Usage

### Loading the library

The library is promisified and will use the built-in native promises of the browser, unless another promise library is injected.

The following are valid ways to load the library:

```js
var u2fApi = require( 'u2f-api' ); // Will use the native Promise
// ... or
var u2fApi = require( 'u2f-api' )( require( 'bluebird' ) ); // Will use bluebird for promises
```

### Registering a passkey

With `registerRequestsFromServer` somehow received from the server, the client code becomes:

```js
u2fApi.register( registerRequestsFromServer )
.then( sendRegisterResponseToServer )
.catch( ... );
```

### Signing a passkey

With `signRequestsFromServer` also received from the server somehow:

```js
u2fApi.sign( signRequestsFromServer )
.then( sendSignResponseToServer )
.catch( ... );
```

### Example with checks for client support

```js
u2fApi.isSupported( )
.then( function( supported ) {
	if ( supported )
	{
		return u2fApi.sign( signRequestsFromServer )
		.then( sendSignResponseToServer );
	}
	else
	{
		... // Other authentication method
	}
} )
.catch( ... );
```

### Canceling

As mentioned in the API section above, the returned promises from `register()` and `sign()` have a method `cancel()` which will cancel the request. This is nothing more than a helper function.

## Example implementation

U2F is a *challenge-response protocol*. The server sends a `challenge` to the client, which responds with a `response`.

This library is intended to be used in the client (the browser). There is another package intended for server-side: https://www.npmjs.com/package/u2f

## Common problems

If you get `BAD_REQUEST`, the most common situations are that you either don't use `https` (which you must), or that the AppID doesn't match the server URI. In fact, the AppID must be exactly the base URI to your server (such as `https://your-server.com`), including the port if it isn't 443.

For more information, please see https://developers.yubico.com/U2F/Libraries/Client_error_codes.html and https://developers.yubico.com/U2F/App_ID.html

[npm-image]: https://img.shields.io/npm/v/u2f-api.svg
[npm-url]: https://npmjs.org/package/u2f-api
[travis-image]: https://img.shields.io/travis/grantila/u2f-api.svg
[travis-url]: https://travis-ci.org/grantila/u2f-api
