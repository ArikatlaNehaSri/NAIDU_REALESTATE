import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "./config";

const auth = getAuth(app);

export const adminLogin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const adminLogout = () => {
  return signOut(auth);
};

export default auth;
