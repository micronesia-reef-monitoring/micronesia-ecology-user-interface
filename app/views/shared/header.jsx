import React, {Component}    from "react";  
import classNames from "./header_style";

export default class Header extends Component {
  render () {  
    return (
      <div className={classNames.header}>
        <div className={classNames.headerLogo}>
          <div className={classNames.headerLogoImg}></div>
        </div>
        <div className={classNames.headerLogin}>
          <div className={classNames.headerSubmit}>
            <a href="/#/logout">Logout</a>
          </div>
        </div>
      </div>
    )
  }
}