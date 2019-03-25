import React from "react";

import Accordion from "./Accordion";
import Tab from "./Tab";
import TabHeading from "./TabHeading";
import TabContent from "./TabContent";

export default function TabList(props) {
  return (
    <Accordion>
      {props.tabItems.map((topic, index) => {
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
}
