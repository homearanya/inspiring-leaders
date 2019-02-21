import React from "react";
import Img from "gatsby-image";
import styled from "styled-components";

import SlideLinks from "./SlideLinks";

const StyledDescription = styled.div`
  @media (min-width: 992px) {
    margin-top: ${props => (props.hasLinks ? "-200px" : undefined)};
  }
`;

export default function Slide(props) {
  return (
    <React.Fragment>
      <Img
        fluid={props.imageFluid}
        alt={props.imageAlt}
        title={props.imageTitle}
      />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center">
            <div className="slide_description_wrapper">
              <StyledDescription
                className="slide_description"
                hasLinks={props.links && props.links.length > 0}
              >
                <div className="intro-layer" data-animation="fadeInRight">
                  <h3>
                    {props.heading1}
                    {props.heading2 && props.heading2.length > 0 ? (
                      <React.Fragment>
                        <br />
                        {props.heading2}
                      </React.Fragment>
                    ) : null}
                  </h3>
                </div>
                <div className="intro-layer" data-animation="fadeInLeft">
                  <p className="small-text grey">{props.subheading}</p>
                </div>
              </StyledDescription>
              <SlideLinks links={props.links} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
