import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";
import common from "../common";

const SignUpBtn = props => {
  const [isLoading, setIsLoading] = useState(false);
  if (
    props.dataToPost.email === "" ||
    props.dataToPost.name === "" ||
    props.dataToPost.username === "" ||
    props.dataToPost.description === "" ||
    props.dataToPost.password === "" ||
    props.dataToPost.password2 === ""
  ) {
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
              if (props.dataToPost.password !== props.dataToPost.password2) {
                props.setErrorMessage(
                  "Vos deux mots de passe ne sont pas identiques!"
                );
                props.setModalVisible(true);

                const newDataToPost = { ...props.dataToPost };
                newDataToPost.password = "";
                newDataToPost.password2 = "";
                props.setDataToPost(newDataToPost);

                setIsLoading(false);
              } else {
                setIsLoading(true);
                let response = await fetch(props.signUrl, {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(props.dataToPost)
                });

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

export default SignUpBtn;
