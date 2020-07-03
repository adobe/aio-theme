// https://github.com/gatsbyjs/gatsby/issues/24815#issuecomment-645512683
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty'
    }
  });
};