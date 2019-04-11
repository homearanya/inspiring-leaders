import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import rehypeReact from "rehype-react";

import Layout from "../components/Layout";
import Breadcrumbs from "../components/Breadcrumbs";
import PrevNextArticle from "../components/PrevNextArticle";
import SEO from "../components/SEO/SEO";
import DynamicAnchor from "../components/DynamicAnchor";

//  Create a render function with references to your custom components in markdown
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {}
}).Compiler;

export default function({ data, pageContext }) {
  const { markdownRemark: article } = data;
  //   Prepare breadcrumbs
  const pages = [
    { title: "Home", href: "/" },
    { title: "Articles", href: "/articles/" },
    { title: article.frontmatter.title, href: null }
  ];
  // article images
  const articleImage =
    article.frontmatter.bodyimage &&
    article.frontmatter.bodyimage.image &&
    article.frontmatter.bodyimage.image.relativePath;
  const pageMeta = {
    title: article.frontmatter.title,
    description:
      article.frontmatter.excerpt ||
      article.frontmatter.intro ||
      "Alistair Mork-Chadwick is a Counselling psychologist based in Howick. He offers personal counselling, career guidance, psychological assessments and mindfulness training.",
    articleImage: articleImage,
    slug: article.fields.slug,
    datePublished: article.frontmatter.date
  };
  return (
    <Layout currentPageSlug={article.fields.slug}>
      <SEO
        pageData={pageMeta}
        breadcrumbs={JSON.parse(JSON.stringify(pages))}
        pageType="article"
      />
      <Breadcrumbs
        bannerImage={article.frontmatter.bannerimage}
        pageTitle={article.frontmatter.title}
        pages={JSON.parse(JSON.stringify(pages))}
      />
      <section className="ls section_padding_top_130 section_padding_bottom_130 columns_padding_25">
        <div className="container">
          <div className="row">
            <div className="col-sm-10 col-sm-push-1">
              <DynamicAnchor id="start-content" />
              <div className="vertical-item content-padding with_shadow">
                <div className="entry-thumbnail item-media">
                  {article.frontmatter.bodyimage &&
                    article.frontmatter.bodyimage.image && (
                      <Img
                        fluid={
                          article.frontmatter.bodyimage.image.childImageSharp
                            .fluid
                        }
                        alt={article.frontmatter.bodyimage.alt}
                      />
                    )}
                </div>

                <div className="item-content">
                  <header className="entry-header">
                    <div className="entry-date small-text highlight">
                      <a href="blog-right.html" rel="bookmark">
                        <time
                          className="entry-date"
                          // datetime="2017-03-13T08:50:40+00:00"
                        >
                          {article.frontmatter.date}
                        </time>
                      </a>
                    </div>

                    <h1 className="entry-title">{article.frontmatter.title}</h1>

                    <hr className="divider_30_1" />
                  </header>

                  <div className="entry-content">
                    {renderAst(article.htmlAst)}
                  </div>
                </div>
              </div>

              <div className="row columns_padding_5 page-nav">
                {pageContext.prev && (
                  <PrevNextArticle position="Prev" article={pageContext.prev} />
                )}
                {pageContext.next && (
                  <PrevNextArticle position="Next" article={pageContext.next} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const articlePageQuery = graphql`
  query ArticlePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        intro
        excerpt
        bodyimage {
          image {
            relativePath
            childImageSharp {
              fluid(maxWidth: 1170) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          alt
        }
        bannerimage {
          image {
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          alt
        }
      }
    }
  }
`;
