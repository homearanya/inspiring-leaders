import React from "react";
import Img from "gatsby-image";
import styled from "styled-components";

import Button from "./Button";

const StyledImg = styled(Img)`
  margin-bottom: 50px;
  @media (min-width: 992px) {
    /* margin-top: 100px; */
    margin-bottom: 0;
  }
`;

const StyledSection = styled.section`
  blockquote {
    font-size: 1em;
  }
  h2 {
    font-size: 25px;
  }
  @media (min-width: 420px) {
    h2 {
      font-size: 30px;
    }
  }
`;

export default function AboutArea2(props) {
  return (
    <StyledSection className="ls columns_padding_25">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-push-6">
            <StyledImg
              fluid={
                props.aboutMeArea.personPicture.image.childImageSharp.fluid
              }
              alt={props.aboutMeArea.personPicture.alt}
            />
            {/* <YouTubeWrapper>
                <YouTubeContainer>
                  <YouTube videoId="hQ0NfHQ3moY" />
                </YouTubeContainer>
              </YouTubeWrapper> */}
          </div>
          <div className="col-md-6 col-md-pull-6">
            <h2 className="section_header">{props.aboutMeArea.heading}</h2>
            <br />
            {props.aboutMeArea.blurb.paragraphs.map((paragraph, index) => (
              <p className="fontsize_18" key={index}>
                <strong>
                  <em>{paragraph.paragraph}</em>
                </strong>
              </p>
            ))}
            <br />
            <Button whereto="/about/#start-about" text="More About Me" />
          </div>
        </div>
      </div>
    </StyledSection>
  );
}
