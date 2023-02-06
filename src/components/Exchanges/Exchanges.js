import React, { useState } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";

import { useGetExchangesDetailsQuery } from "../../features/coins/coinsApiSlice";
import Loading from "../../pages/Loading/Loading";
import { COLORS } from "../../color/Color";
const Exchanges = () => {
  const [perPage, setPerPage] = useState(100);
  const [page, setPage] = useState(1);
  const { data } = useGetExchangesDetailsQuery({
    perPage: perPage,
    page: page,
  });
  if (!data) return <Loading />;
  console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Exchanges</Text>
      </View>
      <View style={styles.divider} />
      <FlatList
        data={data.transaction}
        keyExtractor={(item) => item._id}
        renderItem={RenderItem}
        Exchanges
      />
    </View>
  );
};

export default Exchanges;

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
