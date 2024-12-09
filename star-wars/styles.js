import { StyleSheet } from "react-native";


export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  listContainer: {
    paddingBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  swipeAction: {
    width: 75,
    height: 100,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain'
  },
  activityIndicator:{
    size:"large",
    color:"#0000ff",
  },
  detailContainer: {
    padding: 20,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
})