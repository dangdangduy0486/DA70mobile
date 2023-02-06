import { ScrollView, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { useRoute } from "@react-navigation/native";
import { COLORS } from "../../color/Color";
import ListBuy from "../ListBuyPtoP/ListBuy";
const BuyPtoP = ({ navigation }) => {
  // const route = useRoute();
  // const { name, amount } = route.params;
  // const listBuy = [];
  // listBuy.push({ name, amount });
  // console.log(listBuy);
  const listBuy = [
    {
      id: 1,
      name: "minhbao",
      price: 24.0,
      currency: "BTC",
      amount: 100,
      date: "10 days ago",
    },
    {
      id: 2,
      name: "dangduy",
      price: 55.0,
      currency: "BTC",
      amount: 10,
      date: "10 days ago",
    },
    {
      id: 3,
      name: "dangduy1",
      price: 39.0,
      currency: "BTC",
      amount: 110,
      date: "10 days ago",
    },
    {
      id: 4,
      name: "trongphu",
      price: 24.0,
      currency: "VND",
      amount: 100,
      date: "10 days ago",
    },
    {
      id: 5,
      name: "tuanhung",
      price: 24.0,
      currency: "BNB",
      amount: 100,
      date: "10 days ago",
    },
    {
      id: 6,
      name: "quoccuong",
      price: 24.0,
      currency: "BTC",
      amount: 100,
      date: "10 days ago",
    },
    {
      id: 7,
      name: "quoccuong",
      price: 24.0,
      currency: "USDT",
      amount: 100,
      date: "10 days ago",
    },
    {
      id: 8,
      name: "quoccuong",
      price: 24.0,
      currency: "BTC",
      amount: 100,
      date: "10 days ago",
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={listBuy}
        renderItem={({ item }) => (
          <Animatable.View animation="slideInDown" duration={1000} delay={300}>
            <ListBuy
              name={item.name}
              price={item.price}
              currency={item.currency}
              amount={item.amount}
              date={item.date}
              onPress={() => {
                navigation.navigate("AcceptBuy", {
                  id: item.id,
                  currency: item.currency,
                  amount: item.amount,
                  price: item.price,
                });
              }}
            />
          </Animatable.View>
        )}
      />
    </View>
  );
};

export default BuyPtoP;

const styles = StyleSheet.create({});
