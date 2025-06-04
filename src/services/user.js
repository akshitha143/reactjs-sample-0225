import { collection, addDoc, serverTimestamp, query, getDocs, where } from "firebase/firestore";
import { db } from "../../firebase"; 

export const addUser = async ({ name, email, password }) => {
  try {
    const usersRef = collection(db, "users");
    const newUserRef = await addDoc(usersRef, {
      name,
      email,
      password,
      createdAt: serverTimestamp(),
    });
    console.log("User added with ID:", newUserRef.id);
    return { success: true, id: newUserRef.id };
  } catch (error) {
    console.error("Error adding user:", error.message);
    return { success: false, error: error.message };
  }
};

export const loginUser = async (email, password) => {
  if (!email || !password) {
    console.error("Email and password must be provided");
    return { success: false, error: "Email and password are required" };
  }

  try {
    const usersRef = collection(db, "users");

    const q = query(
      usersRef,
      where("email", "==", email),
      where("password", "==", password)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      console.log("Login successful for user:", userData.name);
      return { success: true, user: { id: userDoc.id, ...userData } };
    } else {
      return { success: false, error: "Invalid email or password" };
    }
  } catch (error) {
    console.error("Login error:", error.message);
    return { success: false, error: "An error occurred during login" };
  }
};
