import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import ItemInfo from "./ItemInfo";

const Item = props => {
  const styles = StyleSheet.create({
    roomImg: { width: 330, height: 215.29, marginTop: 21 }
  });

  let Image_Http_URL = {
    uri: props.item.photos[0]
  };

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        navigation.navigate("Room", {
          itemId: props.item._id
        });
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Image style={[styles.roomImg]} source={Image_Http_URL} />

        <ItemInfo {...props.item}></ItemInfo>
      </View>
    </TouchableOpacity>
  );
};

export default Item;
