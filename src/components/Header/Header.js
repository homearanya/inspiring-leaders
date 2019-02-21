import React, { Component } from "react";
import Sticky from "react-sticky-el";

import Logo from "../Logo";
import { Menu } from "../Menu";
// import Social from "../Social";

import "./header.css";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { toggleMenu: false, sticky: false, toggleTransform: false };
    this.onFixedToggle = this.onFixedToggle.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleTransform = this.toggleTransform.bind(this);
  }

  toggleMenu() {
    this.setState(prevState => {
      return {
        toggleMenu: !prevState.toggleMenu
      };
    });
  }

  toggleTransform() {
    this.setState(prevState => {
      return { toggleTransform: !prevState.toggleTransform };
    });
  }

  onFixedToggle() {
    this.setState(prevState => {
      return { sticky: !prevState.sticky };
    });
  }

  render() {
    let headerClassName =
      "page_header header_white table_section columns_padding_0 toggler-sm-right";
    let menuToggleClassName = "toggle_menu visible-xs visible-sm";
    let stickyStyle = {};

    if (this.state.toggleMenu) {
      headerClassName += " mobile-active";
      menuToggleClassName += " mobile-active";
      stickyStyle.transform = "none";
    }

    if (this.state.toggleTransform) {
      stickyStyle.transform = "none";
    }

    if (this.state.sticky) {
      headerClassName += " sticky-menu";
    }

    return (
      <Sticky onFixedToggle={this.onFixedToggle} style={stickyStyle}>
        <header className={headerClassName}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <Logo
                  isSticky={this.state.sticky}
                  toggleMenu={this.state.toggleMenu}
                />
                <span className={menuToggleClassName} onClick={this.toggleMenu}>
                  <span />
                </span>
              </div>
              <Menu
                isSticky={this.state.sticky}
                toggleTransform={this.toggleTransform}
                toggleMenu={this.state.toggleMenu}
                handleToggleMenu={this.toggleMenu}
                currentPageSlug={this.props.currentPageSlug}
              />
              {/* <Social
                classes="text-right hidden-xs hidden-sm"
                inputColor="#91d0cc"
              /> */}
            </div>
          </div>
        </header>
      </Sticky>
    );
  }
}
