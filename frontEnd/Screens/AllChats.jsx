import React, {useState,useEffect} from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ChatStyles";
import { useNavigation } from "@react-navigation/native";
import {io} from 'socket.io-client';


const AllChats = ({item}) => {
    const navigation = useNavigation();
    console.log("testitem",item);
  
    const handleNavigation = () => {
        navigation.navigate("Chats", {
            userid: item.userId,
            
        });
    };
    const handleCreateRoom = () => {
        socket.emit("createRoom", "test");
        
    };
    
    const socket = io("http://192.168.17.186:3000");
    console.log(socket,"socketttttt");
    useEffect(()=>{
        try {
            const socket = io("http://192.168.17.186:3000");
          
            console.log("socket=>",socket);} 
        catch (error) {
            console.log(error);
        }
    console.log('hi')
    },[])
  return (
    <Pressable style={styles.cchat} 
    onPress={()=>{handleCreateRoom(),handleNavigation()}}
    >
        <Ionicons
            name='person-circle-outline'
            size={45}
            color='black'
            style={styles.cavatar}
        />

        <View style={styles.crightContainer}>
            <View>
                <Text style={styles.cusername}>{item.user}</Text>

                <Text style={styles.cmessage}>
                    {item?.message ? item.message : "Tap to start chatting"}
                </Text>
            </View>
            <View>
                <Text style={styles.ctime}>
                    {item?.time ? item.time : "now"}
                </Text>
            </View>
        </View>
    </Pressable>
)}
export default AllChats