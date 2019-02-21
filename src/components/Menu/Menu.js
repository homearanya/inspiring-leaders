import React, { Component } from "react";
import { StaticQuery, graphql } from "gatsby";

import MenuItems from "./MenuItems";

import { processMenu } from "../../assets/utils/helpers";

const windowGlobal = typeof window !== "undefined" && window;
const documentElementGlobal =
  typeof document !== "undefined" &&
  document &&
  typeof document.documentElement !== "undefined" &&
  document.documentElement;

export class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubMenu: [],
      viewPortWidth:
        windowGlobal.innerWidth || documentElementGlobal.clientWidth
    };
    this.handleHover = this.handleHover.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.hideSubMenu = this.hideSubMenu.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  handleHover = (depthLevel, index) => {
    this.setState(prevState => {
      let updatedArray = prevState.showSubMenu.slice(0);
      let subMenuArray = [];
      subMenuArray[index] = true;
      updatedArray.push(subMenuArray);
      return { showSubMenu: updatedArray };
    });
    if (depthLevel === 0) {
      this.props.toggleTransform();
    }
  };

  handleLeave = depthLevel => {
    this.setState(prevState => {
      let updatedArray = prevState.showSubMenu.slice(0);
      updatedArray = updatedArray.slice(0, depthLevel);
      return { showSubMenu: updatedArray };
    });
    if (depthLevel === 0) {
      this.props.toggleTransform();
    }
  };

  handleClick = (e, depthLevel, index) => {
    e.stopPropagation();
    this.setState(prevState => {
      let updatedArray = prevState.showSubMenu.slice(0);
      if (updatedArray[depthLevel]) {
        if (updatedArray[depthLevel][index]) {
          updatedArray = updatedArray.slice(0, depthLevel + 1);
          updatedArray[depthLevel][index] = false;
        } else {
          updatedArray[depthLevel][index] = true;
        }
      } else {
        let subMenuArray = [];
        subMenuArray[index] = true;
        updatedArray.push(subMenuArray);
      }

      //   && updatedArray[depthLevel][index]) {
      //   updatedArray = updatedArray[depthLevel].splice(index, 1);
      // } else {
      //   if (updatedArray[depthLevel]) updatedArray[depthLevel].splice(index, 1);

      return { showSubMenu: updatedArray };
    });
  };

  hideSubMenu = e => {
    e.stopPropagation();
    this.setState({ showSubMenu: [] });
    if (this.props.toggleMenu) {
      this.props.handleToggleMenu();
    }
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      viewPortWidth: window.innerWidth || document.documentElement.clientWidth
    });
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query MenuQuery {
            markdownRemark(fields: { slug: { eq: "/main-menu/" } }) {
              frontmatter {
                menuItems {
                  link
                  name
                  subMenu {
                    subMenuItems {
                      link
                      name
                      subMenu {
                        subMenuItems {
                          link
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `}
        render={data => {
          const { menuItems } = data.markdownRemark.frontmatter;
          processMenu(
            menuItems,
            this.props.currentPageSlug,
            this.state.viewPortWidth
          );
          return (
            <div className="col-md-6 text-center">
              <nav className="mainmenu_wrapper">
                <ul className="mainmenu nav sf-menu sf-arrows">
                  <MenuItems
                    menuItems={menuItems}
                    showSubMenu={this.state.showSubMenu}
                    viewPortWidth={this.state.viewPortWidth}
                    handleLeave={this.handleLeave}
                    handleHover={this.handleHover}
                    handleClick={this.handleClick}
                    hideSubMenu={this.hideSubMenu}
                    isSticky={this.props.isSticky}
                    depthLevel={-1}
                  />
                </ul>
              </nav>
            </div>
          );
        }}
      />
    );
  }
}
