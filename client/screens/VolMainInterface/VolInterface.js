// UserInputForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, Alert} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { Dropdown } from 'react-native-element-dropdown'
import axios from "axios";
import {Dimensions} from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const VolInterface = ({navigation , route}) => {
    const {volId} = route.params
    const {orgName} = route.params
    const {ip} = route.params
    const {port} = route.params

    const [userMail, setUserMail] = useState();
    const [userPhone, setUserPhone] = useState();
    const [foodId, setFoodId] = useState();
    const [quantity, setQuantity] = useState();
    const [weight, setWeight] = useState();
    const [reqPoints, setReqPoints] = useState();

    //all data about food are available here
    const [isDarkMode, setIsDarkMode] = useState(false);

    

    const handleSubmit = async () => {
        if(!userMail || !userPhone || !foodId || !quantity || !weight || !reqPoints){
            Alert.alert("Please Fill All The Required Filed")
        }else{
            //do database tasks 
            Alert.alert("Confirm", `userMail:${userMail}, \nPhone:${userPhone}, \nFoodId: ${foodId} , \nquantity:${quantity},\n weight:${weight}`, [
                {
                    text: 'OK', 
                    onPress: async () => {
                        var vol_process = `http://${ip}:${port}/api/volunteer/update/points/onReq/volAddPoints`;
                        const {data} = await axios.post(
                            vol_process , 
                            {
                                userMail: userMail,
                                userPhone : userPhone,
                                foodId : foodId,
                                quantity : quantity,
                                weight : weight,
                                reqPoints : reqPoints
                            }
                        )
                        if (data.success){
                            setUserMail("")
                            setUserPhone("")
                            setFoodId("")
                            setQuantity("")
                            setWeight("")
                            setReqPoints("")
                        }else{
                            console.log(data.message)
                        }
                    }
                },
                {
                    text: 'Cancel', 
                    onPress: ()=>{
                        console.log("return to the previous page!!!")
                    }
                }
            ])
        }
    };

    return (
        <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
        <View style={styles.headerContainer}>
            <Text style={[styles.headerText , {color: isDarkMode ? '#FFFFFF' : '#333333',}]}>FoodFlow</Text>
            <SwitchSelector
            style={styles.switchSelector}
            options={[
                { label: 'Light', value: false },
                { label: 'Dark', value: true },
            ]}
            initial={isDarkMode ? 1 : 0}
            onPress={(value) => setIsDarkMode(value)}
            />
        </View>
        <View>
            <View style={{
                height: 50,
                display: "flex",
                justifyContent:"space-between",
                flexDirection:"row"
                }}>
                <Text style={{
                    fontSize: 14,
                    color: isDarkMode ? '#FFFFFF' : '#333333',
                    marginBottom: 5,
                    fontWeight: "bold"
                }}>Volunteer ID: {volId}</Text>
                <Text style={{
                    fontSize: 14,
                    color: isDarkMode ? '#FFFFFF' : '#333333',
                    marginBottom: 5,
                    fontWeight: "bold"
                }}>Org. Name: {orgName}</Text>
            </View>
            <TouchableOpacity style={styles.top_location_button} onPress={()=>{
                console.log("go to view profile page")
            }}>
                <Text style={styles.top_button_txt_inner}>View Profile</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.middleInput}>
            <View style={styles.middleInputCard}>
                <View style={styles.areaBox}> 
                    <View style={{
                        height: 50,
                        display: "flex",
                        justifyContent:"center",
                        }}>
                        <Text style={{
                            fontSize: 14,
                            color: isDarkMode ? '#FFFFFF' : '#333333',
                            marginBottom: 5,
                        }}>User Mail:</Text>
                    </View>
                    <TextInput
                    style={{
                        height: 50,
                        borderColor: isDarkMode ? '#555555' : 'gray',
                        borderWidth: 1,
                        borderRadius: 10,
                        marginBottom: 15,
                        paddingHorizontal: 15,
                        backgroundColor: isDarkMode ? '#333333' : '#FFFFFF',
                        color: isDarkMode ? '#FFFFFF' : '#333333',
                        width: windowWidth- (windowWidth/2.7)
                    }}
                    value={userMail}
                    onChangeText={(text) => {
                        setUserMail(text)
                    }}
                    placeholder="Enter User Mail address"
                    />
                </View>

                <View style={styles.areaBox}>
                    <View style={{
                    height: 50,
                    display: "flex",
                    justifyContent:"center",
                    }}>
                    <Text style={{
                        fontSize: 14,
                        color: isDarkMode ? '#FFFFFF' : '#333333',
                        marginBottom: 5,
                    }}
                    >User Phone:</Text>
                    </View>
                    <TextInput
                    style={{
                        height: 50,
                        borderColor: isDarkMode ? '#555555' : 'gray',
                        borderWidth: 1,
                        borderRadius: 10,
                        marginBottom: 15,
                        paddingHorizontal: 15,
                        backgroundColor: isDarkMode ? '#333333' : '#FFFFFF',
                        color: isDarkMode ? '#FFFFFF' : '#333333',
                        width: windowWidth- (windowWidth/2.7)
                    }}
                    value={userPhone}
                    onChangeText={(text) => {
                        setUserPhone(text)
                    }}
                    placeholder="Enter User Phone number"
                    keyboardType='phone-pad'
                    editable={true}
                    />
                </View>

                <View style={styles.areaBox}>
                    <View style={{
                        height: 50,
                        display: "flex",
                        justifyContent:"center",
                    }}>
                        <Text style={{
                        fontSize: 14,
                        color: isDarkMode ? '#FFFFFF' : '#333333',
                        marginBottom: 5,
                        }}
                        >Food ID:</Text>
                    </View>
                    <TextInput
                        style={{
                        height: 50,
                        borderColor: isDarkMode ? '#555555' : 'gray',
                        borderWidth: 1,
                        borderRadius: 10,
                        marginBottom: 15,
                        paddingHorizontal: 15,
                        backgroundColor: isDarkMode ? '#333333' : '#FFFFFF',
                        color: isDarkMode ? '#FFFFFF' : '#333333',
                        width: windowWidth- (windowWidth/2.7)
                        }}
                        value={foodId}
                        onChangeText={(text) => {
                            setFoodId(text)
                        }}
                        placeholder="Enter Food ID"
                    />
                </View>

                <View style={styles.areaBox}>
                    <View style={{
                        height: 50,
                        display: "flex",
                        justifyContent:"center",
                    }}>
                        <Text style={{
                        fontSize: 14,
                        color: isDarkMode ? '#FFFFFF' : '#333333',
                        marginBottom: 5,
                        }}
                        >Quantity:</Text>
                    </View>
                    <TextInput
                        style={{
                        height: 50,
                        borderColor: isDarkMode ? '#555555' : 'gray',
                        borderWidth: 1,
                        borderRadius: 10,
                        marginBottom: 15,
                        paddingHorizontal: 15,
                        backgroundColor: isDarkMode ? '#333333' : '#FFFFFF',
                        color: isDarkMode ? '#FFFFFF' : '#333333',
                        width: windowWidth- (windowWidth/2.7)
                        }}
                        value={quantity}
                        onChangeText={(text) => {
                            setQuantity(text)
                        }}
                        placeholder="Enter Food Quantity"
                        keyboardType='number-pad'
                    />
                </View>
                <View style={styles.areaBox}>
                    <View style={{
                        height: 50,
                        display: "flex",
                        justifyContent:"center",
                    }}>
                        <Text style={{
                        fontSize: 14,
                        color: isDarkMode ? '#FFFFFF' : '#333333',
                        marginBottom: 5,
                        }}
                        >Total Weight:</Text>
                    </View>
                    <TextInput
                        style={{
                        height: 50,
                        borderColor: isDarkMode ? '#555555' : 'gray',
                        borderWidth: 1,
                        borderRadius: 10,
                        marginBottom: 15,
                        paddingHorizontal: 15,
                        backgroundColor: isDarkMode ? '#333333' : '#FFFFFF',
                        color: isDarkMode ? '#FFFFFF' : '#333333',
                        width: windowWidth- (windowWidth/2.7)
                        }}
                        value={weight}
                        onChangeText={(text) => {
                            setWeight(text)
                        }}
                        placeholder="Enter Food Weight"
                        keyboardType='number-pad'
                    />
                </View>
                <View style={styles.areaBox}>
                    <View style={{
                        height: 50,
                        display: "flex",
                        justifyContent:"center",
                    }}>
                        <Text style={{
                        fontSize: 14,
                        color: isDarkMode ? '#FFFFFF' : '#333333',
                        marginBottom: 5,
                        }}
                        >Request Points:</Text>
                    </View>
                    <TextInput
                        style={{
                        height: 50,
                        borderColor: isDarkMode ? '#555555' : 'gray',
                        borderWidth: 1,
                        borderRadius: 10,
                        marginBottom: 15,
                        paddingHorizontal: 15,
                        backgroundColor: isDarkMode ? '#333333' : '#FFFFFF',
                        color: isDarkMode ? '#FFFFFF' : '#333333',
                        width: windowWidth- (windowWidth/2.7)
                        }}
                        value={reqPoints}
                        onChangeText={(text) => {
                            setReqPoints(text)
                        }}
                        placeholder="Enter points in exchange of food"
                        keyboardType='number-pad'
                    />
                </View>
            </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    containerLight: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        width: windowWidth, 
        height:windowHeight
    },
    containerDark: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        padding: 20,
        width: windowWidth, 
        height:windowHeight
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
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        height: 70,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
    },
    middleInput:{
        width:"100%",
        height: windowHeight-300,
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",

    },
    middleInputCard:{

    },
    areaBox:{
        display: "flex",
        justifyContent:"space-between",
        flexDirection:"row"
    },
    inp_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
        height: 25,
    },
    inputDate: {
        borderBottomWidth: 1,
        width: 40,
        textAlign: 'center',
    },
    switchSelector: {
        width: 120,
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default VolInterface;
