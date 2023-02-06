import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS } from "../../color/Color";
const ListUser = ({ id, name, email, onPress }) => {
  return (
    <View>
      <View style={styles.coinWrapper}>
        {/* left */}
        <View style={styles.left}>
          <View style={{ marginRight: 10 }}>
            <Text style={{ color: "white" }}>{id}</Text>
          </View>
          <View style={styles.titleWrapper}>
            <Text style={styles.text}>Name : {name}</Text>
            <Text style={styles.text}>Email : {email}</Text>
          </View>
        </View>
        {/* right */}
        <View style={styles.right}>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: COLORS.yellow1,
              borderRadius: 7,
            }}
            onPress={onPress}
          >
            <Text style={{ fontWeight: "bold" }}>Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ListUser;

const styles = StyleSheet.create({
  coinWrapper: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    color: "white",
    fontSize: 10,
  },
  title: {
    color: "white",
    fontSize: 19,
  },
  right: {
    justifyContent: "center",
  },
});
