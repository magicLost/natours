const presets = ["next/babel"];

const plugins = [
  "@babel/plugin-syntax-dynamic-import",
  //"graphql-tag",
  //"@loadable/babel-plugin"
];

module.exports = { presets, plugins };

//"> 0.25%, not dead",
/*  targets:     {
          edge: "17",
          firefox: "60",
          chrome: "67",
          safari: "11.1", 
        }, 
        modules: "auto" */
