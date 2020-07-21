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
import NotificationSystem from "react-notification-system";
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { sosData } from "views/sos-seeder";
import { columns } from "views/sos-seeder";
import Iframe from "react-iframe";
import Geocode from "react-geocode";
import { fetcher } from "utils/api";
import qs from "qs";
import Axios from "axios";
import { API_URL } from '../../variables/constants';
import Stadium from '../../components/stadium';
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { forwardRef } from 'react';
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

Geocode.setApiKey('AIzaSyAzCafeUfnPBWfcu0lY9bVghgADgFAnqYQ');
Geocode.setLanguage("en");
Geocode.setRegion("es");
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
      data: [],
      show: false,
      sosUrl: '',
      id: '',
      stadium: {}
    };

  }
  notificationSystem = React.createRef(null);
  componentDidMount() {
    if (this.props.data) {
      this.setState({
        data: this.props.data.map((prop, key) => {
          return {
            id: prop['id'],
            sosUrl: prop.resource_url,
            customer_name: prop['customer_name'],
            driver_name: prop['driver_name'],
            type: prop['type'],
            time: prop['created_at'],
            country: prop['country'],
            state: prop['state'],
            city: prop['city'],
            tripNumber: prop['tripNumber'],
            actions: (
              // we've added some custom button actions
              <div className="actions-center">
                <Button
                  onClick={() => {
                    var data = this.state.data;
                    data.find((o, i) => {
                      if (o.id === key) {
                        // here you should add some custom code so you can delete the data
                        // from this component and from your server as well
                        console.log(o.sosUrl, o)
                        this.setState({ sosUrl: o.sosUrl, id: o.id })
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
        })
      })
    }
  }


  getGeoCode = (lat, lan) => {
    Geocode.fromLatLng(lat, lan).then(
      response => {
        const address = response.results[0];
        console.log(address);
      },
      error => {
        console.error(error);
      }
    );
  }
  componentWillReceiveProps(nextProps, nextContext) {
    console.log({ nextProps })

    // nextProps.data.slice(0, 10).map(prop => {
    //   this.getGeoCode(prop.lat, prop.Lng)
    // })


    if (nextProps.data && JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
      this.setState({
        data: nextProps.data.map((prop, key) => {
          return {
            id: prop['id'],
            sosUrl: prop.resource_url,
            customer_name: prop['customer_name'],
            driver_name: prop['driver_name'],
            type: prop['type'],
            time: prop['created_at'],
            country: prop['country'],
            state: prop['state'],
            broadcast_id: prop['broadcast_id'],
            city: prop['city'],
            tripNumber: prop['tripNumber'],
            actions: (
              // we've added some custom button actions
              <div className="actions-center">
                <Button
                  onClick={() => {
                    var data = this.state.data;
                    data.find((o, i) => {
                      console.log(o.id, prop.id)
                      if (o.id === prop['id']) {
                        // here you should add some custom code so you can delete the data
                        // from this component and from your server as well
                        console.log(o)
                        this.setState({
                          sosUrl: o.sosUrl, id: o.id,
                          broadcast_id: o.broadcast_id,
                          stadium: o
                        })
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
        })
      })
    }

  }

  handleNotificationClick = (notificationData) => {
    this.notificationSystem.current.addNotification({
      title: (
        <div style={{ textAlign: "left" }}>{notificationData.message}</div>
      ),
      level: notificationData.level,
      position: "tr",
      autoDismiss: 15,
    });
  };

  handleClose = () => this.setState({
    sosUrl: '', id: '', show: false,
    archive: false,
    history: false
  });
  handleShow = () => this.setState({
    show: true
  });


  filterCaseInsensitive(filter, row) {
    const id = filter.pivotId || filter.id;
    return (
      row[id] !== undefined ?
        String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
        :
        true
    );
  }


  onMoveToHistory = event => {
    console.log({ event })
    const options = {
      headers: { "Content-type": "application/json" }
    };
    Axios
      .post(
        `${API_URL}updaterecord.php`,
        {
          broadcast_id: this.state.broadcast_id
        },
        options
      )
      .then(
        res => {
          console.log(res);
          console.log(res.data);
        },
        error => {
          console.log(error);
        }
      );
  };


  addToArchive = () => {

    fetcher({
      url: 'updateArchiveList.php',
      method: "post",
      type: "json",
      body: qs.stringify({
        history_id: JSON.stringify([parseInt(this.state.id)])
      })
    }).then(res => {
      console.log(res)
      this.handleNotificationClick({
        level: "success",
        message: 'Added to archive list.'
      });
    }).catch(err => {
      console.log(err)
    })



    // Axios.post(`${API_URL}updateArchiveList.php`, JSON.stringify({
    //   history_id: [4, 5, 10]
    // }), {
    //   headers: {
    //     'Content-type': 'application/json'
    //   }
    // }).then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
  }

  selectRow = {
    mode: 'checkbox',
    clickToSelect: true
  };

  render() {
    return (
      <div className="main-content">
        <NotificationSystem ref={this.notificationSystem} />
        <Grid fluid>
          <Row>
            <Col md={12}>
              <h4 className="title">{this.props.title}</h4>
              <Card
                title=""
                content={
                  <ThemeProvider theme={createMuiTheme({
                    typography: {
                      fontSize: 18
                    }
                  })}>
                    <MaterialTable

                      data={this.state.data}
                      columns={columns}
                      title=''
                      options={{
                        selection: this.props.setToArchive ? true : this.props.setToHistory ? true : false,
                        filtering: true,
                        sorting: true,
                        rowStyle: { fontSize: 16 }
                      }}
                      icons={tableIcons}
                      actions={[
                        this.props.setToArchive ? {
                          icon: tableIcons.Delete,
                          tooltip: 'Move to Archive',
                          onClick: (evt, data) => console.log(data)
                        } : this.props.setToHistory ? {
                          icon: tableIcons.Delete,
                          tooltip: 'Move to history'
                          , onClick: (evt, data) => console.log(data)
                        } : ''
                      ]}
                    />
                  </ThemeProvider>
                  // <ReactTable
                  //   data={this.state.data}
                  //   filterable
                  //   options={{
                  //     selection: true
                  //   }}
                  //   defaultFilterMethod={(filter, row) => this.filterCaseInsensitive(filter, row)}
                  //   columns={[
                  //     ...columns,
                  //     {
                  //       Header: "Play Video",
                  //       accessor: "actions",
                  //       sortable: true,
                  //       filterable: true
                  //     },
                  //     {
                  //       Header: 'Select All',
                  //       accessor: "multiselect",
                  //       sortable: false,
                  //       filterable: false
                  //     }
                  //   ]}
                  //   defaultPageSize={10}
                  //   showPaginationTop={false}
                  //   showPaginationBottom={true}
                  //   className="-striped -highlight"
                  // />
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
                {
                  (this.props.history && this.props.history.location.pathname === '/admin/dashboard') ?
                    <Stadium
                      style={{ height: '300px' }}
                      iframeHeight="230px"
                      // key={stadium.driver_name}
                      stadium={this.state.stadium}
                      url={this.state.sosUrl}
                      //  handleDriverNameClick={onDriverNameClick}
                      handleMoveClick={this.props.handleMoveClick}
                      title={this.state.stadium.driver_name}
                    ></Stadium> :
                    <Iframe
                      className="modal-iframe"
                      url={`https://dist.bambuser.net/player/?resourceUri=${
                        encodeURIComponent(this.state.sosUrl)}&autoplay=true&controls=true`}
                      allowfullscreen={true}
                      allow="autoplay"
                    />
                }



              </Modal.Body>
              {this.props.location && this.props.location.pathname === '/admin/history' &&
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Close
                </Button>
                  {
                    (this.props.setToHistory) && <Button variant="secondary" onClick={this.onMoveToHistory}>
                      Move to history
                </Button>
                  }
                  {
                    (!this.props.archive && this.props.setToArchive) && <Button variant="secondary" onClick={this.addToArchive}>
                      Add To Archive
                </Button>
                  }
                </Modal.Footer>
              }
            </Modal>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default SOSCallList;
