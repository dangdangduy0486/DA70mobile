import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Overview from "../../components/Overview/Overview";
import Fiat from "../../components/Fiat/Fiat";
import { COLORS } from "../../color/Color";
import { useGetUserQuery } from "../../features/user/userApiSlice";
import Crypto from "../../components/Crypto/Crypto";

const Tab = createMaterialTopTabNavigator();
const Wallet = ({ navigation }) => {
  const { data: userInfo } = useGetUserQuery();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      {userInfo ? (
        <>
          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle: { fontSize: 12 },
              tabBarItemStyle: { width: 100 },
              tabBarStyle: { backgroundColor: "black" },
              tabBarActiveTintColor: COLORS.yellow1,
              tabBarIndicatorStyle: { backgroundColor: COLORS.yellow1 },
            }}
          >
            <Tab.Screen name="Overview" component={Overview} />
            <Tab.Screen name="Fiat" component={Fiat} />
            <Tab.Screen name="Crypto" component={Crypto} />
          </Tab.Navigator>
        </>
      ) : (
        <>
          <Text>Please Login !!</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={walletCss.appButtonContainer}
          >
            <Text style={walletCss.appButtonText}>Login</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default Wallet;

const walletCss = StyleSheet.create({
  appButtonContainer: {
    elevation: 5,
    backgroundColor: COLORS.yellow1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  appButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    alignItems: "center",
  },
});
