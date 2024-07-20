import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Modal, ScrollView, Button, RefreshControl } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { styles } from "./ProductDeatils.styles";   



import { AntDesign,MaterialIcons,FontAwesome5,FontAwesome6,MaterialCommunityIcons,FontAwesome  } from "@expo/vector-icons";



import axios from "axios";
import { useStripe } from "@stripe/stripe-react-native";
import { APP_API_URL } from "../../env";
import { useRoute, useNavigation } from "@react-navigation/native";
import SessionStorage from "react-native-session-storage";
import Bottomsheet from "../../Component/Bottomsheet";
import { AirbnbRating } from "react-native-ratings";
import AddComment from "../Comment/AddComment";
import { io } from 'socket.io-client';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useToast } from 'react-native-fast-toast'


const ProductDetails = ({ addToCart, deleteProduct, switchView, isOwner }) => {
  const toast = useToast()

  const navigation = useNavigation();
  const socket=io('http://192.168.139.186:3000')
  const route = useRoute();
  const propertyId = route.params?.propertyId;
  const userid = route.params?.userid;
  const [property, setProperty] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [liked, setLiked] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [avgRating, setAvgRating] = useState(null);
  const ownerid = SessionStorage.getItem('ownerid');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleCreateRoom = () => {
    socket.emit('createRoom', 'roomsList');
    navigation.navigate("Chats", { idOwner:ownerid });
  };
  const getPropertyRating = async (id) => {
    try {
      const res = await axios.get(`${APP_API_URL}/property/rate/${id}`);
      setAvgRating(res.data.avgRating);
    } catch (err) {
      console.log(err);
    }
  };
  const showtoast = () => {
 
    toast.show({
 
      type: 'success',
 
      text1: 'Hello',
 
      text2: 'This is a toast notification!',
 
    });
 
  };
  useEffect(() => {
    const getProperty = (id) => {
      axios
        .get(`${APP_API_URL}/property/getone/${id}`)
        .then((res) => {
          setProperty(res.data);
          SessionStorage.setItem("id", res.data.id);
          setMainImage(res.data.image[0]);
          console.log('data', res.data);
        })
        .catch((err) => console.log(err));
    };

    if (propertyId) {
      getProperty(propertyId);
      getPropertyRating(propertyId);
    }
   
  }, [propertyId]);

  const openImageModal = (img) => {
    setSelectedImage(img);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  if (!property) {
    return <Text>Loading...</Text>;
  }

  const addWishList = async (userid, propertyId) => {
    try {
      const res = await axios.post(
         `${APP_API_URL}/wishlist/add/${propertyId}/${userid}`,
        {
          UserId: userid,
          PropertyId: propertyId,
        }
      );
      toast.show({
        type: 'success',
        text1: 'Wishlist added!',
        position: 'bottom',
        bottomOffset:800,
      });
      setLiked(true);
    } catch (error) {
      console.log(error);
    }
  };


  const handelWishList = () => {
    addWishList(userid, propertyId);
  };

  const handleRatingCompleted = async (rating) => {
    try {
      const response = await axios.post(`${APP_API_URL}/property/rate/${userid}/${propertyId}`, {
        rating,
      });
      setUserRating(response.data);
      toast.show("Rating Submitted !",{
        type: 'success',
    animationType:"slide-in",
        position: 'top',
      });
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <View style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Image source={{ uri: mainImage }} style={styles.image} />

          <FlatList
            data={property.image}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setMainImage(item)}>
                <Image source={{ uri: item }} style={styles.smallImage} />
              </TouchableOpacity>
            )}
          />

      <TouchableOpacity onPress={handleCreateRoom}>
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
      </TouchableOpacity>
          <TouchableOpacity style={styles.likeButton} onPress={handelWishList}>
            <AntDesign name={liked ? "heart" : "hearto"} size={24} color={liked ? "red" : "black"} />
          </TouchableOpacity>

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <Text style={styles.title}>{property.Name}</Text>
            <Text style={styles.ratingText}>⭐ {avgRating ? avgRating.toFixed(2) : "No ratings yet"}</Text>
          </View>

          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>
              <EvilIcons name="location" size={26} color="black" /> {property.location}
            </Text>
          </View>

          <Text style={styles.description}>{property.description}</Text>
          <View style={styles.commentsContainer}>
          <Text style={styles.extraTitle}>House Plan Details</Text>
          <View style={styles.propertyDetailsContainer}>
            <View style={styles.propertyDetailItem}>
            <Text>
              {property.Bedroom}  
              <MaterialIcons name="bedroom-parent" size={24} color="black" />
              </Text> 
            </View>
            <View style={styles.propertyDetailItem}> 
              <Text> 
              {property.Bathroom} 
              <FontAwesome name="bath" size={24} color="black" />
              </Text>
           </View>
            <View style={styles.propertyDetailItem}>
           <Text>
            {property.Ac}   
            <MaterialCommunityIcons name="fan-minus" size={24} color="black" />
           </Text> 
           </View>
            <View style={styles.propertyDetailItem}>
            <Text>
              {property.Pool} 
              <FontAwesome5 name="swimming-pool" size={24} color="black" />  
              </Text> 
               </View>
            <View style={styles.propertyDetailItem}>
             <Text>
              {property.person} 
              <FontAwesome6 name="person" size={24} color="black" />
             </Text> 
             </View>
             </View>
          </View>

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.bookButton} onPress={()=>{navigation.navigate('Calender',{property:property})}}>
              <Text style={styles.bookButtonText}>Book Now | {property.Price} Dt</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>Rate this product:</Text>
            <AirbnbRating
      count={5}
      defaultRating={userRating}
      size={20}
      showRating={false}
      onFinishRating={handleRatingCompleted}
    />
          </View>

          <Modal visible={modalVisible} transparent={true} animationType="slide" onRequestClose={closeImageModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Button title="Close" onPress={closeImageModal} />
                {selectedImage && (
                  <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} />
                )}
              </View>
            </View>
          </Modal>

          <View style={styles.commentsContainer}>
            <Text style={styles.commentsTitle}>COMMENTS:</Text>
            <AddComment propertyId={propertyId} />
            <FlatList
              data={property.comments}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <CommentCard comment={item} />}
            />
            <Bottomsheet />
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetails;
