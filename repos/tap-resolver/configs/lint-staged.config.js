// ref: https://github.com/okonet/lint-staged
// Used in pre-commit via husky
// formats and adds any auto fixes to the commit
//    1. runs prettier on the staged file(s)
//    2. runs eslint on the staged file(s)
module.exports = {
  '**/*.js?(x)': [
    'prettier --config ./configs/prettier.config.js --ignore-path .eslintignore --write',
    'eslint --config ./configs/eslintrc.config.js --fix --quiet',
  ],
}
