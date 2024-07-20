import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 13,
  },
  smallImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  ratingText: {
    fontSize: 18,
    color: '#888',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    fontSize: 16,
    color: '#888',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: '#444',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,

  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  bookButton: {
    backgroundColor: '#4d8790',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 100,

    marginLeft:66,

    marginTop: 2,
    margin:'auto',
    right:15,
   margin:"auto"
  },

  bookButtonText: {
    fontSize:15,
    color: '#fff',
    fontWeight: 'bold',

  },
  likeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 50,
    padding: 5,
  },
  ratingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  fullScreenImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },

  commentsContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
  },
  commentsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  propertyDetailsContainer:{
    display: "flex",
    gap:25,
    flexDirection: "row",
    margin:"auto",
    padding:40,
    left:-10
  },
  extraTitle:{
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});