import React from "react";
import Img from "gatsby-image";
import styled from "styled-components";

import CourseHeader from "./CourseHeader";
import Button from "./Button";
import SocialFooter from "./SocialFooter";

const StyledArticle = styled.article`
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.3);
`;

const StyledContet = styled.div`
  &&& {
    text-align: center;
  }
`;

const StyledBody = styled.div`
  margin-top: 20px;

  h3 {
    font-size: 20px;
  }

  h4 {
    font-size: 18px;
  }
`;

export default function UpcomingCourse({
  frontmatter: courseInfo,
  html,
  siteUrl
}) {
  let contentClassName;
  if (courseInfo.thumbnailimage && courseInfo.thumbnailimage.image) {
    contentClassName = "col-md-7";
  } else {
    // contentClassName = "col-md-10 col-md-push-1";
    contentClassName = "";
  }
  const courseUrl = `${siteUrl}/leadership-development/upcoming-courses/`;
  const courseSlug = `${courseInfo.serviceRelated.fields.slug}#start-content`;

  return (
    <StyledArticle className="post side-item content-padding with_shadow">
      <div className="row">
        {courseInfo.thumbnailimage && courseInfo.thumbnailimage.image && (
          <div className="col-md-5">
            <div className="item-media">
              <Img
                fluid={courseInfo.thumbnailimage.image.childImageSharp.fluid}
                alt={courseInfo.thumbnailimage.alt}
              />
            </div>
          </div>
        )}

        <StyledContet className={contentClassName}>
          <div className="item-content">
            <CourseHeader
              url={courseSlug}
              heading={courseInfo.courseName}
              subheading={courseInfo.subheading}
              venue={courseInfo.venue}
              dateStart={courseInfo.dateStart}
              dateEnd={courseInfo.dateEnd}
            />
            <StyledBody dangerouslySetInnerHTML={{ __html: html }} />
            <br />
            <Button whereto={courseSlug} text="Course Info" />
          </div>
          <SocialFooter url={courseUrl} title={courseInfo.courseName} />
        </StyledContet>
      </div>
    </StyledArticle>
  );
}
