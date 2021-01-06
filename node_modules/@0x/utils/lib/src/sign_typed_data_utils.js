"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethUtil = require("ethereumjs-util");
const ethers = require("ethers");
const configured_bignumber_1 = require("./configured_bignumber");
exports.signTypedDataUtils = {
    /**
     * Generates the EIP712 Typed Data hash for signing
     * @param   typedData An object that conforms to the EIP712TypedData interface
     * @return  A Buffer containing the hash of the typed data.
     */
    generateTypedDataHash(typedData) {
        return ethUtil.sha3(Buffer.concat([
            Buffer.from('1901', 'hex'),
            exports.signTypedDataUtils._structHash('EIP712Domain', typedData.domain, typedData.types),
            exports.signTypedDataUtils._structHash(typedData.primaryType, typedData.message, typedData.types),
        ]));
    },
    /**
     * Generates the EIP712 Typed Data hash for a typed data object without using the domain field. This
     * makes hashing easier for non-EIP712 data.
     * @param   typedData An object that conforms to the EIP712TypedData interface
     * @return  A Buffer containing the hash of the typed data.
     */
    generateTypedDataHashWithoutDomain(typedData) {
        return exports.signTypedDataUtils._structHash(typedData.primaryType, typedData.message, typedData.types);
    },
    /**
     * Generates the hash of a EIP712 Domain with the default schema
     * @param  domain An EIP712 domain with the default schema containing a name, version, chain id,
     *                and verifying address.
     * @return A buffer that contains the hash of the domain.
     */
    generateDomainHash(domain) {
        return exports.signTypedDataUtils._structHash('EIP712Domain', domain, 
        // HACK(jalextowle): When we consolidate our testing packages into test-utils, we can use a constant
        // to eliminate code duplication. At the moment, there isn't a good way to do that because of cyclic-dependencies.
        {
            EIP712Domain: [
                { name: 'name', type: 'string' },
                { name: 'version', type: 'string' },
                { name: 'chainId', type: 'uint256' },
                { name: 'verifyingContract', type: 'address' },
            ],
        });
    },
    _findDependencies(primaryType, types, found = []) {
        if (found.includes(primaryType) || types[primaryType] === undefined) {
            return found;
        }
        found.push(primaryType);
        for (const field of types[primaryType]) {
            for (const dep of exports.signTypedDataUtils._findDependencies(field.type, types, found)) {
                if (!found.includes(dep)) {
                    found.push(dep);
                }
            }
        }
        return found;
    },
    _encodeType(primaryType, types) {
        let deps = exports.signTypedDataUtils._findDependencies(primaryType, types);
        deps = deps.filter(d => d !== primaryType);
        deps = [primaryType].concat(deps.sort());
        let result = '';
        for (const dep of deps) {
            result += `${dep}(${types[dep].map(({ name, type }) => `${type} ${name}`).join(',')})`;
        }
        return result;
    },
    _encodeData(primaryType, data, types) {
        const encodedTypes = ['bytes32'];
        const encodedValues = [exports.signTypedDataUtils._typeHash(primaryType, types)];
        for (const field of types[primaryType]) {
            const value = data[field.name];
            if (field.type === 'string' || field.type === 'bytes') {
                const hashValue = ethUtil.sha3(value);
                encodedTypes.push('bytes32');
                encodedValues.push(hashValue);
            }
            else if (types[field.type] !== undefined) {
                encodedTypes.push('bytes32');
                const hashValue = ethUtil.sha3(
                // tslint:disable-next-line:no-unnecessary-type-assertion
                exports.signTypedDataUtils._encodeData(field.type, value, types));
                encodedValues.push(hashValue);
            }
            else if (field.type.lastIndexOf(']') === field.type.length - 1) {
                throw new Error('Arrays currently unimplemented in encodeData');
            }
            else {
                encodedTypes.push(field.type);
                const normalizedValue = exports.signTypedDataUtils._normalizeValue(field.type, value);
                encodedValues.push(normalizedValue);
            }
        }
        return ethers.utils.defaultAbiCoder.encode(encodedTypes, encodedValues);
    },
    _normalizeValue(type, value) {
        const STRING_BASE = 10;
        if (type === 'uint256') {
            if (configured_bignumber_1.BigNumber.isBigNumber(value)) {
                return value.toString(STRING_BASE);
            }
            return new configured_bignumber_1.BigNumber(value).toString(STRING_BASE);
        }
        return value;
    },
    _typeHash(primaryType, types) {
        return ethUtil.sha3(exports.signTypedDataUtils._encodeType(primaryType, types));
    },
    _structHash(primaryType, data, types) {
        return ethUtil.sha3(exports.signTypedDataUtils._encodeData(primaryType, data, types));
    },
};
//# sourceMappingURL=sign_typed_data_utils.js.map