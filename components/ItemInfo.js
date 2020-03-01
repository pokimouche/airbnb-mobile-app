import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ItemInfo = ({ title, ratingValue, user, reviews }) => {
  const styles = StyleSheet.create({
    avatarImg: { width: 60, height: 60, borderRadius: 30 },
    itemInfos: {
      width: 330,
      marginBottom: 20,

      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    itemTitle: { fontSize: 16, lineHeight: 18 }
  });
  let avatar = {
    uri: user.account.photos[0]
  };

  const displayRatinValue = rating => {
    const ratingMax = 5;
    const starArray = [];
    for (let i = 1; i <= ratingMax; i++) {
      starArray.push(
        <Ionicons
          key={i}
          impleLineIcons
          name="ios-star"
          color={rating > i ? "#F5B304" : "#BBBBBB"}
          size={20}
        />
      );
    }
    return starArray;
  };

  return (
    <View
      style={{
        flexDirection: "row",
        width: 330,
        marginTop: 8.71,
        borderBottomColor: "#BBBBBB",
        borderBottomWidth: 1
      }}
    >
      <View style={[styles.itemInfos]}>
        <View>
          <Text numberOfLines={1} style={{ fontSize: 16, width: 245 }}>
            {title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: 138,
                justifyContent: "space-between"
              }}
            >
              {displayRatinValue(ratingValue)}
            </View>
            <Text
              style={{
                fontSize: 17,
                lineHeight: 18,
                color: "#BBBBBB",
                marginLeft: 18
              }}
            >
              {reviews} avis
            </Text>
          </View>
        </View>
        <Image style={[styles.avatarImg]} source={avatar} />
      </View>
    </View>
  );
};

export default ItemInfo;
