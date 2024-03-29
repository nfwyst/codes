module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "standard",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        'BigInt': true
    },
    "parserOptions": {
        "ecmaVersion": 2019
    },
    "rules": {
        "space-before-function-paren": 0,
        "generator-star-spacing": 0,
        "yield-star-spacing": 0,
    }
};
