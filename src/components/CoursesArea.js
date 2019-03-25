import React from "react";
import styled from "styled-components";

import UpcomingCourse from "./UpcomingCourse2";
import FilteredCourses from "./FilteredCourses";

const StyledSection = styled.section`
  &&& {
    margin-bottom: -30px;
  }
`;

export default function CoursessArea(props) {
  return (
    // <section className="ls section_padding_tchangeop_130 section_padding_bottom_100 columns_margin_top_0 columns_margin_bottom_30">
    <StyledSection className="ls section_padding_top_100 columns_margin_top_0 columns_margin_bottom_30">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center">
            <h2 className="section_header ">{props.coursesArea.heading}</h2>
            <p>{props.coursesArea.blurb}</p>
          </div>
        </div>
        <div className="row mosaic-post">
          <FilteredCourses
            upcomingCourse={UpcomingCourse}
            limit={3}
            columns="col-md-4"
          />
        </div>
      </div>
    </StyledSection>
  );
}
