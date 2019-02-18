import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import styled from "styled-components";

const SVGWrapper = styled.div`
  color: #91d0cc;
  position: absolute;
  font-size: 18px;
  line-height: 60px;
  text-align: center;
  right: 0;
  top: 0;
  bottom: 0;
  width: 60px;
  letter-spacing: 0;

  a:hover &,
  a.active & {
    color: #ffffff;
  }
`;

export default function MTMenu() {
  return (
    <StaticQuery
      query={graphql`
        query MindfulnessTrainingMenuQuery {
          markdownRemark(
            fields: { slug: { eq: "/mindfulness-training-menu/" } }
          ) {
            frontmatter {
              menuItems {
                link
                name
              }
            }
          }
        }
      `}
      render={data => {
        const { menuItems } = data.markdownRemark.frontmatter;

        return (
          <div className="col-sm-4">
            <ul className="nav" role="menu">
              {menuItems &&
                menuItems.map((menuItem, index) => (
                  <li key={index}>
                    <Link
                      to={menuItem.link}
                      getProps={({ href, location }) => {
                        return location.pathname === href.split("#")[0]
                          ? { className: "active" }
                          : null;
                      }}
                    >
                      {menuItem.name}
                      <SVGWrapper>
                        <i className="fas fa-angle-right" />
                      </SVGWrapper>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        );
      }}
    />
  );
}
