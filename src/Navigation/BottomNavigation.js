import React, { Fragment, useRef } from 'react';
import 'react-native-gesture-handler';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'react-native-paper';
import { HomeScreen, CustomerServiceScreen, AddScreen, SearchScreen, AccountScreen } from '../AppScreens'
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {

  return (
    <Fragment>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          tabBarInactiveTintColor: '#67748E',
          tabBarActiveTintColor: '#4646F2',
          tabBarStyle: { borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingTop: 10, paddingBottom: 10, height: 65, backgroundColor: '#FFFFFF', },
          tabBarHideOnKeyboard: true,
          tabBarVisible: true,
          tabBarShowLabel: false,
          safeAreaInset: {
            bottom: "always"
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          initialParams={{}}
          options={{
            tabBarLabelStyle: {
              fontFamily: 'OpenSans-Regular', fontSize: 12
            },
            tabBarLabel: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Feather name="home" color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="CustomerServiceScreen"
          component={CustomerServiceScreen}
          initialParams={{}}
          options={{
            tabBarLabelStyle: {
              fontFamily: 'OpenSans-Regular', fontSize: 12
            },
            tabBarLabel: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome name="users" color={color} size={20} />
            ),
          }}
        />

        <Tab.Screen
          name="AddScreen"
          component={AddScreen}
          initialParams={{}}
          options={{
            tabBarLabelStyle: {
              fontFamily: 'OpenSans-Regular', fontSize: 12
            },
            tabBarLabel: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <LinearGradient
                start={{ x: 0.0, y: 0.0 }} end={{ x: 0.5, y: 1.0 }}
                colors={['#14bc66', '#14a062', '#16685a', '#183f53']}
                style={{ position: 'absolute', top: -30, width: 65, height: 65, justifyContent: 'center', alignItems: 'center', borderRadius: 100 }}
              >
                <View style={{ backgroundColor: '#FFFFFF', height: 60, width: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 50, }}>
                  <Feather name="plus" color={'#158e5f'} size={25} />
                </View>
              </LinearGradient>
            ),
          }}
        />

        <Tab.Screen
          name="SearchScreen"
          component={SearchScreen}
          initialParams={{}}
          options={{
            tabBarLabelStyle: {
              fontFamily: 'OpenSans-Regular', fontSize: 12
            },
            tabBarLabel: 'Account',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Feather name="search" color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="AccountScreen"
          component={AccountScreen}
          initialParams={{}}
          options={{
            tabBarLabelStyle: {
              fontFamily: 'OpenSans-Regular', fontSize: 12
            },
            tabBarLabel: 'Account',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Feather name="user" color={color} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </Fragment>
  )
}

export default BottomNavigation