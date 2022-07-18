import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, DaftarJual, Jual, Notifikasi, Akun} from '../Screens';
import {COLORS} from '../Utils/Colors';
import {useSelector} from 'react-redux';
import {Platform} from 'react-native';

const Tab = createBottomTabNavigator();

const MainApp = () => {
  const loginUser = useSelector(state => state.appData.loginUser);

  const bottom = Platform.OS === 'ios' ? 20 : 5;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Notifikasi') {
            iconName = 'bell-outline';
          } else if (route.name === 'Jual') {
            iconName = 'plus-circle-outline';
          } else if (route.name === 'DaftarJual') {
            iconName = 'view-list-outline';
          } else if (route.name === 'Akun') {
            iconName = 'account-outline';
          }
          return <Icon name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: COLORS.white,
        tabBarActiveBackgroundColor: COLORS.white,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: COLORS.dark,
          height: 60,
          borderRadius: 15,
          marginHorizontal: 5,
          paddingHorizontal: 10,
          bottom: bottom,
        },
        tabBarItemStyle: {
          height: 40,
          marginHorizontal: 15,
          marginVertical: 10,
          borderRadius: 15,
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Notifikasi"
        component={Notifikasi}
        listeners={({navigation}) => ({
          tabPress: e => {
            if (!loginUser) {
              e.preventDefault();
              navigation.navigate('Auth');
            }
          },
        })}
      />
      <Tab.Screen
        name="Jual"
        component={Jual}
        options={{
          tabBarStyle: {display: 'none'},
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            if (!loginUser) {
              e.preventDefault();
              navigation.navigate('Auth');
            }
          },
        })}
      />
      <Tab.Screen
        name="DaftarJual"
        component={DaftarJual}
        listeners={({navigation}) => ({
          tabPress: e => {
            if (!loginUser) {
              e.preventDefault();
              navigation.navigate('Auth');
            }
          },
        })}
      />
      <Tab.Screen name="Akun" component={Akun} />
    </Tab.Navigator>
  );
};

export default MainApp;
