import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";

export const contactDetailsFragment = graphql`
  fragment ContactDetailsFragment on File {
    childMarkdownRemark {
      frontmatter {
        contact_details {
          address
          email
          phone {
            phonedisplay
            phonenumber
          }
          landline {
            phonedisplay
            phonenumber
          }
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  @media screen and (min-width: 992px) {
    line-height: ${props => !props.appointmentButton && "52px"};
  }
`;

const AElement = styled.a`
  && {
    :hover {
      color: #4bb0a9;
    }
  }
`;

const IElement = styled.i`
  && {
    ${AElement}:hover & {
      color: #4bb0a9;
      transition: all 0.2s ease-in-out 0s;
    }
  }
`;

export default function ContactDetails(props) {
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
          <Wrapper
            className="col-md-9 text-center divided_content"
            appointmentButton={props.appointmentButton}
          >
            <AElement href={`tel:${contact_details.landline.phonenumber}`}>
              <div className="media small-teaser">
                <div className="media-left">
                  <IElement className="fas fa-phone highlight fontsize_16" />
                </div>
                <div className="media-body">
                  {contact_details.landline.phonedisplay}
                </div>
              </div>
            </AElement>
            <AElement href={`tel:${contact_details.phone.phonenumber}`}>
              <div className="media small-teaser">
                <div className="media-left">
                  <IElement className="fas fa-mobile-alt highlight fontsize_16" />
                </div>
                <div className="media-body">
                  {contact_details.phone.phonedisplay}
                </div>
              </div>
            </AElement>
            <AElement
              href={`https://maps.google.com/?q=${contact_details.address}`}
              target="_blank"
            >
              <div className="media small-teaser">
                <div className="media-left">
                  <IElement className="fas fa-map-marker-alt highlight fontsize_16" />
                </div>
                <div className="media-body">{contact_details.address}</div>
              </div>
            </AElement>
            <AElement href={`mailto:${contact_details.email}`}>
              <div className="media small-teaser">
                <div className="media-left">
                  <IElement className="fas fa-envelope highlight fontsize_16" />
                </div>
                <div className="media-body">{contact_details.email}</div>
              </div>
            </AElement>
          </Wrapper>
        );
      }}
    />
  );
}
