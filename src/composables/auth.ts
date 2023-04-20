import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { ref } from "vue";

// Global user object
export const user = ref();
export const auth = getAuth();

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
