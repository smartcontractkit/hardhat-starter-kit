// add pre-commit
// with linting --fix

module.exports = {
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        }
    },
    "parser": "babel-eslint"
}


// module.exports = {
//     root: true,
//     parser: '@typescript-eslint/parser',
//     plugins: ['@typescript-eslint', '@nrwl/eslint-plugin-nx'],
//     settings: {
//         react: {
//             version: 'detect',
//         },
//     },
//     env: {
//         es6: true,
//         node: true,
//     },
//     extends: [
//         'eslint:recommended',
//         'plugin:@typescript-eslint/eslint-recommended',
//         'plugin:@typescript-eslint/recommended',
//         'plugin:prettier/recommended',
//         'prettier',
//         'plugin:react/recommended',
//     ],
//     rules: {
//         radix: ['error', 'always'],
//         'object-shorthand': ['error', 'always'],
//         'prettier/prettier': [
//             'error',
//             {},
//             {
//                 usePrettierrc: true,
//             },
//         ],
//         '@typescript-eslint/no-empty-function': 'off',
//         '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
//         '@typescript-eslint/no-empty-interface': 'off',
//         '@typescript-eslint/explicit-function-return-type': 'off',
//         '@typescript-eslint/explicit-module-boundary-types': 'off',
//         '@typescript-eslint/no-explicit-any': 'off',
//         '@typescript-eslint/ban-ts-comment': 'warn',
//         '@typescript-eslint/no-non-null-assertion': 'error',
//         '@typescript-eslint/no-use-before-define': [
//             'error',
//             { functions: false, typedefs: false },
//         ],
//         '@nrwl/nx/enforce-module-boundaries': [
//             'error',
//             {
//                 allow: [],
//                 depConstraints: [
//                     {
//                         sourceTag: 'scope:shared',
//                         onlyDependOnLibsWithTags: ['scope:shared'],
//                     },
//                     {
//                         sourceTag: 'scope:service',
//                         onlyDependOnLibsWithTags: ['scope:shared', 'scope:service'],
//                     },
//                     {
//                         sourceTag: 'scope:ui',
//                         onlyDependOnLibsWithTags: ['scope:shared', 'scope:service'],
//                     },
//                     {
//                         sourceTag: 'scope:e2e',
//                         onlyDependOnLibsWithTags: [
//                             'scope:shared',
//                             'scope:service',
//                             'scope:ui',
//                         ],
//                     },
//                 ],
//             },
//         ],
//     },

//     overrides: [
//         // enable jest for tests
//         {
//             files: [
//                 '**/*.test.ts',
//                 '**/*.test.tsx',
//                 '**/*.test.js',
//                 '**/__mocks__/**/*.js',
//             ],
//             env: {
//                 jest: true,
//             },
//             rules: {
//                 '@typescript-eslint/no-non-null-assertion': 'off',
//             },
//         },
//         // add react linting for all of our react projects
//         {
//             files: [
//                 'apps/data-ui/**/*',
//                 'apps/keeper-ui/**/*',
//                 'apps/explorer/client/**/*',
//                 'libs/styleguide/**/*',
//             ],
//             plugins: ['react-hooks'],
//             env: {
//                 node: true,
//                 browser: true,
//             },
//             rules: {
//                 'react/prop-types': 'off',
//                 'react-hooks/rules-of-hooks': 'error',
//                 'react-hooks/exhaustive-deps': 'error',
//                 'no-console': ['error', { allow: ['warn', 'error'] }],
//             },
//         },
//     ],
// }
