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
import { useNavigation, useRoute } from "@react-navigation/native";
import { APP_API_URL } from "../../env";
import SessionStorage from "react-native-session-storage";
import { MaterialIcons } from "@expo/vector-icons";

const FilteredProperties = () => {
  const navigation = useNavigation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { category } = route.params;
  const userid = SessionStorage.getItem("userid");
  const fetchProperties = () => {
    fetch(`${APP_API_URL}/property/getAll`)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (property) => property.category === category
        );
        setProperties(filteredData);
        setLoading(false);
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
        <TouchableOpacity onPress={() =>
          navigation.navigate("ProductDetails", {
            propertyid: property.id,
            userid: userid,
          })}>

        <View key={property.id} style={styles.propertyItem}>
          <Image
            style={styles.propertyImage}
            source={{ uri: property.image[0] }}
            />
          <View style={styles.propertyInfo}>
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  propertyItem: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  propertyImage: {
    width: 150,
    height: 100,
    borderRadius: 30,
    marginRight: 10,
  },
  propertyInfo: {
    flex: 1,
    justifyContent: "center",
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  propertyLocation: {
    color: "#757575",
    marginBottom: 5,
  },
  propertyPrice: {
    color: "#00796b",
  },
});

export default FilteredProperties;
