"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseName = exports.parseFullyQualifiedName = exports.isFullyQualifiedName = exports.getFullyQualifiedName = void 0;
const errors_1 = require("../internal/core/errors");
const errors_list_1 = require("../internal/core/errors-list");
/**
 * Returns a fully qualified name from a sourceName and contractName.
 */
function getFullyQualifiedName(sourceName, contractName) {
    return `${sourceName}:${contractName}`;
}
exports.getFullyQualifiedName = getFullyQualifiedName;
/**
 * Returns true if a name is fully qualified, and not just a bare contract name.
 */
function isFullyQualifiedName(name) {
    return name.includes(":");
}
exports.isFullyQualifiedName = isFullyQualifiedName;
/**
 * Parses a fully qualified name.
 *
 * @param fullyQualifiedName It MUST be a fully qualified name.
 */
function parseFullyQualifiedName(fullyQualifiedName) {
    const { sourceName, contractName } = parseName(fullyQualifiedName);
    if (sourceName === undefined) {
        throw new errors_1.HardhatError(errors_list_1.ERRORS.CONTRACT_NAMES.INVALID_FULLY_QUALIFIED_NAME, {
            name: fullyQualifiedName,
        });
    }
    return { sourceName, contractName };
}
exports.parseFullyQualifiedName = parseFullyQualifiedName;
/**
 * Parses a name, which can be a bare contract name, or a fully qualified name.
 */
function parseName(name) {
    const parts = name.split(":");
    if (parts.length === 1) {
        return { contractName: parts[0] };
    }
    const contractName = parts[parts.length - 1];
    const sourceName = parts.slice(0, parts.length - 1).join(":");
    return { sourceName, contractName };
}
exports.parseName = parseName;
//# sourceMappingURL=contract-names.js.map