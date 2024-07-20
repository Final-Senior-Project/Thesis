import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { EvilIcons } from '@expo/vector-icons';
// import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation,useRoute } from '@react-navigation/native';
import { APP_API_URL } from '../../env';
import SessionStorage from 'react-native-session-storage';
import axios  from 'axios';


const Photo = () => {
  const route=useRoute()
  const  {propertyid}=route.params
  const navigation = useNavigation();
  const ownerid=SessionStorage.getItem('ownerId')
  const [Category, setcategory] = useState('');
  const [OwnershpImg,setOwnershpImg]=useState("")
  const [Extra,setExtra]=useState("")
  const [Property,setProperty]=useState([])
  const product=SessionStorage.getItem('productData')
  const [images,setImages]=useState(["","","","",""])

  console.log("propertyid",
    propertyid
    );

  const updateProperty =async()=>{
    const  res =await axios.put(`${APP_API_URL}/property/image/${propertyid}`,{image:images})
    try {
  console.log("res images",res.data.images);
      setImages(res.data)
console.log("added");
   setProperty(res.data) 
  } catch (error) {
    console.error(error)
  }
}
  const pickImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      var updatedUrls = [...images];
      updatedUrls[index] = result.assets[0].uri;
      setImages(updatedUrls);
    }
  };
const handelAdd=()=>{
  updateProperty()
  navigation.navigate ('HomePage')
}
  return (
    <SafeAreaView>
      <View style={{ marginLeft: 24, marginTop: 80, fontSize: 45, fontWeight: 'bold' }}>
        <Text style={{ fontSize: 35, fontWeight: 'bold' }}>Pick your photos and videos</Text>
        <View style={{ marginTop: 20, marginRight: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 20, marginRight: 10 }}>
            {images.slice(0, 3).map((url, index) => (
              <TouchableOpacity
                style={{
                  borderColor: '#581845',
                  borderWidth: url ? 0 : 2,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 100,
                }}
                key={index}
                onPress={() => pickImage(index)}
              >
                {url ? (
                  <Image source={{ uri: url }} style={{ width: '100%', height: '100%' }} />
                ) : (
                  <EvilIcons name="image" size={24} color="black" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ marginTop: 20, marginRight: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 20, marginRight: 10 }}>
            {images.slice(3).map((url, index) => (
              <TouchableOpacity
                style={{
                  borderColor: '#581845',
                  borderWidth: url ? 0 : 2,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 100,
                }}
                key={index}
                onPress={() => pickImage(index + 3)}
              >
                {url ? (
                  <Image source={{ uri: url }} style={{ width: '100%', height: '100%' }} />
                ) : (
                  <EvilIcons name="image" size={24} color="black" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <TouchableOpacity style={styles.addButton} onPress={handelAdd}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Photo;

const styles = StyleSheet.create({
  addButton: {
    alignSelf: 'center',
    backgroundColor: "#4d8790",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 35,
    marginTop: 150,
    shadowOpacity: 0.2,
    shadowRadius: 5,
   
 
  },
  addButtonText: {
    color: '#fff',
    fontSize: 15,
  },
});
