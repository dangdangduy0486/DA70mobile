import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../color/Color";
const ListExchanges = ({
  urlImage,
  name,
  trade_volume_24h_btc_normalized,
  trade_volume_24h_btc,
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
            24h Volume (Normalized)
          </Text>
          <Text style={{ fontSize: 10, color: "white" }}>
            {trade_volume_24h_btc_normalized
              ? trade_volume_24h_btc_normalized.toFixed(2)
              : "?"}{" "}
            USD
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 10, color: "white", marginRight: 5 }}>
            24h Volume
          </Text>
          <Text style={{ fontSize: 10, color: "white" }}>
            {trade_volume_24h_btc ? trade_volume_24h_btc.toFixed(2) : "?"} USD
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ListExchanges;

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
