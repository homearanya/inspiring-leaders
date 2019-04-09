import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
// import YouTube from "react-youtube";
import styled from "styled-components";

import Layout from "../components/Layout";
import Breadcrumbs from "../components/Breadcrumbs";
import Content, { HTMLContent } from "../components/Content";
import SEO from "../components/SEO/SEO";
import DynammicAnchor from "../components/DynamicAnchor";

const StyledImg = styled(Img)`
  margin-bottom: 50px;
  @media (min-width: 992px) {
    /* margin-top: 100px; */
    margin-bottom: 0;
  }
`;

// const YouTubeWrapper = styled.div`
//   text-align: center;
// `;

// const YouTubeContainer = styled.div`
//   display: inline-block;
//   margin-bottom: 50px;
//   @media (min-width: 992px) {
//     margin-top: 100px;
//     margin-bottom: 0;
//   }
// `;

const StyledSection = styled.section`
  blockquote {
    font-size: 1em;
  }
`;

export default function({ data }) {
  const { fields, frontmatter } = data.markdownRemark;
  const AboutContent = HTMLContent || Content;
  //   Prepare breadcrumbs
  const pages = [
    { title: "Home", href: "/" },
    { title: "About Me", href: null }
  ];
  const pageMeta = {
    title: `About Me · Alistair Mork-Chadwick`,
    description:
      frontmatter.excerpt ||
      "Alistair Mork-Chadwick is a Counselling psychologist. He draws on the latest research findings on optimal levels of work engagement, cultivating a mindful approach to work, and building emotional intelligence.",
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
        pageTitle="About Me"
        pages={JSON.parse(JSON.stringify(pages))}
      />
      <StyledSection className="ls section_padding_100 columns_padding_25">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-push-6">
              <StyledImg
                fluid={frontmatter.bodyimage.image.childImageSharp.fluid}
                alt={frontmatter.bodyimage.alt}
              />
              {/* <YouTubeWrapper>
                <YouTubeContainer>
                  <YouTube videoId="hQ0NfHQ3moY" />
                </YouTubeContainer>
              </YouTubeWrapper> */}
            </div>
            <div className="col-md-6 col-md-pull-6">
              <DynammicAnchor id="start-about" />
              <h2 className="section_header">Who Am I?</h2>
              <hr className="divider_30_1" />
              <AboutContent content={data.markdownRemark.html} />
            </div>
          </div>
        </div>
      </StyledSection>
    </Layout>
  );
}

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      html
      frontmatter {
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
        bodyimage {
          image {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          alt
        }
      }
    }
  }
`;
