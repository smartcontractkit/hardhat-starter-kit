import { Schema, ValidatorResult } from 'jsonschema';
/**
 * A validator for [JSON-schemas](http://json-schema.org/)
 */
export declare class SchemaValidator {
    private readonly _validator;
    private static _assertSchemaDefined;
    /**
     * Instantiates a SchemaValidator instance
     */
    constructor();
    /**
     * Add a schema to the validator. All schemas and sub-schemas must be added to
     * the validator before the `validate` and `isValid` methods can be called with
     * instances of that schema.
     * @param schema The schema to add
     */
    addSchema(schema: Schema): void;
    /**
     * Validate the JS object conforms to a specific JSON schema
     * @param instance JS object in question
     * @param schema Schema to check against
     * @returns The results of the validation
     */
    validate(instance: any, schema: Schema): ValidatorResult;
    /**
     * Check whether an instance properly adheres to a JSON schema
     * @param instance JS object in question
     * @param schema Schema to check against
     * @returns Whether or not the instance adheres to the schema
     */
    isValid(instance: any, schema: Schema): boolean;
}
//# sourceMappingURL=schema_validator.d.ts.map