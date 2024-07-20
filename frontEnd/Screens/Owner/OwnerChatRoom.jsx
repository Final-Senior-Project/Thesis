import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Pressable, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./OwnerChatStyle";
import axios from "axios";
import { APP_API_URL } from "../../env";
import SessionStorage from "react-native-session-storage";
import OwnerAllChats from "./OwnerAllChats";

const Chat = () => {
  const [rooms, setRooms] = useState([]);
  const id =  SessionStorage.getItem('ownerid');
  
  const getRoom = async () => {
    try {
      const res = await axios.post(`${APP_API_URL}/chat/getRoom`, { ownerId:id });
      setRooms(res.data);
      
      console.log("rooms",res.data);
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    getRoom();
  }, []);

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Chats</Text>
          <Pressable onPress={() => console.log("Button Pressed!")}>
            <Feather name="edit" size={24} color="green" />
          </Pressable>
        </View>
      </View>

      <View style={styles.chatlistContainer}>
        {rooms.length > 0 ? (
          
          <FlatList
            data={rooms}
            renderItem={( {item} ) => <OwnerAllChats data={item} />}
            keyExtractor={(item) => item}
          />
        
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>There is no chat!</Text>
            <Text>Please chat with the client</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Chat;
