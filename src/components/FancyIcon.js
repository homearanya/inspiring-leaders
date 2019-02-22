import React from "react";
import styled from "styled-components";

const IconWrapper = styled.div`
  display: inline-block;
  color: #91d0cc;
  position: relative;
  font-size: 75px;
  border: 5px solid #91d0cc;
  border-radius: 50%;
  padding: 2px;
  width: 140px;
  height: 140px;
`;

const IconContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  /* border: 2px solid #fff; */
  border-radius: 50%;
  overflow: hidden;
  padding: 20px 13px;
  ::before {
    position: absolute;
    display: block;
    left: 0;
    bottom: 0;
    width: 200px;
    height: 25px;
    background-color: #faca7d;
    content: "";
  }
`;

export default function FancyIcon(props) {
  return (
    <IconWrapper>
      <IconContainer>
        <i className={props.iconClasses} />
      </IconContainer>
    </IconWrapper>
  );
}
