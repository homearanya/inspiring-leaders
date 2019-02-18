import React from "react";

export default function Testimonial(props) {
  return (
    <div>
      <blockquote>
        {`“${props.quote}”`}
        <div className="item-meta">
          <h5>{props.author}</h5>
        </div>
      </blockquote>
    </div>
  );
}
