import { BigNumber } from 'ethers';
export function supportBigNumber(Assertion, utils) {
    Assertion.overwriteMethod('equal', override('eq', 'equal', utils));
    Assertion.overwriteMethod('eq', override('eq', 'equal', utils));
    Assertion.overwriteMethod('above', override('gt', 'above', utils));
    Assertion.overwriteMethod('gt', override('gt', 'greater than', utils));
    Assertion.overwriteMethod('below', override('lt', 'below', utils));
    Assertion.overwriteMethod('lt', override('lt', 'less than', utils));
    Assertion.overwriteMethod('least', override('gte', 'at least', utils));
    Assertion.overwriteMethod('gte', override('gte', 'greater than or equal', utils));
    Assertion.overwriteMethod('most', override('lte', 'at most', utils));
    Assertion.overwriteMethod('lte', override('lte', 'less than or equal', utils));
}
function override(method, name, utils) {
    return (_super) => overwriteBigNumberFunction(method, name, _super, utils);
}
function overwriteBigNumberFunction(functionName, readableName, _super, chaiUtils) {
    return function (...args) {
        const [actual] = args;
        const expected = chaiUtils.flag(this, 'object');
        if (BigNumber.isBigNumber(expected) || BigNumber.isBigNumber(actual)) {
            this.assert(BigNumber.from(expected)[functionName](actual), `Expected "${expected}" to be ${readableName} ${actual}`, `Expected "${expected}" NOT to be ${readableName} ${actual}`, expected, actual);
        }
        else {
            _super.apply(this, args);
        }
    };
}
