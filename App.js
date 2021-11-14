import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


const COLORS = {
  primary: '#444',
  white: "#fff"
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* === header === */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Today's Task
        </Text>
        <Icon name="delete" size={23} color='red' />
      </View>

      {/* === footer === */}
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput style={{marginTop:10}} placeholder='Add your task.' />
        </View>
        <TouchableOpacity>
          <View style={styles.iconContainer}>
            <Icon name="add" color="#fff" size={25} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    flex: 1,
    backgroundColor: COLORS.white
  },
  header:{
    alignItems:'center',
    padding:15,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  headerText:{
    fontSize:20,
    fontWeight: 'bold',
    color: COLORS.primary
  },
  footer:{
    width:'100%',
    position:"absolute",
    bottom:0,
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal: 20
  },
  inputContainer:{
    height:50,
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal:20,
    marginVertical: 20,
    marginRight:20,
    borderRadius:30,
    elevation:3
  },
  iconContainer:{
    height:50,
    width:50,
    backgroundColor:COLORS.primary,
    borderRadius:25,
    alignItems:"center",
    justifyContent:"center"
  }
});
