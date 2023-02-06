import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";

import Overview from "../../components/Overview/Overview";
import Funding from "../../components/Funding/Funding";
import Futures from "../../components/Futures/Futures";
import Fiat from "../../components/Fiat/Fiat";
import { COLORS } from "../../color/Color";
import { useGetUserQuery } from "../../features/user/userApiSlice";

const Tab = createMaterialTopTabNavigator();
const Wallet = ({ navigation }) => {
  // const navigation = useNavigation();
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
            <Tab.Screen name="Funding" component={Funding} />
            <Tab.Screen name="Futures" component={Futures} />
          </Tab.Navigator>
        </>
      ) : (
        <>
          <Text>LPlease Login !!</Text>
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
