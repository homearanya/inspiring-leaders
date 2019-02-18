import React from "react";
import { graphql, StaticQuery } from "gatsby";

export default function FooterBottom() {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  return (
    <StaticQuery
      query={graphql`
        query FooterQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => {
        return (
          <section className="cs main_color2 page_copyright section_padding_15">
            <div className="container with_top_border">
              <div className="row">
                <div className="col-sm-12 text-center">
                  <p className="small-text">
                    &copy;{" "}
                    {`${currentYear} ${
                      data.site.siteMetadata.title
                    }. All Rights Reserved`}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      }}
    />
  );
}
