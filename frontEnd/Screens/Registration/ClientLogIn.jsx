
import { StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { APP_API_URL } from "../../env";
import SessionStorage from "react-native-session-storage";
import Toast from 'react-native-toast-message';
import { useToast } from 'react-native-fast-toast'

const ClientLogin = () => {
  const toast = useToast()
  const navigation = useNavigation();

  const [emailUser, setEmailUser] = useState("");
  const [Password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const logIn = async (navigation) => {
    if (!emailUser || !Password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter both email and password',
        position: 'top',
        topOffset: 0,
      });
      return;
    }

    try {
      const res = await axios.post(`${APP_API_URL}/user/log/${emailUser}`, {
        Password: Password,
      });

      console.log("loguser", res.data);
      SessionStorage.setItem("emailUser", emailUser);
      SessionStorage.setItem("userid", res.data.id);
      SessionStorage.setItem("userToken", res.data.token);
      console.log("userid", res.data.id);
      console.log("usertoken", res.data.token);
      toast.show("Login Successfully !",{
        type: 'success',
    animationType:"slide-in",
        position: 'top',
      });
      navigation.navigate("Navigation", { screen: "Navigation" });

    } catch (err) {
      console.error(err);
      toast.show("Login failed !",{
        type: 'danger',
    animationType:"slide-in",
        position: 'top',
      });
    }
  };
  const handleLogIn = () => {
    logIn(navigation);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Image
        source={{ uri: "https://cdn.discordapp.com/attachments/1235498402746335293/1260214654999728158/TuniGo_1.png?ex=669b081b&is=6699b69b&hm=1b0f2631de40c85b58cf7a7cf8ff389f91adfd29e34345705c56fff8df84ba09&" }}
        style={styles.image}
      />
      <View style={styles.wrapper}>
        <Text style={styles.label}>Email address</Text>
        <View style={styles.inputWrapper(emailUser ? "blue" : "gray")}>
          <MaterialCommunityIcons
            name="email-outline"
            size={20}
            color={"gray"}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmailUser(text)}
            value={emailUser}
            placeholder="example@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper(Password ? "blue" : "gray")}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={20}
            color={"gray"}
          />
          <TextInput
            style={styles.input}
            onChangeText={(pass) => setPassword(pass)}
            value={Password}
            placeholder="Password"
            secureTextEntry
          />
        </View>
        <View style={styles.options}></View>
        <TouchableOpacity style={styles.button} onPress={handleLogIn}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ClientLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  wrapper: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputWrapper: (borderColor) => ({
    borderColor: borderColor,
    backgroundColor: "white",
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    marginBottom: 15,
  }),
  input: {
    flex: 1,
    marginLeft: 10,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4d8790",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 320,
    height: 200,
    marginBottom: 20,
  },
});