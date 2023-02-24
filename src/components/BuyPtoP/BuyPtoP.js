import { ScrollView, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import ListBuy from "../ListBuyPtoP/ListBuy";
import { useGetP2PBuyRequestQuery } from "../../features/user/userApiSlice";
import Loading from "../../pages/Loading/Loading";
const BuyPtoP = ({ navigation }) => {
  const { data } = useGetP2PBuyRequestQuery();
  if (!data) return <Loading />;

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
                  id: item._id,
                  sender: item.senderAddress,
                  fiat: item.secondUnit,
                  crypto: item.firstUnit,
                  amount: item.amount,
                  total: item.total,
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
