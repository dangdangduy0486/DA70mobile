import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../color/Color";
import moment from "moment/moment";
import { usePatchAdminResponseMutation } from "../../features/user/userApiSlice";
import Toast from "react-native-toast-message";

const ListFunding = ({
  id,
  name,
  currency,
  amount,
  creditCard,
  status,
  date,
}) => {
  const [patchAdminResponse] = usePatchAdminResponseMutation();

  const handleResponseApproved = async () => {
    try {
      await patchAdminResponse({
        type: "funding",
        requestID: id,
        status: "approved",
      }).unwrap();
      Toast.show({
        type: "success",
        text1: "Approved",
      });
    } catch (error) {
      if (error.status === 500) {
        return null;
      } else {
        Toast.show({
          type: "error",
          text1: error.data.message,
        });
      }
    }
  };

  const handleResponseDenided = async () => {
    try {
      await patchAdminResponse({
        type: "funding",
        requestID: id,
        status: "rejected",
      }).unwrap();
      Toast.show({
        type: "success",
        text1: "Rejected",
      });
    } catch (error) {
      if (error.status === 500) {
        return null;
      } else {
        Toast.show({
          type: "error",
          text1: error.data.message,
        });
      }
    }
  };
  return (
    <View>
      <View style={styles.coinWrapper}>
        {/* left */}
        <View style={styles.left}>
          <View style={styles.titleWrapper}>
            <Text style={styles.text}>
              Name:
              {name.length < 35 ? `${name}` : `${name.substring(0, 25)}...`}
            </Text>
            <Text style={styles.text}>Currency : {currency}</Text>
            <Text style={styles.text}>Amount : {amount}</Text>
            <Text style={styles.text}>Card : {creditCard}</Text>
            <Text style={styles.text}>Date : {moment(date).fromNow()}</Text>
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
              overflow: "hidden",
              borderColor: "black",
            }}
          ></Text>
        </View>
        {/* right */}
        <View style={styles.right}>
          {status === "approved" || status === "rejected" ? (
            <Text
              style={{ color: `${status === "approved" ? "green" : "red"}` }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          ) : (
            <>
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: COLORS.yellow1,
                  borderRadius: 7,
                }}
                onPress={handleResponseApproved}
              >
                <Text style={{ fontWeight: "bold" }}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: COLORS.yellow1,
                  borderRadius: 7,
                }}
                onPress={handleResponseDenided}
              >
                <Text style={{ fontWeight: "bold" }}>Reject</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ListFunding;

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
    justifyContent: "space-between",
  },
  center: {
    justifyContent: "center",
  },
});
