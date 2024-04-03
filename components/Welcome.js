import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";

const Welcome = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.replace("Tabs")}
    >
      <Image
        source={require("../assets/welcome.png")}
        style={{ width: 300, height: 300 }}
      />
      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace("Home")}
        >
        </TouchableOpacity> */}
        <Text style={styles.buttonText}>Press any where to start</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgreen",
  },
  input: {
    fontSize: 18,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  inputContainer: {
    width: "80%",
  },
  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#0782F9",
    borderRadius: 10,
    padding: 15,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonOutLine: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    fontWeight: "700",
    color: "white",
    fontSize: 16,
  },
  buttonOutLineText: {
    fontWeight: "700",
    color: "#0782F9",
    fontSize: 16,
  },
});
