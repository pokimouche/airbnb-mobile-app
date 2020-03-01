import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, View, Platform, Text } from "react-native";
import MapView from "react-native-maps";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

const ArroundMeScreen = props => {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const getLocationAsync = useCallback(async () => {
    // Demander la permission d'accéder aux coordonnées GPS
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setErrorMessage("Permission refusée");
    } else {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
  });
  // Cet effet est déclenché uniquement lors de la création de ce composant
  useEffect(() => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      setErrorMessage(
        "La géolocalisation ne fonctionne pas sur le simulateur Android, tu peux tester sur ton device !"
      );
    } else {
      getLocationAsync();
    }
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : location ? (
        <MapView
          // La MapView doit obligatoirement avoir des dimensions
          style={{
            width: "100%",
            flex: 1
          }}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2
          }}
          showsUserLocation={true}
        >
          <MapView.Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }}
            title={props.title}
            description={props.description}
          />
        </MapView>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
};

export default ArroundMeScreen;
