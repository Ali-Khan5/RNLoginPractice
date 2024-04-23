import { useContext, useState } from "react";

import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../util/auth";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isProcessing, setisProcessing] = useState(false);
  const authCtx = useContext(AuthContext);
  async function signupHandler({ email, password }) {
    setisProcessing(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
      setisProcessing(false);
    } catch (e) {
      setisProcessing(false);
      Alert.alert("Signing Up failed!");
    }
  }
  if (isProcessing) {
    return <LoadingOverlay message={"Creating user!!!"} />;
  } else {
    return <AuthContent onAuthenticate={signupHandler} />;
  }
}

export default SignupScreen;
