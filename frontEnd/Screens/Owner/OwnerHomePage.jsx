



import React, { useEffect, useState, useCallback } from "react";
import {
  RefreshControl,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons,MaterialCommunityIcons,FontAwesome5} from "@expo/vector-icons";
import { APP_API_URL } from "../../env";
import SessionStorage from "react-native-session-storage";
import Toast from "react-native-toast-message";


const OwnerHomePage = () => {
  
  const navigation = useNavigation();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const ownerid = SessionStorage.getItem("ownerid");
  const [showFilteredProperties, setShowFilteredProperties] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const fetchOwnerProperties = () => {
    fetch(`${APP_API_URL}/property/getAll/${ownerid}`)
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Error fetching properties',
          position: 'bottom',
        bottomOffset:800,
        });
      });
  };

  const search = () => {
    try {
      const filteredData = properties.filter((property) =>
        property.Name.toLowerCase().includes(searchKey.toLowerCase())
      );
      setFilteredProperties(filteredData);
      setShowFilteredProperties(true);
    } catch (error) {
      console.error('Error while searching:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Error while searching',
        position: 'bottom',
        bottomOffset:800,
      });
    }
  };

  useEffect(() => {
    fetchOwnerProperties();
  }, [refreshing]);

  const handleUpdateProperty = (property) => {
    setLoading(true);
    fetch(`${APP_API_URL}/property/update/${2}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(property),
    })
      .then((response) => response.json())
      .then(() => {
        setLoading(false);
        fetchOwnerProperties();
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Property updated successfully',
          position: 'bottom',
          bottomOffset:800,
        });
      })
      .catch((error) => {
        console.error("Error updating property:", error);
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Error updating property',
          position: 'bottom',
          bottomOffset:800,
        });
      });
  };

  const handleDeleteProperty = (propertyId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this property?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setLoading(true);
            fetch(`${APP_API_URL}/property/delet/${propertyId}`, {
              method: "DELETE",
            })
              .then(() => {
                setLoading(false);
                alert("Property deleted successfully!");
                fetchOwnerProperties();
              })
              .catch((error) => {
                console.error("Error deleting property:", error);
                setLoading(false);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Ionicons name="location-outline" size={20} color="#000" />
        <Text style={styles.locationText}>Tunisie</Text>
        <Ionicons name="chevron-down-outline" size={20} color="#000" />

        <Ionicons
          name="notifications-outline"
          size={20}
          color="#000"
          style={styles.headerIcon}
        />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchKey}
          onChangeText={setSearchKey}
        />
        <TouchableOpacity onPress={search}>
          <Ionicons name="search-outline" size={20} color="#000" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.tripsSection}>
        <View style={styles.tripsHeader}>
          <Text style={styles.sectionTitle}>Your Offers</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Subscribe")}>
            <Text style={styles.seeAllText}>Add New Property</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View>
          {showFilteredProperties ? (
          filteredProperties.map((property) => (
            <View key={property.id} style={styles.propertyItem}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProductsDetails", {
                    propertyid: property.id,
                    userid: userid,
                  })
                }
              >
                <Image
                  style={styles.propertyImage}
                  source={{ uri: property.image[0] }}
                />
                <View style={styles.propertyDetails}>
                  <Text style={styles.propertyTitle}>{property.Name}</Text>
                  <Text style={styles.propertyLocation}>
                    <MaterialIcons name="location-pin" size={18} color="grey" />
                    <MaterialIcons name="location-pin" size={18} color="grey" />
                    {property.location}
                  </Text>
                  <Text style={styles.propertyPrice}>
                    dt {property.Price} / Visit
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          properties.map((property) => (
            <View key={property.id} style={styles.propertyItem}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProductsDetails", {
                    propertyid: property.id,
                    // userId: userId,
                  })
                }
              >
                <Image style={styles.propertyImage} source={{ uri: property.image[0] }} />
                <View style={styles.propertyDetails}>
                  <Text style={styles.propertyTitle}>{property.Name}</Text>
                  <Text style={styles.propertyLocation}>
                    <MaterialIcons name="location-pin" size={18} color="grey" />
                    {property.location}
                  </Text>
                  <Text style={styles.propertyPrice}> {property.Price} dt / Visit</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.updateprop}
                  onPress={() => navigation.navigate("EditProperty",{propertyId:property.id})}
                >
                  <Text style={styles.buttonText}><MaterialCommunityIcons name="home-edit-outline" size={24} color="#999999" /></Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.updateprop}
                  onPress={() => handleDeleteProperty(property.id)}
                >
                  <Text style={styles.buttonTextt}><FontAwesome5 name="trash-alt" size={19} color="#999999" /></Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
   
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  locationText: {
    flex: 1,
    marginLeft: 5,
    fontSize: 16,
  },
  headerIcon: {
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchIcon: {
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tripsSection: {
    marginBottom: 20,
  },
  tripsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  seeAllText: {
    fontSize: 16,
    color: "#C0C0C0",
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
    borderRadius: 20,
    marginRight: 10,
  },
  propertyDetails: {
    flex: 1,
    position: 'absolute',
    left: 165,
    top: '10%'
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  propertyLocation: {
    flexDirection: "row",
    alignItems: "center",
    color: "grey",
    fontSize: 14,
  },
  propertyPrice: {
    color: "#00796b",
    marginTop: 5,
    fontSize: 14,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  editContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  updateButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    position: 'absolute',
    left: 145,
    top: '15%',
    marginBottom: 5,
  },
  buttonTextt: {
    position: 'absolute',
    left: 145,
    bottom: '18%',
    marginBottom: 5,
    
  },
  updateprop: {
    marginLeft: 8,
    
  },
 
});

export default OwnerHomePage;
