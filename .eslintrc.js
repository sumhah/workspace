module.exports = {
    root: true,
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        jest: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        ecmaVersion: 2017,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true
        }
    },
    extends: [
        'airbnb-base',
        'plugin:vue/recommended',
    ],
    globals: {
        $: true,
        jQuery: true,
    },
    rules: {
        semi: [2, 'always'],
        'no-unused-vars': 1,
        'func-names': 0,
        'no-restricted-syntax': 0,
        'no-underscore-dangle': 0,
        'no-bitwise': 0,
        'max-len': [1, { code: 140 }],
        'no-param-reassign': 0,
        'consistent-return': 0,
        'no-control-regex': 0,
        'no-useless-escape': 0,
        'no-trailing-spaces': 0,
        indent: [2, 4],
        camelcase: 1,
        'comma-dangle': [2, 'only-multiline'],
        'object-curly-newline': ['error', {
            ObjectExpression: {
                minProperties: 5,
                multiline: true,
                consistent: true
            },
            ObjectPattern: {
                minProperties: 5,
                multiline: true,
                consistent: true
            }
        }],
        // https://github.com/airbnb/javascript/issues/1071#issuecomment-338292067
        'no-mixed-operators': ["error", {
            groups: [
                ["%", "**"],
                ["%", "+"],
                ["%", "-"],
                ["%", "*"],
                ["%", "/"],
                ["**", "+"],
                ["**", "-"],
                ["**", "*"],
                ["**", "/"],
                ["&", "|", "^", "~", "<<", ">>", ">>>"],
                ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
                ["&&", "||"],
                ["in", "instanceof"],
            ],
            allowSamePrecedence: false
        }],
        'vue/html-indent': [4],
        'vue/script-indent': [4],
        'vue/html-self-closing': [1, {
            html: {
                void: 'always',
                normal: 'never',
                component: 'always'
            },
            svg: 'always',
            math: 'always'
        }],
        'vue/max-attributes-per-line': [2, {
            singleline: 3,
            multiline: {
                max: 1,
                allowFirstLine: false
            }
        }],
        "vue/singleline-html-element-content-newline": 0,
        'import/prefer-default-export': 1,
        'import/no-unresolved': [0, {commonjs: true, amd: true}],
        'import/extensions': ['off', 'always', { js: 'never', vue: 'never' }],
    },
};
