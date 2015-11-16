import React, {Component}   from "react";  
import classNames           from "./footer_style";

export default class Footer extends Component {
  render () {
    return (
      <div className={classNames.footer}>
        <div className={classNames.footerTop}>
          <div className={classNames.contentImg}>
          </div>
        </div>
      </div>
    )
  }
}