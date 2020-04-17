import React from "react";
import Iframe from "react-iframe";
import Button from "components/CustomButton/CustomButton.jsx";
import "./stadium.css";

class HistoryVideo extends React.Component {
  handleclick = () => {
    this.props.handleClick(this.props.stadium);
  };
  render() {
    const title = this.props.stadium.driver_name;
    const URL = this.props.stadium.resource_url;
    const resourse = encodeURIComponent(URL);
    // const style = {
    //   backgroundImage: "url('" + this.props.stadium.photo_url + "')"
    // };
    return (
      <div className="stadium" onClick={this.handleclick}>
        {/* <div className="stadium-picture" style={style}></div> */}
        <div className="stadium-picture">
          <Iframe
            url={`https://dist.bambuser.net/player/?resourceUri=${resourse}`}
            allowfullscreen
          />
          {/* <div className="stadium-title">{title}</div> */}
          <Button fill className="stadium-title pull-left">
            {title}
          </Button>
        </div>
      </div>
    );
  }
}
export default HistoryVideo;
