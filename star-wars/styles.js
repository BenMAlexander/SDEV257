import { StyleSheet } from "react-native";


export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  networkMessage: {
    backgroundColor: '#ffcccb',
    padding: 10,
  },
  networkText: {
    color: '#d9534f',
    textAlign: 'center',
  },
  contentText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
  
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
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
  searchContainer: {
    marginBottom: 20,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain'
  },
  listContainer: {
    paddingBottom: 20,
  },
  activityIndicator:{
    size:"large",
    color:"#0000ff",
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
})