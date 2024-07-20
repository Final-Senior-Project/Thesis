import React, { useEffect, useState } from "react";
import { RefreshControl, View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator, Dimensions } from "react-native";
import { useRoute,useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { APP_API_URL } from "../../env";
import SessionStorage from "react-native-session-storage";
import axios from "axios";

const HomePage = () => {
  
  const navigation = useNavigation();
  const route = useRoute();
  const propertyId = route.params?.propertyid;
 
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [rated, setRated] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [liked, setLiked] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  
  const addWishList = async (userid, propertyId) => {
    try {
      const res = await axios.post(
        `${APP_API_URL}/wishlist/add/${propertyId}/${userid}`,
        {
          UserId: userid,
          PropertyId: propertyId,
        }
      );
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Wishlist added'
      });
      setLiked(true);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add wishlist'
      });
    }
  };

  const handelWishList = () => {
    addWishList(userid, propertyId);
  };


  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchProperties();
      setRefreshing(false);
    }, 2000);
  };

  const userid = SessionStorage.getItem("userid");

  const fetchProperties = async () => {
    try {
      const response = await fetch(`${APP_API_URL}/property/getAll`);
      const data = await response.json();
      setProperties(data);
      setFilteredProperties(data);
      console.log("data", data);
      SessionStorage.setItem("ownerid", data[0]?.ownerid);
      console.log('prop', data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setLoading(false);
    }
  }

  const getProperty = async () => {
    try {
      const response = await fetch(`${APP_API_URL}/property/getAll`);
      const data = await response.json();
      const filteredData = data.filter((property) => property.rating > 3);
      setRated(filteredData);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setLoading(false);
    }
  };
  const search = () => {
    try {
      const filteredData = properties.filter((property) => 
        property.Name.toLowerCase().includes(searchKey.toLowerCase())
      );
      setFilteredProperties(filteredData);
    } catch (error) {
      console.error('Error while searching:', error);
    }
  };

  useEffect(() => {
    fetchProperties();
    getProperty();
  }, [refreshing]);

  const navigateToCategory = (category) => {
    navigation.navigate("FilteredProperties", { category });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Ionicons name="location-outline" size={20} color="#000" />
        <Text style={styles.locationText}>Tunisie</Text>
        <Ionicons name="chevron-down-outline" size={20} color="#000" />

        <Ionicons name="notifications-outline" size={20} color="#000" style={styles.headerIcon} />
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
      <View style={styles.categories}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.categoryItem} onPress={() => navigateToCategory("House")}>
            <Text style={styles.categoryText}>
              <FontAwesome6 name="house" size={18} color="black" /> House
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem} onPress={() => navigateToCategory("Apartment")}>
            <Text style={styles.categoryText}>
              <MaterialIcons name="apartment" size={20} color="black" /> Apartment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem} onPress={() => navigateToCategory("Traditionnel House")}>
            <Text style={styles.categoryText}>
              <MaterialCommunityIcons name="hoop-house" size={24} color="black" /> Traditionnel House
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem} onPress={() => navigateToCategory("Guest House")}>
            <Text style={styles.categoryText}>
              <MaterialCommunityIcons name="greenhouse" size={24} color="black" /> Guest House
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.tripsSection}>
        <View style={styles.tripsHeader}>
          <Text style={styles.sectionTitle}>
            {userRole === "owner" ? "Your Properties" : "Popular"}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("AllProperties")}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {rated.slice(0, 5).map((property) => (
            <View key={property.id} style={styles.tripItem}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProductDetails", {
                    propertyId: property.id,
                    userid: userid,
                  })
                }
              >
                <Image
                  style={styles.tripImage}
                  source={{ uri: property.image[0] }}
                />
                <Text style={styles.tripTitle}>{property.Name}</Text>
                <Text style={styles.tripLocation}>
                  <MaterialIcons name="location-pin" size={18} color="grey" />
                  {property.location}
                </Text>
                <Text style={styles.tripPrice}>
                   {property.Price} dt / Visit{" "}
                  <TouchableOpacity style={styles.likeButton} onPress={handelWishList}  >
                  <Ionicons name="heart-outline" size={20} color="#000" style={styles.heart} />
                  </TouchableOpacity>
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.tripsHeader}>
        <Text style={styles.sectionTitle}>New Offers</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AllProperties")}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <View>
        {searchKey ? (
          filteredProperties.map((property) => (
            <View key={property.id} style={styles.propertyItem}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProductDetails", {
                    propertyId: property.id,
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
                    {property.location}
                  </Text>
                  <Text style={styles.propertyPrice}>
                    dt {property.Price} / Visit{" "}
                    <TouchableOpacity onPress={handelWishList}  >
                    <Ionicons 
                      name="heart-outline"
                      size={20}
                      color="#000"
                      style={styles.heart}
                    />
                    </TouchableOpacity>
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
                  navigation.navigate("ProductDetails", {
                    propertyId: property.id,
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
                    {property.location}
                  </Text>
                  <Text style={styles.propertyPrice}>
                     {property.Price} dt / Visit{" "}
                     
                      <Ionicons
                      name="heart-outline"
                      size={20}
                      color="#000"
                      style={styles.heart}
                    />
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
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
  categories: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    
  },
  categoryItem: {
    backgroundColor: '#deeaed',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
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
  seeAllText: {
    fontSize: 16,
    color: "#b3b3b3",
  },
  tripItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 150,
    
  },
  tripImage: {
    width: 150,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tripLocation: {
    color: '#757575',
    marginBottom: 5,
  },
  tripPrice: {
    color: '#00796b',
  },
  propertyItem: {
    flexDirection: "row",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    
  },
  propertyImage: {
    width: 140,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  propertyDetails: {
    flex: 1,
    
    position:'absolute',
    left:165,
    top:'10%'
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  propertyLocation: {
    flexDirection: "row",
    alignItems: "center",
    color: "grey",
  },
  propertyPrice: {
    fontSize: 14,
    color:"#4d8790"
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heart:{
    flex: 1,

    position:'absolute',
    left:40,
    bottom:'10%'
  }
});

export default HomePage;
