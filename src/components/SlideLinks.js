import React from "react";
import { Link } from "react-scroll";
import Img from "gatsby-image";
import styled from "styled-components";

const LinksWrapper = styled.div`
  overflow: auto;
  margin-top: -40px;
  margin-bottom: 40px;
  @media (min-width: 992px) {
    margin-bottom: 0px;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
  }
`;

const ItemContainer = styled.div`
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  border: 10px solid azure;
`;

const TextWrapper = styled.div`
  background: rgb(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100%;
  font-size: 0;
  z-index: 5;

  :before {
    content: "";
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
  }
`;
const TextContainer = styled.div`
  &&& {
    padding: 0 2px;
    display: inline-block;
    vertical-align: middle;

    h3 {
      font-size: 13px;
    }

    @media (min-width: 380px) {
      padding: 0 10px;
      h3 {
        font-size: 16px;
      }
    }
    @media (min-width: 420px) {
      padding: 0 10px;
      h3 {
        font-size: 19px;
      }
    }
    @media (min-width: 992px) {
      padding: 0 20px;
      h3 {
        font-size: 30px;
      }
    }
  }
`;

const LinkWrapper = styled.div`
  z-index: 6;
`;

const StyleLink = styled(Link)`
  cursor: pointer;
`;

export default function SlideLinks(props) {
  return (
    <LinksWrapper>
      {props.sliderLinks && (
        <React.Fragment>
          {props.sliderLinks.map((link, index) => {
            let offset = " col-md-offset-1 col-sm-offset-0 col-xs-offset-0";
            if (index > 0) {
              offset = " col-md-offset-2 col-sm-offset-2 col-xs-offset-0";
            }
            return (
              <div
                key={index}
                className={`col-md-4 col-sm-5 col-xs-6${offset} isotope-item`}
              >
                <ItemContainer className="item-media entry-thumbnail">
                  <Img
                    fluid={link.image.image.childImageSharp.fluid}
                    alt={link.image.alt}
                  />
                  <TextWrapper>
                    <TextContainer>
                      <h3> {link.name} </h3>
                    </TextContainer>
                  </TextWrapper>
                  <LinkWrapper className="media-links">
                    <StyleLink
                      className="abs-link"
                      to={link.link.split("#")[1]}
                      smooth={true}
                      duration={300}
                    />
                  </LinkWrapper>
                </ItemContainer>
              </div>
            );
          })}
        </React.Fragment>
      )}
    </LinksWrapper>
  );
}
