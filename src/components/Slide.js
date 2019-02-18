import React from "react";
import Img from "gatsby-image";

export default function Slide(props) {
  return (
    <div>
      <Img
        fluid={props.imageFluid}
        alt={props.imageAlt}
        title={props.imageTitle}
      />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center">
            <div className="slide_description_wrapper">
              <div className="slide_description">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
