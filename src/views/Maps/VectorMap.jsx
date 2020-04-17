 //import React, { Component } from "react";
// react components used to create a SVG / Vector map
// import { VectorMap } from "react-jvectormap";
// import { Grid, Row, Col } from "react-bootstrap";
// import GoogleMapReact from 'google-map-react';
// import Card from "components/Card/Card.jsx";

// var mapData = {
//   AU: 760,
//   BR: 550,
//   CA: 120,
//   DE: 1300,
//   FR: 540,
//   GB: 690,
//   GE: 200,
//   IN: 200,
//   RO: 600,
//   RU: 300,
//   US: 2920
// };
// const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
// class SimpleMap extends Component {
//   static defaultProps = {
//     center: {
//       lat: 59.95,
//       lng: 30.33
//     },
//     zoom: 11
//   };
// class VectorMaps extends Component {
//   render() {
//     return (
//       <div className="main-content">
//         <Grid fluid>
//           <Row>
//             <Col md={12}>
//               <h3 className="text-center">
//                 World Map
//                 <br />
//                 <small>
//                   <a
//                     href="https://www.npmjs.com/package/react-jvectormap"
//                     target="_blank"
//                   >
//                     React wrapper component
//                   </a>{" "}
//                   of jQuery{" "}
//                   <a
//                     href="http://jvectormap.com/"
//                     target="_blank"
//                   >
//                     jVector Map
//                   </a>{" "}
//                   pluging.
//                 </small>
//               </h3>
//               <Card
//                 content={
//                   <VectorMap
//                     map={"world_mill"}
//                     backgroundColor="transparent"
//                     zoomOnScroll={false}
//                     containerStyle={{
//                       width: "100%",
//                       height: "280px"
//                     }}
//                     containerClassName="map"
//                     regionStyle={{
//                       initial: {
//                         fill: "#e4e4e4",
//                         "fill-opacity": 0.9,
//                         stroke: "none",
//                         "stroke-width": 0,
//                         "stroke-opacity": 0
//                       }
//                     }}
//                     series={{
//                       regions: [
//                         {
//                           values: mapData,
//                           scale: ["#AAAAAA", "#444444"],
//                           normalizeFunction: "polynomial"
//                         }
//                       ]
//                     }}
//                   />
//                 }
//               />
//             </Col>
//           </Row>
//         </Grid>
//       </div>
//     );
//   }
// }

// export default VectorMaps;

                      
 //----------------------------------------//

//       NEW                   //


// import React, { Component } from "react";
// import { Map, GoogleApiWrapper,Marker } from 'google-maps-react';


// const mapStyles = {
//   width: '1100px',
//   height: '460px'
// };
// class VectorMap extends Component{
//   render() {
//     return (
//         <Map
//           google={this.props.google}
//           zoom={4}
//           style={mapStyles}
//           initialCenter={{ lat: 47.444, lng: -122.176}}
          
//           >
//           <Marker onClick={this.onMarkerClick} name={"Current Location"} />
        
//         </Map>
//     );
//   }
// }
// export default GoogleApiWrapper({
//   apiKey: "AIzaSyCwLw7uTjvMw1EXOn4w5rSB9CLHZsMqxi0"
// })(VectorMap);



import React, { Component } from "react"
import { compose } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {

  return (
    <GoogleMap defaultZoom={6} defaultCenter={{ lat: 20.5937, lng: 78.9629 }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)
        return (
          <Marker
            key={marker.id}
            onClick={onClick}
            position={{ lat: marker.latitude, lng: marker.longitude }}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                  {marker.shelter}
                </div>
              </InfoWindow>}
            }
          </Marker>
        )
          })}
    </GoogleMap>
  )
})

export default class VectorMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shelters: [],
      selectedMarker: false
    }
  }
  componentDidMount() {
    fetch("https://api.harveyneeds.org/api/v1/shelters?limit=20")
      .then(r => r.json())
      .then(data => {
        this.setState({ shelters: data.shelters })
      })
  }
  handleClick = (marker, event) => {
    // console.log({ marker })
    this.setState({ selectedMarker: marker })
  }
  render() {
    return (
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.state.shelters}
        onClick={this.handleClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&Key=AIzaSyCwLw7uTjvMw1EXOn4w5rSB9CLHZsMqxi0"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `460px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}


