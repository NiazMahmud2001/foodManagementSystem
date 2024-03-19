import { View, Text , TextInput, StyleSheet , TouchableOpacity, Image} from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import {Dimensions} from 'react-native'
import Loader1 from '../loader/Loader1';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FoodMap = ({navigation}) => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState("not_yet");

    const [address, setAddress] = useState(null)

    useEffect(() => {
        (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg("access_denied")
        }else{
            setErrorMsg("access_granted")
        }

        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        let locations = await Location.getCurrentPositionAsync();
        setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg=="access_denied" || errorMsg=="not_yet" ) {
        text = "errorMsg";
    } else if (location) {
        let latitude = JSON.stringify(location.coords.latitude)
        let longitude = JSON.stringify(location.coords.longitude)
       
        text = `latitude: ${latitude} |||| longitude: ${longitude}`;
    }

    const areaToLatLon = async ()=>{
        if(address != null && address != ""){
            const geoCodedLocation = await Location.geocodeAsync(address);
            if (geoCodedLocation.length == 0){
                console.log("location not found!!!")
            }else{
                console.log("search are location: ");
                console.log(JSON.stringify(geoCodedLocation));
            }
        }else{
            console.log("please enter area name!!!")
        }
    };

    if(errorMsg=="access_granted" && location){
        var lats = location.coords.latitude;
        var lons = location.coords.longitude;
        //var lats = location.coords.latitude-0.0042;
        //var lons = location.coords.longitude-0.0031;
        return (
            <View style={styles.container}>
                <View style={styles.mapViewPart}>
                    <MapView 
                        style={styles.mapViewDesign}
                        initialRegion = {{
                            latitude: lats,
                            longitude: lons,
                            latitudeDelta: 0.1922,
                            longitudeDelta: 0.1421,
                        }}
                        provider={PROVIDER_GOOGLE}
                        mapType = "standard"
                    >
                        <Marker
                            style= {styles.foodBankLocator}
                            coordinate={{
                                latitude:lats,
                                longitude: lons,
                            }}
                            title="Title: sdfasdf"
                            description="Some description"
                        >
                            <Image 
                                source={require("../../assets/my_pos1.png")}
                                style={styles.foodBankLocator}
                            />
                        </Marker>

                        <Marker
                            style= {styles.foodBankLocator}
                            coordinate={{
                                latitude:24.99970813361547,
                                longitude: 55.12266427888227,
                            }}
                            title="Title: sdfasdf"
                            description="Some description"
                        >
                            <Image 
                                source={require("../../assets/foodBank.png")}
                                style={styles.foodBankLocator}
                            />
                        </Marker>

                        <Marker
                            style= {styles.foodBankLocator}
                            coordinate={{
                                latitude: 25.041387005837546,
                                longitude: 55.14104948198814,
                            }}
                            title="Title: sdfasdf"
                            description="Some description"
                        >
                            <Image 
                                source={require("../../assets/foodBank.png")}
                                style={styles.foodBankLocator}
                            />
                        </Marker>

                        <Marker
                            style= {styles.foodBankLocator}
                            coordinate={{
                                latitude: 25.118145990406877,
                                longitude: 55.21689986329694,
                            }}
                            title="Title: sdfasdf"
                            description="Some description"
                        >
                            <Image 
                                source={require("../../assets/foodBank.png")}
                                style={styles.foodBankLocator}
                            />
                        </Marker>
                        
                        <Marker
                            style= {styles.foodBankLocator}
                            coordinate={{
                                latitude: 25.151115479845014,
                                longitude: 55.257004716863044,
                            }}
                            title="Title: sdfasdf"
                            description="Some description"
                        >
                            <Image 
                                source={require("../../assets/foodBank.png")}
                                style={styles.foodBankLocator}
                            />
                        </Marker>

                        <Marker
                            style= {styles.foodBankLocator}
                            coordinate={{
                                latitude: 25.207418887248735,
                                longitude: 55.26938574183014,
                            }}
                            title="Title: sdfasdf"
                            description="Some description"
                        >
                            <Image 
                                source={require("../../assets/foodBank.png")}
                                style={styles.foodBankLocator}
                            />
                        </Marker>

                        <Marker
                            style= {styles.foodBankLocator}
                            coordinate={{
                                latitude: 25.249476123955528,
                                longitude: 55.30606528274741,
                            }}
                            title="Title: sdfasdf"
                            description="Some description"
                        >
                            <Image 
                                source={require("../../assets/foodBank.png")}
                                style={styles.foodBankLocator}
                            />
                        </Marker>

                        <Marker
                            style= {styles.foodBankLocator}
                            coordinate={{
                                latitude: 25.27989346470982,
                                longitude: 55.3306301558193,
                            }}
                            title="Title: sdfasdf"
                            description="Some description"
                        >
                            <Image 
                                source={require("../../assets/foodBank.png")}
                                style={styles.foodBankLocator}
                            />
                        </Marker>

                        <Marker
                            style= {styles.foodBankLocator}
                            coordinate={{
                                latitude: 25.266362522831482,
                                longitude: 55.43015424980135,
                            }}
                            title="Title: sdfasdf"
                            description="Some description"
                        >
                            <Image 
                                source={require("../../assets/foodBank.png")}
                                style={styles.foodBankLocator}
                            />
                        </Marker>
                        
                        <Marker
                            style= {styles.foodBankLocator}
                            coordinate={{
                                latitude: 25.382547934123714,
                                longitude: 55.44864458385822,
                            }}
                            title="Title: sdfasdf"
                            description="Some description"
                        >
                            <Image 
                                source={require("../../assets/foodBank.png")}
                                style={styles.foodBankLocator}
                            />
                        </Marker>
                        
                    </MapView>
                </View>
                <View style={styles.searchArea}>
                    <TextInput 
                        style={styles.searchAreaTextInput} 
                        maxLength={40} blurOnSubmit  
                        placeholder='Enter area name!!!' 
                        value={address} 
                        onChangeText={setAddress}
                        inputMode = "text"
                        keyboardType = "default"
                    />
                    <TouchableOpacity style={styles.submitBtn} onPress={areaToLatLon}>
                        <Image
                            style={styles.mapSearch}
                            source={require('../../assets/search_icon.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
     }else if(errorMsg=="access_denied"){
        return (
            <View style={styles.container}>
                <Text>Access denied!!!</Text>
            </View>
        )
     }else{
        return (
            <View style={styles.container}>
                <Loader1/>
            </View>
        )
     }
}

const styles = StyleSheet.create({
    container:{
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        flexDirection:"column",
        width: windowWidth, 
        height: windowHeight,
        position:"relative",
    },
    searchArea:{
        display: "flex", 
        flexDirection: "row",
        paddingTop: 5,
        position:"absolute",
        zIndex: 10000
    },
    searchAreaTextInput:{
        borderWidth: 0.5,
        borderColor: "black",
        width: windowWidth/1.4,
        height: 35,
        borderRadius: 10,
        paddingLeft:10 , 
        backgroundColor: "rgba(255,255,255,0.7)",
    },
    mapSearch:{
        width: 40, 
        height:40
    },
    mapViewPart:{
        width: windowWidth,
        height: windowHeight,
    },
    mapViewDesign:{
        width: "100%",
        height: "100%",
        zIndex: 10
    },
    foodBankLocator:{
        width: 50, 
        height: 50
    }
});

export default FoodMap;