
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import axios from "axios";
import { APP_API_URL } from "../../env";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Toast from 'react-native-toast-message';

const SignUp = () => {
  const route = useRoute();
  const { showCINImage } = route.params;
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [CINImage, setCINImage] = useState("");

  const SignUp = async (
    FirstName,
    LastName,
    email,
    Password,
    DateOfBirth,
    gender,
    CINImage
  ) => {
    if (
      !FirstName ||
      !LastName ||
      !email ||
      !Password ||
      !DateOfBirth ||
      !gender ||
      !CINImage
    ) {
      console.log("res", FirstName, LastName, email, Password, DateOfBirth, gender, CINImage);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter your data',
        position: 'top',
        topOffset: 0,
      });
      return;
    }

    const data = {
      FirstName,
      LastName,
      email,
      Password,
      DateOfBirth,
      gender,
      CINImage,
    };

    try {
      const res = await axios.post(`${APP_API_URL}/owner/reg`, data);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Signup successful',
        position: 'top',
        topOffset: 0,
      });
      navigation.goBack("TopTabNav");
    } catch (error) {
      console.error(error);
    }
  };

  const SignUpUser = async (
    FirstName,
    LastName,
    email,
    Password,
    DateOfBirth,
    gender
  ) => {
    if (
      !FirstName ||
      !LastName ||
      !email ||
      !Password ||
      !DateOfBirth ||
      !gender
    ) {
      console.log("resUser", FirstName, LastName, email, Password, DateOfBirth, gender);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter your data',
        position: 'top',
        topOffset: 0,
      });
      return;
    }

    const data = {
      FirstName,
      LastName,
      email,
      Password,
      DateOfBirth,
      gender,
      CINImage,
    };

    try {
      const res = await axios.post(`${APP_API_URL}/user/reg`, data);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Signup successful',
        position: 'bottom',
        bottomOffset:800,
      });
      navigation.goBack("TopNav");
    } catch (error) {
      console.error(error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCameraLaunch = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSignup = () => {
    SignUp(
      FirstName,
      LastName,
      email,
      Password,
      DateOfBirth,
      gender,
      CINImage
    );
  };

  const handleSignupUser = () => {
    SignUpUser(
      FirstName,
      LastName,
      email,
      Password,
      DateOfBirth,
      gender
    );
  };

  const handleSignupButtonClick = () => {
    if (showCINImage) {
      handleSignup();
    } else {
      handleSignupUser();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <Text style={styles.title}>Create An Account</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <Formik onSubmit={handleSignup}>
            {({ touched }) => (
              <View style={styles.wrapper}>
                {/* <View style={styles.imageContainer}>
                  <TouchableOpacity onPress={pickImage}>
                    <Image
                      source={{
                        uri: image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s",
                      }}
                      style={styles.profimges}
                    />
                  </TouchableOpacity>
                </View> */}

                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="account-outline" size={20} color={"gray"} />
                  <TextInput
                    onChangeText={(text) => setFirstName(text)}
                    value={FirstName}
                    placeholder="First name"
                    style={styles.input}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="account-outline" size={20} color={"gray"} />
                  <TextInput
                    onChangeText={(text) => setLastName(text)}
                    value={LastName}
                    placeholder="Last name"
                    style={styles.input}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="email-outline" size={20} color={"gray"} />
                  <TextInput
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="lock-outline" size={20} color={"gray"} />
                  <TextInput
                    onChangeText={(text) => setPassword(text)}
                    value={Password}
                    placeholder="Password"
                    secureTextEntry
                    style={styles.input}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="calendar-outline" size={20} color={"gray"} />
                  <TextInput
                    onChangeText={(text) => setDateOfBirth(text)}
                    value={DateOfBirth}
                    placeholder="Date of Birth"
                    style={styles.input}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="gender-male-female" size={20} color={"gray"} />
                  <TextInput
                    onChangeText={(text) => setGender(text)}
                    value={gender}
                    placeholder="Gender"
                    style={styles.input}
                  />
                </View>

                {showCINImage && (
                  <View style={styles.inputWrapper}>
                    <MaterialCommunityIcons name="id-card" size={20} color={"gray"} />
                    <TextInput
                      onChangeText={(text) => setCINImage(text)}
                      value={CINImage}
                      placeholder="CIN Image"
                      style={styles.input}
                    />
                  </View>
                )}

                <TouchableOpacity style={styles.button} onPress={handleSignupButtonClick}>
                  <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
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
    shadowRadius: 8.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
    width: "100%",
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#4d8790",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 50,
    bottom:-30 
  }
});

export default SignUp;
