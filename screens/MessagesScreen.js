

import React,{useContext} from "react";
import {View,Text,StyleSheet} from 'react-native'
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";

const MessagesScreen = ()=>{
   
    return(
        <View style = {styles.container}>
            <Text>This screen is under construction</Text>
        </View>
    )
}

export default MessagesScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
       
    }
})