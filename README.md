# babel-parser-recast

When you are using [babel](https://babeljs.io/) to transform code, allows you to leverage [recast](https://github.com/benjamn/recast/) to preserve as much formatting as possible during the transformation. Great for writing codemods.

## Usage

```js
// babel.config.js

module.exports = (api) => {
  api.cache(true); // Or whatever you need

  return {
    plugins: [
      // Order in the plugins array is not important
      'babel-plugin-recast',
    ],
  };
};
```

## How it works

This package encapsulates the current mechanism by which recast should be integrated with babel, using the supported but undocumented `parserOverride` and `generatorOverride` plugin hooks.

Note that only one plugin can override parsing. If you already had a plugin to override parsing you can pass its override to this plugin to be chained. You don't need to worry about this with the official `babel-plugin-syntax-*` packages, which are not implemented as parser overrides but merely adjust the options passed to the default parser.

```js
return {
  plugins: [
    [
      'babel-plugin-recast',
      {
        // Disclaimer: I didn't test this and it may not work
        parserOverride: require('other-plugin')
          .parserOverride,
      },
    ],
  ],
};
```

Recast's source mapping supplants babel's when you use this plugin. Is it better? I don't know.
