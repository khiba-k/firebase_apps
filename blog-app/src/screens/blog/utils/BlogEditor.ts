import { db } from "@/lib/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import {} from "react-firebase-hooks/firestore";

const blogsCollection = collection(db, "blogs");
const handleBlogPost = async (title: string, text: string, userId: string) => {
  try {
    const blogData = {
      title: title,
      text: text,
      userId: userId,
      dateCreated: new Date().toISOString(),
    };

    const insertData = await addDoc(blogsCollection, blogData);

    if (insertData) {
      return true;
    }
  } catch (error) {
    console.error("Failed to create blog post:", error);
  }
};

export default handleBlogPost;
