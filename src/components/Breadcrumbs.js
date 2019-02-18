import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const StyledSection = styled.section`
  background-image: ${props =>
    props.backgroundImage && props.backgroundImage.image
      ? `url("${props.backgroundImage.image.childImageSharp.fluid.src}")`
      : `url("/img/parallax/breadcrumbs.jpg")`};
  background-position: center;
`;

export default function Breadcrumbs(props) {
  return (
    <StyledSection
      className="page_breadcrumbs ds background_cover section_padding_50"
      backgroundImage={props.bannerImage}
    >
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center">
            <h2>{props.pageTitle}</h2>
            <ol className="breadcrumb divided_content wide_divider">
              {props.pages.map((page, index) =>
                page.href ? (
                  <li key={index}>
                    <Link to={page.href}>{page.title}</Link>
                  </li>
                ) : (
                  <li key={index} className="active">
                    {page.title}
                  </li>
                )
              )}
            </ol>
          </div>
        </div>
      </div>
    </StyledSection>
  );
}
