import React, { Suspense } from "react";
import { Grid, Col, Row } from "react-bootstrap";
import useSwr from "swr";
import HistoryVideo from "../components/historyVideo";
import "./Dashboard.css";

const fetcher = (...args) => fetch(...args).then(response => response.json());

export default function History() {
  const url = "http://13.59.160.163/sos-api/gethistorydata.php";
  const { data, error } = useSwr(url, {
    fetcher,
    refreshInterval: 500
  });
  const sos = data && !error ? data.collection : [];

  return (
    <div className="main-content">
      <Grid fluid>
        <Row>
          {sos.map(stadium => {
            return (
              <Col lg={4} sm={6} key={stadium.id}>
                <Suspense fallback={<div>Loading...</div>}>
                  <HistoryVideo
                    key={stadium.driver_name}
                    stadium={stadium}
                    url={stadium.resource_url}
                    title={stadium.driver_name}
                  ></HistoryVideo>
                </Suspense>
              </Col>
            );
          })}
        </Row>
      </Grid>
    </div>
  );
}
