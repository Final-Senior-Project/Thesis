
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { APP_API_URL } from '../../env';
import { useStripe } from "@stripe/stripe-react-native";
import SessionStorage from 'react-native-session-storage';
import Toast from 'react-native-toast-message';
import { useRoute, useNavigation } from "@react-navigation/native";
import { useToast } from 'react-native-fast-toast'

const Calender = () => {
  const toast = useToast()
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedDate, setSelectedDate] = useState(false);
  const [date, setDate] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const userId = SessionStorage.getItem("userId");
  const propertyId = SessionStorage.getItem("propertyId");
  const route = useRoute()
  const {property}=route.params
  console.log("price",property);
  const getBooking = async () => {
    try {
      const res = await axios.get(`${APP_API_URL}/Booking/get`);
      setDate(res.data);
      console.log("date", res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const addBooking = async ({ checkIn, checkOut, userId, propertyId }) => {
    try {
      const res = await axios.post(`${APP_API_URL}/Booking/add/${userId}/${propertyId}`, {
        checkIn,
        checkOut,
        userId,
        propertyId
      });
      setSelectedDate(true);
      setCheckIn(res.data.checkIn);
      setCheckOut(res.data.checkOut);
      console.log('booked', res.data);
    } catch (error) {
      console.error("Error adding booking:", error);
    }
  };

  const calculatePrice = (checkIn, checkOut) => {
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const days = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1; 
    const pricePerDay = property.Price; 
    return days * pricePerDay;
  };

  const onDayPress = (day) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(day.dateString);
      setCheckOut("");
      setSelectedDate(false);
      console.log("dayfirst", day);
    } else {
      setCheckOut(day.dateString);
      console.log("day", day);
      const totalPrice = calculatePrice(checkIn, day.dateString);
      setTotalPrice(totalPrice);
      addBooking({ checkIn, checkOut: day.dateString, userId, propertyId });
    }
  };

  const getMarkedDates = () => {
    let markedDates = {};

    date.forEach(booking => {
      let currentDate = new Date(booking.checkIn);
      const endDate = new Date(booking.checkOut);

      while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split('T')[0];
        markedDates[dateString] = {
          color: 'gray',
          textColor: 'white',
          disabled: true,
          disableTouchEvent: true,
        };
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    if (checkIn) {
      markedDates[checkIn] = {
        startingDay: true,
        color: 'lightblue',
        textColor: 'gray',
      };
    }

    if (checkOut) {
      markedDates[checkOut] = {
        endingDay: true,
        color: 'lightblue',
        textColor: 'gray',
      };
    }

    if (checkIn && checkOut) {
      let currentDate = new Date(checkIn);
      const endDate = new Date(checkOut);

      while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split('T')[0];
        if (dateString !== checkIn && dateString !== checkOut) {
          markedDates[dateString] = {
            color: 'lightblue',
            textColor: 'gray',
            disabled: selectedDate,
            disableTouchEvent: selectedDate,
          };
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    return markedDates;
  };

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await axios.post(`${APP_API_URL}/payment/${totalPrice}`);
      const { paymentIntent } = response.data;
      const initResponse = await initPaymentSheet({
        merchantDisplayName: 'finalproj',
        paymentIntentClientSecret: paymentIntent,
      });
      if (initResponse.error) {
        console.error('Error initializing payment sheet:', initResponse.error);
        alert(`Error code: ${initResponse.error.code}`, initResponse.error.message);
      }
    } catch (error) {
      console.error('Error fetching payment sheet params:', error);
    }
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
          .get(`${APP_API_URL}/owner/booked/${userId}`)
          .then(() => {
            toast.show("payment successfully !",{
              type: 'success',
          animationType:"slide-in",
              position: 'top',
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

  useEffect(() => {
    getBooking();
    if (checkIn && checkOut) {
      fetchPaymentSheetParams();
    }
  }, [checkIn, checkOut]);

  return (
    <View>
      <Calendar
        onDayPress={onDayPress}
        markingType='period'
        markedDates={getMarkedDates()}
      />
      <TouchableOpacity 
        onPress={() => {
          if (totalPrice > 0) {
            openPaymentSheet();
          } else {
            alert('Please select check-in and check-out dates.');
          }
        }} 
        style={{  backgroundColor: '#4d8790',
          paddingVertical: 15,
          paddingHorizontal: 60,
          borderRadius: 100,
          marginTop:70,
          margin:"auto" }}
      >
        <Text style={styles.booktext} >Book Now {totalPrice} Dt</Text>
      </TouchableOpacity>
      <Text></Text>
    </View>
  );
};

export default Calender;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4d8790',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 100,
    marginLeft: 66,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
