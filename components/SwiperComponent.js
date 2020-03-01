import React from "react";
import { View } from "react-native";
import Swiper from "react-native-swipe-image";

const SwiperComponent = props => {
  const bottom = e => {
    console.log("Swipe Footer Bottom");
  };
  const top = e => {
    console.log("Swipe Header Top");
  };
  console.log(props.swipeImage);
  return (
    <View style={{ flex: 1 }}>
      <Swiper
        images={props.swipeImage}
        imageHeight={244}
        swipeBottom={e => bottom(e)}
        swipeTop={e => top(e)}
        textSize={0}
        textBold={false}
        textColor={"#FFF"}
        textUnderline={false}
      />
    </View>
  );
};

export default SwiperComponent;
