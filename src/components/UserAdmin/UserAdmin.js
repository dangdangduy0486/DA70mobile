import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../../color/Color";
import ListUser from "../ListUsers/ListUser";
import * as Animatable from "react-native-animatable";
import { useGetAllUserQuery } from "../../features/user/userApiSlice";
import Loading from "../../pages/Loading/Loading";
const UserAdmin = ({ navigation }) => {
  const { data } = useGetAllUserQuery();
  if (!data) return <Loading />;
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data.members}
        renderItem={({ item }) => (
          <Animatable.View animation="slideInDown" duration={1000} delay={300}>
            <ListUser
              key={item._id}
              name={item.fullname}
              email={item.email}
              onPress={() => {
                navigation.navigate("UserDetail", {
                  id: item._id,
                  name: item.fullname,
                  email: item.email,
                });
              }}
            />
          </Animatable.View>
        )}
      />
    </View>
  );
};

export default UserAdmin;

const styles = StyleSheet.create({});
