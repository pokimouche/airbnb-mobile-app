import React from "react";
import MapView from "react-native-maps";

const RoomMap = props => {
  return (
    <MapView
      style={{
        width: 330,
        height: 119.04
      }}
      initialRegion={{
        latitude: props.cityLat,
        longitude: props.cityLong,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2
      }}
      showsUserLocation={true}
    >
      <MapView.Marker
        coordinate={{
          latitude: props.locLat,
          longitude: props.locLong
        }}
        title={props.title}
        description={props.description}
      />
    </MapView>
  );
};

export default RoomMap;
