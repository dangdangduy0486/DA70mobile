import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../color/Color";
import { useRoute } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RequestSpot from "../../components/RequestSpot/RequestSpot";
import SpotTransaction from "../../components/SpotTransaction/SpotTransaction";
import FutureTransaction from "../../components/FutureTransaction/FutureTransaction";
const Tab = createMaterialTopTabNavigator();
const Exchange = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Exchange</Text>
      </View>
      <View style={styles.divider} />
      <View style={{ flex: 1, backgroundColor: "red" }}>
        <Tab.Navigator
          initialRouteName="Spot"
          screenOptions={{
            tabBarLabelStyle: { fontSize: 12 },
            tabBarItemStyle: { width: 100 },
            tabBarStyle: { backgroundColor: "black" },
            tabBarActiveTintColor: COLORS.yellow1,
            tabBarIndicatorStyle: { backgroundColor: COLORS.yellow1 },
            tabBarScrollEnabled: true,
          }}
        >
          <Tab.Screen
            name="Spot"
            component={SpotTransaction}
            initialParams={{ id: "bitcoin" }}
          />

          <Tab.Screen name="Futures" component={FutureTransaction} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Exchange;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    height: 50,
  },
  titleWrapper: {
    marginTop: 80,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.yellow1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.secondColor,
    marginHorizontal: 16,
    marginTop: 16,
  },
});
