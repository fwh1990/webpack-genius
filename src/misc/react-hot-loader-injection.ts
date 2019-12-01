import * as babelTypes from '@babel/types';

module.exports = () => {
  return {
    visitor: {
      CallExpression(path: { node: babelTypes.CallExpression }) {
        if (
          path.node.callee &&
          path.node.callee.type === 'MemberExpression' &&
          path.node.callee.property.name === 'render' &&
          typeof path.node.arguments === 'object' &&
          path.node.arguments.length >= 2 &&
          path.node.arguments[0].type === 'JSXElement'
        ) {
          // @ts-ignore
          const dom = path.get('arguments.0');
          const HotName = 'WebpackGeniusHot';

          // @ts-ignore
          path.parentPath.insertBefore(babelTypes.importDeclaration(
            [babelTypes.importDefaultSpecifier(babelTypes.identifier(HotName))],
            babelTypes.stringLiteral(require.resolve('webpack-genius/misc/hot-react'))
          ));

          dom.replaceWith(
            babelTypes.jsxElement(
              babelTypes.jsxOpeningElement(babelTypes.jsxIdentifier(HotName), [], false),
              babelTypes.jsxClosingElement(babelTypes.jsxIdentifier(HotName)),
              [dom.node],
              false
            )
          );
        }
      },
    }
  };
};
