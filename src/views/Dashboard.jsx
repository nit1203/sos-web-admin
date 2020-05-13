import React, { useState, useRef } from "react";
import { Grid, Col, Row } from "react-bootstrap";
import useSwr from "swr";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import Stadium from "../components/stadium";
import "./Dashboard.css";
import axios from "axios";
import ReactTables from "./Tables/ReactTables";
import ExtendedTables from "./Tables/ExtendedTables";
import RegularTables from "./Tables/RegularTables";
import SOSCallList from "./Components/SOSCallList";
import { useEffect } from "react";
import { isLoggedIn } from "utils/auth";

const fetcher = (...args) => fetch(...args).then(response => response.json());

const Marker = ({ children }) => children;

export default function Dashboard(props) {
  const mapRef = useRef();
  const [bounds, setBounds] = useState(null);
  const [auth, setAuth] = useState(false)
  const [selectedSta, setSelectedSta] = useState("");
  const [zoom, setZoom] = useState(10);
  const url = "http://13.59.160.163/sos-api/getcurrentstatus.php";

  useEffect(() => {
    const { auth: loggedIn } = isLoggedIn()
    if (!loggedIn) {

      return props.history.push('/admin/sub-admin-login')
    } else {
      setAuth(loggedIn)
    }
  }, []);


  const { data, error } = useSwr(url, {
    fetcher,
    refreshInterval: 200
  });
  // useEffect(() => {
  //   document.getElementById("player").addEventListener("click");
  // }, []);
  const sos = data && !error ? data.collection.slice(0, 4) : [];
  const points = sos.map(sosdata => ({
    type: "Feature",
    properties: {
      cluster: false,
      sosId: sosdata.id,
      category: sosdata.driver_name
    },
    geometry: {
      type: "Point",
      coordinates: [parseFloat(sosdata.Lng), parseFloat(sosdata.lat)]
    }
  }));
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 25, maxZoom: 8 }
  });

  const onDriverNameClick = event => {
    console.log(event.id);
    setSelectedSta(event.id);
    // const expansionZoom = Math.min(
    //   supercluster.getClusterExpansionZoom(event.id),
    //   8
    // );
    // mapRef.current.setZoom(expansionZoom);
    // mapRef.current.panTo({
    //   lat: event.lat,
    //   lng: event.Lng
    // });
  };

  const onMoveToHistory = event => {
    const options = {
      headers: { "Content-type": "application/json" }
    };
    axios
      .post(
        `http://13.59.160.163/sos-api/updaterecord.php`,
        {
          broadcast_id: event.broadcast_id
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

  return (
    <div className="main-content">
      <Grid fluid>
        {sos.length > 0 && (
          <Row className='justify-content-center'>
            {sos.map((stadium, index) => {
              console.log(index)
              if (index == 3) {
                return (
                  <Col
                    className="content-no-padding"
                    style={{ maxWidth: '35%', height: '350px' }}
                    lg={4} sm={6} key={stadium.id}>
                    <Stadium
                      style={{ height: '300px' }}
                      iframeHeight="230px"
                      key={stadium.driver_name}
                      stadium={stadium}
                      url={stadium.resource_url}
                      handleDriverNameClick={onDriverNameClick}
                      handleMoveClick={onMoveToHistory}
                      title={stadium.driver_name}
                    ></Stadium>
                  </Col>
                );
              } else {
                return (
                  <Col
                    className="content-no-padding"
                    style={{ minWidth: '20%' }}
                    lg={2} sm={3} key={stadium.id}>
                    <Stadium
                      iframeHeight="170px"
                      key={stadium.driver_name}
                      stadium={stadium}
                      url={stadium.resource_url}
                      handleDriverNameClick={onDriverNameClick}
                      handleMoveClick={onMoveToHistory}
                      title={stadium.driver_name}
                    ></Stadium>
                  </Col>
                );
              }
            })}
          </Row>
        )}
        {sos.length === 0 && (
          <Row>
            <Col lg={12} sm={6}>
              <div
                style={{
                  height: "10vh",
                  width: "100%"
                }}
                className="text-center xs-text-center"
              >
                No live streaming video
              </div>
            </Col>
          </Row>
        )}
        <Row>
          <Col lg={12} sm={12}>
            {
              sos.length > 0 && <SOSCallList sosData={sos[0]} />
            }
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ height: "50vh", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyCseZDT_iJ6z-5VadRR1DWMKkoDgMSqGy8"
                }}
                defaultCenter={{ lat: 11.941591, lng: 79.808311 }}
                defaultZoom={4}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map }) => {
                  mapRef.current = map;
                }}
                onChange={({ zoom, bounds }) => {
                  setZoom(zoom);
                  setBounds([
                    bounds.nw.lng,
                    bounds.se.lat,
                    bounds.se.lng,
                    bounds.nw.lat
                  ]);
                }}
              >
                {clusters.map(cluster => {
                  const [longitude, latitude] = cluster.geometry.coordinates;
                  const {
                    cluster: isCluster,
                    point_count: pointCount
                  } = cluster.properties;

                  if (isCluster) {
                    return (
                      <Marker
                        key={`cluster-${cluster.id}`}
                        lat={latitude}
                        lng={longitude}
                      >
                        <div
                          className="cluster-marker"
                          style={{
                            width: `${10 +
                              (pointCount / points.length) * 20}px`,
                            height: `${10 +
                              (pointCount / points.length) * 20}px`
                          }}
                          onClick={() => {
                            const expansionZoom = Math.min(
                              supercluster.getClusterExpansionZoom(cluster.id),
                              8
                            );
                            mapRef.current.setZoom(expansionZoom);
                            mapRef.current.panTo({
                              lat: latitude,
                              lng: longitude
                            });
                          }}
                        >
                          {pointCount}
                        </div>
                      </Marker>
                    );
                  }

                  return (
                    <Marker
                      key={`crime-${cluster.properties.sosId}`}
                      lat={latitude}
                      lng={longitude}
                      selected={cluster.properties.sosId === selectedSta}
                    >
                      <button className="crime-marker">
                        {cluster.properties.sosId === selectedSta ? (
                          <img src="./car-01.png" alt="sos car" />
                        ) : (
                            <>
                              <img src="./car-04.png" alt="sos car" />
                            </>
                          )}
                      </button>
                    </Marker>
                  );
                })}
              </GoogleMapReact>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}
