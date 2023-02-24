import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { COLORS } from "../../color/Color";
import { useGetUserWalletQuery } from "../../features/user/userApiSlice";
import Loading from "../../pages/Loading/Loading";
import CryptoSymbol from "../../components/CryptoSymbol/CryptoSymbol";

const Crypto = () => {
  const { data: cryptoCurrencies } = useGetUserWalletQuery();
  if (!cryptoCurrencies) return <Loading />;
  function isCrypto(value) {
    return value.type === "Cryptocurrencies";
  }
  let cryptoList = cryptoCurrencies.wallet.filter(isCrypto);
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Text style={styles.title}>Wallet Fiat</Text>
      <View style={styles.listWallet}>
        <Text style={styles.info}>My Assets</Text>
        <View style={styles.divider} />
        <View>
          {cryptoList.map((currency, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginBottom: 16,
              }}
            >
              <Text style={{ color: "white" }}>{currency.currencyID}</Text>
              <CryptoSymbol ids={currency.currencyID} />
              <Text style={{ color: "white" }}>
                {currency.amount ? currency.amount.toLocaleString() : "?"}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Crypto;

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
