import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { Formik } from "formik";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";

import { COLORS } from "../../color/Color";
import { SceneMap } from "react-native-tab-view";

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

    if (scanned === true) {
      console.log("hello")
      Login();
    }
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
      }
    }
  };

  // const handleFlipCam = () => {
  //   console.log("pressed");
  //   setType(
  //     type === BarCodeScanner.Constants.Type.back
  //       ? BarCodeScanner.Constants.Type.front
  //       : BarCodeScanner.Constants.Type.back
  //   );
  // };

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
        >
          {/* <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{ fontSize: 20, margin: 40, color: "white" }}
              onPress={handleFlipCam}
            >
              Flip
            </Text>
          </TouchableOpacity> */}
        </View>
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
const Login = (data) => {
  // console.log(data);
  // const onSubmit = async (data) => {
  //   const { email, password } = data;
  //   console.log(email);
  //   console.log(password);
  // try {
  //   axios
  //     .post("http://192.168.1.2:5000/api/auth/login", {
  //       email,
  //       password,
  //     })
  //     .then((response) => {
  //       console.log(response.data.accessToken);
  //       AsyncStorage.setItem("token", response.data.accessToken);
  //       navigation.navigate("DBCoin");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   console.log(AsyncStorage.getItem("token"));
  // } catch (error) {
  //   console.log(error);
  // }
  // };
  return (
    <>
      <View style={styles.header}>
        <Text style={{ color: "white", fontSize: 20, paddingBottom: 10 }}>
          Welcome to DBcryto!
        </Text>
        <Text style={styles.text_header}>Login</Text>
      </View>
      {/* <View style={styles.main}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => onSubmit(values)}
          // {(values) => {
          //   setTimeout(() => {
          //     navigation.navigate("DBCoin");
          //   }, 3000);
          //   console.log(values);
          // }}
        >
          {({ handleSubmit, values, errors }) => (
            <View>
              <ErrorMessage errorValue={errors.password} />
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
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View> */}
    </>
  );
};
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
