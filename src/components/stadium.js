import React from "react";
import Iframe from "react-iframe";
import SweetAlert from "react-bootstrap-sweetalert";
import Button from "components/CustomButton/CustomButton.jsx";
import "./stadium.css";

class Stadium extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      show: false
    };
    this.hideAlert = this.hideAlert.bind(this);
    this.successDelete = this.successDelete.bind(this);
    this.cancelDetele = this.cancelDetele.bind(this);
  }

  warningWithConfirmAndCancelMessage() {
    this.setState({
      alert: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Are you sure?"
          onConfirm={() => this.successDelete()}
          onCancel={() => this.cancelDetele()}
          confirmBtnBsStyle="info"
          cancelBtnBsStyle="danger"
          confirmBtnText="Yes, move to history!"
          cancelBtnText="Cancel"
          showCancel
        >
          You need to move history!
        </SweetAlert>
      )
    });
  }

  successDelete() {
    this.setState({
      alert: (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Moved!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="info"
        >
          Your video has been moved.
        </SweetAlert>
      )
    });
    setTimeout(() => {
      this.props.handleMoveClick(this.props.stadium);
    }, 1200);
  }
  cancelDetele() {
    this.setState({
      alert: (
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "-100px" }}
          title="Cancelled"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="info"
        >
          Your video does not moved to history.
        </SweetAlert>
      )
    });
  }
  hideAlert() {
    this.setState({
      alert: null
    });
  }

  handleDriverNameClick = () => {
    this.props.handleDriverNameClick(this.props.stadium);
  };
  handleMoveClick = () => {
    this.props.handleMoveClick(this.props.stadium);
    this.setState({
      alert: null
    });
  };
  render() {
    const title = this.props.stadium.driver_name;

    const URL = this.props.stadium.resource_url || this.props.stadium.sosUrl;
    const resourse = encodeURIComponent(URL);
    // const style = {
    //   backgroundImage: "url('" + this.props.stadium.photo_url + "')"
    // };
    return (
      <>
        {this.state.alert}
        <div className="stadium">resourse
          {/* <div className="stadium-picture" style={style}></div> */}
          <div className="stadium-picture"
            style={this.props.style}
          >
            <Iframe
              height={this.props.iframeHeight}
              className="iframe"
              url={`https://dist.bambuser.net/player/?resourceUri=${resourse}&autoplay=true`}
              allowfullscreen
              allow="autoplay"
            />
            <div>
              <Button
                fill
                className="stadium-title pull-left"
                onClick={this.handleDriverNameClick}
              >
                {title}
              </Button>
              <Button
                fill
                className="stadium-title pull-right"
                onClick={this.warningWithConfirmAndCancelMessage.bind(this)}
              >
                Move To History
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Stadium;
