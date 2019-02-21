import React from "react";
import Slider from "react-slick";

import Slide from "./Slide";

import "../assets/css/slick-theme.css";
import "../assets/css/slick.css";

const settings = {
  arrows: false,
  dots: true,
  infinite: true,
  fade: true,
  autoplay: false,
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1
};

export default function SliderArea(props) {
  return (
    <section className="intro_section page_mainslider ds">
      <Slider {...settings}>
        {props.slider.map((slide, index) => {
          return (
            <Slide
              key={index}
              imageFluid={slide.image.image.childImageSharp.fluid}
              imageAlt={slide.image.alt}
              imageTitle={slide.heading1 + " " + slide.heading2}
              heading1={slide.heading1}
              heading2={slide.heading2}
              subheading={slide.subheading}
              links={slide.links}
            />
          );
        })}
      </Slider>
    </section>
  );
}
