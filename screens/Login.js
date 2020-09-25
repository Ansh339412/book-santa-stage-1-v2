import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Image,
  SafeAreaView
} from "react-native";
import db from "../config";
import firebase from "firebase";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert("Successfully Login");
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  handleSignUp = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        Alert.alert("User Added Successfully");
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  render() {
    var { email, password } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.upperContainer}>
          <Image source={require("../assets/santa.png")} style={styles.image} />
        </View>
        <View style={styles.middleContainer}>
          <CustomInput
            placeholder={"abc@example.com"}
            keyboardType={"email-address"}
            onChangeText={text => {
              this.setState({
                email: text
              });
            }}
          />
          <CustomInput
            secureTextEntry={true}
            placeholder={"Enter Password"}
            onChangeText={text => {
              this.setState({
                password: text
              });
            }}
          />
          <CustomButton
            title={"Login"}
            onPress={() => this.handleLogin(email, password)}
          />
          <CustomButton
            title={"SignUp"}
            onPress={() => this.handleSignUp(email, password)}
          />
        </View>
        <View style={styles.lowerContainer}>
          <Image
            source={require("../assets/book.png")}
            style={styles.bookImage}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6fc0b8"
  },
  upperContainer: {
    flex: 0.25,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain"
  },
  middleContainer: {
    flex: 0.42,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  lowerContainer: {
    flex: 0.33,
    justifyContent: "center",
    alignItems: "center"
  },
  bookImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  }
});
