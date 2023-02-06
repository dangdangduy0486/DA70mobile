import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS } from "../../color/Color";
import UserAdmin from "../../components/UserAdmin/UserAdmin";
import RequestAdmin from "../../components/RequestAdmin/RequestAdmin";
import TransactionAdmin from "../../components/TransactionAdmin/TransactionAdmin";
const Tab = createMaterialTopTabNavigator();
const AdminPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <Tab.Navigator
        initialRouteName="Users"
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: { width: 100 },
          tabBarStyle: { backgroundColor: "black" },
          tabBarActiveTintColor: COLORS.yellow1,
          tabBarIndicatorStyle: { backgroundColor: COLORS.yellow1 },
          tabBarScrollEnabled: true,
        }}
      >
        <Tab.Screen name="Users" component={UserAdmin} />
        <Tab.Screen name="Requests" component={RequestAdmin} />
        <Tab.Screen name="History" component={TransactionAdmin} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default AdminPage;

const styles = StyleSheet.create({});
