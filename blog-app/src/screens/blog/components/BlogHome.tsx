"use client";
import React, { useState, useEffect } from "react";
import { fetchAllPosts } from "@/screens/blog/utils/Blog";
import { auth } from "@/lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import "primeicons/primeicons.css";
import Loading from "@/app/loading";

const BlogHome = () => {
  const [posts, setPosts] = useState<any>([]);
  const [user, userLoading] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch user blogs on mount
  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const fetchedPosts = await fetchAllPosts();
          setPosts(fetchedPosts);
        } catch (error) {
          console.error("Error fetching posts:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPosts();
  }, [user]);

  console.log(posts);

  return (
    <div style={styles.container}>
      {isLoading ? (
        <div style={styles.loadingContainer}>
          <Loading />
        </div>
      ) : (
        <div>
          {user && (
            <div style={styles.userInfoContainer}>
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="User Profile"
                style={styles.profilePic}
              />
              <h3 style={styles.userName}>{user.displayName || "Anonymous"}</h3>
            </div>
          )}

          <div style={styles.postsContainer}>
            {posts.map((post: { id: React.Key | null | undefined; title: string; text: string; dateCreated: string }) => (
              <div key={post.id}>
                <h2 style={styles.title}>{post.title}</h2>
                <p style={styles.date}>{new Date(post.dateCreated).toLocaleDateString()}</p>
                <hr style={styles.separator} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogHome;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  userInfoContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "15px",
  },
  profilePic: {
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    marginRight: "15px",
  },
  userName: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333",
  },
  postsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#FF3D00",
  },
  date: {
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "10px",
  },
  separator: {
    border: "0",
    borderTop: "1px solid #ddd",
    margin: "10px 0",
  },
};
