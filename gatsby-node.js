const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

// variables to collect information for homepage/services relation
let homeServicesTitles = [];
let homeServicesIds = [];
let servicesObject = new Object();
let leadershipDevelopmentObject = new Object();
let coursesObject = new Object();

let homeNodeId;

exports.createPages = ({ actions, graphql, getNode }) => {
  const { createPage, createNodeField } = actions;
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

    // create node fields for homepage/services relations
    homeServicesTitles.forEach(service => {
      if (servicesObject[service]) {
        homeServicesIds.push(servicesObject[service]);
      }
    });

    if (homeServicesIds.length > 0) {
      createNodeField({
        node: getNode(homeNodeId),
        name: `homeservices`,
        value: homeServicesIds
      });
    }
    // create node fields for upcoming services/mindulness training courses relation
    for (let key in leadershipDevelopmentObject) {
      if (
        leadershipDevelopmentObject.hasOwnProperty(key) &&
        coursesObject[key]
      ) {
        if (coursesObject[key].length > 0) {
          createNodeField({
            node: getNode(leadershipDevelopmentObject[key]),
            name: `ldCoursesUCourses`,
            value: coursesObject[key]
          });
          coursesObject[key].forEach(courseNodeId => {
            createNodeField({
              node: getNode(courseNodeId),
              name: `uCourseLDCourses`,
              value: leadershipDevelopmentObject[key]
            });
          });
        }
      }
    }
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
    // collect nodes for homepage/services relation
    if (
      node.frontmatter.templateKey &&
      node.frontmatter.templateKey.includes("home-page")
    ) {
      homeNodeId = node.id;
      if (
        node.frontmatter.ldArea &&
        node.frontmatter.ldArea.services.length > 0
      ) {
        node.frontmatter.ldArea.services.forEach(service =>
          homeServicesTitles.push(service.service.trim().toLowerCase())
        );
      }
      if (
        node.frontmatter.ewsArea &&
        node.frontmatter.ewsArea.services.length > 0
      ) {
        node.frontmatter.ewsArea.services.forEach(service =>
          homeServicesTitles.push(service.service.trim().toLowerCase())
        );
      }
    } else if (
      node.frontmatter.templateKey &&
      node.frontmatter.templateKey.includes("service-page")
    ) {
      servicesObject[node.frontmatter.title.trim().toLowerCase()] = node.id;
      // collect nodes for upcoming courses/leadership development courses relation
      leadershipDevelopmentObject[node.frontmatter.title.trim().toLowerCase()] =
        node.id;
    } else if (
      node.frontmatter.templateKey &&
      node.frontmatter.templateKey.includes("upcoming-courses")
    ) {
      if (coursesObject[node.frontmatter.serviceRelated.trim().toLowerCase()]) {
        coursesObject[
          node.frontmatter.serviceRelated.trim().toLowerCase()
        ].push(node.id);
      } else {
        coursesObject[
          node.frontmatter.serviceRelated.trim().toLowerCase()
        ] = [];
        coursesObject[
          node.frontmatter.serviceRelated.trim().toLowerCase()
        ].push(node.id);
      }
    }
  }
};
