const { declare } = require('@babel/helper-plugin-utils');
const recast = require('recast');

module.exports = declare((api, options, _dirname) => {
  return {
    parserOverride(source, parserOpts, babelParse) {
      // Needed to prevent recast from trying to parse with esprima just to get tokens
      const _parserOpts = Object.assign({}, parserOpts, { tokens: true });
      return recast.parse(source, {
        parser: {
          parse(source) {
            const parse = options.parserOverride
              ? options.parserOverride(source, _parserOpts, babelParse)
              : babelParse;
            return parse(source, _parserOpts);
          },
        },
      });
    },

    generatorOverride(ast, _generatorOpts) {
      return recast.print(ast);
    },
  };
});
