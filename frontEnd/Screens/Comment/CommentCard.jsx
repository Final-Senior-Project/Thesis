import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APP_API_URL } from '../../env';
import { RefreshControl,StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const CommentCard = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const route = useRoute()
  const propertyId = route.params?.propertyId?route.params?.propertyId:route.params?.propertyid;
  const [comments, setComments] = useState([]);
console.log(propertyId,"property=>>",route.params);
  const getComments = () => {
    axios.get(`${APP_API_URL}/comment/getAll/${propertyId}`)
      .then(res => {
        setComments(res.data);
        console.log('res',res.data[0].user.FirstName);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    getComments();
   

    
   
  }, []);

  return (
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    
    >
      <FlatList
        style={styles.root}
        data={comments}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <ScrollView>

            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <Text style={styles.firstname}> {item.user.FirstName}</Text>
                <Text style={styles.name}>{item.content}</Text>
                <Text style={styles.time}>9:58 am</Text>
              </View>
            </View>
            </ScrollView>
          </View>
        )}
      />   
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ffffff',
    padding: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 10,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: '#ececec',
    marginVertical: 10,
  },
  time: {
    fontSize: 12,
    color: '#6c757d',
    flex: 1,
    textAlign: 'right',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    textAlign: 'center',
    flex: 2,
  },
  firstname: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    flex: 1,
    textAlign: 'left',
  },
});
export default CommentCard;
