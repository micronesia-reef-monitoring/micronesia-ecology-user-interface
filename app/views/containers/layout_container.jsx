import React, {Component} from "react";
import Header             from "app/views/shared/header";
import Footer             from "app/views/shared/footer";

export default class LayoutContainer extends Component {
  render () {
    return (
      <div>
        <Header />
        <div>
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}
