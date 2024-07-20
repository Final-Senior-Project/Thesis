import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },propertyItem: {
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
    borderRadius: 30,
    marginRight: 10,
  },
  propertyDetails: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    top:8
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  propertyLocation: {
    marginBottom: 5,
  },
  propertyPrice: {
    color: "#00796b",
    top:-10
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButton: {
    backgroundColor: "#ff6b6b",
    borderRadius: 8,
    padding: 8,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default styles;
