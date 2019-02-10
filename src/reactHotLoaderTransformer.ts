import { API, FileInfo, Options } from 'jscodeshift';

function transform(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift; // alias the jscodeshift API

  const root = j(file.source); // parse JS code into an AST

  const printOptions = options.printOptions || {
    quote: 'single',
    trailingComma: true,
  };

  // transform importDeclaration
  root
    .find(j.ImportDeclaration)
    .filter(path => {
      if (path.node.source.value !== 'react-hot-loader') {
        return false;
      }

      const hasHot = path.node.specifiers.filter(spec => spec.local.name === 'hot').length > 0;
      return  hasHot;
    })
    .forEach(path => {
      // console.log('mypath: ', path);
      path.node.source.value = 'react-hot-loader/root';
    });

  // transform hot(module) call
  root
    .find(j.ExportDefaultDeclaration)
    .filter(path => {
      if (path.node.declaration.type === 'CallExpression') {
        if (path.node.declaration.callee.type === 'CallExpression') {
          if (path.node.declaration.callee.callee.type === 'Identifier' &&
            path.node.declaration.callee.callee.name === 'hot') {
            return true;
          }
        }
      }

      return false;
    })
    .forEach(path => {
      path.node.declaration = j.callExpression(
        j.identifier('hot'),
        [
          ...path.node.declaration.arguments,
        ],
      );
    });

  // print
  return root.toSource(printOptions);
}

module.exports = transform;
module.exports.parser = 'tsx';
