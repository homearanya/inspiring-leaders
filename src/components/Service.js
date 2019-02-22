import React from "react";
import { Link } from "gatsby";
// import Img from "gatsby-image";
import FancyIcon from "../components/FancyIcon";
import styled from "styled-components";

const ServiceIcon = styled.div`
  margin: 0 auto 20px;
  /* height: 90px;
  width: 80px; */
`;
const ServiceHeading = styled.h4`
  && {
    font-size: 14px;
    color: #444444;
  }
`;

const ServiceText = styled.p`
  color: #787878;
`;

export default function Service(props) {
  const serviceSlug = props.service.fields.slug;
  return (
    <div className="col-md-3 col-sm-4">
      <Link to={`${serviceSlug}#start-content`}>
        <div className="with_padding text-center teaser hover_shadow">
          <ServiceIcon>
            {/* <Img
              fixed={
                props.service.frontmatter.thumbnailimage.image.childImageSharp
                  .fixed
              }
              alt={props.service.frontmatter.thumbnailimage.alt}
              title={props.service.frontmatter.thumbnailimage.alt}
            /> */}
            <FancyIcon iconClasses={props.service.frontmatter.iconClasses} />
          </ServiceIcon>
          <ServiceHeading>{props.service.frontmatter.title}</ServiceHeading>
          <ServiceText>{props.service.frontmatter.intro}</ServiceText>
        </div>
      </Link>
    </div>
  );
}
