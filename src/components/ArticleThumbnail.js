import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

import Button from "./Button";
import SocialFooter from "./SocialFooter";

const StyledArticle = styled.article`
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.2);
`;

export default function ArticleThumbnail(props) {
  const articleUrl = `${props.siteUrl}${props.article.fields.slug}`;
  return (
    <div className="isotope-item col-lg-4 col-md-6 col-sm-12">
      <StyledArticle className="vertical-item content-padding mosaic-post post format-standard text-center">
        {props.article.frontmatter.thumbnailimage &&
          props.article.frontmatter.thumbnailimage.image && (
            <div className="item-media entry-thumbnail">
              <Img
                fluid={
                  props.article.frontmatter.thumbnailimage.image.childImageSharp
                    .fluid
                }
                alt={props.article.frontmatter.thumbnailimage.alt}
              />
              <div className="media-links">
                <Link
                  className="abs-link"
                  to={`${props.article.fields.slug}#start-content`}
                />
              </div>
            </div>
          )}

        <div className="item-content entry-content">
          <header className="entry-header">
            <h3 className="entry-title">
              <Link
                to={`${props.article.fields.slug}#start-content`}
                rel="bookmark"
              >
                {props.article.frontmatter.title}
              </Link>
            </h3>

            <span className="date small-text highlight">
              <time dateTime="2017-01-10T15:05:23+00:00" className="entry-date">
                {props.article.frontmatter.date}
              </time>
            </span>
          </header>

          <p className="bottommargin_40 fontsize_18">{props.article.excerpt}</p>

          <Button
            whereTo={`${props.article.fields.slug}#start-content`}
            text="Read article"
          />
        </div>
        <SocialFooter
          url={articleUrl}
          title={props.article.frontmatter.title}
        />
      </StyledArticle>
    </div>
  );
}
