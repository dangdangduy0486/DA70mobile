import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../../color/Color";
import ListSpot from "../ListSpot/ListSpot";
import * as Animatable from "react-native-animatable";
const RequestSpot = ({ navigation }) => {
  const ListFunding = [
    {
      id: 1,
      name: "minhbao",
      amount: 100,
      currency: "VND",
      status: "Pending",
    },
    {
      id: 2,
      name: "minhbao",
      amount: 100,
      currency: "VND",
      status: "Pending",
    },
    {
      id: 3,
      name: "minhbao",
      amount: 100,
      currency: "VND",
      status: "Pending",
    },
    {
      id: 4,
      name: "minhbao",
      amount: 100,
      currency: "VND",
      status: "Pending",
    },
    {
      id: 5,
      name: "minhbao",
      amount: 100,
      currency: "VND",
      status: "Pending",
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={ListFunding}
        renderItem={({ item }) => (
          <Animatable.View animation="slideInDown" duration={1000} delay={300}>
            <ListSpot
              id={item.id}
              name={item.name}
              amount={item.amount}
              currency={item.currency}
              status={item.status}
              onPress={() => {
                alert("hihi");
              }}
            />
          </Animatable.View>
        )}
      />
    </View>
  );
};

export default RequestSpot;

const styles = StyleSheet.create({});
