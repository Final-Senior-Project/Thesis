import React, {useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  RefreshControl,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { styles } from "./ProductsDetails.styles";
import { AntDesign,MaterialIcons,FontAwesome5,FontAwesome6,MaterialCommunityIcons,FontAwesome  } from "@expo/vector-icons";
import axios from "axios";
import { useStripe } from "@stripe/stripe-react-native";
import { APP_API_URL } from "../../env";
import { useRoute, useNavigation } from "@react-navigation/native";
import SessionStorage from "react-native-session-storage";
import Bottomsheet from "../../Component/Bottomsheet";
import { AirbnbRating } from "react-native-ratings";
import { Ionicons } from '@expo/vector-icons';
import { io } from 'socket.io-client';
import Toast from 'react-native-toast-message';

const ProductsDetails = ({ deleteProduct, switchView, isOwner }) => {
  const navigation = useNavigation();
  const socket = io('http://192.168.11.174:3000');
  const route = useRoute();
  const propertyid = route.params?.propertyid;
  const userid = route.params?.userId;
  const [property, setProperty] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [liked, setLiked] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [avgRating, setAvgRating] = useState(null);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const fetchPaymentSheetParams = async () => {
    const response = await axios.post(`${APP_API_URL}/payment/${222}`);
    const { paymentIntent } = response.data;
    const initResponse = initPaymentSheet({
      merchantDisplayName: "finalproj",
      paymentIntentClientSecret: paymentIntent,
    });
    return initResponse;
  };

  const handleCreateRoom = () => {
    socket.emit('createRoom', "roomsList");
  };

  const openPaymentSheet = async () => {
    try {
      const { error } = await presentPaymentSheet();
      if (error) {
        Toast.show({
          type: 'error',
          text1: `Error code: ${error.code}`,
          text2: error.message,
        });
        console.error("Error presenting payment sheet:", error);
      } else {
        axios
          .get(`${APP_API_URL}/owner/booked/${userid}`)
          .then(() => {
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: 'Your payment has been processed successfully!',
              position: 'bottom',
              bottomOffset:800,
            });
          })
          .catch((error) => {
            console.error("Error processing payment:", error);
          });
      }
    } catch (error) {
      console.error("Error presenting payment sheet:", error);
    }
  };

  const getPropertyRating = async (id) => {
    try {
      const res = await axios.get(`${APP_API_URL}/property/rate/${id}`);
      setAvgRating(res.data.avgRating);
    } catch (err) {
      console.log(err);
    }
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
    if (propertyid) {
      getProperty(propertyid);
      getPropertyRating(propertyid);
    }
    // fetchPaymentSheetParams();
  }, []);

  const openImageModal = (img) => {
    setSelectedImage(img);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
    <TouchableOpacity
      onPress={() => {
        handleCreateRoom();
        navigation.navigate("ownerchats",{userid});
      }}
    >
    <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
    </TouchableOpacity>
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
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <Text style={styles.title}>{property.Name}</Text>
            <Text style={styles.ratingText}>⭐ {avgRating ? avgRating.toFixed(2) : "No ratings yet"}</Text>
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

          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>
              <EvilIcons name="location" size={26} color="black" /> {property.location}
            </Text>
          </View>

          <Text style={styles.description}>{property.description}</Text>

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
            <Text style={styles.commentsTitle}>Comments:</Text>
          </View>

          <Bottomsheet propertyid={propertyid}/>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductsDetails;

