import * as babelTypes from '@babel/types';

export default (_, { entries }: { entries: string[] }) => {
  return {
    visitor: {
      Program(path, { file }) {
        const fileName = file.opts.filename;

        if (entries.indexOf(fileName) === -1) {
          return;
        }

        path.get('body.0').insertBefore(
          babelTypes.ifStatement(
            babelTypes.memberExpression(babelTypes.identifier('module'), babelTypes.identifier('hot')),
            babelTypes.blockStatement([
              babelTypes.expressionStatement(
                babelTypes.callExpression(
                  babelTypes.memberExpression(
                    babelTypes.memberExpression(babelTypes.identifier('module'), babelTypes.identifier('hot')),
                    babelTypes.identifier('accept')
                  ),
                  []
                )
              )
            ])
          )
        )
      },
    },
  };
};
