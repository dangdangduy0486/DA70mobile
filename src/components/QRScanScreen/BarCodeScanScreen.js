import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Alert,
} from "react-native";
import { Formik } from "formik";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { COLORS } from "../../color/Color";
import Toast from "react-native-toast-message";
import { setCredentials } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const finderWidth = 280;
const finderHeight = 230;
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const viewMinX = (width - finderWidth) / 2;
const viewMinY = (height - finderHeight) / 2;

export default function BarCodeScanScreen() {
  const [hasPermission, setHasPermission] = useState();
  const [type, setType] = useState(BarCodeScanner.Constants.Type.back);
  const [scanned, setScanned] = useState(false);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const handleBarCodeScanned = (scanningResult = BarCodeScannerResult) => {
    if (!scanned) {
      const { type, data, bounds: { origin } = {} } = scanningResult;
      // @ts-ignore
      const { x, y } = origin;
      if (
        x >= viewMinX &&
        y >= viewMinY &&
        x <= viewMinX + finderWidth / 2 &&
        y <= viewMinY + finderHeight / 2
      ) {
        setScanned(true);
        setUserInfo(JSON.parse(data));
        Alert.alert(
          "QRCode detected",
          "Do you like to run the QRCode?",
          [
            { text: "No", onPress: Login(JSON.parse(data)) },
            { text: "Yes", onPress: Login(JSON.parse(data)) },
          ],
          { cancelable: false }
        );
      }
    }
  };
  const Login = async ({ value, navigation }) => {
    const [login] = useLoginMutation();
    const dispatch = useDispatch();

    console.log("data", value);
    const { email, password } = value;
    // console.log(value.email);
    // console.log(value.password);
    console.log(email);
    // try {
    //   const { accessToken } = await login({ email, password }).unwrap();
    //   await dispatch(setCredentials({ accessToken }));
    //   await AsyncStorage.setItem("token", accessToken);
    //   Toast.show({
    //     type: "success",
    //     text1: "Login success",
    //   });
    //   navigation.navigate("DBCoin");
    // } catch (error) {
    //   Toast.show({
    //     type: "error",
    //     text1: `${error.response.data.message}`,
    //   });
    // }
    // await axios
    //   .post("http://192.168.7.59:5000/api/auth/login", {
    //     email: email,
    //     password: password,
    //   })
    //   .then(async (response) => {
    //     await dispatch(setCredentials({ accessToken }));
    //     await AsyncStorage.setItem("token", accessToken);
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        type={type}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        style={[StyleSheet.absoluteFillObject, styles.container]}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        ></View>
        <BarcodeMask edgeColor="#62B1F6" showAnimatedLine />
        {scanned && (
          <Button
            title="Scan Again"
            onPress={() => setScanned(false)}
            style={{ fontSize: 20, margin: 40, color: "white" }}
          />
        )}
      </BarCodeScanner>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  text_header: {
    color: COLORS.yellow1,
    fontWeight: "bold",
    fontSize: 30,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
});
