import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import { PricingCard, lightColors } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import SessionStorage from "react-native-session-storage";
import Toast from "react-native-toast-message";
import { APP_API_URL } from "../../env";
import { useStripe } from "@stripe/stripe-react-native";

const Subscribe = () => {
  const navigation = useNavigation();
  const [postCount, setPostCount] = useState(0);
  const ownerid = SessionStorage.getItem("ownerid");
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handleSubscription = async (plan) => {
    try {
      if (postCount === 3) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'You can post  !'
        });
        fetchPaymentSheetParams()
      } else {
        if (plan === "Free trial") {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Free trial is only available for the first post.'
          });
          return;
        }

        const res = await axios.post(`${APP_API_URL}/subscribe`, {
          ownerid,
          plan,
        });

        if (res.data.success) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Subscription successful!'
          });

          await fetchPaymentSheetParams(plan);
          await openPaymentSheet();
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Subscription failed. Please try again.'
          });
        }
      }
    } catch (error) {
      console.error("Subscription error", error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred. Please try again.'
      });
    }
  };

  const fetchPaymentSheetParams = async (plan) => {
    try {
      const response = await axios.post(`${APP_API_URL}/payment/${plan}`);
      const { paymentIntent } = response.data;
      const initResponse = await initPaymentSheet({
        merchantDisplayName: 'finalproj',
        paymentIntentClientSecret: paymentIntent,
      });
      if (initResponse.error) {
        console.error('Error initializing payment sheet:', initResponse.error);
        Alert.alert(`Error code: ${initResponse.error.code}`, initResponse.error.message);
      }
    } catch (error) {
      console.error('Error fetching payment sheet params:', error);
    }
  };

  const openPaymentSheet = async () => {
    try {
      const { error } = await presentPaymentSheet();
      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
        console.error("Error presenting payment sheet:", error);
      } else {
        axios
          .get(`${APP_API_URL}/owner/booked/${ownerid}`)
          .then(() => {
            Alert.alert("Payment Successful", "Your payment has been processed successfully!");
            axios.get(`${APP_API_URL}/owner/acceptBooking/${ownerid}`);
          })
          .catch((error) => {
            console.error("Error processing payment:", error);
          });
      }
    } catch (error) {
      console.error("Error presenting payment sheet:", error);
    }
  };
  useEffect(()=>{fetchPaymentSheetParams()},[])

  return (
    <>
      <ScrollView >
        <PricingCard
          color={lightColors.primary}
          title="Free trial"
          price="For Three Posts"
          info={["1 User", "add multiple homes"]}
          button={{
            title: "GET STARTED",
            onPress: () => handleSubscription("Free trial"),
          }}
        />
        <PricingCard
          color={lightColors.secondary}
          title="3 month"
          price="$19"
          info={["1 User", "add multiple homes"]}
          button={{
            title: "GET STARTED",
            onPress: () => handleSubscription("3 month"),
          }}
        />
        <PricingCard
          color={lightColors.secondary}
          title="6 month"
          price="$49"
          info={["1 User", "add multiple homes"]}
          button={{
            title: "GET STARTED",
            onPress: () => handleSubscription("6 month"),
          }}
        />
      </ScrollView>
      <Toast />
    </>
  );
};

export default Subscribe