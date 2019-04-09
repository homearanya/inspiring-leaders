const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  return graphql(`
    {
      nonArticlesPages: allMarkdownRemark(
        limit: 1000
        filter: {
          fileAbsolutePath: { regex: "/src/pages/" }
          frontmatter: { templateKey: { ne: "article-page" } }
        }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
      articlesPages: allMarkdownRemark(
        limit: 1000
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: {
          fileAbsolutePath: { regex: "/src/pages/" }
          frontmatter: { templateKey: { eq: "article-page" } }
        }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              title
              thumbnailimage {
                alt
                image {
                  childImageSharp {
                    fluid(maxWidth: 400) {
                      base64
                      aspectRatio
                      src
                      srcSet
                      sizes
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const nonArticles = result.data.nonArticlesPages.edges;
    const articles = result.data.articlesPages.edges;

    nonArticles.forEach(({ node }, index) => {
      const id = node.id;
      createPage({
        path: node.fields.slug,
        component: path.resolve(
          `src/templates/${String(node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id
        }
      });
    });

    articles.forEach(({ node }, index) => {
      const id = node.id;
      // Prepare related data
      createPage({
        path: node.fields.slug,
        component: path.resolve(
          `src/templates/${String(node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
          prev: index === 0 ? null : articles[index - 1].node,
          next: index === articles.length - 1 ? null : articles[index + 1].node
        }
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (
    !(
      node.fileAbsolutePath &&
      node.fileAbsolutePath.includes("/general/main-menu.md")
    )
  ) {
    fmImagesToRelative(node); // convert image paths for gatsby images
  }

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
