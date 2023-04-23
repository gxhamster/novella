import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "@/utils/firebase";
import { ref } from "vue";

// Global user object
export const auth = getAuth(app);
export const user = ref(getAuth(app).currentUser);

onAuthStateChanged(auth, (u) => {
  user.value = u;
});

export function useSignup() {
  const email = ref("");
  const password = ref("");

  async function signup() {
    if (email.value === "" || password.value === "") return;

    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    if (!userCredentials.user) throw Error("Singup failed");

    user.value = userCredentials.user;
  }

  return {
    email,
    password,
    signup,
  };
}

export function useLogin() {
  const email = ref("");
  const password = ref("");

  async function login() {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    if (!userCredentials.user) throw Error("No user");
    user.value = userCredentials.user;
  }

  return {
    email,
    password,
    login,
  };
}
