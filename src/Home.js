import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormInput from './FormInput';
import CustomButton from './CustomButton';
import LoadingSpinner from './LoadingSpinner';
import { generateTravelPlan } from '../services/Service';
import { saveTravelPlan } from '../services/Storage';


export default function HomeScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    startingPlace: '',
    destination: '',
    duration: '',
    budget: '',
    additionalRequirements: '',
  });

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.destination || !formData.duration || !formData.budget) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const plan = await generateTravelPlan(formData);
      await saveTravelPlan(plan);
      navigation.navigate('TravelPlanResults', { plan });
    } catch (error) {
      Alert.alert('Error', 'Failed to generate travel plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <FormInput
        label="Your Name"
        value={formData.name}
        onChangeText={(text) => handleInputChange('name', text)}
        placeholder="Enter your name"
        required
      />
      <FormInput
        label="Starting Place"
        value={formData.startingPlace}
        onChangeText={(text) => handleInputChange('startingPlace', text)}
        placeholder="Enter your starting location"
      />
      <FormInput
        label="Destination"
        value={formData.destination}
        onChangeText={(text) => handleInputChange('destination', text)}
        placeholder="Enter your destination"
        required
      />
      <FormInput
        label="Duration (days)"
        value={formData.duration}
        onChangeText={(text) => handleInputChange('duration', text)}
        placeholder="Enter trip duration"
        keyboardType="numeric"
        required
      />
      <FormInput
        label="Budget (EGP)"
        value={formData.budget}
        onChangeText={(text) => handleInputChange('budget', text)}
        placeholder="Enter your budget"
        keyboardType="numeric"
        required
      />
      <FormInput
        label="Additional Requirements"
        value={formData.additionalRequirements}
        onChangeText={(text) => handleInputChange('additionalRequirements', text)}
        placeholder="Any specific preferences or requirements"
        multiline
      />
      <CustomButton title="Generate Travel Plan" onPress={handleSubmit} disabled={loading} />
      {loading && <LoadingSpinner />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#6A68CF',
  },
});