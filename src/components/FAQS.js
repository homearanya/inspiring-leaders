import React from "react";
import { StaticQuery, graphql } from "gatsby";

import TabList from "./TabList";

export default function Topics(props) {
  return (
    <StaticQuery
      query={graphql`
        query FAQSQuery {
          markdownRemark(
            fields: {
              slug: { eq: "/employee-wellness-support/mindfulness-training/" }
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
        return <TabList tabItems={topics} />;
      }}
    />
  );
}
