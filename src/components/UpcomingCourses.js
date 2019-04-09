import React from "react";

import UpcomingCourse from "./UpcomingCourse2";
import FilteredCourses from "./FilteredCourses";

export default function UpcomingCourses() {
  return (
    <section className="columns_margin_bottom_30">
      <div className="container">
        <div className="row mosaic-post">
          {/* <div className="col-sm-10 col-sm-push-1"> */}
          <div>
            <FilteredCourses
              upcomingCourse={UpcomingCourse}
              columns="col-lg-4 col-sm-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
