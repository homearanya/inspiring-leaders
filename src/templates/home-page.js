import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import SliderArea from "../components/SliderArea";
import ServicesArea from "../components/ServicesArea";
import AboutArea from "../components/AboutArea";
import CoursesArea from "../components/CoursesArea";
import ArticlesArea from "../components/ArticlesArea";
import TestimonialsArea from "../components/TestimonialsArea";
// import FaqArea from "../components/FaqArea";
// import PricesArea from "../components/PricesArea";
import AppointmentArea from "../components/AppointmentArea";
import SEO from "../components/SEO/SEO";

export default ({ data, location }) => {
  //   Prepare breadcrumbs
  const pages = [{ title: "Home", href: null }];
  const { fields, frontmatter } = data.homePageQuery;
  const { homeservices } = data.homePageQuery.fields;
  const servicesObject = homeservices.reduce((obj, service) => {
    obj[service.frontmatter.title.trim().toLowerCase()] = service;
    return obj;
  }, {});
  const pageMeta = {
    title: `Counselling Psychologist in Howick`,
    description:
      frontmatter.excerpt ||
      "Alistair Mork-Chadwick is a Counselling psychologist based in Howick. He offers personal counselling, career guidance, psychological assessments and mindfulness training.",
    slug: fields.slug
  };
  return (
    <Layout currentPageSlug={fields.slug} appointmentButton>
      <SEO
        pageData={pageMeta}
        breadcrumbs={JSON.parse(JSON.stringify(pages))}
      />

      <SliderArea slider={frontmatter.slider} />
      <ServicesArea
        id="services"
        servicesObject={servicesObject}
        servicesArea={frontmatter.servicesArea}
      />
      <AboutArea aboutMeArea={frontmatter.aboutMeArea} />
      <CoursesArea
        coursesArea={frontmatter.coursesArea}
        siteUrl={location.origin}
      />
      <ArticlesArea
        articlesArea={frontmatter.articlesArea}
        siteUrl={location.origin}
      />
      {frontmatter.testimonialsArea &&
        frontmatter.testimonialsArea.testimonials.length > 0 && (
          <TestimonialsArea testimonialsArea={frontmatter.testimonialsArea} />
        )}
      {/* <FaqArea />
    <PricesArea /> */}
      <AppointmentArea />
    </Layout>
  );
};

export const homePageQuery = graphql`
  query HomePage($id: String!) {
    homePageQuery: markdownRemark(id: { eq: $id }) {
      fields {
        slug
        homeservices {
          fields {
            slug
          }
          frontmatter {
            title
            intro
            thumbnailimage {
              image {
                childImageSharp {
                  fixed(width: 80, height: 90) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
              alt
            }
          }
        }
      }
      frontmatter {
        excerpt
        slider {
          heading1
          heading2
          subheading
          image {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 1920, maxHeight: 850) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
        servicesArea {
          heading
          blurb
          services {
            service
          }
        }
        aboutMeArea {
          heading1
          heading2
          blurb {
            paragraphs {
              paragraph
            }
          }
          personPicture {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          backgroundImage {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        coursesArea {
          heading
          blurb
        }
        articlesArea {
          heading
          blurb
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
