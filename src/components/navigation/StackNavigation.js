import { View, Text } from "react-native";
import React from "react";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Market from "../../pages/Market/Market";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../../pages/Signup/Signup";
import CoinDetail from "../../pages/CoinDetail/CoinDetail";
import Forgot from "../../pages/Forgot/Forgot";
import Newpassword from "../../pages/Newpassword/Newpassword";
import DrawerNavigation from "./DrawerNavigation";
import BackAction from "../BackAction/BackAction";
import Wallet from "../../pages/Wallet/Wallet";
import Overview from "../Overview/Overview";
import Funding from "../../pages/Funding/Funding";
// import Funding from "../Funding/Funding";
import PtoP from "../../pages/P2P/PtoP";
import AcceptBuy from "../BuyPtoP/AcceptBuy";
import AcceptSell from "../SellPtoP/AcceptSell";
import AdminPage from "../../pages/AdminPage/AdminPage";
import UserAdmin from "../UserAdmin/UserAdmin";
import RequestAdmin from "../RequestAdmin/RequestAdmin";
import Recharge from "../../pages/Recharge/Recharge";
import UserDetail from "../UserAdmin/UserDetail";
import Spot from "../SpotTransaction/SpotTransaction";
import Exchange from "../../pages/Exchange/Exchange";
import Exchanges from "../Exchanges/Exchanges";
import Derivatives from "../Exchanges/Derivatives";
import Transactions from "../Transactions/Transactions";
const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={DrawerNavigation}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CoinDetail"
        component={CoinDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Market"
        component={Market}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="reset"
        component={Newpassword}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AcceptBuy"
        component={AcceptBuy}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AcceptSell"
        component={AcceptSell}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="UserDetail"
        component={UserDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Forgot"
        component={Forgot}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Signup"
        component={Signup}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="BackAction"
        component={BackAction}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Wallet"
        component={Wallet}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Overview"
        component={Overview}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AdminPage"
        component={AdminPage}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Funding"
        component={Funding}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Ptop"
        component={PtoP}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Recharge"
        component={Recharge}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Spot"
        component={Spot}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Exchanges"
        component={Exchanges}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Derivative"
        component={Derivatives}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Transactions"
        component={Transactions}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
