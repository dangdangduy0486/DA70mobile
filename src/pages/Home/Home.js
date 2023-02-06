import {
  View,
  Text,
  Button,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import HomeCss from "./HomeCss";
import Casourel from "../../components/Casourel/Casourel";
import bao from "../../images/coin2.png";
import { COLORS } from "../../color/Color";
import { useGetTrendingCoinsQuery } from "../../features/coins/coinsApiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../Loading/Loading";
import { useGetUserQuery } from "../../features/user/userApiSlice";
const Home = ({ navigation }) => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useGetTrendingCoinsQuery();
  const { data: userInfo } = useGetUserQuery();
  const checkStorage = async () => {
    const check = await AsyncStorage.getItem("trendingCoins");
    if (isLoading) {
      await AsyncStorage.removeItem("trendingCoins");
    }
    if (!check && data) {
      setTrendingCoins(data.coins);
      await AsyncStorage.setItem("trendingCoins", JSON.stringify(data.coins));
      setIsLoading(false);
    }
    if (check) {
      setTrendingCoins(JSON.parse(check));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkStorage();
  }, [data]);

  const user = async () => {
    const token = await AsyncStorage.getItem("token");
    // console.log(token);
    const opts = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    axios
      .get("http://192.168.1.2:5000/api/user/user-info/review", opts)
      .then((response) => {
        // console.log(response.data.user.fullname);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    user();
  }, []);

  if (!trendingCoins && !data) return <Loading />;

  function headerView() {
    return (
      <View style={{ width: "100%", height: 200 }}>
        <ImageBackground
          source={bao}
          resizeMode="cover"
          style={{ flex: 1, alignItems: "center", opacity: 0.9 }}
        >
          <View
            style={{
              justifyContent: "center",
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <Text style={HomeCss.textCo}>Welcome to DBcryto</Text>
            {userInfo ? null : (
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={HomeCss.appButtonContainer}
              >
                <Text style={HomeCss.appButtonText}>Login</Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </View>
    );
  }
  function renderMarket() {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          width: "100%",
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ fontWeight: "bold", paddingVertical: 4 }}>
            Earn daily rewards on your idle tokens
          </Text>
          <Text>Simple & Secure. Search popular coins and start earning.</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={HomeCss.appButtonContainer}
          >
            <Text style={HomeCss.appButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView scrollEventThrottle={16}>
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
          }}
        >
          {headerView()}
          <View
            style={{
              position: "relative",
              top: "-5%",
              backgroundColor: "black",
              borderRadius: 10,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              paddingBottom: 10,
              paddingTop: 20,
            }}
          >
            {trendingCoins.map((e) => (
              <TouchableOpacity
                key={e["item"].id}
                style={{
                  width: 170,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  backgroundColor: "transparent",
                  marginBottom: 10,
                  borderColor: "white",
                  borderWidth: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Image
                      source={{ uri: e["item"].thumb }}
                      resizeMode="cover"
                      style={{ height: 25, width: 25 }}
                    />
                  </View>
                  <View style={{ marginLeft: 10, width: 70 }}>
                    <Text style={HomeCss.text}>{e["item"].name}</Text>
                    <Text style={HomeCss.text}>{e["item"].symbol}</Text>
                  </View>
                  <View style={{ position: "absolute", right: 0 }}>
                    <Text style={HomeCss.text}>
                      {e["item"].market_cap_rank}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ marginBottom: 20 }}>
            <Casourel />
          </View>
          {renderMarket()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
