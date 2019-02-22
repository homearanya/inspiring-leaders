import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import rehypeReact from "rehype-react";
import styled from "styled-components";

import Layout from "../components/Layout";
import Breadcrumbs from "../components/Breadcrumbs";
// import Content, { HTMLContent } from "../components/Content";
import TestimonialsArea from "../components/TestimonialsArea";
import AppointmentArea from "../components/AppointmentArea";
import DynamicAnchor from "../components/DynamicAnchor";
import Accordion from "../components/Accordion";
import Tab from "../components/Tab";
import TabHeading from "../components/TabHeading";
import TabContent from "../components/TabContent";
import UpcomingCourses from "../components/UpcomingCourses";
import Topics from "../components/Topics";
import SEO from "../components/SEO/SEO";

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

const StyledImg = styled(Img)`
  margin-bottom: 50px;
  @media (min-width: 992px) {
    margin-bottom: 0;
  }
`;

//  Create a render function with references to your custom components in markdown
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    "dynamic-anchor": DynamicAnchor,
    "gatsby-link": StyledLink,
    "upcoming-courses": UpcomingCourses,
    "topics-container": Topics,
    "accordion-container": Accordion,
    "tab-container": Tab,
    "tab-heading": TabHeading,
    "tab-content": TabContent
  }
}).Compiler;

export default function({ data }) {
  // const ServiceContent = HTMLContent || Content;
  const { fields, frontmatter } = data.markdownRemark;
  //   Prepare breadcrumbs
  let breadcrumbTitle = "Leadership Development";
  let breadcrumbLink = "/#leadership-development";
  if (fields.slug.includes("/employee-wellness-support/")) {
    breadcrumbTitle = "Employee Wellness Support";
    breadcrumbLink = "/#employee-wellness-support";
  }

  const pages = [
    { title: "Home", href: "/" },
    { title: "Services", href: null },
    { title: breadcrumbTitle, href: breadcrumbLink },
    { title: frontmatter.title, href: null }
  ];
  // service images
  let serviceImages = [];
  if (
    frontmatter.bodyimage &&
    frontmatter.bodyimage.image &&
    frontmatter.bodyimage.image.relativePath
  ) {
    serviceImages.push(frontmatter.bodyimage.image.relativePath);
  }
  const pageMeta = {
    title: `${frontmatter.title} · services`,
    name: `${frontmatter.title}`,
    description:
      frontmatter.excerpt ||
      frontmatter.intro ||
      `Alistair Mork-Chadwick is a Counselling psychologist based in Howick. 
    He offers personal counselling, career guidance, 
    psychological assessments and mindfulness training.`,
    serviceImages: serviceImages,
    slug: fields.slug,
    datePublished: false
  };
  return (
    <Layout currentPageSlug={fields.slug} appointmentButton>
      <SEO
        pageData={pageMeta}
        breadcrumbs={JSON.parse(JSON.stringify(pages))}
        pageType="service"
      />

      <Breadcrumbs
        bannerImage={frontmatter.bannerimage}
        pageTitle={frontmatter.title}
        pages={JSON.parse(JSON.stringify(pages))}
      />
      <section className="ls section_padding_top_130 section_padding_bottom_130">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-lg-push-8 col-sm-5 col-sm-push-7">
              {frontmatter.bodyimage && frontmatter.bodyimage.image && (
                <StyledImg
                  fluid={frontmatter.bodyimage.image.childImageSharp.fluid}
                  alt={frontmatter.bodyimage.alt}
                />
              )}
            </div>
            <div className="col-lg-8 col-lg-pull-4 col-sm-7 col-sm-pull-5">
              <DynamicAnchor id="start-content" />
              <h2 className="section_header small">{frontmatter.title}</h2>
              <hr className="divider_30_1" />
              {renderAst(data.markdownRemark.htmlAst)}
            </div>
          </div>
        </div>
      </section>
      {frontmatter.testimonialsArea &&
      frontmatter.testimonialsArea.testimonials.length > 0 ? (
        <React.Fragment>
          <TestimonialsArea testimonialsArea={frontmatter.testimonialsArea} />
          <AppointmentArea />
        </React.Fragment>
      ) : (
        <AppointmentArea noTopPadding />
      )}
    </Layout>
  );
}

export const servicePageQuery = graphql`
  query ServicePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
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
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          alt
        }
        testimonialsArea {
          testimonials {
            quote
            author
          }
        }
      }
    }
  }
`;
