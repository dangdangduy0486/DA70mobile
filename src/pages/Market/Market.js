import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../../color/Color";
import ListCoin from "../../components/ListCoin/ListCoin";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import { useGetMarketsQuery } from "../../features/coins/coinsApiSlice";
import Loading from "../Loading/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Market = ({ navigation }) => {
  // const [coinList, setCoinList] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [vsCurrency, setVsCurrency] = useState("usd");
  const [category, setCategory] = useState("all");
  const [order, setOrder] = useState("market_cap_desc");
  const [perPage, setPerPate] = useState(100);
  const [page, setPate] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useGetMarketsQuery({
    vs_currency: vsCurrency,
    category: category,
    order: order,
    perPage: perPage,
    page: page,
  });

  const storeData = async () => {
    const check = await AsyncStorage.getItem("markets");
    if (isLoading) {
      await AsyncStorage.removeItem("markets");
    }
    if (!check && data) {
      setMarkets(data);
      await AsyncStorage.setItem("markets", JSON.stringify(data));
      setIsLoading(false);
    }
    if (check) {
      setMarkets(JSON.parse(check));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    storeData();
  }, [data, isLoading]);

  if (!markets && !data) return <Loading />;
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Market</Text>
      </View>
      <View style={styles.divider} />

      <FlatList
        keyExtractor={(item) => item.id}
        data={markets}
        renderItem={({ item }) => (
          <Animatable.View animation="slideInDown" duration={1000} delay={300}>
            <ListCoin
              urlLogo={item.image}
              name={item.name}
              symbol={item.usdt}
              currentPrice={item.current_price}
              priceChangePercentage24h={item.price_change_percentage_24h}
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate("CoinDetail", {
                  id: item.id,
                });
              }}
            />
          </Animatable.View>
        )}
      />
    </View>
  );
};

export default Market;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    height: 50,
  },
  titleWrapper: {
    marginTop: 80,
    paddingHorizontal: 16,
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
});
