// UserInputForm.js
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { Dropdown } from 'react-native-element-dropdown';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class EnterFoodManually extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      id: '',
      quantity: '',
      weight: '',
      isDarkMode: false,
      day: '',
      month: '',
      year: '',
    };
  }

  handleDayChange = (text) => {
    // Add any validation logic if needed
    this.setState({ day: text });
  };

  handleMonthChange = (text) => {
    // Add any validation logic if needed
    this.setState({ month: text });
  };

  handleYearChange = (text) => {
    // Add any validation logic if needed
    this.setState({ year: text });
  };

  handleSubmit = () => {
    // Add logic to handle form submission
    const { name, id, quantity, weight, day, month, year } = this.state;
    if (name === '' || id === '' || quantity === '' || weight === '' || day === '' || month === '' || year === '') {
      alert('Please enter name, id, quantity, weight, day, month, year');
    } else {
      console.log('Form submitted:', { name, id, quantity, weight, day, month, year });
    }
  };

  render() {
    const { isDarkMode, name, id, quantity, weight, day, month, year } = this.state;
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
            onPress={(value) => this.setState({ isDarkMode: value })}
          />
        </View>

        <View style={styles.middleInput}>
          <View style={styles.middleInputCard}>
            <View style={styles.areaBox}>
              <View style={styles.inputLabelContainer}>
                <Text style={styles.inputLabel}>FoodName:</Text>
              </View>
              <TextInput
                style={styles.inputField}
                value={name}
                onChangeText={(text) => this.setState({ name: text })}
                placeholder="Enter Food Name"
              />
            </View>

            <View style={styles.areaBox}>
              <View style={styles.inputLabelContainer}>
                <Text style={styles.inputLabel}>FoodID:</Text>
              </View>
              <TextInput
                style={styles.inputField}
                value={id}
                onChangeText={(text) => this.setState({ id: text })}
                placeholder="Enter Food ID"
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.areaBox}>
              <View style={styles.inputLabelContainer}>
                <Text style={styles.inputLabel}>Quantity:</Text>
              </View>
              <TextInput
                style={styles.inputField}
                value={quantity}
                onChangeText={(text) => this.setState({ quantity: text })}
                placeholder="Enter Food Quantity"
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.areaBox}>
              <View style={styles.inputLabelContainer}>
                <Text style={styles.inputLabel}>Weight:</Text>
              </View>
              <TextInput
                style={styles.inputField}
                value={weight}
                onChangeText={(text) => this.setState({ weight: text })}
                placeholder="Enter Food Weight"
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.areaBox}>
              <View style={styles.inputLabelContainer}>
                <Text style={styles.inputLabel}>EXP Date:</Text>
              </View>
              <View style={styles.dateInputContainer}>
                <Text style={styles.dateInputLabel}>Day:</Text>
                <TextInput
                  style={styles.dateInput}
                  keyboardType="numeric"
                  maxLength={2}
                  value={day}
                  onChangeText={this.handleDayChange}
                />

                <Text style={styles.dateInputLabel}>/Month:</Text>
                <TextInput
                  style={styles.dateInput}
                  keyboardType="numeric"
                  maxLength={2}
                  value={month}
                  onChangeText={this.handleMonthChange}
                />

                <Text style={styles.dateInputLabel}>/Year:</Text>
                <TextInput
                  style={styles.dateInput}
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
  inputLabelContainer: {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
  },
  inputLabel: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
  },
  inputField: {
    height: 50,
    borderColor: '#555555',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    color: '#333333',
    width: windowWidth - windowWidth / 2.7,
  },
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    height: 25,
  },
  dateInputLabel: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
  },
  dateInput: {
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

export default EnterFoodManually;
