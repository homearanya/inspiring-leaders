import React from "react";
import styled from "styled-components";

const StyledA = styled.a`
  &&& {
    padding: 0 10px;
    color: ${props => props.inputColor};
    :hover {
      color: #444;
    }
  }
`;

export default function SocialFooter(props) {
  return (
    <div className="post-social-links text-center with_border">
      <StyledA
        href={`https://twitter.com/intent/tweet?url=${encodeURI(
          props.url
        )}&text=${encodeURI(props.title)}`}
        // className="social-icon color-icon soc-twitter"
        target="_blank"
        inputColor="#00abef"
      >
        <i className="fab fa-twitter" />
      </StyledA>
      <StyledA
        href={`https://www.facebook.com/sharer.php?u=${encodeURI(props.url)}`}
        // className="social-icon color-icon soc-facebook"
        target="_blank"
        inputColor="#507cbe"
      >
        <i className="fab fa-facebook-f" />
      </StyledA>
      <StyledA
        href={`https://getpocket.com/edit?url=${encodeURI(props.url)}`}
        // className="social-icon color-icon soc-pocket"
        target="_blank"
        inputColor="#ed4055"
      >
        <i className="fab fa-get-pocket" />
      </StyledA>
      <StyledA
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURI(
          props.url
        )}&title=${encodeURI(props.title)}`}
        // className="social-icon color-icon soc-linkedin"
        target="_blank"
        inputColor="#3371b7"
      >
        <i className="fab fa-linkedin-in" />
      </StyledA>
    </div>
  );
}
