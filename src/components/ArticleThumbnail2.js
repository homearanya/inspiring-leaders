import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

import Button from "./Button";
import SocialFooter from "./SocialFooter";

const StyledArticle = styled.article`
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.2);
`;
export default function ArticleThumbnail2(props) {
  const articleUrl = `${props.siteUrl}${props.article.fields.slug}`;
  return (
    <div className="col-md-4 text-center">
      <StyledArticle className="vertical-item content-padding post format-standard with_shadow">
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
            </div>
          )}
        <div className="item-content entry-content">
          <header className="entry-header">
            <div className="entry-date small-text highlight">
              <Link
                to={`${props.article.fields.slug}#start-content`}
                rel="bookmark"
              >
                <time
                  className="entry-date"
                  dateTime="2017-03-13T08:50:40+00:00"
                >
                  {props.article.frontmatter.date}
                </time>
              </Link>
            </div>

            <h4 className="entry-title">
              <Link
                to={`${props.article.fields.slug}#start-content`}
                rel="bookmark"
              >
                {props.article.frontmatter.title}
              </Link>
            </h4>

            <hr className="divider_30_1" />
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
