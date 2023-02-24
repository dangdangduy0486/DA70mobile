import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { COLORS } from "../../color/Color";
import CryptoSymbol from "../CryptoSymbol/CryptoSymbol";
import moment from "moment/moment";
const ListBuy = ({
  sender,
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
            <CryptoSymbol ids={crypto} />
            <Text style={styles.text}>
              Sender:
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
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: COLORS.yellow1,
              borderRadius: 7,
            }}
            onPress={onPress}
          >
            <Text style={{ fontWeight: "bold" }}>Buy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ListBuy;

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
