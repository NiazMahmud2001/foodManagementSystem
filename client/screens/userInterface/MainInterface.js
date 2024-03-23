import { 
    StyleSheet,
    View, 
    Text, 
    TouchableOpacity, 
    Image , 
    ScrollView,
    Platform, 
    Share,
    Alert
} from 'react-native';
import React, { useState, useEffect, useRef } from "react";
import {Dimensions} from 'react-native';
import { useFonts } from 'expo-font';
import Loader1 from "../loader/Loader1"
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as Assets from 'expo-asset';
import axios from "axios";

import { Dropdown } from 'react-native-element-dropdown'; //for drop down-box

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//here try "ocrSpace" with the link "https://www.npmjs.com/package/ocr-space-api-wrapper" 
//before that  you need to capture picture. 

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
});

const Food_component = props =>{
    return (
        <View style={styles.reusable_component}>
            <View style={styles.reusable_left}>
                <Text style={styles.reusable_left_txt}>{props.food_name}</Text>
                <Text style={styles.reusable_left_txt}>ID: {props.food_id}</Text>
            </View>
            <View style={styles.reusable_right}>
                <View style={[styles.reusable_exp_date,{backgroundColor:props.bgColor, borderRadius: 10}]}>
                    <Text style={{
                        fontFamily: "Ubuntu_Medium", 
                        fontSize: 12, 
                        borderRadius:10
                    }}>EXP: {props.exp_date}</Text>
                </View>
                <TouchableOpacity style={styles.reusable_logo} onPress={()=>{
                    props.navigation.navigate("EditFoodInfo" , {
                        nameIntFace: props.food_name,
                        idIntFace: props.food_id,
                        expDateIntFace: props.exp_date,
                        quantityIntFace: props.quantity,
                        weightIntFace: props.weight,
                        keyIntFace: props.keys, 
                        email: props.email,
                        phone: props.phone,
                        ip : props.ip , 
                        port : props.port,
                        points: props.points,
                        userNName: props.userNName
                    })
                }}>
                    <Image style={styles.reusable_logo_inner}
                        source={require('../../assets/add_icon.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const ImgComponent = props =>{

    if(props.point < 500 && props.point>=0){
        return(
            <Image style={styles.badge_logo}
                source={require(`../../assets/levels/level_1.png`)}
            />
        )
    }else if(props.point < 1000 && props.point>=500){
        return(
            <Image style={styles.badge_logo}
                source={require(`../../assets/levels/level_2.png`)}
            />
        )
    }else if(props.point < 1500 && props.point>=1000){
        return(
            <Image style={styles.badge_logo}
                source={require(`../../assets/levels/level_3.png`)}
            />
        )
    }else if(props.point <2000 && props.point>=1500){
        return(
            <Image style={styles.badge_logo}
                source={require(`../../assets/levels/level_4.png`)}
            />
        )
    }else if(props.point <2500 && props.point>=2000){
        return(
            <Image style={styles.badge_logo}
                source={require(`../../assets/levels/level_5.png`)}
            />
        )
    }else if(props.point <3000 && props.point>=2500){
        return(
            <Image style={styles.badge_logo}
                source={require(`../../assets/levels/level_6.png`)}
            />
        )
    }else if(props.point>=3000){
        return(
            <Image style={styles.badge_logo}
                source={require(`../../assets/levels/level_7.png`)}
            />
        )
    }
}

const dateChecker = (desiredDate)=>{
    const [day, month, year] = desiredDate.split('/');
    const targetDate = new Date(`20${year}`, month - 1, day);

    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
    if(days<30){
        return false;
    }else{
        return true;
    }
};

const MainInterface = ({navigation , route}) => {

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const {email} = route.params
    const {phone} = route.params
    const {ip} = route.params
    const {port} = route.params
    const {points} = route.params
    const {userNName} = route.params
    //console.log("main interface port and ip: ", port , ip)
    var {foodData} = route.params
    //console.log(foodData[0].identifier_key)
    if(foodData.length >1 && foodData[0].identifier_key == 0){
        foodData.shift()
    }

    const [todaysDate, setTodaysDate] = useState(10)
    var tips = [
        "Plan weekly meals to shop efficiently and reduce food waste",
        "Store older items at the front to prioritize their use",
        "Learn the nuances of expiration dates for smarter food choices",
        "Freeze leftovers promptly to extend their freshness",
        "Transform leftovers creatively for diverse and tasty meals",
        "Serve smaller portions to minimize potential leftovers",
        "Set up composting to recycle organic kitchen waste",
        "Mindfully shop, avoiding bulk purchases of perishables",
        "Consider donating surplus non-perishables to local charities",
        "Opt for frozen or canned alternatives for longer shelf life"
    ]

    async function schedulePushNotification() {
        var nameArr = "";
        const today = new Date();
        
        const year = today.getFullYear();
        const month = today.getMonth() + 1; 
        const day = today.getDate();
        var tot = day + (month*30) + (year*365);

        foodData.map(food => {
            var dif_day  = parseInt(food.ep_date[0]+food.ep_date[1]);
            var dif_month  = parseInt(food.ep_date[3]+food.ep_date[4]);
            var diff_year  = parseInt("20"+food.ep_date[6]+food.ep_date[7]);
            var diff = (dif_day + (dif_month*30)+ (diff_year*365))-tot;
            //console.log("diff: ", diff , "|| tot" , tot)

            if (diff <=7 && diff >=0){
                nameArr = nameArr + food.name+ " expires on "+ food.ep_date + " || ";
            };
        });
        if(nameArr == ""){
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "FoodFlow",
                    body: "Hurrah!!! your foods are safe!!",
                },
                trigger: null,
            });
            var nameArr = "";
        }else{
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "FoodFlow",
                    body: nameArr,
                },
                trigger:null,
            });
            var nameArr = "";
        }
    }
    setInterval(()=>{
        schedulePushNotification();
    }, 43200000)
    
    async function schedulePushNotification2() {
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "FoodFlow",
                body: `tips:${tips[randomNumber]}`,
            },
            trigger: null,
        });
    };
    setInterval(()=>{
        schedulePushNotification2();
    }, 43200000)

    useEffect(() => {
        registerForPushNotificationsAsync().then(token =>{
            setExpoPushToken(token)
            console.log(token)
        });
        notificationListener.current = Notifications.addNotificationReceivedListener(
            notification => {
                setNotification(notification);
            }
        );
        responseListener.current = Notifications.addNotificationResponseReceivedListener(
            response => {
                console.log(response);
            }
        );
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);

    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
          const { status: existingStatus } =await Notifications.getPermissionsAsync();

          let finalStatus = existingStatus;
          if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);

        } else {
          alert("Must use physical device for Push Notifications");
        }
        if (Platform.OS === "android") {
          Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            sound: true,
            lightColor: "#FF231F7C",
            lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
            bypassDnd: true,
            icon: "../../assets/notificationLogo.png"
          });
        }
      
        return token;
    }

    let [fontLoaded] = useFonts({
        "Ubuntu_Regular" : require("../../assets/fonts/Ubuntu/Ubuntu-Regular.ttf"), 
        "Ubuntu_Medium" : require("../../assets/fonts/Ubuntu/Ubuntu-Medium.ttf"), 
        "NotoSansKR-VariableFont_wght" : require("../../assets/fonts/Noto_Sans_KR/static/NotoSansKR-Medium.ttf"),
        "Fredoka" : require("../../assets/fonts/Fredoka/static/Fredoka-Regular.ttf"),
        "kadamT" : require("../../assets/fonts/KdamThmorPro-Regular.ttf"),
    });

    const viewMap = ()=>{
        navigation.navigate("FoodMap");
    };


    const onPressProfile = async ()=>{
        //schedulePushNotification();
        console.log("button pressed!!!");
        var fetchUrl = `http://${ip}:${port}/api/auth/usrInfo/fetch/fetchUseData`;
        const {data} = await axios.post(
            fetchUrl , 
            {
                userNName: userNName
            }
        );
        console.log(data.message.cus_name)
        if(data.success){
            navigation.navigate("UserProfile" , {
                cus_name: data.message.cus_name,
                email: data.message.email,
                phone_number: data.message.phone_number,
                points: data.message.points,
                user_name: data.message.user_name,
                usr_password: data.message.user_password
            })
        }else{
            Alert.alert("User information can not be fetched in this moment!!!")
        }

    };
    

    const camOrMan = [
        {key:'1', value:'By Scanning'},
        {key:'2', value:'Manually'},
    ]

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [isCamOrMan , setCamOrMan] = useState(null);


    const getLocalImageUrl = async () => {
        try {
            const fileName = 'level_7.png';
            const asset = Assets.Asset.fromModule(require(`../../assets/levels/share_level/level_7.jpg`));
        
            //console.log(asset)
            await FileSystem.downloadAsync(asset.uri, FileSystem.documentDirectory + fileName);
        
            const localAssetUri = `${FileSystem.documentDirectory}${fileName}`;
            return localAssetUri;
        } catch (error) {
            console.error('Error getting local image URL', error);
        }
      };

    const badgeShare = async ()=>{
        try{
            const localAssetUri = await getLocalImageUrl();
            Sharing.shareAsync(`file://${localAssetUri}`) //this lib has problem with sharing with caption/title 
            
            /*
            const title = 'Check out this image!';
            await Share.share({
                //It has issue: it just share the message not url 
                title,
                url: localAssetUri,
                message: title,
            })
            */
        }catch(error){
            console.error('Error sharing file with custom title', error);
        }
    }

    const renderLabel = () => {
        //this part renders when you click over the "search box"
        if (value && isFocus) {
          return (
            <Text style={[styles.label, isFocus && { color: 'blue' }]}>
              Searching Food
            </Text>
          );
        }
        return null;
    };

    if (!fontLoaded){
        return (
            <Loader1/>
        )
    }else{
            return (
                <View style={styles.container}>
                    <View style= {styles.app_description}>
                        <Text style={styles.inner_app_name_text}>FoodFlow</Text>
                        <TouchableOpacity style={styles.top_location_button} onPress={viewMap}>
                            <Text style={styles.top_button_txt_inner}>View Location</Text>
                        </TouchableOpacity>
                    </View>
                    <View style= {styles.inner_img_view}>
                        <View style={styles.inner_img_view_top}>
                            <View style={styles.inner_img_view_top_left_img}>
                                <Image style={styles.tinyLogo}
                                    source={require('../../assets/man222.png')}
                                />
                            </View>
                            <View style={styles.inner_img_view_top_right_name}>
                                <View style={styles.upper_info_cont_badge}>
                                    <TouchableOpacity onPress={badgeShare}>
                                        {<ImgComponent point={points}/>}
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.upper_info_cont}>
                                    <Text style={styles.inner_img_view_top_right_name_text}> {userNName} </Text>
                                </View>
                                <View style={styles.upper_info_cont}>
                                    <Text style={styles.upper_info_cont_points}> Total Pints: {points} </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.inner_img_view_bottom}>
                            <TouchableOpacity style={styles.top_button_left} onPress={onPressProfile}>
                                <Text style={styles.top_button_txt_left}>View Profile</Text>
                            </TouchableOpacity>
                            <View style={styles.canScanOrMan}>
                                <Dropdown
                                        style={styles.dropdown_scan}
                                        containerStyle={styles.dropdownBox_style}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        backgroundColor={"rgba(0,0,0,0.3)"}
                                        data={camOrMan}
                                        maxHeight={150}
                                        labelField="value"
                                        valueField="key"
                                        placeholder={"Select Method"}
                                        value={value}
                                        onChange={(item) => {
                                            setCamOrMan(item.value);
                                            if (item.value == "By Scanning"){
                                                navigation.navigate("CamScan", {
                                                    email: email,
                                                    phone: phone, 
                                                    ip: ip, 
                                                    port: port
                                                })
                                            }else{
                                                navigation.navigate("EnterFoodManually" , {
                                                    email: email,
                                                    phone: phone, 
                                                    ip: ip , 
                                                    port: port,
                                                    points: points,
                                                    userNName: userNName
                                                })
                                            }
                                            //console.log(`asdf ${item.value}`)
                                        }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerss}>
                        {renderLabel()}
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            containerStyle={styles.dropdownBox_style}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            backgroundColor={"rgba(0,0,0,0.3)"}
                            data={foodData}
                            search
                            maxHeight={300}
                            labelField="food_name"
                            valueField="identifier_key"
                            placeholder={!isFocus ? 'Search/Select Food' : '...'}
                            searchPlaceholder="Search..."
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item) => {
                                setValue(item.food_name);
                                console.log(`asdf ${item.food_name}`)
                                setIsFocus(false);
                                navigation.navigate("EditFoodInfo" , {
                                    nameIntFace: item.food_name,
                                    idIntFace: item.food_id,
                                    expDateIntFace: item.expDate,
                                    quantityIntFace: item.quantity,
                                    weightIntFace: item.weight,
                                    keyIntFace: item.identifier_key, 
                                    email: email,
                                    phone: phone,
                                    ip: ip, 
                                    port: port,
                                    points: points,
                                    userNName: userNName
                                })
                            }}
                            onChangeText = {(search)=>{
                                //returns the searched input data
                                console.log(search)
                            }}
                        />
                    </View>
                    <ScrollView style= {styles.inner_product_view}>
                        {
                            foodData.map((item, index)=>{
                                //console.log(item)
                                if (item.identifier_key == 0){
                                    return ;
                                }else{
                                    return (
                                        <Food_component key={item.identifier_key} keys={item.identifier_key} food_name={item.food_name} exp_date={item.expDate} food_id={item.food_id} weight={item.weight} quantity={item.quantity} navigation={navigation} bgColor={dateChecker(item.expDate)? "#719A70":"#f00"} email={email} phone={phone} ip={ip} port={port} points={points} userNName={userNName}/>
                                    )
                                }
                            })
                        }
                    </ScrollView>
                </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center",
        width: windowWidth, 
        height: windowHeight+30,
        backgroundColor: "#F1F0F1",
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 10,
    },
    app_description:{
        width: "100%",
        marginBottom: 10,
        marginTop: 18,
        display: "flex",
        flexDirection:"row",
        justifyContent:"space-between",
    },
    inner_app_name_text:{
        fontFamily: "Fredoka",
        fontSize: 30,
        color: "#000",
        marginLeft: 5 , 
        fontWeight : "600",
    },
    
    top_location_button:{
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 10,
        width: 130, 
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

    top_button_txt_inner:{
        fontFamily: "Fredoka",
        fontSize: 12,
        color: "#000",
        marginLeft: 5 , 
        fontWeight : "700",
    },
    inner_img_view: {
        backgroundColor: "#fff",
        width: "100%",
        height: "25%",
        borderRadius: 10,
        paddingLeft: 20, 
        paddingRight: 20, 
        paddingTop: 10, 
        paddingBottom: 10,
    },
    inner_img_view_top:{
        width:"100%",
        height: "75%",
        borderBottomWidth: 2,
        borderBottomColor: "#E8E8EA",
        paddingLeft: 10, 
        paddingRight: 10,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    inner_img_view_top_left_img:{
        width: 120,
        height: 120,
        borderRadius: 90,
        shadowColor: "#000",
        shadowOffset: {
	        width: 2,
	        height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 10,
    },
    tinyLogo:{
        width: "100%",
        height: "100%",
        borderRadius: 90,
        borderWidth: 4,
        borderColor: "#E8E8EA",
    },
    inner_img_view_top_right_name:{
        height: "100%",
        width: "66%",
    },
    upper_info_cont_badge:{
        display: "flex",
        justifyContent:"center",
        alignItems:"flex-end"
    },
    badge_logo:{
        width: 40,
        height: 40
    },
    upper_info_cont:{
        paddingLeft: 45,
    },
    upper_info_cont_points:{
        fontFamily: "Ubuntu_Regular",
        fontSize: 13,
        color: "#625D8E",
        marginRight: 5 ,
        fontWeight: "bold",
    },
    inner_img_view_top_right_name_text:{
        fontFamily: "Ubuntu_Regular",
        fontSize: 18,
        color: "#625D8E",
        marginRight: 5 ,
        fontWeight: "bold",
    },
    inner_img_view_bottom:{
        width:"100%",
        height: "25%",
        display :"flex", 
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 5
    },
    canScanOrMan:{
        width: 150, 
        height: 38,
        borderRadius: 5,
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center",
    },
    top_button_left:{
        display:"flex",
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#719A70',
        width: 120, 
        height: 38,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
	        width: 2,
	        height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5,
    },
    top_button_txt_right:{
        color: "#fff"
    },
    top_button_txt_left:{
        color: "#fff"
    },
    inner_product_view:{
        marginTop : 20,
        height: "75%"
    },
    reusable_component:{
        width: windowWidth-40,
        height: 85,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingLeft: 12,
        paddingRight: 12,
        marginLeft: 10, 
        marginRight: 10,

        display: "flex", 
        flexDirection: "row",
        justifyContent: "space-between", 
        marginBottom: 20,
    },
    reusable_left:{
        display :"flex",
        justifyContent: "center",
        alignItems:"flex-start", 
        width: 180
    }, 
    reusable_left_txt:{
        fontFamily: "Ubuntu_Regular",
        color: "#7F7F7F"
    },
    reusable_right:{
        display: "flex",
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "center"
    },
    reusable_exp_date:{
        width: 120,
        height: 40,
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center"
    },
    reusable_logo:{
        marginLeft: 15, 
        marginRight: 5
    },
    reusable_logo_inner:{
        width: 30,
        height:30
    },

    containerss: {
        backgroundColor: '#ffffff',
        width: "100%",
        borderRadius: 10,
        paddingLeft: 20, 
        paddingRight: 20, 
        paddingTop: 10, 
        paddingBottom: 10,
        marginTop: 10,
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center",
      },
      dropdown_scan: {
        height: 45,
        width:"100%",
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 10,
        paddingHorizontal: 8,
      },
      dropdown: {
        height: 45,
        width:"100%",
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 15,
        paddingHorizontal: 8,
      },
      dropdownBox_style:{
        fontSize: 12,
        borderRadius: 10,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: '#fff',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 12,
      },
      placeholderStyle: {
        fontSize: 13,
      },
      selectedTextStyle: {
        fontSize: 13,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        //search input styling
        height: 35,
        fontSize: 13,
      },
});

export default MainInterface;























