
import React, { useState  } from 'react';
import { View, TextInput, StyleSheet,  TouchableOpacity,Button } from 'react-native';
import axios from 'axios';
import { APP_API_URL } from '../../env';
import SessionStorage from 'react-native-session-storage';
import Toast from 'react-native-toast-message';
import { FontAwesome } from '@expo/vector-icons';
import { useToast } from 'react-native-fast-toast'

const AddComment = ({ propertyId }) => {
  const toast = useToast()
  const [content, setContent] = useState("");
  const id = SessionStorage.getItem('userid');
  console.log('user ID:', id);
  console.log("test");

  const handleAddComment = async () => {
    console.log("UserID:", id);
    console.log("PropertyID:", propertyId);
    console.log("Content:", content);

    if (id && propertyId && content.trim()) {
      try {
        const res = await axios.post(`${APP_API_URL}/comment/post/${id}/${propertyId}`, { content, userId: id, idProperty: propertyId });
        setContent('')
        toast.show("Comment Added Successfully !",{
          type: 'success',
      animationType:"slide-in",
          position: 'top',
        });
        console.log(res.data, "comment");
      } catch (err) {
        console.error(err);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to add comment',
          position: 'bottom',
        bottomOffset:800,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a comment',
        position: 'bottom',
        bottomOffset:800,
      });
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment"
          value={content}
          onChangeText={setContent}
        />
        <TouchableOpacity onPress={handleAddComment} style={styles.sendButton}>
          <FontAwesome name="send-o" size={22} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#ececec',
    width: '90%',
    flexDirection: 'column',
    margin:'auto'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: 10,
  },
  sendButton: {
    padding: 10,
  },
});

export default AddComment;
