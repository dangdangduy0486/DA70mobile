import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { COLORS } from "../../color/Color";
import CryptoSymbol from "../CryptoSymbol/CryptoSymbol";
import moment from "moment/moment";
import { usePatch2P2ResponseMutation } from "../../features/user/userApiSlice";
import Toast from "react-native-toast-message";

const OwnRequestList = ({
  sender,
  fiat,
  crypto,
  total,
  amount,
  date,
  status,
  id,
}) => {
  const [patch2P2Response] = usePatch2P2ResponseMutation();

  const handleReject = async () => {
    console.log("hello");
    console.log(id);
    try {
      await patch2P2Response({
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
  const handleApprove = async () => {
    try {
      await patch2P2Response({
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
  return (
    <View>
      <View style={styles.coinWrapper}>
        {/* left */}
        <View style={styles.left}>
          <View style={styles.titleWrapper}>
            <CryptoSymbol ids={crypto} />
            <Text style={styles.text}>
              By:
              {sender.length < 35
                ? `${sender}`
                : `${sender.substring(0, 25)}...`}
            </Text>
            <Text style={styles.text}>Amount: {amount}</Text>
            <Text style={styles.text}>
              Total :{total} {fiat}
            </Text>
            <Text style={styles.text}>Date: {moment(date).fromNow()}</Text>
          </View>
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
                onPress={handleApprove}
              >
                <Text style={{ fontWeight: "bold" }}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: COLORS.yellow1,
                  borderRadius: 7,
                }}
                onPress={handleReject}
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

export default OwnRequestList;

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
