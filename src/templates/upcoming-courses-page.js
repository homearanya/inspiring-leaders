import React from "react";
import { graphql } from "gatsby";
import rehypeReact from "rehype-react";

import Layout from "../components/Layout";
import Breadcrumbs from "../components/Breadcrumbs";
import TestimonialsArea from "../components/TestimonialsArea";
import AppointmentArea from "../components/AppointmentArea";
import DynamicAnchor from "../components/DynamicAnchor";
import UpcomingCourses from "../components/UpcomingCourses";
import SEO from "../components/SEO/SEO";

//  Create a render function with references to your custom components in markdown
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    "upcoming-courses": UpcomingCourses
  }
}).Compiler;

export default function({ data }) {
  // const ServiceContent = HTMLContent || Content;
  const { fields, frontmatter } = data.markdownRemark;
  //   Prepare breadcrumbs
  let breadcrumbTitle = "Leadership Development";
  let breadcrumbLink = "/#leadership-development";

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
    title: `Upcoming Courses · Leadership Development Training Programmes`,
    name: `Upcoming Courses`,
    description:
      frontmatter.excerpt ||
      frontmatter.intro ||
      "Leadership Development Training Courses. For organizations and individuals that are looking for deep engagement and long-term impact.",
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
      <section className="ls section_padding_top_100 section_padding_bottom_75">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
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

export const upcomingCoursesPageQuery = graphql`
  query UpcomingCoursesPage($id: String!) {
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
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          alt
        }
        bodyimage {
          image {
            childImageSharp {
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid_withWebp
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
