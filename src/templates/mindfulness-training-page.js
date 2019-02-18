import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import rehypeReact from "rehype-react";
import styled from "styled-components";

import Layout from "../components/Layout";
import Breadcrumbs from "../components/Breadcrumbs";
import MTMenu from "../components/MTMenu";
import MTTestimonials from "../components/MTTestimonials";
import AppointmentArea from "../components/AppointmentArea";
import DynamicAnchor from "../components/DynamicAnchor";
import FAQ from "../components/FAQ";
import UpcomingCourses from "../components/UpcomingCourses";
import SEO from "../components/SEO/SEO";

const ImageBlock = styled.div`
  margin-bottom: 50px;
`;

const StyledLink = styled(Link)`
  && {
    :focus {
      color: #91d0cc;
    }

    :hover {
      cursor: pointer;
      color: #d9be93;
    }
  }
`;

const StyledH1 = styled.h1`
  font-size: 30px;
  @media (min-width: 768px) {
    font-size: 35px;
    margin-top: 0px;
  }
`;
//  Create a render function with references to your custom components in markdown
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    "faq-container": FAQ,
    "upcoming-courses": UpcomingCourses,
    "dynamic-anchor": DynamicAnchor,
    "gatsby-link": StyledLink
  }
}).Compiler;

export default function({ data, location }) {
  const { fields, htmlAst, frontmatter } = data.mindfulnessTrainingQuery;
  const {
    frontmatter: frontmatter2,
    fields: fields2
  } = data.mindfulnessTrainingRoot;
  let pages;
  if (fields.slug === "/services/mindfulness-training/") {
    pages = [
      { title: "Home", href: "/" },
      { title: "Services", href: "/#services" },
      { title: frontmatter.title, href: null }
    ];
  } else {
    pages = [
      { title: "Home", href: "/" },
      { title: "Services", href: "/#services" },
      { title: frontmatter2.title, href: fields2.slug },
      { title: frontmatter.title, href: null }
    ];
  }
  // course images
  let courseImages = [];
  if (
    frontmatter.bodyimage &&
    frontmatter.bodyimage.image &&
    frontmatter.bodyimage.image.relativePath
  ) {
    courseImages.push(frontmatter.bodyimage.image.relativePath);
  }
  const pageMeta = {
    title: `${frontmatter.title} · ${frontmatter2.title}`,
    name: `${frontmatter.title}`,
    description:
      frontmatter.excerpt ||
      frontmatter.intro ||
      `Alistair Mork-Chadwick is a Counselling psychologist based in Howick. 
    He offers personal counselling, career guidance, 
    psychological assessments and mindfulness training.`,
    courseImages: courseImages,
    slug: fields.slug,
    datePublished: false
  };
  const type =
    (fields.slug.includes("/minfulness-training/") && "service") ||
    (fields.slug.includes("course") && "course") ||
    null;
  return (
    <Layout currentPageSlug={fields.slug} appointmentButton>
      <SEO
        pageData={pageMeta}
        breadcrumbs={JSON.parse(JSON.stringify(pages))}
        pageType={type}
      />
      <Breadcrumbs
        bannerImage={frontmatter.bannerimage}
        pageTitle={frontmatter.title}
        pages={JSON.parse(JSON.stringify(pages))}
      />
      <section className="ls section_padding_100 columns_padding_25">
        <div className="container">
          <div className="row vertical-tabs">
            <MTMenu />

            <div className="col-sm-8">
              <DynamicAnchor id="start-content" />
              {frontmatter.bodyimage && frontmatter.bodyimage.image && (
                <ImageBlock className="entry-thumbnail item-media">
                  <Img
                    fluid={frontmatter.bodyimage.image.childImageSharp.fluid}
                    alt={frontmatter.bodyimage.alt}
                  />
                </ImageBlock>
              )}
              <div className="tab-content no-border">
                <div className="tab-pane fade in active" id="vertical-tab1">
                  <StyledH1>{frontmatter.title}</StyledH1>
                  {renderAst(htmlAst)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MTTestimonials />
      <AppointmentArea />
    </Layout>
  );
}

export const mtPageQuery = graphql`
  query MindfulnessTrainingPage($id: String!) {
    mindfulnessTrainingQuery: markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      htmlAst
      frontmatter {
        title
        intro
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
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          alt
        }
      }
    }
    mindfulnessTrainingRoot: markdownRemark(
      fields: { slug: { eq: "/services/mindfulness-training/" } }
    ) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
