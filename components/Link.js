import React from "react";
import { TouchableHighlight, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Link = props => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate(props.nav);
      }}
    >
      <Text
        style={{
          color: "#FFF",
          fontSize: 12,
          textDecorationLine: "underline"
        }}
      >
        {props.name}{" "}
      </Text>
    </TouchableHighlight>
  );
};

export default Link;
