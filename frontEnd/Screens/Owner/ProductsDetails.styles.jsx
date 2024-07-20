import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    width: width,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
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
    textAlign: 'left',
    marginVertical: 10,
    flex: 1,
  },
  locationContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginVertical: 5,
  },
  locationText: {
    fontSize: 16,
    color: '#555',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    color: '#555',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  bookButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  bookButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  likeButton: {
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  commentsTitle:{
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    
  },
  extraTitle:{
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    left:40
  },
  propertyDetailsContainer:{
    display: "flex",
    gap:25,
    flexDirection: "row",
    margin:"auto",
    padding:40,
    left:-10
  },
});