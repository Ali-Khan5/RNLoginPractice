import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../store/auth-context";
function WelcomeScreen() {
  const [getMessage, setMessage] = useState("");
  const ctx=useContext(AuthContext);
  useEffect(() => {
    axios
      .get("https://io19-547fd.firebaseio.com/message.json?auth="+ctx.token)
      .then((data) => setMessage(data.data));
  }, [ctx.token]);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{getMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
