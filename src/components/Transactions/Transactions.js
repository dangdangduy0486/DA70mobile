import { ScrollView, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { useGetTransactionsQuery } from "../../features/coins/coinsApiSlice";
import Loading from "../../pages/Loading/Loading";
import { COLORS } from "../../color/Color";
import ListTransactions from "./ListTransactions";

const Transactions = () => {
  const { data } = useGetTransactionsQuery();

  if (!data) return <Loading />;

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data.transaction}
        renderItem={({ item }) => (
          <Animatable.View animation="slideInDown" duration={1000} delay={300}>
            <ListTransactions
              sender={item.senderAddress}
              reciever={item.recieverAddress}
              fiat={item.secondUnit}
              crypto={item.firstUnit}
              amount={item.amount}
              total={item.total}
              date={item.date}
            />
          </Animatable.View>
        )}
      />
    </View>
  );
};

const RenderItem = ({ item, index }) => (
  <View>
    <Text style={styles.content}>{item.recieverAddress}</Text>
    <Text style={styles.content}>{item.senderAddress}</Text>
    <Text style={styles.content}>{item.firstUnit} </Text>
    <Text style={styles.content}> {item.secondUnit}</Text>
    <Text style={styles.content}>{item.amount} </Text>
    <Text style={styles.content}> {item.total}</Text>
    <Text style={styles.content}> {item.date}</Text>
    {/* <Image
        style={{ height: 300, width: 300 }}
        source={item.image}
        resizeMode="contain"
      /> */}
  </View>
);
export default Transactions;

const styles = StyleSheet.create({
  container: {
    // marginTop: 50,
    flex: 1,
    backgroundColor: "black",
    height: 50,
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
  titleWrapper: {
    marginTop: 80,
    paddingHorizontal: 16,
  },
  content: {
    color: "white",
  },
  user_address: {
    // display: "block",
    // width: 15em,
    // overflow: "hidden",
    // text: "ellipsis"
  },
});
