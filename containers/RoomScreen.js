import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, StatusBar } from "react-native";

import ItemInfo from "../components/ItemInfo";
import RoomMap from "../components/RoomMap";
import SwiperComponent from "../components/SwiperComponent";

const RoomScreen = ({ route, swipeImage, setSwipeImage }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullDescription, setIsFullDescription] = useState(false);
  const { itemId } = route.params;

  const stretchDescription = () => {
    if (isFullDescription) {
      setIsFullDescription(false);
    } else {
      setIsFullDescription(true);
    }
  };

  useEffect(() => {
    const url = `https://airbnb-api.herokuapp.com/api/room/${itemId}`;
    const roomAsync = async () => {
      const response = await fetch(url);
      const responseJson = await response.json();
      setData(responseJson);

      setIsLoading(false);
      const imageArray = responseJson.photos.map(element => {
        return { name: "", url: element };
      });

      setSwipeImage(imageArray);
    };

    roomAsync();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content"></StatusBar>
      {isLoading ? (
        <View></View>
      ) : (
        <View style={{ alignItems: "center" }}>
          <View style={{ height: 244 }}>
            <SwiperComponent
              photos={data.photos}
              swipeImage={swipeImage}
            ></SwiperComponent>
          </View>
          <ItemInfo {...data}></ItemInfo>
          <TouchableOpacity activeOpacity={1} onPress={stretchDescription}>
            {isFullDescription ? (
              <Text
                style={{
                  width: 330,
                  fontSize: 16,
                  lineHeight: 24,
                  marginTop: 38
                }}
              >
                {data.description}
              </Text>
            ) : (
              <Text
                numberOfLines={3}
                style={{
                  width: 330,
                  fontSize: 16,
                  lineHeight: 24,
                  marginTop: 38
                }}
              >
                {data.description}
              </Text>
            )}
          </TouchableOpacity>
          <View style={{ marginTop: 39 }}>
            <RoomMap
              cityLat={data.city.loc[1]}
              cityLong={data.city.loc[0]}
              locLat={data.loc[1]}
              locLong={data.loc[0]}
              title={data.title}
              description={data.description}
            ></RoomMap>
          </View>
        </View>
      )}
    </>
  );
};

export default RoomScreen;
