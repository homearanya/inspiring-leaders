import React from "react";
// import { CSSTransition } from "react-transition-group";

export default function TabContent(props) {
  let className = "panel-collapse collapse";
  if (props.index === props.activeIndex) {
    className += " in";
  }
  return (
    <div className={className}>
      <div
        className="panel-body"
        dangerouslySetInnerHTML={{ __html: props.children }}
      />
    </div>
  );
}
