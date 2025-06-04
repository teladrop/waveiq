import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface User {
  id: string;
  email: string;
  full_name: string;
  plan: 'free' | 'pro';
  date_joined: string;
}

export async function signUp(email: string, password: string, fullName: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user profile in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      email,
      full_name: fullName,
      plan: 'free',
      date_joined: new Date().toISOString(),
    });

    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Check if user profile exists
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      // Create user profile if it doesn't exist
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        email: user.email,
        full_name: user.displayName || '',
        plan: 'free',
        date_joined: new Date().toISOString(),
      });
    }

    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const user = auth.currentUser;
    if (!user) return null;

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) return null;

    return userDoc.data() as User;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function adminSignIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check if user is an admin
    const adminDoc = await getDoc(doc(db, 'admin', user.uid));
    if (!adminDoc.exists()) {
      throw new Error('Invalid admin credentials');
    }

    return adminDoc.data();
  } catch (error) {
    console.error('Error signing in as admin:', error);
    throw error;
  }
} 