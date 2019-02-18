import React from "react";
import { graphql } from "gatsby";
// import Zoom from "react-reveal/Zoom";
import Layout from "../components/Layout";
import Breadcrumbs from "../components/Breadcrumbs";
import { ContactForm } from "../components/ContactForm";
import ContactDetails2 from "../components/ContactDetails2";
import DynamicAnchor from "../components/DynamicAnchor";
import SEO from "../components/SEO/SEO";

export default ({ data }) => {
  const { fields, frontmatter } = data.markdownRemark;

  //   Prepare breadcrumbs
  const pages = [
    { title: "Home", href: "/" },
    { title: "Contact", href: null }
  ];
  const pageMeta = {
    title: `Contact · Counselling Psychologist in Howick`,
    description:
      frontmatter.excerpt ||
      `You can contact me by email, phone or through a contact form. 
    I look forward to answering any questions you may have about the services I offer.`,
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
        pageTitle="Contact"
        pages={JSON.parse(JSON.stringify(pages))}
      />

      {/* <Zoom> */}
      <section className="ls columns_padding_25 section_padding_top_100 section_padding_bottom_100">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <DynamicAnchor id="contact-page" />
              <h3 className="module-header">Contact Form</h3>
              <ContactForm className="contact-form row columns_margin_bottom_40" />
            </div>

            <div className="col-md-5">
              <ContactDetails2 />
            </div>
          </div>
        </div>
      </section>
      {/* </Zoom> */}
    </Layout>
  );
};

export const contactPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
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
      }
    }
  }
`;
