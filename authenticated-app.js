import React from 'react';

import {useAuth} from './react/context/auth-context';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import * as colors from './styles/colors';
import {isRecruiter} from './services/role-service';
import HomeRecruiterScreen from './react/screens/recruiter/home-recruiter-screen';
import HomeCandidateScreen from './react/screens/candidate/home-candidate-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import AddOfferScreen from './react/screens/candidate/add-offer-screen';
import OfferScreen from './react/screens/offer-screen';
import CreateOfferScreen from './react/screens/recruiter/create-offer-screen';
import InviteCandidatScreen from './react/screens/recruiter/invite-candidat-screen';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function AuthenticatedApp() {
  const {user} = useAuth();
  return isRecruiter(user) ? RecruiterRoutes() : LarbinRoutes();
}

function RecruiterRoutes() {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor={colors.white}
        inactiveColor={colors.text}
        barStyle={{backgroundColor: colors.primary}}>
        <Tab.Screen
          name="Home"
          component={HomeRecruiterScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="home"
                color={colors.white}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Offer"
          component={OfferScreen}
          options={{
            visible: false,
          }}
        />
        <Tab.Screen
          name="Invite"
          component={InviteCandidatScreen}
          options={{
            visible: false,
          }}
        />
        <Tab.Screen
          name="Create Offer"
          component={CreateOfferScreen}
          options={{
            tabBarLabel: 'Create Offer',
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="plus"
                color={colors.white}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

function LarbinRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeCandidateScreen} />
      <Stack.Screen name="AddOffer" component={AddOfferScreen} />
      <Stack.Screen name="Application" component={HomeCandidateScreen} />
      <Stack.Screen name="Offer" component={OfferScreen} />
    </Stack.Navigator>
  );
}

export default AuthenticatedApp;
