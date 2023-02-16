import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../../color/Color";
import { useRoute } from "@react-navigation/native";
import ListFunding from "../ListFunding/ListFunding";
import * as Animatable from "react-native-animatable";
import { useGetUserFundingRequestQuery } from "../../features/user/userApiSlice";
import Loading from "../../pages/Loading/Loading";
const RequestFunding = ({ navigation }) => {
  const { data } = useGetUserFundingRequestQuery();
  if (!data) return <Loading />;

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        keyExtractor={(item) => item._id}
        data={data.request}
        renderItem={({ item }) => (
          <Animatable.View animation="slideInDown" duration={1000} delay={300}>
            <ListFunding
              key={item._id}
              name={item.recieverAddress}
              currency={item.firstUnit}
              amount={item.amount}
              creditCard={item.senderAddress}
              status={item.status}
              date={item.date}
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

export default RequestFunding;

const styles = StyleSheet.create({});
