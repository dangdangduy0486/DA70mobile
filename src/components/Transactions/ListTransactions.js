import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS } from "../../color/Color";
import CryptoSymbol from "../CryptoSymbol/CryptoSymbol";
import moment from "moment/moment";

const ListTransactions = ({
  sender,
  reciever,
  fiat,
  crypto,
  total,
  amount,
  date,
  onPress,
  price,
}) => {
  return (
    <View>
      <View style={styles.coinWrapper}>
        {/* left */}
        <View style={styles.left}>
          <View style={styles.titleWrapper}>
            <View style={styles.titleWrapper}>
              <CryptoSymbol ids={crypto} />
              <Text style={styles.text}>
                Sender:
                {sender.length < 35
                  ? `${sender}`
                  : `${sender.substring(0, 40)}...`}
              </Text>
              <Text style={styles.text}>
                Reciever:
                {reciever.length < 35
                  ? `${reciever}`
                  : `${reciever.substring(0, 40)}...`}
              </Text>
              <Text style={styles.text}>Amount : {amount}</Text>
              <Text style={styles.text}>
                Total :{total} {fiat}
              </Text>
              <Text style={styles.text}>Date: {moment(date).fromNow()}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ListTransactions;

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
});
