import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Location } from "@reach/router";

export default function FilteredCourses({ upcomingCourse, columns }) {
  return (
    <StaticQuery
      query={graphql`
        query FilteredCoursesQuery {
          allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___dateStart] }
            filter: { frontmatter: { templateKey: { eq: "upcoming-courses" } } }
          ) {
            edges {
              node {
                fields {
                  uCourseMTCourses {
                    fields {
                      slug
                    }
                  }
                }
                html
                id
                frontmatter {
                  courseName
                  dateStart
                  dateEnd
                  venue
                  thumbnailimage {
                    image {
                      childImageSharp {
                        fluid(maxWidth: 750) {
                          ...GatsbyImageSharpFluid
                        }
                      }
                    }
                    alt
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const today = new Date();
        const { edges: upcomingCourses } = data.allMarkdownRemark;
        const UpcomingCourse = upcomingCourse;
        return (
          // <section className="ls section_padding_top_100 section_padding_bottom_100 columns_padding_25">
          <Location>
            {({ location }) => (
              <React.Fragment>
                {upcomingCourses.reduce((upcomingCourses, upcomingCourse) => {
                  const { fields, html, frontmatter, id } = upcomingCourse.node;
                  const courseDate = new Date(
                    upcomingCourse.node.frontmatter.dateStart
                  );
                  // filter out expired courses
                  if (courseDate > today) {
                    upcomingCourses.push(
                      <UpcomingCourse
                        key={id}
                        frontmatter={frontmatter}
                        html={html}
                        courseSlug={`${
                          fields.uCourseMTCourses.fields.slug
                        }#start-content`}
                        siteUrl={location.origin}
                        columns={columns}
                      />
                    );
                  }
                  return upcomingCourses;
                }, [])}
              </React.Fragment>
            )}
          </Location>
        );
      }}
    />
  );
}
