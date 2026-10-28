const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
    {
        files: ['**/*.ts'],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
            ...angular.configs.tsRecommended,
        ],
        processor: angular.processInlineTemplates,
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],

            // 5 lisättyä TypeScript-sääntöä:
            '@typescript-eslint/no-unused-vars': 'error', //Varmistaa, ettei koodiin jää lojumaan käyttämättömiä muuttujia.
            '@typescript-eslint/no-explicit-any': 'error', //Estää "any"-tyypin käytön, mikä parantaa tyyppiturvallisuutta.
            '@typescript-eslint/explicit-function-return-type': 'warn', //Varoittaa, jos funktioiden paluuarvoa ei ole määritelty eksplisiittisesti.
            '@typescript-eslint/no-inferrable-types': 'error', //Estää tarpeettomien tyyppimääritysten käytön, kun TypeScript voi päätellä tyypin automaattisesti.
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'], //Pakottaa käyttämään "interface"-määritelmiä "type"-määritelmien sijaan, mikä voi parantaa koodin luettavuutta ja ylläpidettävyyttä.
        },
    },
    {
        files: ['**/*.html'],
        extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
        rules: {},
    }
);
