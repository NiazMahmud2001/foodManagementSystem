import { 
    StyleSheet,
    View, 
    Text, 
    Image ,
    TouchableOpacity,
} from 'react-native';
import {Dimensions} from 'react-native'
import React from 'react';
import Loader1 from "../loader/Loader1"
import { useNavigation } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserProfile = ({navigation , route}) => {
    const {cus_name} = route.params
    const {email} = route.params
    const {phone_number} = route.params
    const {points} = route.params
    const {user_name} = route.params
    const {usr_password} = route.params

    const logOut = ()=>{
        navigation.replace("Login")
    }


    return (
        <View style={styles.container}>
            <View  style={styles.subContainer}>
                    <View style= {styles.app_description}>
                        <Text style={styles.inner_app_name_text}>FoodFlow</Text>
                        <TouchableOpacity style={styles.top_location_button} onPress={logOut}>
                            <Text style={styles.top_button_txt_inner}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                    <View style= {{width: windowWidth, height: "80%" , display: "flex", justifyContent: "center", alignItems:"center"}}>
                        <View style= {styles.inner_img_view}>
                            <Image style={styles.tinyLogo}
                                source={require('../../assets/man222.png')}
                            />
                        </View>
                    </View>
            </View>
            <View style={styles.infoPart}>
                <Text style={styles.textStyle}>Name     : {cus_name}</Text>
                <Text style={styles.textStyle}>User Name : {user_name}</Text>
                <Text style={styles.textStyle}>Email    : {email}</Text>
                <Text style={styles.textStyle}>Phone    : {phone_number}</Text>
                <Text style={styles.textStyle}>points   : {points}</Text>
                <Text style={styles.textStyle}>Password : {usr_password}</Text>
            </View>
        </View>
    )
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        width: windowWidth,
        height: windowHeight,
        backgroundColor: "#F1F0F1",
    },
    subContainer:{
        display: "flex",
        width: windowWidth,
        height: windowHeight/3,
    },
    app_description:{
        width: windowWidth-45,
        height: windowHeight/13,
        display: "flex",
        justifyContent: "space-between",
        alignItems:"center",
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
    },
    inner_app_name_text:{
        fontSize: 30,
        color: "black",
        zIndex: 1000,
    },
    top_location_button:{
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 10,
        width: 100, 
        height:50,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
	        width: 2,
	        height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 7,
    },
    inner_img_view:{
        display: "flex",
        justifyContent:"center",
        alignItems:"center",
        width: windowWidth-50,
        height: "100%",
        backgroundColor: "#fff",
        borderRadius: 10
    },
    tinyLogo:{
        width: 130,
        height: 130,
        borderRadius: 100,
        marginLeft: 10,
        borderWidth: 4,
        borderColor: "#e2e2e2"
    },
    infoPart:{
        width: windowWidth,
        height: windowHeight/1.5,
        paddingTop: 40,
        marginLeft: 30
    }, 
    textStyle:{
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 10
    }
})


export default UserProfile