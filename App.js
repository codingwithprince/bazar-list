import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AutoScrollFlatList} from "react-native-autoscroll-flatlist";
import { Alert, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View, Image } from 'react-native';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

const COLORS = {
  primary: '#444',
  white: "#fff"
}

// interstitial ad
const interstitial = async () =>{
  await AdMobInterstitial.setAdUnitID('ca-app-pub-5240090040309390/3240091686');
  try{
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
  }catch (error){
    console.log(error)
  }
  
}


export default function App() {
  const [textInput, setTextInput] = React.useState('');
  const [list, setList] = React.useState([]);

React.useEffect(()=>{
  getListFromUserDevice(list);
}, [])

React.useEffect(()=>{
  saveListToUsersDevice(list);
},[list])


// saving list items to users device
const saveListToUsersDevice = async list =>{
  try{
    const stringifyList = JSON.stringify(list);
    await AsyncStorage.setItem('lists', stringifyList);
  }
  catch(e){
    console.log("Trouble from saving list to devices.",e);
  }
  
}

const getListFromUserDevice = async () =>{
  try{
    const lists = await AsyncStorage.getItem('lists');
    if(lists != null){
      setList(JSON.parse(lists))
    }
  } catch (error){
    console.log('trouble in getting lists from user devices.',error);
  }
}



// adding new item to list
const addToList = () =>{
  if(textInput == ''){
    Alert.alert("Sorry","Add an item first :)")
  } else{
    const newList = {
      id: Math.random(),
      task: textInput,
      completed: false
    }
    setList([...list, newList]);
    setTextInput('')
  } 
}

// marking item complete
const markItemComplete = (itemId) =>{
  const newLists = list.map(item=>{
      if(item.id == itemId){
        return{...item,completed:true}
      }
      return item;
  })
  setList(newLists)
}

// deleting item form list
const deleteItem = (itemId) =>{
  const newLists = list.filter( item => item.id != itemId);
  setList(newLists)
}

// clear all items form list
const clearAllItems = () =>{
  Alert.alert('Confirm', 'Are you sure? You want to delete all items.', 
  [
    {text:'No', onPress: ()=> {
      interstitial();
    
    }},
    {text:'Yes', onPress: ()=> {
      setList([]);
       interstitial();
      }}
  
])
}



// ListItem's components
const ListItem = ({list}) =>{
  return <View style={styles.listItem}>
          <View style={{flex:1}}>
            <Text style={{fontSize:15,textTransform:'capitalize', 
                color:COLORS.primary, 
                fontWeight:'normal',
                textDecorationLine: list?.completed?"line-through":"none"}}
                >{list?.task}</Text>
          </View>
          {/* === checking if list is already completed */}
          {!list.completed &&   <TouchableOpacity style={[styles.actionIcon]} onPress={()=> markItemComplete(list?.id)}>
            <Icon name="done" size={20} color={COLORS.white} />
          </TouchableOpacity>}
        
          <TouchableOpacity style={[styles.actionIcon, {backgroundColor:'red'}]} onPress={()=> deleteItem(list?.id)}>
            <Icon name="delete" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
}
  return (
    <SafeAreaView style={styles.container}>
      {/* === header === */}
      <View style={styles.header}>
        <View style={styles.logoWithTextWrapper}>
          <Image style={{height:40, width:40}} source={require('./assets/icon.png')} />
          <Text style={styles.headerText} >Bazar List</Text>
        </View>
        {
          list != '' && <Icon  name="delete" size={23} color='red' onPress={()=> clearAllItems() } />
        }
      </View>
      {/* === only when list is empty === */}

      {
        list == '' &&  <View style={styles.emptyContainer}> 
                          <Image style={styles.addItemLogo} source={require('./assets/box.png')} />
                          <Text style={{fontSize: 20, color: '#555', marginVertical:10}}>No Items</Text>
                          <Text  style={{fontSize: 12, color: '#444', marginVertical:10, position:'absolute', bottom:0}}>Made By Prince</Text>
                       </View>
      }
     
      {/* === List items === */}
      
      <AutoScrollFlatList
          showsVerticalScrollIndicator={false}
          data={list}
          renderItem={({item})=> <ListItem list={item} /> }
          contentContainerStyle={{paddingBottom:30}}
      />

    <AdMobBanner
      style={{marginBottom:80}}
      bannerSize="fullBanner"
      adUnitID="ca-app-pub-5240090040309390/2963268826" 
      onDidFailToReceiveAdWithError={(e)=> console.log(e)} />
    

      {/* === footer === */}
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput 
            value={textInput}
            onChangeText={(text)=>setTextInput(text)}
            placeholder='Add your item.' />
          </View>
          <TouchableOpacity onPress={()=>{addToList()}}>
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
    marginTop:25,
    flex: 1,
    backgroundColor: '#222',
    color:'#fff'
  },
  logoWithTextWrapper:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  header:{
    alignItems:'center',
    paddingVertical:10,
    paddingHorizontal:13,
    marginTop:0,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#ffdd00',
    elevation:10,
  },
  headerText:{
    fontSize:17,
    fontWeight: 'bold',
    color: COLORS.primary,
    paddingLeft:10
  },
  footer:{
    width:'100%',
    position:"absolute",
    bottom:0,
    backgroundColor: '#333',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal: 12,
    paddingBottom:10,
    marginVertical:0
  },
  inputContainer:{
    height:50,
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal:20,
    marginVertical: 10,
    marginRight:10,
    borderRadius:30,
    elevation:3,
    justifyContent:'center'
  },
  iconContainer:{
    height:50,
    width:50,
    backgroundColor:'#43b65c',
    borderRadius:25,
    alignItems:"center",
    justifyContent:"center",
    elevation:10
  },
  listItem:{
    padding:15,
    elevation:3,
    backgroundColor:'#FFFAF7',
    flexDirection: 'row',
    marginVertical:6,
    marginHorizontal:15,
    borderRadius:7,
  },
  actionIcon:{
    height:25,
    width:25,
    backgroundColor: '#43b65c',
    borderRadius: 3,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:5
  },
  emptyContainer:{
    flex:2,
    alignItems:'center',
    justifyContent:'center',
  },
  addItemLogo:{
    height:100,
    width:100,
    opacity:0.5
  }
});
