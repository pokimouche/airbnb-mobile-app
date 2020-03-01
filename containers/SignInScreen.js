import React, { useState } from "react";

import {
  Text,
  StatusBar,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableHighlight,
  Modal,
  Dimensions,
  StyleSheet
} from "react-native";
import common from "../common";
import SignBtn from "../components/SignBtn";
import Logo from "../components/Logo";
import Link from "../components/Link";

export default function SignInScreen({ setToken, setId }) {
  const styles = StyleSheet.create({
    containner: {
      backgroundColor: common.redbackground,
      flex: 1,
      alignItems: "stretch",
      justifyContent: "center"
    },
    inputText: {
      borderBottomColor: "#FFF",
      borderBottomWidth: 2,
      width: 320,
      padding: 12,
      color: "#FFF",
      fontSize: 16
    }
  });
  const windowWidth = Dimensions.get("window").width;

  const [email, setEmail] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const dataToPost = { email: email, password: password };
  const [errorMessage, setErrorMessage] = useState("");

  const signUrl = "https://express-airbnb-api.herokuapp.com/user/log_in";
  return (
    <>
      <StatusBar barStyle="light-content"></StatusBar>
      <View style={[styles.containner]}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <Logo></Logo>
          <View style={{ alignItems: "center", flex: 1 }}>
            <View style={{ marginBottom: 20, flex: 1 }}>
              <TextInput
                style={[styles.inputText]}
                placeholder="email"
                value={email}
                autoCapitalize="none"
                onChangeText={text => {
                  setEmail(text);
                }}
              />
            </View>
            <View style={{ marginBottom: 20, flex: 1 }}>
              <TextInput
                style={[styles.inputText]}
                placeholder="password"
                secureTextEntry={true}
                value={password}
                autoCapitalize="none"
                onChangeText={text => {
                  setPassword(text);
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <SignBtn
                setToken={setToken}
                dataToPost={dataToPost}
                signUrl={signUrl}
                setId={setId}
                setModalVisible={setModalVisible}
                setPassword={setPassword}
                setEmail={setEmail}
                setErrorMessage={setErrorMessage}
                isDisable={isDisable}
                setIsDisable={setIsDisable}
                btnName="Se connecter"
              ></SignBtn>
            </View>
            <View style={{ flex: 1 }}>
              <Link name="Create an account" nav="SignUp"></Link>
            </View>
          </View>
        </KeyboardAvoidingView>

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
