import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { saveTravelPlan } from '../services/Storage';

export default function SavedPlansScreen() {
  const [savedPlans, setSavedPlans] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadSavedPlans();
  }, []);

  const loadSavedPlans = async () => {
    const plans = await getSavedPlans();
    setSavedPlans(plans);
  };

  const renderPlanItem = ({ item }) => (
    <TouchableOpacity
      style={styles.planItem}
      onPress={() => navigation.navigate('TravelPlanResults', { plan: item.plan })}
    >
      <Text style={styles.planTitle}>Trip to {item.plan.split('\n')[0]}</Text>
      <Text style={styles.planDate}>{new Date(item.id).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Travel Plans</Text>
      {savedPlans.length > 0 ? (
        <FlatList
          data={savedPlans}
          renderItem={renderPlanItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.noPlansText}>No saved plans yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#384657',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4A90E2',
  },
  planItem: {
    backgroundColor: '#5141E4',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#67696B',
  },
  planDate: {
    fontSize: 14,
    color: '#5F656B',
    marginTop: 5,
  },
  noPlansText: {
    fontSize: 16,
    color:'#88919B',
    textAlign: 'center',
  },
});