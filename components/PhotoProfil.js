import React, { useState, useCallback } from "react";
import { Image, TouchableHighlight, View } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const PhotoProfil = ({ userId, userToken, user, setIsLoading, setUser }) => {
  const handleImagePicked = useCallback(async pickerResult => {
    try {
      setIsLoading(true);
      if (!pickerResult.cancelled) {
        const uri = pickerResult.uri;
        const uriParts = uri.split(".");
        const fileType = uriParts[uriParts.length - 1];
        const formData = new FormData();
        formData.append("photo", {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`
        });

        const uploadResponse = await fetch(
          `https://express-airbnb-api.herokuapp.com/user/upload_picture/${userId}`,
          {
            method: "PUT",
            body: formData,
            headers: {
              Authorization: "Bearer " + userToken,
              Accept: "application/json",
              "Content-Type": "multipart/form-data"
            }
          }
        );
        const uploadResult = await uploadResponse.json();

        setUser(uploadResult);
      }
    } catch (e) {
      console.log(e.message);
      alert("Upload failed, sorry :(");
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableHighlight
        underlayColor="#0D62AF"
        style={{ alignItems: "center" }}
        onPress={async () => {
          const cameraPerm = await Permissions.askAsync(Permissions.CAMERA);
          const cameraRollPerm = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
          );
          // only if user allows permission to camera AND camera roll
          if (
            cameraPerm.status === "granted" &&
            cameraRollPerm.status === "granted"
          ) {
            const pickerResult = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: true,
              aspect: [4, 3]
            });
            handleImagePicked(pickerResult);
          }
        }}
      >
        {user.photo && user.photo.length > 0 ? (
          <Image
            style={{ height: 150, width: 150, marginTop: 20, borderRadius: 75 }}
            source={{ uri: user.photo[0].url }}
          ></Image>
        ) : (
          <View
            style={{
              backgroundColor: "red",
              height: 150,
              width: 150,
              marginTop: 20,
              borderRadius: 75
            }}
          ></View>
        )}
      </TouchableHighlight>
    </View>
  );
};

export default PhotoProfil;
