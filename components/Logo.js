import React from "react";
import { View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const Logo = props => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <SimpleLineIcons name="home" color="#FFF" size={122} />
    </View>
  );
};

export default Logo;
