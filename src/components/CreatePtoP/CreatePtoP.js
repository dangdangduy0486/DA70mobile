import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { SelectList } from "react-native-dropdown-select-list";

import CryptoSymbol from "../CryptoSymbol/CryptoSymbol";
import { useGetUserWalletQuery } from "../../features/user/userApiSlice";
import { COLORS } from "../../color/Color";
const CreatePtoP = ({ navigation }) => {
  const route = useRoute();
  const method = ["Buy", "Sell"];
  const [currencyID, setCurrencyID] = useState("USD");
  const [amount, setAmount] = useState(null);
  const [price, setPrice] = useState("");
  const [methodSelected, setMethodSelected] = useState("Buy");
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
  const [lowRate, setLowRate] = useState([]);
  const [highRate, setHighRate] = useState([]);

  const { data } = useGetUserWalletQuery();

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${currencyID}`)
      .then((response) => {
        setLowRate(response.data.market_data.low_24h);
        setHighRate(response.data.market_data.high_24h);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currencyID]);

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

  const handleSubmit = () => {
    alert("Your transaction is being checked");
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

  const CryptocurrenciesView = () => {
    return assets.map((e, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={{
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor:
              selectedCrypto === e.value ? COLORS.yellow1 : "white",
          }}
          onPress={() => {
            setSelectedCrypto(e.id);
          }}
        >
          <CryptoSymbol ids={e.id} />
          <Text>{e.name}</Text>
        </TouchableOpacity>
      );
    });
  };

  const FiatcurrenciesView = () => {
    return fiatList.map((e, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={{
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor:
              selectedCrypto === e.currencyID ? COLORS.yellow1 : "white",
          }}
          onPress={() => {
            setCurrencyID(e.id);
          }}
        >
          <Text>{e.currencyID}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View style={styles.header}>
        <Text style={styles.title}>Create transaction</Text>
      </View>
      <View style={styles.main}>
        <ScrollView style={{ backgroundColor: "white" }}>
          <View style={{ padding: 20 }}>
            <Text style={styles.form_label_text}>Select your currency</Text>
            <View style={styles.form_group1}>
              <SelectList
                setSelected={(val) => setMethodSelected(val)}
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
                setSelected={(val) => setMethodSelected(val)}
                data={newList}
                search={false}
                dropdownStyles={{ maxHeight: 150 }}
              />
            </View>
            <Text style={styles.form_label_text}>
              Select your crypto currency
            </Text>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",

                  paddingVertical: 10,
                }}
              >
                {CryptocurrenciesView()}
              </View>
            </ScrollView>
            <Text style={styles.form_label_text}>Select your method</Text>
            <View style={styles.form_group1}>
              <SelectList
                setSelected={(val) => setMethodSelected(val)}
                data={method}
                search={false}
                dropdownStyles={{ maxHeight: 150 }}
              />
            </View>

            {/* <Text style={styles.form_label_text}>Enter your name</Text>
            <View style={styles.form_group}>
              <TextInput
                placeholder="Enter your name"
                onChangeText={(newText) => setName(newText)}
                defaultValue={name}
                style={styles.form_input}
              />
            </View> */}
            <Text style={styles.form_label_text}>Enter your price</Text>
            <View style={styles.form_group}>
              <TextInput
                placeholder="Enter your price"
                onChangeText={(newText) => setPrice(newText)}
                defaultValue={price}
                style={styles.form_input}
              />
            </View>
            <Text style={styles.form_label_text}>Enter your amount</Text>
            <View style={styles.form_group}>
              <TextInput
                placeholder="Enter your amount"
                onChangeText={(newText) => setAmount(newText)}
                defaultValue={amount}
                style={styles.form_input}
              />
            </View>

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
    </View>
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
});
