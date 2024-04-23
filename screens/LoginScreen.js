import AuthContent from "../components/Auth/AuthContent";
import { Authenticate } from "../util/auth";
import { useContext, useState } from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";
function LoginScreen() {
  const [isProcessing, setisProcessing] = useState(false);
  const authCtx = useContext(AuthContext);
  async function loginHandler({ email, password }) {
    setisProcessing(true);

    try {
      const token = await Authenticate(email, password);
      authCtx.authenticate(token);
      setisProcessing(false);
    } catch (e) {
      setisProcessing(false);
      Alert.alert("Authenication Failed! please check your credentials");
    }
  }
  if (isProcessing) {
    return <LoadingOverlay message={"logging in user!!!"} />;
  } else {
    return <AuthContent isLogin onAuthenticate={loginHandler} />;
  }
}

export default LoginScreen;
