import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

import Testimonial from "./Testimonial";

const StyledSection = styled.section`
  .slick-slider {
    padding-top: 0px;
  }
`;

export default function TestimonialsArea(props) {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000
  };

  return (
    <StyledSection className="cs main_color2 parallax page_testimonials">
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <Slider {...settings}>
              {props.testimonialsArea.testimonials.map((testimonial, index) => {
                return (
                  <Testimonial
                    key={index}
                    quote={testimonial.quote}
                    author={testimonial.author}
                  />
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </StyledSection>
  );
}
