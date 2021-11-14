import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';


const COLORS = {
  primary: '#444',
  white: "#fff"
}

export default function App() {
  const [textInput, setTextInput] = React.useState('');
  const [list, setList] = React.useState([{id:1, task:'fist list', completed: true},
  {id:2, task:'second list', completed: false}
]);

// adding new item to list
const addToList = () =>{
  if(textInput == ''){
    Alert.alert("Cannot Add","Add an item first.")
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
    {text:'No'},
    {text:'Yes', onPress: ()=> {setList([])}}
  
])

}

// ListItem's components
const ListItem = ({list}) =>{
  return <View style={styles.listItem}>
          <View style={{flex:1}}>
            <Text style={{fontSize:13,textTransform:'capitalize', 
                color:COLORS.primary, 
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
        <Text style={styles.headerText}>
          Bazar list
        </Text>
        {
          list != '' && <Icon name="delete" size={23} color='red' onPress={()=> clearAllItems() } />
        }
        
      </View>
      {/* === List items === */}
      <FlatList
      contentContainerStyle={{paddingBottom:100}}
      data={list}
      renderItem={({item})=> <ListItem list={item} /> }
      />

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
    elevation:3,
    justifyContent:'center'
  },
  iconContainer:{
    height:50,
    width:50,
    backgroundColor:COLORS.primary,
    borderRadius:25,
    alignItems:"center",
    justifyContent:"center"
  },
  listItem:{
    padding:15,
    elevation:3,
    backgroundColor:COLORS.white,
    flexDirection: 'row',
    marginVertical:7,
    marginHorizontal:15,
    borderRadius:7,
  },
  actionIcon:{
    height:25,
    width:25,
    backgroundColor: 'green',
    borderRadius: 3,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:5
  }
});
