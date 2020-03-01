import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  TextInput,
  StatusBar,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  Text
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import common from "../common";
import PhotoProfil from "../components/PhotoProfil";

export default function ProfileScreen({ setToken, userToken, userId }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const update = async () => {
    const dataToPost = {
      email: user.email,
      username: user.username,
      name: user.name,
      description: user.description
    };
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://express-airbnb-api.herokuapp.com/user/update/${userId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userToken
          },
          body: JSON.stringify(dataToPost)
        }
      );

      const responseJson = await response.json();
      setUser(responseJson);
      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    const url = `https://express-airbnb-api.herokuapp.com/user/${userId}`;

    const userAsync = async () => {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken
        },
        method: "GET"
      });
      const responseJson = await response.json();
      setUser(responseJson);
      setIsLoading(false);
    };

    userAsync();
  }, []);

  return (
    <>
      {isLoading === true ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <>
          <View style={{ backgroundColor: "#FFF", flex: 1 }}>
            <StatusBar barStyle="light-content"></StatusBar>
            <PhotoProfil
              user={user}
              userId={userId}
              userToken={userToken}
              setUser={setUser}
              setIsLoading={setIsLoading}
            ></PhotoProfil>
            <KeyboardAwareScrollView
              extraScrollHeight={110}
              contentContainerStyle={styles.container}
            >
              <SafeAreaView style={{ alignItems: "center" }}>
                <View style={{ alignItems: "center" }}>
                  <TextInput
                    style={[styles.inputText]}
                    placeholder="username"
                    value={user.username}
                    autoCapitalize="none"
                    onChangeText={text => {
                      const userData = { ...user };
                      userData.username = text;
                      setUser(userData);
                    }}
                  />
                </View>
                <View style={{ alignItems: "center" }}>
                  <TextInput
                    style={[styles.inputText]}
                    placeholder="email"
                    autoCapitalize="none"
                    value={user.email}
                    onChangeText={text => {
                      const userData = { ...user };
                      userData.email = text;
                      setUser(userData);
                    }}
                  />
                </View>
                <View style={{ alignItems: "center" }}>
                  <TextInput
                    name="name"
                    style={[styles.inputText]}
                    placeholder="name"
                    autoCapitalize="none"
                    value={user.name}
                    onChangeText={text => {
                      const userData = { ...user };
                      userData.name = text;
                      setUser(userData);
                    }}
                  />
                </View>
                <View style={{ alignItems: "center" }}>
                  <TextInput
                    multiline={true}
                    style={[styles.textarea]}
                    placeholder="présentez-vous en quelques mots..."
                    numberOfLines={4}
                    onChangeText={text => {
                      const userData = { ...user };
                      userData.description = text;
                      setUser(userData);
                    }}
                    value={user.description}
                  />
                </View>

                <View style={{ alignItems: "center" }}>
                  <TouchableHighlight
                    underlayColor="#0D62AF"
                    style={[styles.editBtn]}
                    onPress={update}
                  >
                    <Text style={[styles.textBtn]}>Mettre à jour</Text>
                  </TouchableHighlight>
                </View>

                <View style={{ alignItems: "center" }}>
                  <TouchableHighlight
                    underlayColor="#0D62AF"
                    style={[styles.logOutBtn]}
                    onPress={() => {
                      setToken(null);
                    }}
                  >
                    <Text style={[styles.textlogOutBtn]}>Se déconnecter</Text>
                  </TouchableHighlight>
                </View>
              </SafeAreaView>
            </KeyboardAwareScrollView>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  containner: {
    backgroundColor: common.whiteBackground,
    flex: 1,
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  inputText: {
    borderBottomColor: common.redColor,
    borderBottomWidth: 1,
    width: 320,
    padding: 12,
    color: common.blackColor,
    fontSize: 16
  },
  textarea: {
    width: 316,
    padding: 12,
    fontSize: 16,
    height: 117,
    borderColor: common.redColor,
    borderWidth: 1,
    marginTop: 36,
    marginBottom: 20
  },

  textareaWrapper: {
    borderColor: common.redColor,
    borderWidth: 1,
    width: 318,
    fontSize: 16,
    alignItems: "center",
    maxHeight: 122,
    height: 117,
    marginBottom: 20
  },
  editBtn: {
    backgroundColor: "#FFF",
    width: 190,
    height: 65,
    borderRadius: 32.5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: common.redColor,
    borderWidth: 1,
    marginBottom: 20
  },
  textBtn: {
    color: common.redColor,

    fontSize: 24
  },
  logOutBtn: {
    backgroundColor: common.redColor,
    width: 190,
    height: 65,
    borderRadius: 32.5,
    justifyContent: "center",
    alignItems: "center"
  },
  textlogOutBtn: { color: "white", fontSize: 24 }
});
