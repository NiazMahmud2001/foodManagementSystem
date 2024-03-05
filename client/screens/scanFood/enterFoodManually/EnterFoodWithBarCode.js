// UserInputForm.js
import React, { useState , useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import {Dimensions} from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DataComponent = props =>{
    //all data about food are available here 
    const [name, setName] = useState('');
    const id = props.barcode;
    const [quantity, setQuantity] = useState('');
    const [weight, setWeight] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleDayChange = (text) => {
        // Add any validation logic if needed
        setDay(text);
    };
    const handleMonthChange = (text) => {
        // Add any validation logic if needed
        setMonth(text);
    };
    const handleYearChange = (text) => {
        // Add any validation logic if needed
        setYear(text);
    };

    const handleSubmit = () => {
        // Add logic to handle form submission
        if(name!="" || !id || quantity!="" || weight!="" || day!="" || month!="" || year!=""){
            alert(`please enter name, id, quantity, weight , day,month,year`)
        }else{
            console.log('Form submitted:', { name, id, quantity, weight , day,month,year});
        }
    };

    return (
        <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>FoodFlow</Text>
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
                    }}>FoodName:</Text>
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
                    value={props.product_name}
                    onChangeText={(text) => setName(text)}
                    placeholder="Enter Food Name"
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
                    >FoodID:</Text>
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
                    value={props.barcode}
                    editable = {false}
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
                    onChangeText={(text) => setQuantity(text)}
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
                    >Weight:</Text>
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
                    onChangeText={(text) => setWeight(text)}
                    placeholder="Enter Food Weight"
                    keyboardType='number-pad'
                />
                </View>
            
                <View style={[styles.areaBox]}>
                <View style={{
                    height: 70,
                    display: "flex",
                    justifyContent:"center",
                    }}>
                    <Text style={{
                    fontSize: 14,
                    color: isDarkMode ? '#FFFFFF' : '#333333',
                    marginBottom: 5,
                    }}
                    >EXP Date:</Text>
                </View>
                <View style={styles.inp_container}>
                    <Text style={{
                        fontSize: 14,
                        color: isDarkMode ? '#FFFFFF' : '#333333',
                        marginBottom: 5,
                    }}>Day:</Text>
                    <TextInput
                        style={[styles.inputDate,{color: isDarkMode ? '#FFFFFF' : '#333333',}]}
                        keyboardType="numeric"
                        maxLength={2}
                        value={day}
                        onChangeText={handleDayChange}
                    />

                    <Text style={{
                        fontSize: 14,
                        color: isDarkMode ? '#FFFFFF' : '#333333',
                        marginBottom: 5,
                    }}>/Month:</Text>
                    <TextInput
                        style={[styles.inputDate,{color: isDarkMode ? '#FFFFFF' : '#333333',}]}
                        keyboardType="numeric"
                        maxLength={2}
                        value={month}
                        onChangeText={handleMonthChange}
                    />

                    <Text style={{
                        fontSize: 14,
                        color: isDarkMode ? '#FFFFFF' : '#333333',
                        marginBottom: 5,
                    }}>/Year:</Text>
                    <TextInput
                        style={[styles.inputDate,{color: isDarkMode ? '#FFFFFF' : '#333333',}]}
                        keyboardType="numeric"
                        maxLength={4}
                        value={year}
                        onChangeText={handleYearChange}
                    />
            </View>
                </View>
            </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        </View>
    );
}


const EnterFoodWithBarCode = ({navigation, route}) => {
    const {barcodess} = route.params
    const [fooName, setFooName] = useState("");
    const [foodId , setFooId] = useState("-1")
    let url = `https://world.openfoodfacts.net/api/v2/product/${barcodess}?fields=product_name,nutriscore_data` ; 
    var temp_func = async ()=>{
        try {
            const response = await fetch(url);
            const product = await response.json();
            if (product.status === 0) {
                setFooName("product not found!!!")
                setFooId("product not found!!!")
            }else{
                console.log(product)
                setFooName(product.product.product_name)
                setFooId(product.code)
            }
            
        } catch (error) {
            console.log("Error occured!!!")
            setFooName("error!!!")
            setFooId("error!!!")
        }
    };
    temp_func()

    return(
        <DataComponent barcode={foodId} product_name={fooName}/>
    )
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
    height: windowHeight-200,
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

export default EnterFoodWithBarCode;
