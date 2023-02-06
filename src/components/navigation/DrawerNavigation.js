import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Signup from "../../pages/Signup/Signup";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Login from "../../pages/Login/Login";
import Tabs from "./Tabs";
import BarCodeScanScreen from "../QRScanScreen/BarCodeScanScreen";
import Home from "../../pages/Home/Home";
import { COLORS } from "../../color/Color";
import { TouchableOpacity } from "react-native-gesture-handler";
import useAuth from "../../hooks/useAuth";
import { useGetUserQuery } from "../../features/user/userApiSlice";
import Loading from "../../pages/Loading/Loading";
import AdminPage from "../../pages/AdminPage/AdminPage";
// import UserInformation from "../../pages/UserInformation/UserInformation";
import bao from "../../images/coin2.png";
import { useState } from "react";
import Transactions from "../Transactions/Transactions";
import Exchange from "../../pages/Exchange/Exchange";
import Exchanges from "../Exchanges/Exchanges";
import Derivatives from "../Exchanges/Derivatives";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Drawer = createDrawerNavigator();
const User = () => {
  // const { email } = useAuth();
  // if (!email) return null;
  const { data } = useGetUserQuery();
  // if (!data) return <Loading />;
  // console.log(data);
  return (
    <View
      style={{
        backgroundColor: COLORS.yellow1,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          height: 60,
          width: 60,
          borderRadius: 30,
          borderColor: "black",
          borderWidth: 3,
        }}
      />
      <Text style={{ fontSize: 16, fontWeight: "bold", paddingVertical: 5 }}>
        {data.user ? data.user.fullname : ""}
      </Text>
    </View>
  );
};
const Guest = () => {
  return (
    <View
      style={{
        backgroundColor: COLORS.yellow1,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>DBcryto</Text>
    </View>
  );
};
const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const { data } = useGetUserQuery();
  const [sendLogout] = useSendLogoutMutation();
  // if (!data) return <Loading />;
  const handleLogout = async () => {
    console.log("hello");
    console.log(await AsyncStorage.getItem("token"));
    await AsyncStorage.removeItem("token");
    await sendLogout;
    navigation.navigate("Market");
  };
  return (
    <View style={{ flex: 1 }}>
      {data ? <User /> : <Guest />}
      <DrawerContentScrollView>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerItem
        labelStyle={{
          color: "white",
          fontSize: 20,
        }}
        label="Logout"
        icon={(color) => (
          <MaterialCommunityIcons
            name="logout"
            size={30}
            color={COLORS.yellow1}
          />
        )}
        onPress={handleLogout}
      />
    </View>
  );
};

const DrawerNavigation = () => {
  const { data } = useGetUserQuery();
  // if (!data) return <Loading />;
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: "100%",
          backgroundColor: COLORS.black,
        },
        drawerLabelStyle: { fontSize: 16, fontWeight: "bold", color: "white" },
        swipeEdgeWidth: Dimensions.get("window").width / 2,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      {!data ? (
        <>
          <Drawer.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Drawer.Screen
            options={{ headerShown: false }}
            name="Signup"
            component={Signup}
          />
          <Drawer.Screen
            options={{ headerShown: false }}
            name="QR Code Scan"
            component={BarCodeScanScreen}
          />
        </>
      ) : (
        <>
          {data.user.role === "admin" ? (
            <>
              <Drawer.Screen
                options={{ headerShown: false }}
                name="Admin"
                component={AdminPage}
              />
              {/* <Drawer.Screen
            options={{ headerShown: false }}
            name="Profile"
            // component={UserInformation}
          /> */}
            </>
          ) : (
            <></>
          )}
        </>
      )}
      <Drawer.Screen
        options={{ headerShown: false }}
        name="DBCoin"
        component={Tabs}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name="Transactions"
        component={Transactions}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name="Exchanges"
        component={Exchanges}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name="Derivatives"
        component={Derivatives}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
