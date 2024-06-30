import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';


export default function TravelPlanResultsScreen({ route }) {
  const { plan } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Travel Plan</Text>
      <Text style={styles.plan}>{plan}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#4A90E2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4A90E2',
  },
  plan: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4E5358',
  },
});