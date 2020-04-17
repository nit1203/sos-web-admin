import React from "react";
class Marker extends React.Component {
  render() {
    let classes = "";
    // if (this.props.selected) {
    //   classes += " selected";
    // }
    return <div className={classes}>{this.props.text}</div>;
  }
}
export default Marker;
