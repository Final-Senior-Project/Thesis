import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ChatStyles";
import { useNavigation } from "@react-navigation/native";
import SessionStorage from "react-native-session-storage";


const AllChats = ({ idOwner }) => {
  const navigation = useNavigation();
  const [owner,setOwner]=useState([])
  console.log("testitem", idOwner);
  const userId=SessionStorage.getItem('userid')
  const getUser=async()=>{
    try {
      const res= await axios.get(`${APP_API_URL}/owner/One/${idOwner}`)
setOwner(res.data)
console.log('owner',res.data);
      
    } catch (error) {
        console.log("error",error);
    }
}
useEffect(()=>getUser(),[])
  const handleNavigation = () => {
    navigation.navigate("Chats", {
      idOwner: idOwner,
    });
  };
  return (
    <Pressable
      style={styles.cchat}
      onPress={() => {
        handleNavigation();
      }}
    >
      <Ionicons
        name="person-circle-outline"
        size={45}
        color="black"
        style={styles.cavatar}
      />

      <View style={styles.crightContainer}>
        <View>
          <Text style={styles.cusername}>test</Text>
<Text style={styles.cmessage}>
            { "Tap to start chatting"}
          </Text>
        </View>
        <View>
          <Text style={styles.ctime}>{idOwner?.time ? idOwner.time : "now"}</Text>
        </View>
      </View>
      {/* <buttonNavigation/> */}
    </Pressable>
  );
};
export default AllChats;
