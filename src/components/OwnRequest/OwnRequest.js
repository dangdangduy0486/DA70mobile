import React from "react";
import { ScrollView, StyleSheet, Text, View, FlatList } from "react-native";
import { useGetUserOwnRequestQuery } from "../../features/user/userApiSlice";
import * as Animatable from "react-native-animatable";
import Loading from "../../pages/Loading/Loading";
import OwnRequestList from "./OwnRequestList";

const OwnRequest = () => {
  const { data: p2pData } = useGetUserOwnRequestQuery();
  if (!p2pData) return <Loading />;

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        keyExtractor={(item) => item._id}
        data={p2pData.request}
        renderItem={({ item }) => (
          <Animatable.View animation="slideInDown" duration={1000} delay={300}>
            <OwnRequestList
              sender={item.senderAddress}
              fiat={item.secondUnit}
              crypto={item.firstUnit}
              amount={item.amount}
              total={item.total}
              date={item.date}
              status={item.status}
              id={item._id}
            />
          </Animatable.View>
        )}
      />
    </View>
  );
};

export default OwnRequest;
