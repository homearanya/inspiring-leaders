import React from "react";
import Img from "gatsby-image";
import styled from "styled-components";

import SlideLinks from "./SlideLinks";

const StyledSlide = styled.div`
  ::before {
    background: rgb(0, 0, 0, 0.3);
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
`;

const StyledDescription = styled.div`
  @media (min-width: 992px) {
    margin-top: ${props => (props.hasLinks ? "-220px" : undefined)};
  }
`;

const StyledHeading2 = styled.h4`
  margin: 45px 0;
`;

export default function Slide(props) {
  return (
    <React.Fragment>
      <Img
        fluid={props.imageFluid}
        alt={props.imageAlt}
        title={props.imageTitle}
      />
      <StyledSlide className="container">
        <div className="row">
          <div className="col-sm-12 text-center">
            <div className="slide_description_wrapper">
              <StyledDescription
                className="slide_description"
                hasLinks={props.sliderLinks && props.sliderLinks.length > 0}
              >
                <div className="intro-layer" data-animation="fadeInRight">
                  <h3>{props.heading1}</h3>
                  {props.heading2 && props.heading2.length > 0 && (
                    <StyledHeading2>{props.heading2}</StyledHeading2>
                  )}
                </div>
                <div className="intro-layer" data-animation="fadeInLeft">
                  <p className="small-text grey">{props.subheading}</p>
                </div>
              </StyledDescription>
            </div>
            <SlideLinks sliderLinks={props.sliderLinks} />
          </div>
        </div>
      </StyledSlide>
    </React.Fragment>
  );
}
