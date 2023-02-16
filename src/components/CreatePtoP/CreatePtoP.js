import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { SelectList } from "react-native-dropdown-select-list";

import CryptoSymbol from "../CryptoSymbol/CryptoSymbol";
import { useGetUserWalletQuery } from "../../features/user/userApiSlice";
import { COLORS } from "../../color/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "../../hooks/useAuth";
import { Toast } from "react-native-toast-message/lib/src/Toast";
const CreatePtoP = ({ navigation }) => {
  const method = [
    { key: "buy", value: "Buy" },
    { key: "sell", value: "Sell" },
  ];
  const [currencyID, setCurrencyID] = useState("usd");
  const [amount, setAmount] = useState(null);
  const [price, setPrice] = useState(0);
  const [methodSelected, setMethodSelected] = useState("Buy");
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
  const [lowRate, setLowRate] = useState([]);
  const [highRate, setHighRate] = useState([]);

  const { data } = useGetUserWalletQuery();

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${selectedCrypto}`)
      .then((response) => {
        setLowRate(response.data.market_data.low_24h);
        setHighRate(response.data.market_data.high_24h);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedCrypto]);

  const assets = [
    { key: "tether", value: "Tether" },
    { key: "bitcoin", value: "Bitcoin" },
    { key: "binance-usd", value: "Binance USD" },
    { key: "binancecoin", value: "Binance" },
    { key: "ethereum", value: "Ethereum" },
    { key: "coin98", value: "Coin98" },
    { key: "binance-peg-xrp", value: "Binance-Peg XRP" },
    { key: "cardano", value: "Cardano" },
    { key: "smooth-love-potion", value: "Smooth Love Potion" },
    { key: "dogecoin", value: "Dogecoin" },
  ];

  const handleSubmit = async () => {
    console.log("hello");
    const token = await AsyncStorage.getItem("token");
    const opts = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    // if (price > highRate[currencyID] || price < lowRate[currencyID]) {
    //   Toast.show({
    //     type: "error",
    //     text1: "Please pre-check your price",
    //   });
    //   return;
    // }
    //  else if (amount <= 0) {
    //   Toast.show({
    //     type: "error",
    //     text1: "Please pre-check your amount",
    //   });
    //   return;
    // }
    axios
      .post(
        `http://172.16.1.27:5000/api/user/request-p2p/create`,
        {
          type: methodSelected,
          firstUnit: selectedCrypto,
          secondUnit: currencyID,
          total: price * amount,
          amount: amount,
        },
        opts
      )
      .then((response) => {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
      })
      .catch((error) => {
        console.log(error);
        Toast.show({
          type: "error",
          text1: error.response.data.message,
        });
      });
    console.log("hel1lo");
  };
  if (!data) return null;
  function isFiat(value) {
    return value.type === "Fiat Currencies";
  }
  let fiatList = data.wallet.filter(isFiat);
  let newList = [];

  fiatList.forEach((item) => {
    newList.push({
      id: item._id,
      value: item.currencyID,
    });
  });
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "black" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Create transaction</Text>
      </View>
      <View style={styles.main}>
        <ScrollView style={{ backgroundColor: "white" }}>
          <View style={{ padding: 20 }}>
            <Text style={styles.form_label_text}>
              Select your crypto currency
            </Text>
            <View style={styles.form_group1}>
              <SelectList
                setSelected={(val) => setSelectedCrypto(val)}
                data={assets}
                search={false}
                dropdownStyles={{ maxHeight: 150 }}
              />
            </View>
            <Text style={styles.form_label_text}>
              Select your fiat currency
            </Text>
            <View style={styles.form_group1}>
              <SelectList
                setSelected={(val) => setCurrencyID(val)}
                data={newList}
                search={false}
                dropdownStyles={{ maxHeight: 150 }}
              />
            </View>
            <Text style={styles.form_label_text}>Select your method</Text>
            <View style={styles.form_group1}>
              <SelectList
                setSelected={(val) => setMethodSelected(val)}
                data={method}
                search={false}
                dropdownStyles={{ maxHeight: 150 }}
              />
            </View>
            <Text style={styles.form_label_text}>Enter your price</Text>
            <View style={styles.form_group}>
              <TextInput
                placeholder="Enter your price"
                onChangeText={(newText) => setPrice(newText)}
                defaultValue={price}
                style={styles.form_input}
                keyboardType="numeric"
              />
            </View>
            <View>
              <Text style={styles.amount_avl}>
                Must higher than {lowRate[currencyID]} - lower than{" "}
                {highRate[currencyID]}
              </Text>
            </View>
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
            <Text style={styles.form_label_text}>
              Total: {price * amount} {currencyID}
            </Text>
            <View style={styles.button}>
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
                onPress={handleSubmit}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreatePtoP;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  main: {
    flex: 6,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    marginBottom: 10,
  },

  form_label_text: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  title: {
    color: COLORS.yellow1,
    fontWeight: "bold",
    fontSize: 30,
  },
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
  button: {
    alignItems: "center",
    backgroundColor: COLORS.yellow1,
    borderRadius: 10,
    marginTop: 10,
  },
  form_input: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: "#05375a",
  },
  amount_avl: {
    padding: 10,
    textAlign: "center",
    color: "red",
  },
});
