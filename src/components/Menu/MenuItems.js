import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import SubMenu from "./SubMenu";

const StyledLink = styled(Link)`
  margin: ${props => (props.depthLevel >= 0 ? undefined : 0)};

  &&& {
    color: ${props => (props.isActive ? "#91d0cc" : "white")};
    :hover {
      color: #91d0cc;
    }
  }
  a + li a {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 992px) {
    &&& {
      color: ${props => (props.isActive ? "#91d0cc" : "#444444")};
      padding: ${props =>
        props.depthLevel >= 0
          ? undefined
          : props.$isSticky
          ? "25px 0"
          : "25px 0"};
      margin: ${props => (props.depthLevel >= 0 ? undefined : "0 15px")};
    }
  }
`;

const NonClickableMenuItem = styled.button.attrs(() => ({ type: "button" }))`
  background: none;
  border: ${props => (props.depthLevel < 0 ? "none" : undefined)};
  /* border-top: ${props =>
    props.depthLevel >= 0 ? "1px solid rgba(0, 0, 0, 0.1)" : undefined}; */
  cursor: ${props => (props.depthLevel >= 0 ? "pointer" : "auto")};

  color: ${props => (props.isActive ? "#91d0cc" : "white")};
  display: block;
  font-family: "Open Sans", sans-serif;
  font-size: ${props => (props.depthLevel >= 0 ? "16px" : "18px")};
  font-weight: ${props => (props.depthLevel >= 0 ? "300" : "700")};
  line-height: 28px;
  margin: 0;
  padding: ${props =>
    props.depthLevel >= 0 ? "10px" : "10px 3.5em 10px 15px"};
  text-decoration: none;
  text-align: left;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;

  /* ::before {
    content: ${props => (props.depthLevel >= 0 ? `"-"` : undefined)};
    padding-right: ${props => (props.depthLevel >= 0 ? "5px" : undefined)};
  } */

  :hover,
  :focus {
    background: none;
    color: #91d0cc;
  }

  @media (min-width: 992px) {
    &&& {
      color: ${props => (props.isActive ? "#91d0cc" : "#444444")};
      margin: 0 15px;
      padding-top: ${props => (props.$isSticky ? "25px" : "25px")};
      padding-bottom: ${props => (props.$isSticky ? "25px" : "25px")};
    }
  }
`;

const SVGWrapper = styled.div`
  bottom: 0;
  line-height: 48px;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 3.5em;

  @media (min-width: 992px) {
    display: none;
  }
`;

export default function MenuItems(props) {
  return (
    <React.Fragment>
      {props.menuItems.map((menuItem, index) => (
        <li
          key={index}
          onMouseLeave={
            props.viewPortWidth > 991 &&
            menuItem.subMenu &&
            menuItem.subMenu.subMenuItems.length > 0
              ? () => props.handleLeave(props.depthLevel + 1)
              : undefined
          }
          onMouseEnter={
            props.viewPortWidth > 991 &&
            menuItem.subMenu &&
            menuItem.subMenu.subMenuItems.length > 0
              ? () => props.handleHover(props.depthLevel + 1, index)
              : undefined
          }
          onClick={
            props.viewPortWidth < 992 &&
            menuItem.subMenu &&
            menuItem.subMenu.subMenuItems.length > 0
              ? e => props.handleClick(e, props.depthLevel + 1, index)
              : undefined
          }
        >
          {menuItem.link ? (
            <StyledLink
              to={menuItem.link}
              // activeClassName="active"
              isSticky={props.isSticky}
              depthLevel={props.depthLevel}
              onClick={props.hideSubMenu}
              isActive={menuItem.active}
            >
              {menuItem.name}
              {menuItem.subMenu && menuItem.subMenu.subMenuItems.length > 0 ? (
                <SVGWrapper>
                  <i className="fas fa-angle-down" />
                </SVGWrapper>
              ) : null}
            </StyledLink>
          ) : (
            <NonClickableMenuItem
              isSticky={props.isSticky}
              depthLevel={props.depthLevel}
              isActive={menuItem.active}
            >
              {menuItem.name}
              {menuItem.subMenu && menuItem.subMenu.subMenuItems.length > 0 ? (
                <SVGWrapper>
                  <i className="fas fa-angle-down" />
                </SVGWrapper>
              ) : null}
            </NonClickableMenuItem>
          )}
          {/* Sub Menu */}

          {props.showSubMenu[props.depthLevel + 1] &&
            props.showSubMenu[props.depthLevel + 1][index] &&
            menuItem.subMenu &&
            menuItem.subMenu.subMenuItems.length > 0 && (
              <SubMenu
                depthLevel={props.depthLevel + 1}
                subMenu={menuItem.subMenu}
                isSticky={props.isSticky}
                showSubMenu={props.showSubMenu}
                viewPortWidth={props.viewPortWidth}
                handleHover={props.handleHover}
                handleLeave={props.handleLeave}
                handleClick={props.handleClick}
                hideSubMenu={props.hideSubMenu}
                moveLeft={props.moveLeft}
                passedRef={props.subMenuRef}
                index={index}
              />
            )}
        </li>
      ))}
    </React.Fragment>
  );
}
