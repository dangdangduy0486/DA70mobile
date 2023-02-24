import React, { useState } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";

import { useGetDerivativesDetailsQuery } from "../../features/coins/coinsApiSlice";
import Loading from "../../pages/Loading/Loading";
import { COLORS } from "../../color/Color";
import ListDerivaties from "../ListDerivaties/ListDerivaties";
const Derivatives = () => {
  const [perPage, setPerPage] = useState(100);
  const [page, setPage] = useState(1);
  const { data } = useGetDerivativesDetailsQuery({
    perPage: perPage,
    page: page,
  });
  if (!data) return <Loading />;
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Derivatives</Text>
      </View>
      <View style={styles.divider} />
      <FlatList
        scrollIndicatorInsets={{ right: 1 }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListDerivaties
            urlImage={item.image}
            name={item.name}
            trade_volume_24h_btc={item.trade_volume_24h_btc}
            open_interest_btc={item.open_interest_btc}
            number_of_perpetual_pairs={item.number_of_perpetual_pairs}
          />
        )}
      />
    </View>
  );
};

export default Derivatives;

const RenderItem = ({ item, index }) => (
  <View>
    <Text style={styles.content}>{item.recieverAddress}</Text>
    <Text style={styles.content}>{item.senderAddress}</Text>
    <Text style={styles.content}>{item.firstUnit} </Text>
    <Text style={styles.content}> {item.secondUnit}</Text>
    <Text style={styles.content}>{item.amount} </Text>
    <Text style={styles.content}> {item.total}</Text>
    <Text style={styles.content}> {item.date}</Text>
    {/* <Image
          style={{ height: 300, width: 300 }}
          source={item.image}
          resizeMode="contain"
        /> */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    // marginTop: 50,
    flex: 1,
    backgroundColor: "black",
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.yellow1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.secondColor,
    marginHorizontal: 16,
    marginTop: 16,
  },
  titleWrapper: {
    marginTop: 80,
    paddingHorizontal: 16,
  },
  content: {
    color: "white",
  },
});
