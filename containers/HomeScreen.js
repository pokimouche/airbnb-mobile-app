import React, { useState, useEffect } from "react";

import { StatusBar, ActivityIndicator, View, FlatList } from "react-native";
import Item from "../components/Item";

export default function HomeScreen({ setRoomId }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        let response = await fetch(
          "https://airbnb-api.herokuapp.com/api/room?city=paris"
        );
        let responseJson = await response.json();
        setData(responseJson.rooms);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  return (
    <>
      {isLoading === true ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <View>
          <StatusBar barStyle="light-content"></StatusBar>
          <FlatList
            data={data}
            renderItem={({ item }) => <Item key={item.id} item={item}></Item>}
            keyExtractor={item => item._id}
          />
        </View>
      )}
    </>
  );
}
