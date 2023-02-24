import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../color/Color";
const ListDerivatives = ({
  urlImage,
  name,
  trade_volume_24h_btc,
  open_interest_btc,
  number_of_perpetual_pairs,
}) => {
  return (
    <View style={styles.coinWrapper}>
      <View style={styles.left}>
        <Image
          source={{
            uri: urlImage,
          }}
          style={styles.img}
        />
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{name}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 10, marginRight: 5, color: "white" }}>
            24h Volume
          </Text>
          <Text style={{ fontSize: 10, color: "white" }}>
            {trade_volume_24h_btc}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 10, color: "white", marginRight: 5 }}>
            24h Open Interest
          </Text>
          <Text style={{ fontSize: 10, color: "white" }}>
            {open_interest_btc ? open_interest_btc : "?"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 10, color: "white", marginRight: 5 }}>
            Perpetuals
          </Text>
          <Text style={{ fontSize: 10, color: "white" }}>
            {number_of_perpetual_pairs ? number_of_perpetual_pairs : "?"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ListDerivatives;

const styles = StyleSheet.create({
  coinWrapper: {
    paddingHorizontal: 16,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleWrapper: {
    marginLeft: 10,
  },
  title: {
    color: "white",
    fontSize: 13,
  },
  img: {
    height: 50,
    width: 50,
  },
  symbol: { color: COLORS.secondColor, fontSize: 15 },
  right: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});
