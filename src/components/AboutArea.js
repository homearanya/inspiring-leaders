import React from "react";
import Img from "gatsby-image";
import styled from "styled-components";

import Button from "./Button";

const StyledSection = styled.section`
  background-image: ${props =>
    props.backgroundImage
      ? `url("${props.backgroundImage}")`
      : `url("/img/parallax/texture.jpg")`};
`;
export default function AboutArea(props) {
  return (
    <StyledSection
      id="about"
      className="cs parallax darken_gradient page_about section_padding_top_75 columns_margin_bottom_30"
      backgroundImage={
        props.aboutMeArea.backgroundImage &&
        props.aboutMeArea.backgroundImage.image &&
        props.aboutMeArea.backgroundImage.image.childImageSharp.fluid.src
      }
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-push-6 text-center">
            <h2 className="section_header">
              {props.aboutMeArea.heading1}
              {props.aboutMeArea.heading2 &&
              props.aboutMeArea.heading2.length > 0 ? (
                <React.Fragment>
                  <br />
                  {props.aboutMeArea.heading2}
                </React.Fragment>
              ) : null}
            </h2>
            <br />
            {props.aboutMeArea.blurb.paragraphs.map((paragraph, index) => (
              <p className="fontsize_18" key={index}>
                {paragraph.paragraph}
              </p>
            ))}
            <br />
            <Button whereto="/about/" text="More About Me" />
          </div>
          <div className="col-md-6 col-md-pull-6 text-center bottommargin_0">
            <Img
              fluid={
                props.aboutMeArea.personPicture.image.childImageSharp.fluid
              }
              alt={props.aboutMeArea.personPicture.image.alt}
              className="top-overlap"
              imgStyle={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </StyledSection>
  );
}
