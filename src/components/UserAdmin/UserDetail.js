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
const UserDetail = ({ navigation }) => {
  const route = useRoute();
  const [selectedButton, setSelectedButton] = useState("button1");
  const { id, name, email } = route.params;
  const [userName, setUserName] = useState(`${name}`);
  const [userEmail, setUserEmail] = useState(`${email}`);
  const handleSubmit = () => {
    console.log(userName);
    console.log(userEmail);
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
          <Text style={styles.text_header}>User Information</Text>
        </View>

        <View style={styles.main}>
          <View style={{ backgroundColor: "white" }}>
            <View style={{ padding: 20 }}>
              <View
                style={{
                  marginBottom: 10,
                  paddingBottom: 10,
                }}
              >
                <Text style={styles.form_label_text}>Name</Text>
                <View style={styles.form_group}>
                  <TextInput
                    style={styles.form_input}
                    onChangeText={(newText) => setUserName(newText)}
                    value={userName}
                    defaultValue={name}
                  ></TextInput>
                </View>
                <Text style={styles.form_label_text}>Email</Text>
                <View style={styles.form_group}>
                  <TextInput
                    style={styles.form_input}
                    onChangeText={(newText) => setUserEmail(newText)}
                    value={userEmail}
                    defaultValue={email}
                  ></TextInput>
                </View>
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
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserDetail;

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
