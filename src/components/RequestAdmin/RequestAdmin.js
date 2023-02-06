import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS } from "../../color/Color";
import UserAdmin from "../../components/UserAdmin/UserAdmin";
import TransactionAdmin from "../../components/TransactionAdmin/TransactionAdmin";
import RequestFunding from "../RequestFunding/RequestFunding";
import RequestSpot from "../RequestSpot/RequestSpot";
const Tab = createMaterialTopTabNavigator();
const RequestAdmin = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <Tab.Navigator
        initialRouteName="Funding"
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: { width: 100 },
          tabBarStyle: { backgroundColor: "black" },
          tabBarActiveTintColor: COLORS.yellow1,
          tabBarIndicatorStyle: { backgroundColor: COLORS.yellow1 },
          tabBarScrollEnabled: true,
        }}
      >
        <Tab.Screen name="Funding" component={RequestFunding} />

        <Tab.Screen name="Spot" component={RequestSpot} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default RequestAdmin;

const styles = StyleSheet.create({});
