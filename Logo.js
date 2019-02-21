import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";

import styled from "styled-components";

const LogoWrapper = styled.div`
  ${({ togleMenu }) =>
    !togleMenu
      ? `
  padding: 5px 0;
  display: inline-block;
  width: 150px;
  `
      : `
  display: block;
  `}

  @media screen and (min-width: 992px) {
    width: 200px;
    & {
      padding: 10px 0;
      height: ${props => (props.isSticky ? "80px" : "80px")};
      -webkit-transition: height 0.2s linear 0s;
      transition: height 0.2s linear 0s;
    }
  }
`;

const StyledImg = styled(Img)`
  ${({ togleMenu }) =>
    !togleMenu
      ? `
    height: 50px;
  `
      : `
  display: none;
  `}

  @media screen and (min-width: 992px) {
    height: ${props => (props.isSticky ? "60px" : "60px")};
    -webkit-transition: height 0.2s linear 0s;
    transition: height 0.2s linear 0s;
  }
`;

export default function Logo(props) {
  return (
    <StaticQuery
      query={graphql`
        query LogoQuery {
          file(relativePath: { eq: "logo.md" }) {
            childMarkdownRemark {
              frontmatter {
                alt
                image {
                  childImageSharp {
                    fluid(maxWidth: 200) {
                      ...GatsbyImageSharpFluid_noBase64
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const { frontmatter } = data.file.childMarkdownRemark;
        return (
          <LogoWrapper
            className="logo"
            isSticky={props.isSticky}
            togleMenu={props.togleMenu}
          >
            <Link to="/">
              <StyledImg
                fluid={frontmatter.image.childImageSharp.fluid}
                alt={frontmatter.alt}
                imgStyle={{ objectFit: "contain" }}
                isSticky={props.isSticky}
                togleMenu={props.togleMenu}
              />
            </Link>
          </LogoWrapper>
        );
      }}
    />
  );
}
