import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

import MenuItems from "./MenuItems";

// import { transformSubMenu } from "../../assets/utils/helpers";

const StyledSubMenu = styled.ul`
  &&& {
    text-align: center;
    list-style: none;
    margin: -5px 0 0 0;
    padding: 0 0 0 10px;
    min-width: 220px;
    opacity: 1;
    display: block;
    top: 100%;
  }

  @media (min-width: 992px) {
    &&& {
      background-color: #ffffff;
      box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
      padding: 10px 0 10px;
      margin-top: ${props => (props.$isSticky ? undefined : undefined)};
      position: absolute;
      top: ${props => (props.depthLevel > 0 ? "0" : undefined)};
      left: ${props => (props.moveLeft ? "auto" : undefined)};
      right: ${props => (props.moveLeft ? "100%" : undefined)};
    }
  }
`;

export class SubMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { moveLeft: false, subMenuWidth: 0 };
    this.subMenuRef = React.createRef();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.viewPortWidth < 992) return;
    if (this.subMenuRef && this.subMenuRef.current) {
      const subMenu = this.subMenuRef.current;
      const subMenuDimensions = subMenu.getBoundingClientRect();
      if (
        Math.round(subMenuDimensions.width * 100) / 100 ===
        Math.round(this.state.subMenuWidth * 100) / 100
      )
        return;
      if (this.state.moveLeft) {
        this.setState({
          moveLeft: false
        });
        return;
      }
      if (subMenuDimensions.right > this.props.viewPortWidth) {
        this.setState({
          moveLeft: true,
          subMenuWidth: subMenuDimensions.width
        });
      } else {
        this.setState({
          moveLeft: false,
          subMenuWidth: subMenuDimensions.width
        });
      }
    }
  }
  render() {
    const subMenuItems = this.props.subMenu
      ? this.props.subMenu.subMenuItems
      : null;

    return (
      <React.Fragment>
        <CSSTransition
          in={true}
          classNames="fade-dropdown-menu"
          timeout={300}
          unmountOnExit
        >
          <StyledSubMenu
            $isSticky={this.props.isSticky}
            depthLevel={this.props.depthLevel}
            moveLeft={this.props.moveLeft}
            ref={this.props.passedRef}
          >
            <MenuItems
              menuItems={subMenuItems}
              showSubMenu={this.props.showSubMenu}
              viewPortWidth={this.props.viewPortWidth}
              handleLeave={this.props.handleLeave}
              handleHover={this.props.handleHover}
              handleClick={this.props.handleClick}
              hideSubMenu={this.props.hideSubMenu}
              isSticky={this.props.isSticky}
              depthLevel={this.props.depthLevel}
              moveLeft={this.state.moveLeft}
              subMenuRef={this.subMenuRef}
            />
          </StyledSubMenu>
        </CSSTransition>
      </React.Fragment>
    );
  }
}

export default SubMenu;
