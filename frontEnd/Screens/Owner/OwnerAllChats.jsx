import React, { useState, useEffect } from "react";
import { View, Text, Pressable ,Image} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./OwnerChatStyle";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { APP_API_URL } from "../../env";

const OwnerAllChats = ({ data }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  const getUser=async()=>{
    const res= await axios.get(`${APP_API_URL}/user/user/${data}`)
    try {
      console.log('userchat',res.data[0].image);
      setUser(res.data)

      
    } catch (error) {
        console.log("error",error);
    }
}
  useEffect(()=>{getUser()},[data])

  const handleNavigation = () => {
    navigation.navigate("ownerchats", {
      userid: data,
    });
  };

  return (
    <Pressable
      style={styles.cchat}
      onPress={() => {
        handleNavigation();
      }}
    >
         <Image 
        source={{ uri: user ? user[0].image : "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=1200&s=1" }} 
        style={styles.cavatar} 
      />
      <View style={styles.crightContainer}>
        <View>
          <Text style={styles.cusername}>
            {user ? user[0].FirstName : "Loading..."}
          </Text>
          <Text style={styles.cmessage}>
            { "Tap to start chatting"}
          </Text>
        </View>
        <View>
          <Text style={styles.ctime}>
            { "now"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default OwnerAllChats;
