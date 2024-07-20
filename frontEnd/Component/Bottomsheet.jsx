import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,ScrollView} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import CommentCard from '../Screens/Comment/CommentCard';
// import AddComment from '../Screens/AddComment';
import { useRoute, useNavigation } from "@react-navigation/native";

const Bottomsheet= ({propertyid}) => {
  const route = useRoute();
 
  const propertyId = route.params?.propertyid;
  const userid = route.params?.userid;
console.log("prper",propertyId,propertyid);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%',"100%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);


  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <TouchableOpacity onPress={handlePresentModalPress}>
        <Text style={styles.see}>See All </Text>
          </TouchableOpacity>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <ScrollView>

          <BottomSheetView >
            <Text>Comments </Text>
            
            <CommentCard propertyId={propertyId} />              
            {/* <AddComment propertyId={propertyId} userId={userid} /> */}
             
          </BottomSheetView>
          </ScrollView>
        </BottomSheetModal>
      </View>
     </BottomSheetModalProvider>
  );
};
export default Bottomsheet
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    display:"flex"
  },
  containerCard: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    padding: 5,
  },
  container: {
    backgroundColor: '#cedfe4',
    padding: 2,
    borderRadius: 10,
    width:60,
    height:30,
    
    margin:'auto'
    
  },
  see:{
   color:"#000000",
   margin:"auto",
   top:3,
   left:2
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
});
