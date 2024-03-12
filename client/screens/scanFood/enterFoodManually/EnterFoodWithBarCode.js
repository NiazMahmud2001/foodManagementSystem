// UserInputForm.js
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class DataComponent extends Component {
  constructor(props) {
    super(props);
    //need to re-define the day , month , year part
    this.state = {
      name: props.product_name,
      barcodeId: props.barcode,
      quantity: '',
      weight: '',
      isDarkMode: false,
      day: props.expDate[0] + props.expDate[1],
      month: props.expDate[3] + props.expDate[4],
      year: props.expDate[6] + props.expDate[7] + props.expDate[8] + props.expDate[9],
    };
  }

  handleDayChange = (text) => {
    this.setState({ day: text });
  };

  handleMonthChange = (text) => {
    this.setState({ month: text });
  };

  handleYearChange = (text) => {
    this.setState({ year: text });
  };

  handleSubmit = () => {
    const { name, barcodeId, quantity, weight, day, month, year } = this.state;
    if (name !== '' || !barcodeId || quantity !== '' || weight !== '' || day !== '' || month !== '' || year !== '') {
      alert('Please enter name, id, quantity, weight, day, month, year');
    } else {
      console.log('Form submitted:', { name, barcodeId, quantity, weight, day, month, year });
    }
  };

  render() {
    const { isDarkMode, name, barcodeId, quantity, weight, day, month, year } = this.state;

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
            onPress={(value) => this.setState({ isDarkMode: value })}
          />
        </View>

        <View style={styles.middleInput}>
          <View style={styles.middleInputCard}>
            <View style={styles.areaBox}>
              <View style={styles.inputLabelContainer}>
                <Text style={{
                    fontSize: 14,
                    color: isDarkMode ? '#FFFFFF' : '#333333',
                    marginBottom: 5,
                }}>Food Name:</Text>
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
                value={name}
                onChangeText={(text) => this.setState({ name: text })}
                placeholder="Enter Food Name"
              />
            </View>

            <View style={styles.areaBox}>
              <View style={styles.inputLabelContainer}>
                <Text style={{
                    fontSize: 14,
                    color: isDarkMode ? '#FFFFFF' : '#333333',
                    marginBottom: 5,
                }}>Food ID:</Text>
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
                value={barcodeId}
                onChangeText={(text) => this.setState({ barcodeId: text })}
                editable={true}
              />
            </View>

            <View style={styles.areaBox}>
              <View style={styles.inputLabelContainer}>
                <Text style={{
                    fontSize: 14,
                    color: isDarkMode ? '#FFFFFF' : '#333333',
                    marginBottom: 5,
                }}>Quantity:</Text>
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
                onChangeText={(text) => this.setState({ quantity: text })}
                placeholder="Enter Food Quantity"
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.areaBox}>
              <View style={styles.inputLabelContainer}>
                <Text style={{
                    fontSize: 14,
                    color: isDarkMode ? '#FFFFFF' : '#333333',
                    marginBottom: 5,
                }}>Weight:</Text>
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
                onChangeText={(text) => this.setState({ weight: text })}
                placeholder="Enter Food Weight"
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.areaBox}>
              <View style={styles.inputLabelContainer}>
                <Text style={{
                    fontSize: 14,
                    color: isDarkMode ? '#FFFFFF' : '#333333',
                    marginBottom: 5,
                }}>EXP Date:</Text>
              </View>
              <View style={styles.inpContainer}>
                <Text style={{
                    fontSize: 14,
                    color: isDarkMode ? '#FFFFFF' : '#333333',
                    marginBottom: 5,
                }}>Day:</Text>
                <TextInput
                    style={[styles.inputDate , {color:isDarkMode ? '#FFFFFF' : '#333333',}]}
                    keyboardType="numeric"
                    maxLength={2}
                    value={day}
                    onChangeText={this.handleDayChange}
                />

                <Text style={{
                    fontSize: 14,
                    color: isDarkMode ? '#FFFFFF' : '#333333',
                    marginBottom: 5,
                }}>/Month:</Text>
                <TextInput
                    style={[styles.inputDate , {color:isDarkMode ? '#FFFFFF' : '#333333',}]}
                    keyboardType="numeric"
                    maxLength={2}
                    value={month}
                    onChangeText={this.handleMonthChange}
                />

                <Text style={{
                    fontSize: 14,
                    color: isDarkMode ? '#FFFFFF' : '#333333',
                    marginBottom: 5,
                }}>/Year:</Text>
                <TextInput
                    style={[styles.inputDate , {color:isDarkMode ? '#FFFFFF' : '#333333',}]}
                    keyboardType="numeric"
                    maxLength={4}
                    value={year}
                    onChangeText={this.handleYearChange}
                />
              </View>
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

class EnterFoodWithBarCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fooName: '',
      foodId: '-1',
    };
  }

  componentDidMount() {
    this.fetchProductData();
  }

  fetchProductData = async () => {
    const { route } = this.props;
    const { barcodess, expDate } = route.params;
    const url = `https://world.openfoodfacts.net/api/v2/product/${barcodess}?fields=product_name,nutriscore_data`;

    try {
      const response = await fetch(url);
      const product = await response.json();
      if (product.status === 0) {
        this.setState({ fooName: 'product not found!!!', foodId: 'product not found!!!' });
      } else {
        this.setState({ fooName: product.product.product_name, foodId: product.code });
      }
    } catch (error) {
      console.log('Error occurred!!!');
      this.setState({ fooName: 'error!!!', foodId: 'error!!!' });
    }
  };

  render() {
    const { fooName, foodId } = this.state;

    return <DataComponent barcode={foodId} product_name={fooName} expDate={this.props.route.params.expDate} />;
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
    width: '100%',
    height: windowHeight - 200,
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
  },
  middleInputCard: {},
  areaBox: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputLabelContainer: {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#555555',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#333333',
    color: '#FFFFFF',
    width: windowWidth - windowWidth / 2.7,
  },
  inpContainer: {
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
  dateLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: '#FFFFFF',
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
