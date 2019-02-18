import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

export default function PrevNextArticle(props) {
  return (
    <div className="col-md-6">
      <div className="with_padding_small text-center cs bg_teaser after_cover color_bg_1">
        {props.article.frontmatter.thumbnailimage &&
          props.article.frontmatter.thumbnailimage.image && (
            <Img
              fluid={
                props.article.frontmatter.thumbnailimage.image.childImageSharp
                  .fluid
              }
              alt={props.article.frontmatter.thumbnailimage.alt}
            />
          )}
        <div className="item-content">
          <div className="small-text">
            <Link to={props.article.fields.slug}>{props.position}</Link>
          </div>
          <h4>
            <Link to={props.article.fields.slug} rel="bookmark">
              {props.article.frontmatter.title}
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
}
