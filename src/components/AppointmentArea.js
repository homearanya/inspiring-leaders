import React from "react";
import { StaticQuery, graphql } from "gatsby";

import { ContactForm } from "./ContactForm";
import DynamicAnchor from ".//DynamicAnchor";

export default function AppointmentArea(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          file(relativePath: { eq: "appointment-area.md" }) {
            childMarkdownRemark {
              frontmatter {
                heading
                blurb
              }
            }
          }
        }
      `}
      render={data => {
        const { frontmatter } = data.file.childMarkdownRemark;
        let sectionClassName;
        props.noTopPadding
          ? (sectionClassName = "ls section_padding_bottom_100")
          : (sectionClassName =
              "ls section_padding_top_130 section_padding_bottom_100");
        return (
          <section className={sectionClassName}>
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 text-center">
                  <DynamicAnchor id="appointment" />
                  <h2 className="section_header  highlight">
                    {frontmatter.heading}
                  </h2>
                  <div className="fontsize_16">{frontmatter.blurb}</div>
                  <ContactForm className="contact-form row columns_margin_bottom_40 topmargin_60" />
                </div>
              </div>
            </div>
          </section>
        );
      }}
    />
  );
}
