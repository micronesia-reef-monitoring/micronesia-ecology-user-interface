import React, {Component} from "react";
import classNames from "./styles";

export default class TabbedArea extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeIndex: this.props.activeIndex || 0
    };
  }

  render() {
    let self = this;
    let tabNodes = _.map(this.props.children, function (child, index) {
      let className = (self.state.activeIndex === index? classNames.active :'');
      return (
        <li className={className} onClick={self._handleClick.bind(self, index)} key={Math.random().toString(36).substring(7)}>
          <a>{child.props.display}</a>
        </li>
      );
    });

    let contentNodes = _.map(this.props.children, function (child, index) {
      if(self.state.activeIndex === index) {
        return (
          <div key={Math.random().toString(36).substring(7)}>
            {child.props.children}
          </div>
        );
      }
    });

    return (
       <div>
        <div className={classNames.tabbedArea}>
          <ul>
            {tabNodes}
          </ul>
        </div>

        <div className={classNames.chartArea}>
          <section>
            {contentNodes}
          </section>
        </div>
      </div>
    );
  }

  _handleClick(index) {
    this.setState({
      activeIndex: index
    });
  }
}

export class TabPane extends Component{
  render() {
    const active = this.props.active || false;
    if (active) {
      return this.props.children;
    } else {//null?
      return <div></div>;
    }
  }
}
