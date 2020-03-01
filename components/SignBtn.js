import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";
import common from "../common";

const SignBtn = props => {
  const [isLoading, setIsLoading] = useState(false);
  if (props.dataToPost.email === "" || props.dataToPost.password === "") {
    props.setIsDisable(true);
  } else {
    props.setIsDisable(false);
  }
  return (
    <>
      {isLoading === true ? (
        <ActivityIndicator
          size="large"
          color="white"
          style={{ marginTop: 20 }}
        />
      ) : (
        <TouchableHighlight
          disabled={props.isDisable}
          underlayColor="#0D62AF"
          style={[props.isDisable ? styles.disabledsignBtn : styles.signBtn]}
          onPress={async () => {
            try {
              setIsLoading(true);
              let response = await fetch(props.signUrl, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(props.dataToPost)
              });
              if (response.status === 401) {
                props.setErrorMessage(
                  "Cette utilisateur n'éxiste pas. Votre email ou votre mot de passe est incorrecte."
                );
                props.setModalVisible(true);
                props.setEmail("");
                props.setPassword("");
                setIsLoading(false);
              } else {
                let responseJson = await response.json();
                setIsLoading(false);

                props.setToken(responseJson.token);
                props.setId(responseJson.id);
              }
            } catch (error) {
              console.error(error.message);
            }
          }}
        >
          <Text style={[styles.textBtn]}>{props.btnName}</Text>
        </TouchableHighlight>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  signBtn: {
    backgroundColor: "#FFF",
    width: 190,
    height: 65,
    borderRadius: 32.5,
    justifyContent: "center",
    alignItems: "center"
  },
  disabledsignBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: 190,
    height: 65,
    borderRadius: 32.5,
    justifyContent: "center",
    alignItems: "center"
  },
  textBtn: {
    color: common.redColor,

    fontSize: 24
  }
});

export default SignBtn;
