import React from "react";
import DynamicAnchor from "./DynamicAnchor";
import styled from "styled-components";

const StyledAnchor = styled.a`
  &&& {
    font-size: 20px;
    :focus {
      color: #91d0cc;
    }

    :hover {
      cursor: pointer;
      color: #91d0cc;
    }
  }
`;

export default function TabHeading(props) {
  let idSelector = `collapse${props.index}`;
  let className = "";
  if (props.index !== props.activeIndex) {
    className += "collapsed";
  }
  return (
    <React.Fragment>
      <DynamicAnchor id={idSelector} />
      <div className="panel-heading">
        <h2 className="panel-title">
          <StyledAnchor
            className={className}
            onClick={() => props.toggleTab(props.index, idSelector)}
          >
            {props.heading}
          </StyledAnchor>
        </h2>
      </div>
    </React.Fragment>
  );
}
