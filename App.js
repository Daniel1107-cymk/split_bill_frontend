import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// icon
import IonIcons from '@expo/vector-icons/Ionicons';
// screens
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Split from './src/screens/Split';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

const Stack = createStackNavigator();
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
          } else if (route.name === 'Split') {
            iconName = 'add-circle-outline';
          } 
          else if (route.name === 'Profile') {
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
      <Tab.Screen name="Split" component={Split} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{title: "Split Bill", headerTitleAlign: 'center'}} component={MyTabs} />
        <Stack.Screen name="Register" options={{headerShown: false}} component={Register} />
        <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
