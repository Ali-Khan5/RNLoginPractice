import axios from "axios";
const API_KEY = "AIzaSyCYYirI3ikSQpvOcTwROX8welPZgZxYECI";

export async function createUser(email, password) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
  const token=response.data.idToken;
  return token;
}

export async function Authenticate(email, password) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
  const token=response.data.idToken;
  return token;
  console.log(response.data);
}
