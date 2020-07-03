module.exports = {
  plugins: [
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet-async`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve(`./src/components/Layout.js`)
        },
        rehypePlugins: [
          require(`rehype-slug`)
        ],
        remarkPlugins: [
          require(`remark-external-links`),
          require(`remark-docz`)
        ]
      }
    }
  ]
}