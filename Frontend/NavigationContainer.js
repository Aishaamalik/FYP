import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './LoginScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';
import PetrolStationMapScreen from './PetrolStationMapScreen';
import ExpensesPieChart from './ExpenseScreen';
import TripCalculatorScreen from './CalculatorScreen';
import HistoryScreen from './HistoryScreen';
import RemindersScreen from './RemindersScreen';
import OffersScreen from './OffersScreen';
import PrivacyPolicyScreen from './PrivacyPolicyScreen';
import SettingsScreen from './SettingsScreen';
import AnalysisScreen from './AnalysisScreen';
import CreateOffersScreen from './CreateOffersScreen';
import SearchCarDetailsScreen from './SearchCarDetailsScreen';
import PaymentDetailsScreen from './PaymentDetails';
import PaymentScreen from './Paywithstrip';
import CarSignupProfileScreen from './CarSignupProfileScreen';
import ChangePassword from './ChangePasswordScreen';
import FuelPriceScreen from './FuelPricesScreen';
import TuckShopMapScreen from './TuckShopMapScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const TabScreens = () => (
  <Tab.Navigator
    tabBarOptions={{
      style: { backgroundColor: 'black' },
      activeTintColor: 'black',
      inactiveTintColor: 'black'
    }}
    useLegacyImplementation
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="home" color={color} size={size} />) }} />
    <Tab.Screen name="Calculator" component={TripCalculatorScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="calculator" color={color} size={size} />) }} />
    <Tab.Screen name="Petrol Station" component={PetrolStationMapScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="map-marker" color={color} size={size} />) }} />
    <Tab.Screen name="TuckShop" component={TuckShopMapScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="shopping-cart" color={color} size={size} />) }} />
    <Tab.Screen name="History" component={HistoryScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="history" color={color} size={size} />) }} />
  </Tab.Navigator>
);

const TabForAdmin = () => (
  <Tab.Navigator
    screenOptions={tabScreenOptions}
    tabBarOptions={{ activeTintColor: 'black', inactiveTintColor: 'gray' }}
  >
    <Tab.Screen name="Analysis" component={AnalysisScreen} />
    <Tab.Screen name="Fuel Prices" component={FuelPriceScreen} />
    <Tab.Screen name="Search Car Details" component={SearchCarDetailsScreen} />
    <Tab.Screen name="Create Offers" component={CreateOffersScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

const tabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Analysis') {
      iconName = focused ? 'analytics' : 'analytics-outline';
    } else if (route.name === 'Fuel Prices') {
      iconName = focused ? 'md-car' : 'md-car-outline';
    } else if (route.name === 'Search Car Details') {
      iconName = focused ? 'search' : 'search-outline';
    } else if (route.name === 'Create Offers') {
      iconName = focused ? 'create' : 'create-outline';
    } else if (route.name === 'Settings') {
      iconName = focused ? 'settings' : 'settings-outline';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

const DrawerScreens = () => (
  <Drawer.Navigator initialRouteName="Home" useLegacyImplementation>
    <Drawer.Screen name="Home" component={TabScreens} defaultStatus="open" options={{
      title: 'Menu',
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#ebd61e',
      headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 60.5,
        fontFamily: 'serif',
        fontSize: 22
      },
    }} />
    <Drawer.Screen name="Vehicle Profile" component={CarSignupProfileScreen}options={{
      title: 'Vehicle Profile',
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#ebd61e',
      headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 40.5,
        fontFamily: 'serif',
        fontSize: 22
      },
    }} />
    <Drawer.Screen name="Reminders" component={RemindersScreen} options={{
      title: 'Reminders',
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#ebd61e',
      headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 45.5,
        fontFamily: 'serif',
        fontSize: 22
      },
    }}  />
    <Drawer.Screen name="Offers" component={OffersScreen} options={{
      title: 'Offers',
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#ebd61e',
      headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 65.5,
        fontFamily: 'serif',
        fontSize: 22
      },
    }}/>
    <Drawer.Screen name="Privacy Policy" component={PrivacyPolicyScreen}options={{
      title: 'Privacy Policy',
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#ebd61e',
      headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 55.5,
        fontFamily: 'serif',
        fontSize: 22
      },
    }} />
    <Drawer.Screen name="Settings" component={SettingsScreen}options={{
      title: 'Settings',
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#ebd61e',
      headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 65.5,
        fontFamily: 'serif',
        fontSize: 22
      },
    }} />
  </Drawer.Navigator>
);

const NavigationContainerComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" useLegacyImplementation>
        <Stack.Screen name="Login" component={LoginScreen} options={{
          title: 'FuelFlow',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#ebd61e',
          headerTitleStyle: {
            fontWeight: 'bold',
            marginLeft: 125.5,
            fontFamily: 'serif',
            fontSize: 22
          },
        }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{
          title: 'FuelFlow',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#ebd61e',
          headerTitleStyle: {
            fontWeight: 'bold',
            marginLeft: 60.5,
            fontFamily: 'serif',
            fontSize: 22
          },
        }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{
          title: 'FuelFlow',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#ebd61e',
          headerTitleStyle: {
            fontWeight: 'bold',
            marginLeft: 60.5,
            fontFamily: 'serif',
            fontSize: 22
          },
        }} />
        <Stack.Screen name="Home" component={DrawerScreens} options={{
          title: 'FuelFlow',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#ebd61e',
          headerTitleStyle: {
            fontWeight: 'bold',
            marginLeft: 100.5,
            fontFamily: 'serif',
            fontSize: 22
          },
        }} />
        <Stack.Screen name="Admin" component={TabForAdmin} />
        <Stack.Screen name="PaymentDetails" component={PaymentDetailsScreen} />
        <Stack.Screen name="PayEasy" component={PaymentScreen} />
        <Stack.Screen name="Change Password" component={ChangePassword} options={{
      title: 'Change Password',
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#ebd61e',
      headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 25.5,
        fontFamily: 'serif',
        fontSize: 22
      },
    }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationContainerComponent;
