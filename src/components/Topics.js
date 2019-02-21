import React from "react";
import { StaticQuery, graphql } from "gatsby";

import Accordion from "./Accordion";
import Tab from "./Tab";
import TabHeading from "./TabHeading";
import TabContent from "./TabContent";

export default function FAQ() {
  return (
    <StaticQuery
      query={graphql`
        query TopicsQuery {
          markdownRemark(
            fields: {
              slug: { eq: "/employee-wellness-support/talks-workshops/" }
            }
          ) {
            frontmatter {
              topics {
                topic
                content {
                  paragraphs {
                    paragraph
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const { topics } = data.markdownRemark.frontmatter;
        return (
          <Accordion>
            {topics.map((topic, index) => {
              const contentbHTML = topic.content.paragraphs.reduce(
                (content, paragraph) => {
                  content += paragraph.paragraph;
                  return content;
                },
                ""
              );
              return (
                <Tab key={index}>
                  <TabHeading heading={topic.topic} />
                  <TabContent>{contentbHTML}</TabContent>
                </Tab>
              );
            })}
          </Accordion>
        );
      }}
    />
  );
}
