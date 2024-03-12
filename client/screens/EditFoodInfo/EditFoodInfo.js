import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, Alert } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { Dimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class EditFoodInfo extends Component {
  constructor(props) {
    super(props);

    const {
      nameIntFace,
      idIntFace,
      expDateIntFace,
      quantityIntFace,
      weightIntFace,
      keyIntFace,
    } = this.props.route.params;

    this.state = {
      name: nameIntFace,
      id: idIntFace,
      quantity: quantityIntFace,
      weight: weightIntFace,
      isDarkMode: false,
      day: expDateIntFace[0] + expDateIntFace[1],
      month: expDateIntFace[3] + expDateIntFace[4],
      year: expDateIntFace[6] + expDateIntFace[7],
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
    const { name, id, quantity, weight, day, month, year, isDarkMode } = this.state;

    if (day < 0 || day > 31) {
      alert(`Please enter a correct day!`);
    } else if (month <= 0 || month > 12) {
      alert(`Please enter a correct month!`);
    } else if (year <= 18 || year > 99) {
      alert(`Please enter a correct year!`);
    } else {
      Alert.alert(
        'Please Confirm Info: ',
        `\nName: ${name},\nID: ${id}, \nQuantity: ${quantity}, \nWeight: ${weight} ,\nExp_Date : ${day}/${month} /${year}`,
        [
          {
            text: 'Cancel',
            onPress: () => {
              console.log('I want to edit again!!!');
            },
          },
          {
            text: 'OK',
            onPress: () => {
              this.props.navigation.navigate('MainInterface');
            },
          },
        ]
      );
    }
  };

  render() {
    const { name, id, quantity, weight, day, month, year, isDarkMode } = this.state;

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

        <View style={styles.middleInput}>
          <View style={styles.middleInputCard}>
            <View style={styles.areaBox}>
              <View style={{ height: 50, justifyContent: 'center' }}>
                <Text style={{ fontSize: 14, color: isDarkMode ? '#FFFFFF' : '#333333', marginBottom: 5 }}>
                  FoodName:
                </Text>
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
                  width: windowWidth - windowWidth / 2.7,
                }}
                value={name}
                onChangeText={(text) => this.setState({ name: text })}
                placeholder="Enter Food Name"
              />
            </View>

            <View style={styles.areaBox}>
              <View style={{ height: 50, justifyContent: 'center' }}>
                <Text style={{ fontSize: 14, color: isDarkMode ? '#FFFFFF' : '#333333', marginBottom: 5 }}>FoodID:</Text>
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
                  width: windowWidth - windowWidth / 2.7,
                }}
                value={id}
                onChangeText={(text) => this.setState({ id: text })}
                placeholder="Enter Food ID"
                keyboardType="number-pad"
                editable={false}
              />
            </View>

            <View style={styles.areaBox}>
              <View style={{ height: 50, justifyContent: 'center' }}>
                <Text style={{ fontSize: 14, color: isDarkMode ? '#FFFFFF' : '#333333', marginBottom: 5 }}>Quantity:</Text>
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
                  width: windowWidth - windowWidth / 2.7,
                }}
                value={quantity.toString()}
                onChangeText={(text) => this.setState({ quantity: text })}
                placeholder="Enter Food Quantity"
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.areaBox}>
              <View style={{ height: 50, justifyContent: 'center' }}>
                <Text style={{ fontSize: 14, color: isDarkMode ? '#FFFFFF' : '#333333', marginBottom: 5 }}>Weight:</Text>
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
                  width: windowWidth - windowWidth / 2.7,
                }}
                value={weight.toString()}
                onChangeText={(text) => this.setState({ weight: text })}
                placeholder="Enter Food Weight"
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.areaBox}>
              <View style={{ height: 70, justifyContent: 'center' }}>
                <Text style={{ fontSize: 14, color: isDarkMode ? '#FFFFFF' : '#333333', marginBottom: 5 }}>EXP Date:</Text>
              </View>
              <View style={styles.inp_container}>
                <Text style={{ fontSize: 14, color: isDarkMode ? '#FFFFFF' : '#333333', marginBottom: 5 }}>Day:</Text>
                <TextInput
                  style={[styles.inputDate, { color: isDarkMode ? '#FFFFFF' : '#333333' }]}
                  keyboardType="numeric"
                  maxLength={2}
                  value={day}
                  onChangeText={this.handleDayChange}
                />

                <Text style={{ fontSize: 14, color: isDarkMode ? '#FFFFFF' : '#333333', marginBottom: 5 }}>Month:</Text>
                <TextInput
                  style={[styles.inputDate, { color: isDarkMode ? '#FFFFFF' : '#333333' }]}
                  keyboardType="numeric"
                  maxLength={2}
                  value={month}
                  onChangeText={this.handleMonthChange}
                />

                <Text style={{ fontSize: 14, color: isDarkMode ? '#FFFFFF' : '#333333', marginBottom: 5 }}>Year:</Text>
                <TextInput
                  style={[styles.inputDate, { color: isDarkMode ? '#FFFFFF' : '#333333' }]}
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

export default EditFoodInfo;
