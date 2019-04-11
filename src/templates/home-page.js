import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import SliderArea from "../components/SliderArea";
import ServicesArea from "../components/ServicesArea";
import AboutArea2 from "../components/AboutArea2";
import TestimonialsArea from "../components/TestimonialsArea";
import CoursesArea from "../components/CoursesArea";
import ArticlesArea from "../components/ArticlesArea";
import AppointmentArea from "../components/AppointmentArea";
import SEO from "../components/SEO/SEO";

export default ({ data, location }) => {
  //   Prepare breadcrumbs
  const pages = [{ title: "Home", href: null }];
  const { fields, frontmatter } = data.homePageQuery;
  const pageMeta = {
    title: `Leadership Development & Employee Wellness Support Services`,
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

      <SliderArea
        slider={frontmatter.slider}
        sliderLinks={frontmatter.sliderLinks}
      />

      <ServicesArea
        id="leadership-development"
        servicesArea={frontmatter.ldArea}
      />
      <ServicesArea
        id="employee-wellness-support"
        servicesArea={frontmatter.ewsArea}
        noPadding
      />
      <AboutArea2 aboutMeArea={frontmatter.aboutMeArea} />
      {/* <AboutArea aboutMeArea={frontmatter.aboutMeArea} /> */}
      {frontmatter.testimonialsArea &&
        frontmatter.testimonialsArea.testimonials.length > 0 && (
          <TestimonialsArea testimonialsArea={frontmatter.testimonialsArea} />
        )}
      <CoursesArea
        coursesArea={frontmatter.coursesArea}
        siteUrl={location.origin}
      />
      <ArticlesArea
        articlesArea={frontmatter.articlesArea}
        siteUrl={location.origin}
      />
      {/* <FaqArea />
    <PricesArea /> */}
      <AppointmentArea noTopPadding />
    </Layout>
  );
};

export const homePageQuery = graphql`
  query HomePage($id: String!) {
    homePageQuery: markdownRemark(id: { eq: $id }) {
      fields {
        slug
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
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
        sliderLinks {
          name
          link
          image {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 500, maxHeight: 250) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
        ldArea {
          heading
          blurb {
            paragraphs {
              paragraph
            }
          }
          services {
            service {
              id
              fields {
                slug
              }
              frontmatter {
                title
                intro
                iconClasses
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
        }
        ewsArea {
          heading
          blurb {
            paragraphs {
              paragraph
            }
          }
          services {
            service {
              id
              fields {
                slug
              }
              frontmatter {
                title
                intro
                iconClasses
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
        }
        aboutMeArea {
          heading
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
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        testimonialsArea {
          testimonials {
            quote
            author
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
      }
    }
  }
`;
