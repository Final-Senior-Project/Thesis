import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import { AntDesign } from '@expo/vector-icons';

import styles from "./styles.jsx";
import { APP_API_URL } from "../env.js";
import SessionStorage from "react-native-session-storage";
import { useNavigation } from "@react-navigation/native";

const Wishlist = () => {
  const navigation = useNavigation();
  const userid = SessionStorage.getItem("userid");
  const [wishlist, setWishlist] = useState([]);
  const [upd, setUpd] = useState(false);
  // const userid = SessionStorage.getItem("userid");
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
  }, []);

  const removeFromWishlist = (id) => {
    axios
      .delete(`${APP_API_URL}/wishlist/del/${userid}`)
      .then(() => {
        setWishlist(wishlist.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const confirmRemove = (id) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your wishlist?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => removeFromWishlist(id) },
      ]
    );
  };

  return (
    <ScrollView>

    <View>
      <TouchableOpacity onPress={() =>
          navigation.navigate("ProductDetails", {
            propertyid: property.id,
            userid: userid,
          })}>

      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.propertyItem}>
          <Image
            style={styles.propertyImage}
            source={{ uri: item.image }}
            />
          <View style={styles.propertyDetails}>
            <Text style={styles.propertyTitle}>{item.Name}</Text>
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
