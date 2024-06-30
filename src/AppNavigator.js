import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './Home';
import TravelPlanResultsScreen from './TravelPlanResults';
import SavedPlansScreen from './SavedPlans';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'AI Travel Planner' }} />
      <Stack.Screen name="TravelPlanResults" component={TravelPlanResultsScreen} options={{ title: 'Your Travel Plan' }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SavedPlans') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#357FD3',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Plan Trip' }} />
      <Tab.Screen name="SavedPlans" component={SavedPlansScreen} options={{ title: 'Saved Plans' }} />
    </Tab.Navigator>
  );
}