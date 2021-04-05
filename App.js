import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// icon
import IonIcons from '@expo/vector-icons/Ionicons';
// screens
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator 
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if(route.name === 'Home') {
            iconName = 'home-outline'
          } else if (route.name === 'Login') {
            iconName = 'add-circle-outline';
          } 
          else if (route.name === 'Register') {
            iconName = 'person-circle-outline';
          }
          return <IonIcons name={iconName} color={color} size={size} />
        }
      })}
      tabBarOptions={{
        activeTintColor: '#03befc',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Register" component={Register} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
