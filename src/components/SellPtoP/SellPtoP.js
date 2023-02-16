import { ScrollView, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { COLORS } from "../../color/Color";
import ListSell from "../ListSellPtoP/ListSell";
import { useGetP2PSellRequestQuery } from "../../features/user/userApiSlice";
import Loading from "../../pages/Loading/Loading";

const SellPtoP = ({ navigation }) => {
  const { data } = useGetP2PSellRequestQuery();
  if (!data) return <Loading />;
  console.log(data.request);
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data.request}
        renderItem={({ item }) => (
          <Animatable.View animation="slideInDown" duration={1000} delay={300}>
            <ListSell
              sender={item.senderAddress}
              fiat={item.secondUnit}
              crypto={item.firstUnit}
              amount={item.amount}
              total={item.total}
              date={item.date}
              onPress={() => {
                navigation.navigate("AcceptSell", {
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

export default SellPtoP;

const styles = StyleSheet.create({});
