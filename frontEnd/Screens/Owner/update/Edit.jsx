import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { APP_API_URL } from '../../../env';

const Edit = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { propertyId } = route.params; 
  const [Name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [Price, setPrice] = useState('');

  useEffect(() => {
    // fetchData(5);
  }, []);

  // const fetchData = async (id) => {
  //   try {
  //     const response = await axios.get(`${APP_API_URL}/property/${5}`);
  //     const { Name, description, location, Price } = response.data;
  //     setName(Name);
  //     setDescription(description);
  //     setLocation(location);
  //     setPrice(Price.toString()); 
  //   } catch (error) {
  //     console.error('Error fetching property data:', error);
      
  //   }
  // };

  const updateProperty = async () => {
    try {
      const res = await axios.put(`${APP_API_URL}/property/up/${propertyId}`, {
        Name,
        Price: parseFloat(Price), 
        description,
        location,
      });
      
      console.log('Property updated successfully:', res.data);
      navigation.navigate('EditExtra',{propertyId:propertyId});
    } catch (error) {
      console.error('Error updating property:', error);
      
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter property name"
            value={Name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Enter property description"
            multiline
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.label}>Location</Text>
          <TextInput
            style={[styles.input]}
            placeholder="Enter property location"
            multiline
            value={location}
            onChangeText={setLocation}
          />

          <Text style={styles.label}>Price</Text>
          
          <TextInput
            style={styles.priceContainer}
            placeholder="$ Enter Your Price"
            keyboardType="numeric"
            value={Price}
            onChangeText={setPrice}
          />
          
        </View>

        <TouchableOpacity style={styles.button} onPress={updateProperty}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#f9f9f9',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 17,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  descriptionInput: {
    height: 100,
    marginBottom: 10,
  },
  button: {
    alignSelf: 'flex-end',
    backgroundColor: '#4d8790',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 5,
    backgroundColor: '#fff',
    width:150
  },
});

export default Edit;
