import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Breadcrumbs from "../components/Breadcrumbs";
import ArticleThumbnail from "../components/ArticleThumbnail";
import SEO from "../components/SEO/SEO";

export default function({ location, data }) {
  const { fields, frontmatter } = data.articlesPageQuery;
  const { edges: articles } = data.articlesQuery;
  //   Prepare breadcrumbs
  const pages = [
    { title: "Home", href: "/" },
    { title: "Articles", href: null }
  ];
  const pageMeta = {
    title: `Articles · Leadership Development & Employee Wellness Support Services`,
    description:
      frontmatter.excerpt ||
      frontmatter.blurb ||
      "Alistair Mork-Chadwick is a Counselling psychologist based in Howick. He offers personal counselling, career guidance, psychological assessments and mindfulness training.",
    slug: fields.slug,
    datePublished: false
  };

  return (
    <Layout currentPageSlug={fields.slug}>
      <SEO
        pageData={pageMeta}
        breadcrumbs={JSON.parse(JSON.stringify(pages))}
      />
      <Breadcrumbs
        bannerImage={frontmatter.bannerimage}
        pageTitle="Articles"
        pages={JSON.parse(JSON.stringify(pages))}
      />
      <section className="ls page_portfolio section_padding_top_100 section_padding_bottom_75">
        <div className="container">
          <div className="row mosaic-post">
            <div className="col-sm-12">
              <div className="isotope_container isotope row masonry-layout columns_bottom_margin_30">
                {articles.map(({ node: article }) => (
                  <ArticleThumbnail
                    siteUrl={location.origin}
                    article={article}
                    key={article.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const articlesPageQuery = graphql`
  query ArticlesQuery($id: String!) {
    articlesPageQuery: markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        blurb
        excerpt
        bannerimage {
          image {
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          alt
        }
      }
    }
    articlesQuery: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "article-page" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200)
          id
          fields {
            slug
          }
          frontmatter {
            title
            intro
            date(formatString: "MMMM DD, YYYY")
            thumbnailimage {
              alt
              image {
                childImageSharp {
                  fluid(maxWidth: 400) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
