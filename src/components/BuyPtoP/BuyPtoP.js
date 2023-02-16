import { ScrollView, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { useRoute } from "@react-navigation/native";
import { COLORS } from "../../color/Color";
import ListBuy from "../ListBuyPtoP/ListBuy";
import { useGetP2PBuyRequestQuery } from "../../features/user/userApiSlice";
import Loading from "../../pages/Loading/Loading";
const BuyPtoP = ({ navigation }) => {
  const { data, isFetching } = useGetP2PBuyRequestQuery();
  if (!data) return <Loading />;
  console.log(data.request);

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data.request}
        renderItem={({ item }) => (
          <Animatable.View animation="slideInDown" duration={1000} delay={300}>
            <ListBuy
              sender={item.senderAddress}
              fiat={item.secondUnit}
              crypto={item.firstUnit}
              amount={item.amount}
              total={item.total}
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
