/**
 * highlight.js Solidity syntax highlighting definition
 *
 * @see https://github.com/isagalaev/highlight.js
 *
 * @package: highlightjs-solidity
 * @author:  Sam Pospischil <sam@changegiving.com>
 * @since:   2016-07-01
 */

var module = module ? module : {};     // shim for browser use

function hljsDefineSolidity(hljs) {

    //first: let's set up all parameterized types (bytes, int, uint, fixed, ufixed)
    //NOTE: unparameterized versions are *not* included here, those are included
    //manually
    var byteSizes = [];
    for(var i = 0; i < 32; i++) {
        byteSizes[i] = i+1;
    }
    var numSizes = byteSizes.map(function(bytes) { return bytes * 8 } );
    var precisions = [];
    for(i = 0; i <= 80; i++) {
        precisions[i] = i;
    }

    var bytesTypes = byteSizes.map(function(size) { return 'bytes' + size });
    var bytesTypesString = bytesTypes.join(' ') + ' ';

    var uintTypes = numSizes.map(function(size) { return 'uint' + size });
    var uintTypesString = uintTypes.join(' ') + ' ';

    var intTypes = numSizes.map(function(size) { return 'int' + size });
    var intTypesString = intTypes.join(' ') + ' ';

    var sizePrecisionPairs = [].concat.apply([],
        numSizes.map(function(size) {
            return precisions.map(function(precision) {
                return size + 'x' + precision;
            })
        })
    );

    var fixedTypes = sizePrecisionPairs.map(function(pair) { return 'fixed' + pair });
    var fixedTypesString = fixedTypes.join(' ') + ' ';

    var ufixedTypes = sizePrecisionPairs.map(function(pair) { return 'ufixed' + pair });
    var ufixedTypesString = ufixedTypes.join(' ') + ' ';

    var SOL_KEYWORDS = {
        keyword:
            'var bool string ' +
            'int uint ' + intTypesString + uintTypesString +
            'byte bytes ' + bytesTypesString +
            'fixed ufixed ' + fixedTypesString + ufixedTypesString +
            'enum struct mapping address ' +

            'new delete ' +
            'if else for while continue break return throw emit try catch ' +
            'unchecked ' +
            //NOTE: doesn't always act as a keyword, but seems fine to include
            '_ ' +

            'function modifier event constructor fallback receive ' +
            'virtual override ' +
            'constant immutable anonymous indexed ' +
            'storage memory calldata ' +
            'external public internal payable pure view private returns ' +

            'import from as using pragma ' +
            'contract interface library is abstract ' +
            'assembly',
        literal:
            'true false ' +
            'wei gwei szabo finney ether ' +
            'seconds minutes hours days weeks years',
        built_in:
            'self ' +   // :NOTE: not a real keyword, but a convention used in storage manipulation libraries
            'this super selfdestruct suicide ' +
            'now ' +
            'msg block tx abi ' +
            'type ' +
            'blockhash gasleft ' +
            'assert revert require ' +
            'Error ' + //Not exactly a builtin? but this seems the best category for it
            'sha3 sha256 keccak256 ripemd160 ecrecover addmod mulmod ' +
            'log0 log1 log2 log3 log4' +
            // :NOTE: not really toplevel, but advantageous to have highlighted as if reserved to
            //        avoid newcomers making mistakes due to accidental name collisions.
            'send transfer call callcode delegatecall staticcall '
    };

    var SOL_ASSEMBLY_KEYWORDS = {
        keyword:
            'assembly ' +
            'let function ' +
            'if switch case default for leave ' +
            'break continue ' +
            'u256 ' + //not in old-style assembly, but in Yul
            //NOTE: We're counting most opcodes as builtins, but the following ones we're
            //treating as keywords because they alter control flow or halt execution
            'jump jumpi ' +
            'stop return revert selfdestruct invalid',
        built_in:
            //NOTE that push1 through push32, as well as jumpdest, are not included
            'add sub mul div sdiv mod smod exp not lt gt slt sgt eq iszero ' +
            'and or xor byte shl shr sar ' +
            'addmod mulmod signextend keccak256 ' +
            'pc pop ' +
            'dup1 dup2 dup3 dup4 dup5 dup6 dup7 dup8 dup9 dup10 dup11 dup12 dup13 dup14 dup15 dup16 ' +
            'swap1 swap2 swap3 swap4 swap5 swap6 swap7 swap8 swap9 swap10 swap11 swap12 swap13 swap14 swap15 swap16 ' +
            'mload mstore mstore8 sload sstore msize ' +
            'gas address balance selfbalance caller callvalue ' +
            'calldataload calldatasize calldatacopy codesize codecopy extcodesize extcodecopy returndatasize returndatacopy extcodehash ' +
            'create create2 call callcode delegatecall staticcall ' +
            'log0 log1 log2 log3 log4 ' +
            'chainid origin gasprice blockhash coinbase timestamp number difficulty gaslimit',
        literal:
            'true false'
    };

    //covers the special slot/offset notation in assembly
    //(old-style, with an underscore)
    var SOL_ASSEMBLY_MEMBERS_OLD = {
        begin: /_/,
        end: /[^A-Za-z0-9$.]/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: {
            built_in: 'slot offset'
        },
        relevance: 2,
    };

    //covers the special slot/offset notation in assembly
    //(new-style, with a dot; keeping this separate as it
    //may be expanded in the future)
    var SOL_ASSEMBLY_MEMBERS = {
        begin: /\./,
        end: /[^A-Za-z0-9$.]/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: {
            built_in: 'slot offset length'
        },
        relevance: 2,
    };

    function isNegativeLookbehindAvailable() {
        try {
            new RegExp('(?<!.)');
            return true;
        } catch (_) {
            return false;
        }
    }

    //like a C number, except:
    //1. no octal literals (leading zeroes disallowed)
    //2. underscores (1 apiece) are allowed between consecutive digits
    //(including hex digits)
    //also, all instances of \b (word boundary) have been replaced with (?<!\$)\b
    //NOTE: we use string rather than regexp in the case where negative lookbehind
    //is allowed to avoid Firefox parse errors; sorry about the resulting double backslashes!
    if (isNegativeLookbehindAvailable()) {
        var SOL_NUMBER_RE = '-?((?<!\\$)\\b0[xX]([a-fA-F0-9]_?)*[a-fA-F0-9]|((?<!\\$)\\b[1-9](_?\\d)*(\\.((\\d_?)*\\d)?)?|\\.\\d(_?\\d)*)([eE][-+]?\\d(_?\\d)*)?|(?<!\\$)\\b0)';
    } else {
        var SOL_NUMBER_RE = /-?(\b0[xX]([a-fA-F0-9]_?)*[a-fA-F0-9]|(\b[1-9](_?\d)*(\.((\d_?)*\d)?)?|\.\d(_?\d)*)([eE][-+]?\d(_?\d)*)?|\b0)/;
    }


    var SOL_NUMBER = {
        className: 'number',
        begin: SOL_NUMBER_RE,
        relevance: 0,
    };

    var HEX_APOS_STRING_MODE = {
        className: 'string',
        begin: /hex'(([0-9a-fA-F]{2}_?)*[0-9a-fA-F]{2})?'/, //please also update HEX_QUOTE_STRING_MODE
    };
    var HEX_QUOTE_STRING_MODE = {
        className: 'string',
        begin: /hex"(([0-9a-fA-F]{2}_?)*[0-9a-fA-F]{2})?"/, //please also update HEX_APOS_STRING_MODE
    };

    //I've set these up exactly like hljs's builtin STRING_MODEs,
    //except with the optional initial "unicode" text
    var SOL_APOS_STRING_MODE = hljs.inherit(hljs.APOS_STRING_MODE, //please also update SOL_QUOTE_STRING_MODE
        { begin: /(unicode)?'/ }
    );
    var SOL_QUOTE_STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, //please also update SOL_APOS_STRING_MODE
        { begin: /(unicode)?"/ }
    );

    var SOL_FUNC_PARAMS = {
        className: 'params',
        begin: /\(/, end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: SOL_KEYWORDS,
        contains: [
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            SOL_APOS_STRING_MODE,
            SOL_QUOTE_STRING_MODE,
            SOL_NUMBER,
            'self' //to account for mappings and fn variables
        ]
    };

    //NOTE: including "*" as a "lexeme" because we use it as a "keyword" below
    var SOL_LEXEMES_RE = /[A-Za-z_$][A-Za-z_$0-9]*|\*/;
    //in assembly, identifiers can contain periods (but may not start with them)
    var SOL_ASSEMBLY_LEXEMES_RE = /[A-Za-z_$][A-Za-z_$0-9.]*/;

    var SOL_RESERVED_MEMBERS = {
        begin: /\.\s*/,  // match any property access up to start of prop
        end: /[^A-Za-z0-9$_\.]/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: {
            built_in: 'gas value selector address length push pop ' +
               'send transfer call callcode delegatecall staticcall ' +
               'balance code codehash ' +
               'name creationCode runtimeCode interfaceId min max'
        },
        relevance: 2,
    };

    var SOL_TITLE_MODE =
        hljs.inherit(hljs.TITLE_MODE, {
            begin: /[A-Za-z$_][0-9A-Za-z$_]*/,
            lexemes: SOL_LEXEMES_RE,
            keywords: SOL_KEYWORDS,
        });

    var SOL_SPECIAL_PARAMETERS = {
        //special parameters (note: these aren't really handled properly, but this seems like the best compromise for now)
        className: 'built_in',
        begin: /(gas|value|salt):/
    };

    function makeBuiltinProps(obj, props) {
        return {
            begin: (isNegativeLookbehindAvailable() ? '(?<!\\$)\\b' : '\\b') + obj + '\\.\\s*',
            end: /[^A-Za-z0-9$_\.]/,
            excludeBegin: false,
            excludeEnd: true,
            lexemes: SOL_LEXEMES_RE,
            keywords: {
                built_in: obj + ' ' + props,
            },
            contains: [
                SOL_RESERVED_MEMBERS
            ],
            relevance: 10,
        };
    }

    return {
        aliases: ['sol'],
        keywords: SOL_KEYWORDS,
        lexemes: SOL_LEXEMES_RE,
        contains: [
            // basic literal definitions
            SOL_APOS_STRING_MODE,
            SOL_QUOTE_STRING_MODE,
            HEX_APOS_STRING_MODE,
            HEX_QUOTE_STRING_MODE,
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            SOL_NUMBER,
            SOL_SPECIAL_PARAMETERS,
            { // functions
                className: 'function',
                lexemes: SOL_LEXEMES_RE,
                beginKeywords: 'function modifier event constructor', end: /[{;]/, excludeEnd: true,
                contains: [
                    SOL_TITLE_MODE,
                    SOL_FUNC_PARAMS,
                    SOL_SPECIAL_PARAMETERS,
                    hljs.C_LINE_COMMENT_MODE,
                    hljs.C_BLOCK_COMMENT_MODE
                ],
                illegal: /%/,
            },
            // built-in members
            makeBuiltinProps('msg', 'gas value data sender sig'),
            makeBuiltinProps('block', 'blockhash coinbase difficulty gaslimit number timestamp chainid'),
            makeBuiltinProps('tx', 'gasprice origin'),
            makeBuiltinProps('abi', 'decode encode encodePacked encodeWithSelector encodeWithSignature'),
            SOL_RESERVED_MEMBERS,
            { // contracts & libraries & interfaces
                className: 'class',
                lexemes: SOL_LEXEMES_RE,
                beginKeywords: 'contract interface library', end: '{', excludeEnd: true,
                illegal: /[:"\[\]]/,
                contains: [
                    { beginKeywords: 'is', lexemes: SOL_LEXEMES_RE },
                    SOL_TITLE_MODE,
                    SOL_FUNC_PARAMS,
                    SOL_SPECIAL_PARAMETERS,
                    hljs.C_LINE_COMMENT_MODE,
                    hljs.C_BLOCK_COMMENT_MODE
                ]
            },
            { // structs & enums
                lexemes: SOL_LEXEMES_RE,
                beginKeywords: 'struct enum', end: '{', excludeEnd: true,
                illegal: /[:"\[\]]/,
                contains: [
                    SOL_TITLE_MODE,
                    hljs.C_LINE_COMMENT_MODE,
                    hljs.C_BLOCK_COMMENT_MODE
                ]
            },
            { // imports
                beginKeywords: 'import', end: ';',
                lexemes: SOL_LEXEMES_RE,
                keywords: 'import * from as',
                contains: [
                    SOL_TITLE_MODE,
                    SOL_APOS_STRING_MODE,
                    SOL_QUOTE_STRING_MODE,
                    HEX_APOS_STRING_MODE,
                    HEX_QUOTE_STRING_MODE,
                    hljs.C_LINE_COMMENT_MODE,
                    hljs.C_BLOCK_COMMENT_MODE
                ]
            },
            { // using
                beginKeywords: 'using', end: ';',
                lexemes: SOL_LEXEMES_RE,
                keywords: 'using * for',
                contains: [
                    SOL_TITLE_MODE,
                    hljs.C_LINE_COMMENT_MODE,
                    hljs.C_BLOCK_COMMENT_MODE
                ]
            },
            { // pragmas
                className: 'meta',
                beginKeywords: 'pragma', end: ';',
                lexemes: SOL_LEXEMES_RE,
                keywords: {
                    keyword: 'pragma solidity experimental abicoder',
                    built_in: 'ABIEncoderV2 SMTChecker v1 v2'
                },
                contains: [
                    hljs.C_LINE_COMMENT_MODE,
                    hljs.C_BLOCK_COMMENT_MODE,
                    hljs.inherit(SOL_APOS_STRING_MODE, { className: 'meta-string' }),
                    hljs.inherit(SOL_QUOTE_STRING_MODE, { className: 'meta-string' })
                ]
            },
            { //assembly section
                beginKeywords: 'assembly',
                end: /\b\B/, //unsatisfiable regex; ended by endsParent instead
                contains: [
                    hljs.C_LINE_COMMENT_MODE,
                    hljs.C_BLOCK_COMMENT_MODE,
                    { //the actual *block* in the assembly section
                        begin: '{', end: '}',
                        endsParent: true,
                        keywords: SOL_ASSEMBLY_KEYWORDS,
                        lexemes: SOL_ASSEMBLY_LEXEMES_RE,
                        contains: [
                            SOL_APOS_STRING_MODE,
                            SOL_QUOTE_STRING_MODE,
                            HEX_APOS_STRING_MODE,
                            HEX_QUOTE_STRING_MODE,
                            hljs.C_LINE_COMMENT_MODE,
                            hljs.C_BLOCK_COMMENT_MODE,
                            SOL_NUMBER,
                            SOL_ASSEMBLY_MEMBERS,
                            SOL_ASSEMBLY_MEMBERS_OLD,
                            { //block within assembly; note the lack of endsParent
                                begin: '{', end: '}',
                                keywords: SOL_ASSEMBLY_KEYWORDS,
                                lexemes: SOL_ASSEMBLY_LEXEMES_RE,
                                contains: [
                                    SOL_APOS_STRING_MODE,
                                    SOL_QUOTE_STRING_MODE,
                                    HEX_APOS_STRING_MODE,
                                    HEX_QUOTE_STRING_MODE,
                                    hljs.C_LINE_COMMENT_MODE,
                                    hljs.C_BLOCK_COMMENT_MODE,
                                    SOL_NUMBER,
                                    SOL_ASSEMBLY_MEMBERS,
                                    SOL_ASSEMBLY_MEMBERS_OLD,
                                    'self'
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        illegal: /#/
    };
}

module.exports = function(hljs) {
    hljs.registerLanguage('solidity', hljsDefineSolidity);
};

module.exports.definer = hljsDefineSolidity;
