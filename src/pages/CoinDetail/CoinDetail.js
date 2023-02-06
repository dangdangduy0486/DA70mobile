import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  SafeAreaView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import Loading from "../Loading/Loading";
import axios from "axios";
import BackAction from "../../components/BackAction/BackAction";
import ChartCoin from "../../components/ChartCoin/ChartCoin";
import { COLORS } from "../../color/Color";
import { useGetCoinInfoDetailsQuery } from "../../features/coins/coinsApiSlice";
const CoinDetail = ({ navigation }) => {
  const regex = /(<([^>]+)>)/gi;
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);
  // const [coinInfo, setCoinInfo] = useState([]);
  // const [bao, setBao] = useState([]);
  const route = useRoute();
  const { id } = route.params;

  // useEffect(() => {
  //   axios
  //     .get(`https://api.coingecko.com/api/v3/coins/${id}`, {
  //       params: {
  //         id: id,
  //       },
  //     })
  //     .then((response) => {
  //       setCoinInfo(response.data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setIsError(true);
  //     });
  // }, [id]);

  const { data } = useGetCoinInfoDetailsQuery({
    ids: id,
  });

  if (!data) return <Loading />;
  // console.log(data);
  function trading() {
    return (
      <View style={styles.container_detail}>
        <Text
          style={{
            color: "black",
            fontSize: 15,
            fontWeight: "bold",
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "100%",
            paddingVertical: 5,
          }}
        >
          Trading
        </Text>
        <View style={styles.header_chart}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: `${data.image.thumb}` }}
                style={{ width: 30, height: 30, marginTop: 5 }}
              />
              <View style={{ marginLeft: 7 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {data.name}
                </Text>
                <Text style={{ fontSize: 13, color: COLORS.secondColor }}>
                  {data.symbol.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 13, fontWeight: "bold" }}>
              ${data.market_data.current_price.usd.toFixed(4)}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingVertical: 16,
            backgroundColor: COLORS.yellow1,
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
            }}
            onPress={() => {
              navigation.navigate("Spot", {
                id: data.id,
              });
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Buy</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <BackAction />
      <ScrollView style={{ flex: 1, paddingBottom: 10 }}>
        <ChartCoin coin={data} />
        <View style={styles.container_detail}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "100%",
              paddingVertical: 5,
            }}
          >
            About {data.name}
          </Text>
          <View
            style={{
              borderTopColor: "black",
              borderTopWidth: 2,
              height: 200,
              paddingVertical: 5,
            }}
          >
            <ScrollView>
              <Text
                style={{
                  color: COLORS.secondColor,
                }}
              >
                {data.description.en.replace(regex, "")}
              </Text>
            </ScrollView>
          </View>
        </View>
        {trading()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CoinDetail;

const styles = StyleSheet.create({
  container_detail: {
    marginTop: 16,
    marginHorizontal: 10,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  header_chart: {
    flexDirection: "row",
  },
});
