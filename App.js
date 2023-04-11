import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './screens/login/Login';
import TaoTaiKhoan from './screens/login/TaoTaiKhoan';
import HomeScreen from './screens/tabScreen/HomeScreen';
import SettingScreen from './screens/tabScreen/SettingScreen';
import DoiMatKhau from './screens/user/DoiMatKhau';
import ThongTinCN from './screens/user/ThongTinCN';




//cường nè
const Tab = createBottomTabNavigator();
const StackDemo = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: () => <Image source={require('./assets/house.png')} style={{ width: 25, height: 25 }} resizeMode="stretch" />
      }} />
      <Tab.Screen name="Setting" component={SettingScreen} options={{
        tabBarIcon: () => <Image source={require('./assets/settings.png')} style={{ width: 25, height: 25 }} resizeMode="stretch" />
      }} />
    </Tab.Navigator>
  );
}


export default function App() {
  const [trangThai, settrangThai] = useState(false);

  const kiemTraTrangThai = async () => {
    try {
      const value = await AsyncStorage.getItem(keys);
      if (value !== null) {
        settrangThai(true)
      }

    } catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    kiemTraTrangThai()
  })
  return (
    <NavigationContainer>
      <StackDemo.Navigator>
        {
          !trangThai && <StackDemo.Screen name="Login" component={Login} options={({ headerShown: false })} />
        }

        <StackDemo.Screen name="Main" component={MyTabs} options={({ headerShown: false })} />
        <StackDemo.Screen name="CreateAccount" component={TaoTaiKhoan} />
        <StackDemo.Screen name="ThongTinCN" component={ThongTinCN} options={{ title: "Thông tin người dùng" }} />
        <StackDemo.Screen name="DoiMatKhau" component={DoiMatKhau} options={{ title: "Đổi mật khẩu" }} />
      </StackDemo.Navigator>
    </NavigationContainer>
  );
}

