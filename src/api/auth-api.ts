import { auth } from 'configs/firebase-config.ts';
import {
  createUserWithEmailAndPassword,
  type User,
  type UserCredential,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';

export type RegisterWithEmailParams = {
  email: string;
  password: string;
  displayName: string;
};

export const authApi = {
  async loginWithEmail(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  async registerWithEmail({
    email,
    password,
    displayName,
  }: RegisterWithEmailParams): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    return userCredential.user;
  },

  async withGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const userCredential: UserCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  },

  async withGithub(): Promise<User> {
    const provider = new GithubAuthProvider();
    const userCredential: UserCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  },
};
