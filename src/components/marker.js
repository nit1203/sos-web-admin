import React from "react";
import "./marker.css";
class Marker extends React.Component {
  render() {
    const style = {
      backgroundImage: "url('" + this.props.iconUrl + "')"
    };
    let classes = "marker";
    if (this.props.selected) {
      classes += " selected";
    }
    return (
      <div className={classes} style={style}>
        {this.props.text}
      </div>
    );
  }
}
export default Marker;
