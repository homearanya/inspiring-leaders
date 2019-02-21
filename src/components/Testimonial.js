import React from "react";
import styled from "styled-components";

const TestimonialWrapper = styled.div`
  blockquote {
    font-size: 25px;
    text-transform: none;
  }
`;

export default function Testimonial(props) {
  return (
    <TestimonialWrapper>
      <blockquote>
        {`“${props.quote}”`}
        {props.author && (
          <div className="item-meta">
            <h5>{props.author}</h5>
          </div>
        )}
      </blockquote>
    </TestimonialWrapper>
  );
}
