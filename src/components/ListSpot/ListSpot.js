import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../color/Color";
const ListSpot = ({ id, name, amount, currency, status }) => {
  const [newStatus, setNewStatus] = useState(status);
  const [approve, setApprove] = useState("");
  const [reject, setReject] = useState("");
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
            <Text style={styles.text}>Amount : {amount}</Text>
            <Text style={styles.text}>Currency : {currency}</Text>
          </View>
        </View>
        {/* center */}
        <View style={styles.center}>
          <Text
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 1,
              backgroundColor: status === newStatus ? "red" : "green",
              overflow: "hidden",
              borderColor: "black",
            }}
          ></Text>
        </View>
        {/* right */}
        <View style={styles.right}>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: COLORS.yellow1,
              borderRadius: 7,
              marginBottom: 5,
              //   opacity: approve === "Approve" ? 0 : 1,
              display: approve === "Approve" ? "none" : "flex",
            }}
            onPress={() => {
              setNewStatus("Approve");
              setApprove("Approve");
              setReject("Reject");
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: COLORS.yellow1,
              borderRadius: 7,
              //   opacity: reject === "Reject" ? 0 : 1,
              display: reject === "Reject" ? "none" : "flex",
            }}
            onPress={() => {
              setNewStatus("Pending");
              setApprove("Approve");
              setReject("Reject");
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ListSpot;

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
  center: {
    justifyContent: "center",
  },
});
