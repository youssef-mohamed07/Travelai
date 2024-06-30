import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveTravelPlan(plan) {
  try {
    const savedPlans = await AsyncStorage.getItem('savedPlans');
    const plans = savedPlans ? JSON.parse(savedPlans) : [];
    plans.push({ id: Date.now(), plan });
    await AsyncStorage.setItem('savedPlans', JSON.stringify(plans));
  } catch (error) {
    console.error('Error saving travel plan:', error);
  }
}

export async function getSavedPlans() {
  try {
    const savedPlans = await AsyncStorage.getItem('savedPlans');
    return savedPlans ? JSON.parse(savedPlans) : [];
  } catch (error) {
    console.error('Error getting saved plans:', error);
    return [];
  }
}