import React from "react";
import styled from "styled-components";

import Service from "./Service";
import DynamicAnchor from "./DynamicAnchor";

const ServicesWrapper = styled.div`
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-evenly;
  }
`;

const StyledBlurb = styled.div`
  margin-bottom: 45px;
  line-height: 1.5em;
  @media (min-width: 992px) {
    margin-left: auto;
    margin-right: auto;
    max-width: 67%;
    text-align: center;
  }
`;

export default function ServicesArea(props) {
  let sectionPadding = " section_padding_bottom_100";
  if (!props.noPadding) {
    sectionPadding = " section_padding_top_100 section_padding_bottom_100";
  }
  const blurbHTML = props.servicesArea.blurb.paragraphs.reduce(
    (blurb, paragraph) => {
      blurb += paragraph.paragraph;
      return blurb;
    },
    ""
  );
  return (
    <section className={`ls${sectionPadding}`}>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center">
            <DynamicAnchor id={props.id} />
            <h2 className="section_header ">{props.servicesArea.heading}</h2>
            {/* <p>{props.servicesArea.blurb}</p> */}
            <StyledBlurb
              className="fontsize_18"
              dangerouslySetInnerHTML={{ __html: blurbHTML }}
            />
          </div>
        </div>
        <ServicesWrapper className="row columns_padding_0 columns_margin_0 fontsize_16">
          {props.servicesArea.services.map((service, index) => {
            return (
              <Service
                key={index}
                service={
                  props.servicesObject[service.service.trim().toLowerCase()]
                }
              />
            );
          })}
        </ServicesWrapper>
      </div>
    </section>
  );
}
