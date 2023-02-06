import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuth = async () => {
  const token = await AsyncStorage.getItem("token");
  let isAdmin = false;
  let status = "Member";

  if (token) {
    const decoded = jwtDecode(token);
    const { email, role } = decoded.UserInfo;

    isAdmin = role.includes("Amin");

    if (isAdmin) status = "Admin";

    return { email, role, status, isAdmin };
  }

  return { email: "", role: [], isAdmin, status };
};

export default useAuth;
