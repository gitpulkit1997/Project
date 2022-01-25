import React,{useContext} from "react";
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";

const ProfileScreen = ()=>{
    const {user, logout} = useContext(AuthContext)
   
    return(
        <View style = {styles.container}>
            <Text>Welcome user : {user.uid}</Text>
            <FormButton buttonTitle = "logout" color="#de4d41" backgroundColor="#f5e7ea" onPress={() => logout()}>
            </FormButton>
        </View>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:20
       
    },
    userBtnTxt: {
        color: '#2e64e5',
      },
})