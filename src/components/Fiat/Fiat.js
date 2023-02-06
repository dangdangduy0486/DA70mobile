import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { formatCurrency } from "react-native-format-currency";

import { COLORS } from "../../color/Color";
import { useGetUserWalletQuery } from "../../features/user/userApiSlice";
import Loading from "../../pages/Loading/Loading";

const Fiat = () => {
  const { data: fiatCurrencies } = useGetUserWalletQuery();
  if (!fiatCurrencies) return <Loading />;
  console.log(fiatCurrencies);
  function isFiat(value) {
    return value.type === "Fiat Currencies";
  }
  let fiatList = fiatCurrencies.wallet.filter(isFiat);
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Text style={styles.title}>Wallet Fiat</Text>
      <View style={styles.listWallet}>
        <Text style={styles.info}>My Assets</Text>
        <View style={styles.divider} />
        <View>
          {fiatList.map((currency, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginBottom: 16,
              }}
            >
              <Text style={{ color: "white" }}>
                {formatCurrency({ amount: 0, code: currency.currencyID })
                  ? formatCurrency({ amount: 0, code: currency.currencyID })
                  : currency.currencyID}
              </Text>
              <Text style={{ color: "white" }}>
                {/* {currency.amount ? currency.amount.toLocaleString() : "?"} */}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Fiat;

const styles = StyleSheet.create({
  title: {
    backgroundColor: COLORS.yellow1,
    paddingBottom: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomWidth: 1,
    borderStyle: "solid",
    overflow: "hidden",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  listWallet: {
    padding: 20,

    flex: 1,
  },
  info: {
    color: COLORS.textColor,
    fontSize: 19,
    fontWeight: "500",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.secondColor,
    marginTop: 16,
    marginBottom: 16,
  },
});
