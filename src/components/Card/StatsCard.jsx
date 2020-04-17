import React, { Component } from "react";

export class StatsCard extends Component {
  handleclick = () => {
    this.props.handleClick(this.props.stadium);
  };
  render() {
    const title = this.props.stadium.name + this.props.stadium.capacity;
    const style = {
      backgroundImage: "url('" + this.props.stadium.imageUrl + "')"
    };
    return (
      <div className="card card-stats">
        <div className="content">
          <div className="row">
            <div className="col-xs-5">
              <div className="icon-big text-center icon-warning">
                <div className="stadium" onClick={this.handleclick}>
                  <div className="stadium-picture" style={style}></div>
                  <div className="stadium-title">{title}</div>
                </div>
              </div>
            </div>
            {/* <div className="col-xs-7">
              <div className="numbers">
                <p>{this.props.statsText}</p>
                {this.props.statsValue}
              </div>
            </div> */}
          </div>
        </div>
        {/* <div className="footer">
          <hr />
          <div className="stats">
            {this.props.statsIcon} {this.props.statsIconText}
          </div>
        </div> */}
      </div>
    );
  }
}

export default StatsCard;
