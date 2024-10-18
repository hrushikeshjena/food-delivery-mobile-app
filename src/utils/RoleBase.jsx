import firestore from '@react-native-firebase/firestore';

// After login, check the user's role from Firestore
const checkUserRole = async (uid) => {
  const userDoc = await firestore().collection('users').doc(uid).get();
  const userData = userDoc.data();
  return userData.role;  // Assuming role is 'admin' or 'user'
};

// Example in PhoneSignIn or AdminLogin after successful login:
const confirmCode = async () => {
  try {
    const userCredential = await confirm.confirm(code);
    const user = userCredential.user;
    const role = await checkUserRole(user.uid);

    if (role === 'admin') {
      navigation.replace('AdminDashboard');
    } else {
      navigation.replace('UserDashboard');
    }
  } catch (error) {
    Alert.alert('Error', 'Invalid OTP code.');
  }
};
