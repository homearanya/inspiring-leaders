import React, { Component } from "react";
import { scroller } from "react-scroll";

export default class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: -1 };
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(index, idSelector) {
    if (index !== this.state.activeIndex) {
      this.setState({ activeIndex: index }, () =>
        scroller.scrollTo(idSelector, {
          smooth: true,
          duration: 300
        })
      );
    } else {
      this.setState({ activeIndex: -1 });
    }
  }

  render() {
    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        index: index,
        activeIndex: this.state.activeIndex,
        toggleTab: this.toggleTab
      });
    });
    return (
      <div className="panel-group" id="accordion1">
        {children}
      </div>
    );
  }
}
