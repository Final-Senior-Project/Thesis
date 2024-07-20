import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { APP_API_URL } from "../../env";
import { useNavigation } from "@react-navigation/native";
import SessionStorage from "react-native-session-storage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const AllPropertiesPage = () => {
  const navigation = useNavigation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const userid = SessionStorage.getItem("userid");

  const fetchProperties = () => {
    fetch(`${APP_API_URL}/property/getAll`)
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {properties.map((property) => (
        <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetails", {
            propertyid: property.id,
            userid: userid,
          })}
        >
        <View key={property.id} style={styles.propertyItem}>
          <Image
            style={styles.propertyImage}
            source={{ uri: property.image[0] }}
            />
          <View style={styles.propertyDetails}>
            <Text style={styles.propertyTitle}>{property.Name}</Text>
            
            <Text style={styles.propertyLocation}>
                    <MaterialIcons name="location-pin" size={18} color="grey" />
                    {property.location}
                  </Text>
            <Text style={styles.propertyPrice}>
              dt {property.Price} / Visit
            </Text>
          </View>
        </View>
            </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  propertyItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 1,
  },
  propertyImage: {
    width: 150,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  propertyDetails: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  propertyLocation: {
    marginBottom: 5,
  },
  propertyPrice: {
    color: "#00796b",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AllPropertiesPage;
