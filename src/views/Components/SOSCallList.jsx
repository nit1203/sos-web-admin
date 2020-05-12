/*!

=========================================================
* Light Bootstrap Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { Grid, Row, Col, Modal } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { sosData } from "views/sos-seeder";
import { columns } from "views/sos-seeder";
import Iframe from "react-iframe";

const dataTable = [
  ["Tiger Nixon", "System Architect", "Edinburgh", "61"],
  ["Garrett Winters", "Accountant", "Tokyo", "63"],
  ["Ashton Cox", "Junior Technical Author", "San Francisco", "66"],
  ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "22"],
  ["Airi Satou", "Accountant", "Tokyo", "33"],
  ["Brielle Williamson", "Integration Specialist", "New York", "61"],
  ["Herrod Chandler", "Sales Assistant", "San Francisco", "59"],
  ["Rhona Davidson", "Integration Specialist", "Tokyo", "55"],
  ["Colleen Hurst", "Javascript Developer", "San Francisco", "39"],
  ["Sonya Frost", "Software Engineer", "Edinburgh", "23"],
  ["Jena Gaines", "Office Manager", "London", "30"],
  ["Quinn Flynn", "Support Lead", "Edinburgh", "22"],
  ["Charde Marshall", "Regional Director", "San Francisco", "36"],
  ["Haley Kennedy", "Senior Marketing Designer", "London", "43"],
  ["Tatyana Fitzpatrick", "Regional Director", "London", "19"],
  ["Michael Silva", "Marketing Designer", "London", "66"],
  ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "64"],
  ["Gloria Little", "Systems Administrator", "New York", "59"],
  ["Bradley Greer", "Software Engineer", "London", "41"],
  ["Dai Rios", "Personnel Lead", "Edinburgh", "35"],
  ["Jenette Caldwell", "Development Lead", "New York", "30"],
  ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "40"],
  ["Caesar Vance", "Pre-Sales Support", "New York", "21"],
  ["Doris Wilder", "Sales Assistant", "Sidney", "23"],
  ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "47"],
  ["Gavin Joyce", "Developer", "Edinburgh", "42"],
  ["Jennifer Chang", "Regional Director", "Singapore", "28"],
  ["Brenden Wagner", "Software Engineer", "San Francisco", "28"],
  ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "48"],
  ["Shou Itou", "Regional Marketing", "Tokyo", "20"],
  ["Michelle House", "Integration Specialist", "Sidney", "37"],
  ["Suki Burks", "Developer", "London", "53"],
  ["Prescott Bartlett", "Technical Author", "London", "27"],
  ["Gavin Cortez", "Team Leader", "San Francisco", "22"],
  ["Martena Mccray", "Post-Sales support", "Edinburgh", "46"],
  ["Unity Butler", "Marketing Designer", "San Francisco", "47"],
  ["Howard Hatfield", "Office Manager", "San Francisco", "51"],
  ["Hope Fuentes", "Secretary", "San Francisco", "41"],
  ["Vivian Harrell", "Financial Controller", "San Francisco", "62"],
  ["Timothy Mooney", "Office Manager", "London", "37"],
  ["Jackson Bradshaw", "Director", "New York", "65"],
  ["Olivia Liang", "Support Engineer", "Singapore", "64"]
];

class SOSCallList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: sosData.map((prop, key) => {
        return {
          id: key,
          sosUrl: this.props.sosData ?
            this.props.sosData.resource_url : '',
          name: prop['name'],
          type: prop['type'],
          time: prop['time'],
          country: prop['country'],
          state: prop['state'],
          city: prop['city'],
          tripNumber: prop['tripNumber'],
          actions: (
            // we've added some custom button actions
            <div className="actions-center">
              {/* use this button to add a like kind of action */}
              {/* <Button
                onClick={() => {
                  let obj = this.state.data.find(o => o.id === key);
                  alert(
                    "You've clicked LIKE button on \n{ \nName: " +
                    obj.name +
                    ", \ntype: " +
                    obj.type +
                    ", \ntime: " +
                    obj.time +
                    ", \ncountry: " +
                    obj.country +
                    "\n}."
                  );
                }}
                bsStyle="info"
                simple
                icon
              >
                <i className="fa fa-heart" />
              </Button>{" "} */}
              {/* use this button to add a edit kind of action */}
              {/* <Button
                onClick={() => {
                  let obj = this.state.data.find(o => o.id === key);
                  alert(
                    "You've clicked EDIT button on \n{ \nName: " +
                    obj.name +
                    ", \ntype: " +
                    obj.type +
                    ", \ntime: " +
                    obj.time +
                    ", \ncountry: " +
                    obj.country +
                    "\n}."
                  );
                }}
                bsStyle="warning"
                simple
                icon
              >
                <i className="fa fa-edit" />
              </Button>{" "} */}
              {/* use this button to remove the data row */}
              {/* <Button
                onClick={() => {
                  var data = this.state.data;
                  data.find((o, i) => {
                    if (o.id === key) {
                      // here you should add some custom code so you can delete the data
                      // from this component and from your server as well
                      data.splice(i, 1);
                      console.log(data);
                      return true;
                    }
                    return false;
                  });
                  this.setState({ data: data });
                }}
                bsStyle="danger"
                simple
                icon
              >
                <i className="fa fa-times" />
              </Button>{" "} */}
              <Button
                onClick={() => {
                  var data = this.state.data;
                  data.find((o, i) => {
                    if (o.id === key) {
                      // here you should add some custom code so you can delete the data
                      // from this component and from your server as well
                      console.log(o.sosUrl)
                      this.setState({ sosUrl: o.sosUrl })
                      this.handleShow()
                    }
                    return false;
                  });
                  //this.setState({ data: data });
                }}
                bsStyle="danger"
                simple
                icon
              >
                <i className="fa fa-play" />
              </Button>{" "}
            </div>
          )
        };
      }),
      show: false,
      sosUrl: ''
    };
  }

  handleClose = () => this.setState({ sosUrl: '', show: false });
  handleShow = () => this.setState({ show: true });


  filterCaseInsensitive(filter, row) {
    const id = filter.pivotId || filter.id;
    return (
      row[id] !== undefined ?
        String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
        :
        true
    );
  }

  render() {
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <h4 className="title">Latest SOS calls</h4>
              <Card
                title=""
                content={
                  <ReactTable
                    data={this.state.data}
                    filterable
                    defaultFilterMethod={(filter, row) => this.filterCaseInsensitive(filter, row)}
                    columns={[
                      ...columns,
                      {
                        Header: "Play Video",
                        accessor: "actions",
                        sortable: true,
                        filterable: true
                      }
                    ]}
                    defaultPageSize={5}
                    showPaginationTop={false}
                    showPaginationBottom={true}
                    className="-striped -highlight"
                  />
                }
              />
            </Col>

            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>SOS Video</Modal.Title>
              </Modal.Header>
              <Modal.Body
                className="modal-body"
              >
                <Iframe
                  className="modal-iframe"
                  url={`https://dist.bambuser.net/player/?resourceUri=${
                    encodeURIComponent(this.state.sosUrl)}&autoplay=true`}
                  allowfullscreen
                  allow="autoplay"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default SOSCallList;
