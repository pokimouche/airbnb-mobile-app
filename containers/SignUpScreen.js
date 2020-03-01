import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StatusBar,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableHighlight,
  KeyboardAvoidingView
} from "react-native";
import common from "../common";
import SignUpBtn from "../components/SignUpBtn";
import Link from "../components/Link";

export default function SignUpScreen({ setToken, setId }) {
  const styles = StyleSheet.create({
    containner: {
      backgroundColor: common.redbackground,
      flex: 1,
      alignItems: "stretch",
      flexDirection: "column",
      justifyContent: "space-around"
    },
    inputText: {
      borderBottomColor: "#FFF",
      borderBottomWidth: 1,
      width: 320,
      padding: 12,
      color: "#FFF",
      fontSize: 16
    },
    textarea: {
      width: 316,
      padding: 12,
      color: "#FFF",
      fontSize: 16
    },

    textareaWrapper: {
      borderColor: "#FFF",
      borderWidth: 1,
      width: 318,
      color: "#FFF",
      fontSize: 16,
      alignItems: "center",
      maxHeight: 122,
      height: 60
    }
  });
  const windowWidth = Dimensions.get("window").width;
  const [isDisable, setIsDisable] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dataToPost, setDataToPost] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
    description: "",
    password2: ""
  });

  const signUrl = "https://express-airbnb-api.herokuapp.com/user/sign_up";
  return (
    <>
      <StatusBar barStyle="light-content"></StatusBar>
      <View style={[styles.containner]}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-around"
          }}
        >
          <View style={{ alignItems: "center" }}>
            <TextInput
              style={[styles.inputText]}
              placeholder="email"
              autoCapitalize="none"
              value={dataToPost.email}
              onChangeText={text => {
                const newDataToPost = { ...dataToPost };
                newDataToPost.email = text;
                setDataToPost(newDataToPost);
              }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <TextInput
              style={[styles.inputText]}
              placeholder="username"
              value={dataToPost.username}
              autoCapitalize="none"
              onChangeText={text => {
                const newDataToPost = { ...dataToPost };
                newDataToPost.username = text;
                setDataToPost(newDataToPost);
              }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <TextInput
              name="name"
              style={[styles.inputText]}
              placeholder="name"
              autoCapitalize="none"
              value={dataToPost.name}
              onChangeText={text => {
                const newDataToPost = { ...dataToPost };
                newDataToPost.name = text;
                setDataToPost(newDataToPost);
              }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={[styles.textareaWrapper]}>
              <TextInput
                multiline={true}
                style={[styles.textarea]}
                placeholder="présentez-vous en quelques mots..."
                numberOfLines={4}
                onChangeText={text => {
                  const newDataToPost = { ...dataToPost };
                  newDataToPost.description = text;
                  setDataToPost(newDataToPost);
                }}
                value={dataToPost.description}
              />
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <TextInput
              style={[styles.inputText]}
              placeholder="mot de passe"
              secureTextEntry={true}
              value={dataToPost.password}
              autoCapitalize="none"
              onChangeText={text => {
                const newDataToPost = { ...dataToPost };
                newDataToPost.password = text;
                setDataToPost(newDataToPost);
              }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <TextInput
              style={[styles.inputText]}
              placeholder="confirmer le mot de passe"
              secureTextEntry={true}
              autoCapitalize="none"
              value={dataToPost.password2}
              onChangeText={text => {
                const newDataToPost = { ...dataToPost };
                newDataToPost.password2 = text;
                setDataToPost(newDataToPost);
              }}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <SignUpBtn
            setToken={setToken}
            dataToPost={dataToPost}
            setDataToPost={setDataToPost}
            signUrl={signUrl}
            btnName="S'inscrire"
            setId={setId}
            setErrorMessage={setErrorMessage}
            isDisable={isDisable}
            setModalVisible={setModalVisible}
            setIsDisable={setIsDisable}
          ></SignUpBtn>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 100
          }}
        >
          <Link name="Déja un compte ? se connecter" nav="SignIn"></Link>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                marginHorizontal: 22,
                backgroundColor: "#FFF",
                width: windowWidth - 44,
                borderRadius: 20,
                padding: 20
              }}
            >
              <Text>{errorMessage}</Text>
              <View style={{ alignItems: "center" }}>
                <TouchableHighlight
                  style={{
                    marginTop: 22,
                    backgroundColor: common.redbackground,
                    width: 190,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#FFF"
                    }}
                  >
                    Hide Modal
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
