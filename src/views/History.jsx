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
  const [setToArchive, setSetToArchive] = useState(false)

  useEffect(() => {
    const { auth: loggedIn } = isLoggedIn()

    console.log(loggedIn)

    const _auth = localStorage.getItem('_auth')
    const parsed = JSON.parse(_auth)

    const authAndParsed = _auth && Boolean(parsed.privileges);

    if (loggedIn && authAndParsed) {
      if (parsed.privileges.includes('archive')) {
        setSetToArchive(parsed.privileges.includes('archive'))
      }
      setAuth(loggedIn)
    } else if (loggedIn) {
      setAuth(loggedIn)
    } else {
      return props.history.push('/admin/sub-admin-login')
    }
  }, []);

  const { data, error, mutate, isValidating, revalidate } = useSwr(url, {
    fetcher,
    refreshInterval: 5000
  });
  console.log(data, mutate, isValidating, revalidate)
  const sos = (data && !error) ? data.collection : [];
  console.log(sos)

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
                    <SOSCallList
                      {...props}
                      setToArchive={setToArchive}
                      title="SOS call history"
                      data={sos} />
                  </Row>
              }
            </Grid>
          </React.Fragment>
        }
      </Suspense>
    </div>
  );
}
