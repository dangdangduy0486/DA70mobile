import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../color/Color";
import { useGetCoinImageQuery } from "../../features/coins/coinsApiSlice";
import Loading from "../../pages/Loading/Loading";

const CryptoSymbol = ({ ids, amount }) => {
  console.log(ids);
  const { data } = useGetCoinImageQuery({
    ids: ids,
  });
  if (!data) return null;

  return (
    <View style={styles.body}>
      {data.coin.map((currency) => (
        <>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: `${currency.image}`,
            }}
          />
          <Text style={{ color: "white" }}>
            {amount ? amount.toLocaleString() : null}
          </Text>
        </>
      ))}
    </View>
  );
};

export default CryptoSymbol;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
    marginRight: 40,
  },

  body: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 16,
  },
});
