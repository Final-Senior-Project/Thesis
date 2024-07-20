

import React, { useEffect, useState, useCallback } from "react";
import { RefreshControl, View, Text, FlatList, TouchableOpacity, Image, ScrollView } from "react-native";
import axios from "axios";

import { MaterialIcons ,AntDesign } from "@expo/vector-icons";
import styles from "./styles.jsx";
import { APP_API_URL } from "../../env.js";
import SessionStorage from "react-native-session-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from 'react-native-toast-message';

const Wishlist = () => {
  const route = useRoute();
  const propertyId = route.params?.propertyid;
  const userId = route.params?.userid;
  const [refreshing, setRefreshing] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [upd, setUpd] = useState(false);
  const navigation = useNavigation();
  const userid = SessionStorage.getItem("userid");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`${APP_API_URL}/wishlist/get/${userid}`);
      setWishlist(response.data);
      setUpd(!upd);
      console.log("wishlist", response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchWishlist();
  }, [refreshing]);

  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(`${APP_API_URL}/wishlist/del/${userid}`);
      setWishlist(wishlist.filter((item) => item.id !== id));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Item removed from wishlist',
        position: 'bottom',
        bottomOffset:800,
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to remove item from wishlist',
        position: 'top',
        topOffset: 0,
      });
    }
  };

  const confirmRemove = (id) => {
    Toast.show({
      type: 'info',
      text1: 'Remove Item',
      text2: 'Are you sure you want to remove this item from your wishlist?',
      visibilityTime: 4000,
      autoHide: true,
      onPress: () => removeFromWishlist(id),
      position: 'top',
      topOffset: 0,
    });
  };

  return (
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    >

    <View>
      <TouchableOpacity onPress={() =>
          navigation.navigate("ProductDetails", {
            propertyid: propertyId,
            userid: userId,
          })}>

      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.propertyItem}>
          <Image
            style={styles.propertyImage}
            source={{ uri: item.image[0] }}
            />
          <View style={styles.propertyDetails}>
          
            <Text style={styles.propertyTitle}>{item.Name}</Text>
            <Text style={styles.propertyDetails}>
                    <MaterialIcons name="location-pin" size={18} color="grey" />
                    {item.location}
                  </Text>
            <Text style={styles.propertyPrice}>
              dt {item.Price} / Visit
            </Text>
          </View>
        <TouchableOpacity onPress={() => confirmRemove(item.id)}>
        <AntDesign name="delete" size={20} color="black" />
            </TouchableOpacity>
        </View>
        )}
        />
        </TouchableOpacity>
    </View>
        </ScrollView>
  );
};

export default Wishlist;
