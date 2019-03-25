import React from "react";
import Img from "gatsby-image";
import styled from "styled-components";

import SocialFooter from "./SocialFooter";
import Button from "./Button";
import CourseHeader from "./CourseHeader";

const StyledArticle = styled.article`
  &&& {
    margin: 0;
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.3);
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
  courseSlug,
  frontmatter: courseInfo,
  html,
  siteUrl,
  columns
}) {
  const courseUrl = `${siteUrl}/services/mindfulness-training/upcoming-courses/`;

  return (
    <div className={`${columns} text-center`}>
      <StyledArticle className="vertical-item content-padding post format-standard">
        {courseInfo.thumbnailimage && courseInfo.thumbnailimage.image && (
          <div className="item-media entry-thumbnail">
            <Img
              fluid={courseInfo.thumbnailimage.image.childImageSharp.fluid}
              alt={courseInfo.thumbnailimage.alt}
            />
          </div>
        )}
        <div className="item-content entry-content">
          <header className="entry-header">
            <div className="entry-date small-text highlight">
              <CourseHeader
                url={courseSlug}
                heading={courseInfo.courseName}
                subheading={courseInfo.subheading}
                venue={courseInfo.venue}
                dateStart={courseInfo.dateStart}
                dateEnd={courseInfo.dateEnd}
              />
            </div>
          </header>

          <StyledBody dangerouslySetInnerHTML={{ __html: html }} />
          <br />
          <Button whereto={courseSlug} text="Course Info" />
        </div>
        <SocialFooter url={courseUrl} title={courseInfo.courseName} />
      </StyledArticle>
    </div>
  );
}
