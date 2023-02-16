import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import Loading from "../../pages/Loading/Loading";
import axios from "axios";
import { SelectList } from "react-native-dropdown-select-list";
import { useGetCoinInfoDetailsQuery } from "../../features/coins/coinsApiSlice";
import { useGetUserWalletQuery } from "../../features/user/userApiSlice";
import { COLORS } from "../../color/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "../../hooks/useAuth";
const Spot = ({ navigation }) => {
  const [coinInfo, setCoinInfo] = useState([]);
  const route = useRoute();
  const [amount, setAmount] = useState(null);
  const { id } = route.params;
  const { data } = useGetCoinInfoDetailsQuery({
    ids: id,
  });
  const { currentData: currencies } = useGetUserWalletQuery();

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/simple/supported_vs_currencies`)
      .then((response) => {
        setCoinInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [currency, setCurrency] = useState("usd");
  const handelAmount = () => {
    if (data) {
      return amount * data.market_data.current_price[currency].toFixed(5);
    }
  };
  const handleSubmit = async () => {
    const { email } = await useAuth();
    const url = `http://172.16.1.27:5000/api/user/request/create/spot`;
    const token = await AsyncStorage.getItem("token");

    const opts = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    console.log(opts);
    await axios
      .post(
        url,
        {
          type: "buy",
          firstUnit: id ? id : "bitcoin",
          secondUnit: currency,
          amount: amount,
          total: handelAmount(),
          senderAddress: "DB Crypto",
          recieverAddress: email,
        },
        opts
      )
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        if (!email) {
          console.log("Please Login");
          return;
        }
      });
  };
  if (!data) return <Loading />;
  console.log(currencies); //..Fiat Currencies
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            paddingVertical: 20,
            paddingHorizontal: 10,
            backgroundColor: COLORS.yellow1,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              paddingBottom: 10,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: `${data.image.thumb}` }}
                style={{ width: 30, height: 30, marginRight: 10 }}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                {data.name}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                {data.market_data.current_price[currency].toFixed(5)}{" "}
                {currency.toUpperCase()}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 10,
              paddingVertical: 10,
              width: "100%",
              borderRadius: 10,
            }}
          >
            <Text style={styles.form_label_text}>Enter your amount</Text>
            <View style={styles.form_group}>
              <TextInput
                placeholder="Enter your amount"
                onChangeText={(newText) => setAmount(newText)}
                defaultValue={amount}
                style={styles.form_input}
                keyboardType="numeric"
              />
            </View>
            <Text style={styles.form_label_text}>Select your currency</Text>
            <View style={styles.form_group1}>
              <SelectList
                setSelected={(val) => setCurrency(val)}
                data={coinInfo}
                search={false}
                dropdownStyles={{ maxHeight: 150, zIndex: 1 }}
                inputStyles={{ textTransform: "uppercase" }}
                dropdownTextStyles={{ textTransform: "uppercase" }}
              />
            </View>
            <Text style={{ color: "black", fontSize: 15, fontWeight: "bold" }}>
              Total price
            </Text>
            <View style={styles.form_group2}>
              <Text style={styles.form_input1}>
                {handelAmount()} {currency.toUpperCase()}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              paddingTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                width: "50%",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                borderColor: "black",
                borderWidth: 1,
              }}
              onPress={handleSubmit}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Buy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Spot;

const styles = StyleSheet.create({
  form_group: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 5,
    marginBottom: 10,
  },
  form_group1: {
    marginTop: 10,
    marginBottom: 10,
  },
  form_input: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: "#05375a",
  },
  form_group2: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    padding: 5,
    marginBottom: 10,
    width: "100%",
  },
  form_input1: {
    color: "#05375a",
  },
  form_label_text: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
});
