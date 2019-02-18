import React from "react";
import { StaticQuery, graphql } from "gatsby";

import Accordion from "../components/Accordion";
import Tab from "../components/Tab";
import TabHeading from "../components/TabHeading";
import TabContent from "../components/TabContent";

export default function FAQ() {
  return (
    <StaticQuery
      query={graphql`
        query FAQQuery {
          markdownRemark(
            fields: {
              slug: {
                eq: "/services/mindfulness-training/frequently-asked-questions/"
              }
            }
          ) {
            frontmatter {
              qa {
                question
                answer
              }
            }
          }
        }
      `}
      render={data => {
        const { qa } = data.markdownRemark.frontmatter;
        return (
          <Accordion>
            {qa.map((qa, index) => (
              <Tab key={index}>
                <TabHeading heading={qa.question} />
                <TabContent>{qa.answer}</TabContent>
              </Tab>
            ))}
          </Accordion>
        );
      }}
    />
  );
}
