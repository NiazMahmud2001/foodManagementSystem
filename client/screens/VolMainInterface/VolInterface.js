import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, Alert } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { Dropdown } from 'react-native-element-dropdown'
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class VolInterface extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        userMail: '',
        userPhone: '',
        foodId: '',
        quantity: '',
        weight: '',
        isDarkMode: false,
    };

    handleSubmit = () => {
        const { userMail, userPhone, foodId, quantity, weight } = this.state;

        if (!userMail || !userPhone || !foodId || !quantity || !weight) {
            Alert.alert("Please Fill All The Required Filed");
        } else {
            // Perform database tasks
            console.log("Database tasks are done:");
        }
    };

    render() {
        const { navigation, route } = this.props;
        const { volId, orgName } = route.params;
        const { userMail, userPhone, foodId, quantity, weight, isDarkMode } = this.state;

        return (
            <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
                <View style={styles.headerContainer}>
                    <Text style={[styles.headerText, { color: isDarkMode ? '#FFFFFF' : '#333333' }]}>FoodFlow</Text>
                    <SwitchSelector
                        style={styles.switchSelector}
                        options={[
                            { label: 'Light', value: false },
                            { label: 'Dark', value: true },
                        ]}
                        initial={isDarkMode ? 1 : 0}
                        onPress={(value) => this.setState({ isDarkMode: value })}
                    />
                </View>
                <View>
                    <View style={{
                        height: 50,
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row"
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
                    <TouchableOpacity style={styles.top_location_button} onPress={() => {
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
                                justifyContent: "center",
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
                                    width: windowWidth - (windowWidth / 2.7)
                                }}
                                value={userMail}
                                onChangeText={(text) => this.setState({ userMail: text })}
                                placeholder="Enter User Mail address"
                            />
                        </View>

                        <View style={styles.areaBox}>
                            <View style={{
                                height: 50,
                                display: "flex",
                                justifyContent: "center",
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
                                    width: windowWidth - (windowWidth / 2.7)
                                }}
                                value={userPhone}
                                onChangeText={(text) => this.setState({ userPhone: text })}
                                placeholder="Enter User Phone number"
                                keyboardType='phone-pad'
                                editable={true}
                            />
                        </View>

                        <View style={styles.areaBox}>
                            <View style={{
                                height: 50,
                                display: "flex",
                                justifyContent: "center",
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
                                    width: windowWidth - (windowWidth / 2.7)
                                }}
                                value={foodId}
                                onChangeText={(text) => this.setState({ foodId: text })}
                                placeholder="Enter Food ID"
                                keyboardType='number-pad'
                            />
                        </View>

                        <View style={styles.areaBox}>
                            <View style={{
                                height: 50,
                                display: "flex",
                                justifyContent: "center",
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
                                    width: windowWidth - (windowWidth / 2.7)
                                }}
                                value={quantity}
                                onChangeText={(text) => this.setState({ quantity: text })}
                                placeholder="Enter Food Quantity"
                                keyboardType='number-pad'
                            />
                        </View>
                        <View style={styles.areaBox}>
                            <View style={{
                                height: 50,
                                display: "flex",
                                justifyContent: "center",
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
                                    width: windowWidth - (windowWidth / 2.7)
                                }}
                                value={weight}
                                onChangeText={(text) => this.setState({ weight: text })}
                                placeholder="Enter Food Weight"
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={this.handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerLight: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        width: windowWidth,
        height: windowHeight,
    },
    containerDark: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        padding: 20,
        width: windowWidth,
        height: windowHeight,
    },
    top_location_button: {
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
    middleInput: {
        width: "100%",
        height: windowHeight - 300,
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",

    },
    middleInputCard: {

    },
    areaBox: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row"
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
