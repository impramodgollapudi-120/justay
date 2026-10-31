import { auth } from '../lib/firebase';
import { updateProfile } from 'firebase/auth';
import { saveUserRecord } from '../lib/firebaseData';
export const authApi = {
  async getCurrentUser() {
    const user = auth?.currentUser;
    if (!user) return null;
    return { id: user.uid, name: user.displayName || '', email: user.email || '', phone: user.phoneNumber || '', avatar: user.photoURL || '' };
  },
  async updateProfile(userData) {
    const user = auth?.currentUser;
    if (!user) throw new Error('Sign in before updating your profile.');
    await updateProfile(user, { displayName: userData.name ?? user.displayName, photoURL: userData.avatar ?? user.photoURL });
    await saveUserRecord('users', user.uid, { uid: user.uid, name: userData.name ?? user.displayName, email: user.email, phone: userData.phone ?? user.phoneNumber, avatar: userData.avatar ?? user.photoURL });
    return this.getCurrentUser();
  },
};
export default authApi;
