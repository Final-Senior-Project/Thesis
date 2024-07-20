import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { APP_API_URL } from '../../../env';
import { MaterialIcons, FontAwesome, FontAwesome6, MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';

const ExtraFeatures = () => {
  const route = useRoute();
  const { propertyId } = route.params;
  const navigation = useNavigation();
  const [Bedroom, setBedroom] = useState(0);
  const [Bathroom, setBathroom] = useState(0);
  const [Person, setPerson] = useState(0);
  const [Ac, setAc] = useState('');
  const [Pool, setPool] = useState('');

  const updateExtraFeatures = async () => {
    try {
      const res = await axios.put(`${APP_API_URL}/property/extra/${propertyId}`, {
        Bedroom,
        Bathroom,
        Person,
        Ac,
        Pool,
      });
      console.log('Extra features updated successfully:', res.data);
      navigation.navigate('EditImage', { propertyId });
    } catch (error) {
      console.error('Error updating extra features:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Bedroom</Text>
            <View style={styles.inputRow}>
              <MaterialIcons name="bedroom-parent" size={30} color="#9cc0c9" />
              <TextInput
                style={styles.input}
                placeholder="Bedroom"
                keyboardType="numeric"
                value={Bedroom.toString()}
                onChangeText={(text) => setBedroom(Number(text))}
              />
            </View>
          </View>

          <View style={styles.gridItem}>
            <Text style={styles.label}>Bathroom</Text>
            <View style={styles.inputRow}>
              <FontAwesome name="bath" size={30} color="#9cc0c9" />
              <TextInput
                style={styles.input}
                placeholder="Bathroom"
                keyboardType="numeric"
                value={Bathroom.toString()}
                onChangeText={(text) => setBathroom(Number(text))}
              />
            </View>
          </View>

          <View style={styles.gridItem}>
            <Text style={styles.label}>Person</Text>
            <View style={styles.inputRow}>
              <FontAwesome6 name="person" size={30} color="#9cc0c9" />
              <TextInput
                style={styles.input}
                placeholder="Person"
                keyboardType="numeric"
                value={Person.toString()}
                onChangeText={(text) => setPerson(Number(text))}
              />
            </View>
          </View>

          <View style={styles.gridItem}>
            <Text style={styles.label}>AC</Text>
            <View style={styles.inputRow}>
              <MaterialCommunityIcons name="fan-minus" size={30} color="#9cc0c9" />
              <TextInput
                style={styles.input}
                placeholder="AC (yes or no)"
                value={Ac}
                onChangeText={setAc}
              />
            </View>
          </View>

          <View style={styles.gridItemp}>
            <Text style={styles.labelp}>Pool</Text>
            <View style={styles.inputRow}>
              <FontAwesome5 style={styles.picon}name="swimming-pool" size={30} color="#9cc0c9" />
              <TextInput
                style={styles.inputp}
                placeholder="Pool (yes or no)"
                value={Pool}
                onChangeText={setPool}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={updateExtraFeatures}>
          <Text style={styles.buttonText}>Update <AntDesign name="arrowright" size={24} color="white" /></Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '45%',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4d8790',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 80,
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  labelp:{
    margin:'auto',
    fontSize: 16,
    color: '#000000',
    marginTop: 10,
      },
      inputp:{
        height: 50,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 10,
          textAlign: 'center',
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          flex: 1,
         
         
      },
      gridItemp:{
        margin:'auto',
        width: '50%'
      },
      picon:{
        right:10
        }
});

export default ExtraFeatures;
