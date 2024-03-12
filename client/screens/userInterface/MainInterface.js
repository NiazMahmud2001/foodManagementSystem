import { 
    StyleSheet,
    View, 
    Text, 
    TouchableOpacity, 
    Image , 
    ScrollView,
    Platform, 
    Share
} from 'react-native';
import React, { useState, useEffect, useRef, Component, createRef  } from "react";
import {Dimensions} from 'react-native';
import { useFonts } from 'expo-font';
import Loader1 from "../loader/Loader1"
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as Assets from 'expo-asset';
import * as Font from 'expo-font';
import { Dropdown } from 'react-native-element-dropdown'; //for drop down-box

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//here try "ocrSpace" with the link "https://www.npmjs.com/package/ocr-space-api-wrapper" 

class FoodComponent extends Component {
    render() {
        const { props } = this.props;
        return (
            <View style={styles.reusable_component}>
                <View style={styles.reusable_left}>
                    <Text style={styles.reusable_left_txt}>{this.props.food_name}</Text>
                    <Text style={styles.reusable_left_txt}>ID: {this.props.food_id}</Text>
                </View>
                <View style={styles.reusable_right}>
                    <View
                        style={[
                            styles.reusable_exp_date,
                            { backgroundColor: this.props.bgColor, borderRadius: 10 },
                        ]}
                        >
                        <Text
                            style={{
                            fontFamily: 'Ubuntu_Medium',
                            fontSize: 12,
                            borderRadius: 10,
                            }}
                        >
                            EXP: {this.props.exp_date}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.reusable_logo}
                        onPress={() => {
                            this.props.navigation.navigate('EditFoodInfo', {
                            nameIntFace: this.props.food_name,
                            idIntFace: this.props.food_id,
                            expDateIntFace: this.props.exp_date,
                            quantityIntFace: this.props.quantity,
                            weightIntFace: this.props.weight,
                            keyIntFace: this.props.keys,
                            });
                        }}
                    >
                        <Image
                            style={styles.reusable_logo_inner}
                            source={require('../../assets/add_icon.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
  }

class MainInterface extends Component {
    constructor(props) {
        super(props);

        this.notificationListener = createRef();
        this.responseListener = createRef();

        this.state = {
            expoPushToken: '',
            notification: false,
            todaysDate: new Date().getDate(),
            value: null,
            isFocus: null,
            isCamOrMan: null,
            fontLoaded: false,
        };

        this.tips =  [
            'Plan weekly meals to shop efficiently and reduce food waste',
            'Store older items at the front to prioritize their use',
            'Learn the nuances of expiration dates for smarter food choices',
            'Freeze leftovers promptly to extend their freshness',
            'Transform leftovers creatively for diverse and tasty meals',
            'Serve smaller portions to minimize potential leftovers',
            'Set up composting to recycle organic kitchen waste',
            'Mindfully shop, avoiding bulk purchases of perishables',
            'Consider donating surplus non-perishables to local charities',
            'Opt for frozen or canned alternatives for longer shelf life',
        ];
        this.foods_details = [
            {   
                key: "1",
                name: "Food-1" ,
                ep_date: "04/07/24",
                quantity: 10,
                weight: 28,
                id: "863885"
            },
            {   
                key: "2",
                name: "Food-2" ,
                ep_date: "11/04/24",
                quantity: 10,
                weight: 28,
                id: "759445"
            },
            {
                key: "3",
                name: "Food-3" ,
                ep_date: "01/03/24",
                quantity: 10,
                weight: 28,
                id: "008656"
            },
            {
                key: "4",
                name: "Food-4" ,
                ep_date: "15/07/24",
                quantity: 10,
                id: "663267"
            },
            {
                key: "5",
                name: "Food-5" ,
                ep_date: "04/07/24",
                quantity: 10,
                weight: 28,
                id: "123445"
            },
            {
                key: "6",
                name: "Food-6" ,
                ep_date: "28/02/24",
                quantity: 10,
                weight: 28,
                id: "145465"
            },
            {
                key: "7",
                name: "Food-7" ,
                ep_date: "20/04/24",
                quantity: 10,
                weight: 28,
                id: "234526"
            },
            {
                key: "8",
                name: "Food-8" ,
                ep_date: "01/06/24",
                quantity: 10,
                weight: 28,
                id: "6773445"
            },
            {
                key: "9",
                name: "Food-9" ,
                ep_date: "04/07/24",
                quantity: 10,
                weight: 28,
                id: "123445"
            },
            {
                key: "10",
                name: "Food-10" ,
                ep_date: "01/06/24",
                quantity: 10,
                weight: 28,
                id: "142345"
            },
        ];

        this.notificationDefine();
        this.setExpDateNotification();
        this.setTipsNotification();
    };

    notificationDefine(){
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: true,
            }),
        });
    };

    dateChecker (desiredDate){
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
    async schedulePushNotification() {
        var nameArr = "";
        const today = new Date();
        
        const year = today.getFullYear();
        const month = today.getMonth() + 1; 
        const day = today.getDate();
        var tot = day + (month*30) + (year*365);

        this.foods_details.map(food => {
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
    };
    setExpDateNotification(){
        setInterval(()=>{
            this.schedulePushNotification();
        }, 43200000)
    };

    async schedulePushNotification2() {
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "FoodFlow",
                body: `tips:${this.tips[randomNumber]}`,
            },
            trigger: null,
        });
    };

    setTipsNotification(){
        setInterval(()=>{
            schedulePushNotification2();
        }, 43200000)
    };   

    async componentDidMount() {
        await this.registerForPushNotificationsAsync().then((token) => {
            this.setState({ expoPushToken: token });
            console.log(token);
        });
    
        this.notificationListener = Notifications.addNotificationReceivedListener(
            (notification) => {
                this.setState({ notification });
            }
        );
    
        this.responseListener = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                console.log(response);
            }
        );
        await this.loadFonts();
    }
    
    componentWillUnmount() {
        Notifications.removeNotificationSubscription(this.notificationListener);
        Notifications.removeNotificationSubscription(this.responseListener);
    }    

    async registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
        
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
        
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use a physical device for Push Notifications');
        }
    
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                sound: true,
                lightColor: '#FF231F7C',
                lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
                bypassDnd: true,
                icon: '../../assets/notificationLogo.png',
            });
        }
        return token;
    };

    async getLocalImageUrl() {
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

    viewMap(){
        this.props.navigation.navigate("FoodMap");
    };

    onPress() {
        console.log("button pressed!!!");
    };

    async badgeShare() {
        try{
            const localAssetUri = await this.getLocalImageUrl();
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
    };

    renderLabel () {
        //this part renders when you click over the "search box"
        if (this.state.value && this.state.isFocus) {
            return (
                <Text style={[styles.label, this.state.isFocus && { color: 'blue' }]}>
                    Searching Food
                </Text>
            );
        }
        return null;
    };

    async loadFonts() {
        try {
            await Font.loadAsync({
                "Ubuntu_Regular" : require("../../assets/fonts/Ubuntu/Ubuntu-Regular.ttf"), 
                "Ubuntu_Medium" : require("../../assets/fonts/Ubuntu/Ubuntu-Medium.ttf"), 
                "NotoSansKR-VariableFont_wght" : require("../../assets/fonts/Noto_Sans_KR/static/NotoSansKR-Medium.ttf"),
                "Fredoka" : require("../../assets/fonts/Fredoka/static/Fredoka-Regular.ttf"),
                "kadamT" : require("../../assets/fonts/KdamThmorPro-Regular.ttf"),
            });
            this.setState({ fontLoaded: true });
        } catch (error) {
            console.error('Error loading fonts', error);
            this.setState({ fontLoaded: false });
        }
    }

    render(){
        const camOrMan = [
            {key:'1', value:'By Scanning'},
            {key:'2', value:'Manually'},
        ]
        const { fontLoaded } = this.state;

        if (!fontLoaded){
            return (
                <Loader1/>
            )
        }else{
            return (
                <View style={styles.container}>
                    <View style= {styles.app_description}>
                        <Text style={styles.inner_app_name_text}>FoodFlow</Text>
                        <TouchableOpacity style={styles.top_location_button} onPress={()=>{this.viewMap()}}>
                            <Text style={styles.top_button_txt_inner}>View Location</Text>
                        </TouchableOpacity>
                    </View>
                    <View style= {styles.inner_img_view}>
                        <View style={styles.inner_img_view_top}>
                            <View style={styles.inner_img_view_top_left_img}>
                                <Image style={styles.tinyLogo}
                                    source={require('../../assets/men_pic.jpg')}
                                />
                            </View>
                            <View style={styles.inner_img_view_top_right_name}>
                                <View style={styles.upper_info_cont_badge}>
                                    <TouchableOpacity onPress={()=>{this.badgeShare()}}>
                                        <Image style={styles.badge_logo}
                                            source={require('../../assets/levels/level_7.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.upper_info_cont}>
                                    <Text style={styles.inner_img_view_top_right_name_text}> Abdurrahman </Text>
                                </View>
                                <View style={styles.upper_info_cont}>
                                    <Text style={styles.upper_info_cont_points}> Total Pints: 130 </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.inner_img_view_bottom}>
                            <TouchableOpacity style={styles.top_button_left} onPress={()=>{this.onPress()}}>
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
                                        value={this.state.value}
                                        onChange={(item) => {
                                            //setCamOrMan(item.value);
                                            this.setState({value: item.value})
                                            if (item.value == "By Scanning"){
                                                this.props.navigation.navigate("CamScan")
                                            }else{
                                                this.props.navigation.navigate("EnterFoodManually")
                                            }
                                            //console.log(`asdf ${item.value}`)
                                        }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerss}>
                        {this.renderLabel()}
                        <Dropdown
                            style={[styles.dropdown, this.state.isFocus && { borderColor: 'blue' }]}
                            containerStyle={styles.dropdownBox_style}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            backgroundColor={"rgba(0,0,0,0.3)"}
                            data={this.foods_details}
                            search
                            maxHeight={300}
                            labelField="name"
                            valueField="key"
                            placeholder={!(this.state.isFocus) ? 'Search/Select Food' : '...'}
                            searchPlaceholder="Search..."
                            value={this.state.value}
                            onFocus={() => {
                                this.setState({
                                    isFocus : true
                                })
                            }}
                            onBlur={() => {
                                this.setState({
                                    isFocus : false
                                })
                            }}
                            onChange={(item) => {
                                this.setState({ value : item.name })
                                this.setState({ isFocus : false })
                                this.props.navigation.navigate("EditFoodInfo" , {
                                    nameIntFace: item.name,
                                    idIntFace: item.id,
                                    expDateIntFace: item.ep_date,
                                    quantityIntFace: item.quantity,
                                    weightIntFace: item.weight,
                                    keyIntFace: item.key
                                })
                            }}
                            onChangeText = {(search)=>{
                                //returns the searched input data
                                console.log(search)
                            }}
                        />
                    </View>
                    <ScrollView style= {styles.inner_product_view}>
                        {this.foods_details.map((item, index)=>(
                            <FoodComponent key={item.key} keys={item.key} food_name={item.name} exp_date={item.ep_date} food_id={item.id} weight={item.weight} quantity={item.quantity} navigation={this.props.navigation} bgColor={this.dateChecker(item.ep_date)? "#719A70":"#f00"}/>
                        ))}
                    </ScrollView>
                </View>
            )
        }
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
        alignItems:"flex-start"
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























