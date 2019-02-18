import React from "react";
import { StaticQuery, graphql } from "gatsby";

import ContactDetails2Item from "./ContactDetails2Item";

export default function ContactDetails2() {
  return (
    <StaticQuery
      query={graphql`
        query {
          file(relativePath: { eq: "contact-details.md" }) {
            ...ContactDetailsFragment
          }
        }
      `}
      render={data => {
        const { contact_details } = data.file.childMarkdownRemark.frontmatter;

        return (
          <div className="with_border with_padding_small">
            <ul className="list1 no-bullets no-top-border no-bottom-border">
              <ContactDetails2Item
                iconClass="fas fa-map-marker-alt"
                heading="Physical Address:"
                content={contact_details.address}
                href={`https://maps.google.com/?q=${contact_details.address}`}
              />
              <ContactDetails2Item
                iconClass="fas fa-phone"
                heading="Landline:"
                content={contact_details.landline.phonedisplay}
                href={`tel:${contact_details.landline.phonenumber}`}
              />
              <ContactDetails2Item
                iconClass="fas fa-mobile-alt"
                heading="Cellphone:"
                content={contact_details.phone.phonedisplay}
                href={`tel:${contact_details.phone.phonenumber}`}
              />
              <ContactDetails2Item
                iconClass="fas fa-envelope"
                heading="Email:"
                content={contact_details.email}
                href={`mailto:${contact_details.email}`}
              />
            </ul>
          </div>
        );
      }}
    />
  );
}
