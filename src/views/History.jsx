import React, { Suspense, useState, useEffect } from "react";
import { Grid, Col, Row, ButtonGroup, Button } from "react-bootstrap";
import useSwr from "swr";
import HistoryVideo from "../components/historyVideo";
import "./Dashboard.css";
import SOSCallList from "./Components/SOSCallList";
import { isLoggedIn } from "utils/auth";
import { API_URL } from "variables/constants";

const fetcher = (...args) => fetch(...args).then(response => response.json());

export default function History(props) {
  const url = `${API_URL}gethistorydata.php`;
  const [auth, setAuth] = useState(false)


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
    refreshInterval: 500
  });
  const sos = data && !error ? data.collection : [];

  const [isGrid, setIsGrid] = useState(false)

  return (
    <div className="main-content">
      <Suspense fallback={<h1>Loading ....</h1>}>
        {
          auth && <React.Fragment>
            <Grid fluid>
              <Row className="justify-content-end pr2" >
                <ButtonGroup aria-label="Basic example">
                  <Button
                    onClick={() => setIsGrid(false)}
                    variant="primary"><i class="fa fa-list-alt" aria-hidden="true"></i></Button>
                  <Button
                    onClick={() => setIsGrid(true)}
                    variant="primary"><i class="fa fa-th" aria-hidden="true"></i></Button>
                </ButtonGroup>
              </Row>
              {
                isGrid ? <Row>
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
                </Row> : <Row>
                    <SOSCallList />
                  </Row>
              }
            </Grid>
          </React.Fragment>
        }
      </Suspense>
    </div>
  );
}
