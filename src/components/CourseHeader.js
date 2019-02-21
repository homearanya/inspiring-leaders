import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import dateformat from "dateformat";

const StyledLink = styled(Link)`
  h2:hover {
    color: #91d0cc;
  }
`;
const StyledHeading = styled.h2`
  font-size: 24px;
`;

const StyledSubHeading = styled.div`
  h4 {
    font-size: 16px;
    font-weight: 500;
    text-transform: none;
    margin-bottom: 30px;
  }
`;

const StyledDateVenue = styled.p`
  display: ${props => (props.venue ? "flexbox" : "block")};
`;

const StyledDate = styled.span`
  font-size: ${props => (props.courseDateEnd ? "18px" : "20px")};
  font-weight: 600;
  color: #ff7200;
  text-transform: capitalize;
  .changeColor {
    color: #444444;
  }
`;

export default function CourseHeader(props) {
  const courseDateStart = new Date(props.dateStart);
  let courseDateEnd;
  if (props.dateEnd) {
    courseDateEnd = new Date(props.dateEnd);
  }
  return (
    <React.Fragment>
      <StyledLink to={props.url}>
        <StyledHeading> {props.heading}</StyledHeading>
      </StyledLink>
      {props.subheading && (
        <StyledSubHeading
          className="fontsize_18"
          dangerouslySetInnerHTML={{ __html: props.subheading }}
        />
      )}
      <StyledDateVenue
        className="item-meta grey darklinks fontsize_16"
        venue={props.venue}
      >
        <StyledDate courseDateEnd>
          {!courseDateEnd ? (
            <React.Fragment>
              <i className="fas fa-calendar highlight" />{" "}
              {dateformat(courseDateStart, "dd mmmm yyyy")}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {<span className="changeColor">From:&nbsp;</span>}
              {dateformat(courseDateStart, "dd mmmm yyyy")}
              <br />
              {<span className="changeColor">To:&nbsp;</span>}
              {dateformat(courseDateEnd, "dd mmmm yyyy")}
            </React.Fragment>
          )}
        </StyledDate>
        {props.venue && (
          <span>
            <i className="fas fa-map-marker-alt highlight" /> {props.venue}
          </span>
        )}
      </StyledDateVenue>
    </React.Fragment>
  );
}
