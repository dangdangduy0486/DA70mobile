import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";

import StackNavigation from "./src/components/navigation/StackNavigation";
import { store } from "./src/app/store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
      <Toast />
    </Provider>
  );
}
