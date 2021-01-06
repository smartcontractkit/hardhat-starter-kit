"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Deletes deeply nested properties from an object. MUTATES the object
 * @param obj the object to be operated on
 * @param propPath the full dot-separated path to the property to delete, e.g. 'animals.mammals.dog.name'
 * returns void
 */
exports.deleteNestedProperty = (obj, propPath) => {
    if (!obj || !propPath) {
        return;
    }
    const propPathParts = propPath.split('.');
    let _obj = obj;
    for (let i = 0; i < propPathParts.length - 1; i++) {
        _obj = _obj[propPathParts[i]];
        if (typeof _obj === 'undefined') {
            return;
        }
    }
    while (propPathParts.length > 0) {
        delete _obj[propPathParts.pop()];
    }
};
//# sourceMappingURL=delete_nested_property.js.map