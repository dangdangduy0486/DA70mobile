import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import BackAction from "../BackAction/BackAction";
import { COLORS } from "../../color/Color";
import { useRoute } from "@react-navigation/native";
import CryptoSymbol from "../CryptoSymbol/CryptoSymbol";
import { usePost2P2ClientRequestMutation } from "../../features/user/userApiSlice";
import useAuth from "../../hooks/useAuth";
import Toast from "react-native-toast-message";

const AcceptBuy = ({ navigation }) => {
  const route = useRoute();
  const [wantedAmount, setWantedAmount] = useState(0);
  const { id, sender, fiat, crypto, amount, total } = route.params;
  const [post2P2ClientRequest] = usePost2P2ClientRequestMutation();

  const handleSubmit = async () => {
    const { email } = await useAuth();
    if (amount < wantedAmount) {
      setWantedAmount(0);
      Toast.show({
        type: "error",
        text1: `Your amount must be lower than ${amount}!!`,
      });
      return;
    } else if (wantedAmount === 0 || !wantedAmount) {
      setWantedAmount(0);
      Toast.show({
        type: "error",
        text1: `Please enter your desired amount`,
      });
      return;
    }

    try {
      await post2P2ClientRequest({
        requestType: "p2pReq",
        type: "buy",
        firstUnit: crypto,
        secondUnit: fiat,
        amount: wantedAmount,
        total: (total / amount) * wantedAmount,
        recieverAddress: sender,
        senderAddress: email,
        requestOf: id,
      }).unwrap();
      setWantedAmount(0);
      Toast.show({
        type: "success",
        text1: "Your request has been sent",
      });
      setTimeout(() => {
        navigation.navigate("Ptop");
      }, 2000);
    } catch (error) {
      if (error.status === 500) {
        return null;
      } else {
        Toast.show({
          type: "error",
          text1: error.data.message,
        });
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <BackAction />
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
        }}
      >
        <View style={styles.header}>
          <Text style={styles.text_header}>Buy {crypto}</Text>
          <CryptoSymbol ids={crypto} />
        </View>

        <View style={styles.main}>
          <View style={{ backgroundColor: "white" }}>
            <View style={{ padding: 20 }}>
              <View
                style={{
                  marginBottom: 10,
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                }}
              >
                <Text>
                  Price : {total / amount} {fiat}
                </Text>
                <Text>Limit : {amount}</Text>
              </View>
              <Text style={styles.form_label_text}>Enter your amount</Text>
              <View style={styles.form_group}>
                <TextInput
                  placeholder="Enter your amount"
                  onChangeText={(newText) => setWantedAmount(newText)}
                  defaultValue={amount}
                  style={styles.form_input}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.form_group}>
                <Text>
                  Total: {(total / amount) * wantedAmount} -{fiat}
                </Text>
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
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>Buy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AcceptBuy;

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
  title: {
    color: "white",
    padding: 20,
    backgroundColor: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
  form_label_text: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  text_header: {
    color: COLORS.yellow1,
    fontWeight: "bold",
    fontSize: 30,
  },
  main: {
    flex: 4,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    marginBottom: 10,
  },
  form_input: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: "#05375a",
  },
  form_label_text: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    backgroundColor: COLORS.yellow1,
    borderRadius: 10,
    marginTop: 10,
  },
  test: {
    backgroundColor: "red",
  },
});
