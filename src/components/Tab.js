import React from "react";

export default function Tab(props) {
  const children = React.Children.map(props.children, child => {
    return React.cloneElement(child, {
      index: props.index,
      activeIndex: props.activeIndex,
      toggleTab: props.toggleTab
    });
  });
  let className = "panel panel-default";
  if (props.index !== props.activeIndex) {
    className += " collapsed";
  }
  return <div className={className}>{children}</div>;
}
