"use client";
import React, { useState, useEffect } from "react";
import { fetchPostsByUser } from "@/screens/blog/utils/Blog";
import { auth } from "@/lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import "primeicons/primeicons.css";
import Loading from "@/app/loading";
import DOMPurify from "dompurify";

const BlogPanel = () => {
  const [posts, setPosts] = useState<any>([]);
  const [user, userLoading] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch user blogs on mount
  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const fetchedPosts = await fetchPostsByUser(user.uid);
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

  return (
    <div style={styles.container}>
      {isLoading ? (
        <div style={styles.loadingContainer}>
          <Loading />
        </div>
      ) : (
        <div style={styles.postsContainer}>
          {posts.map(
            (post: {
              id: React.Key | null | undefined;
              title: string;
              text: string;
              dateCreated: string;
            }) => (
              <div key={post.id} style={styles.postCard}>
                <h2 style={styles.title}>{post.title}</h2>
                <p style={styles.date}>
                  {new Date(post.dateCreated).toLocaleDateString()}
                </p>
                <div
                  style={styles.content}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.text),
                  }}
                />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default BlogPanel;

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
  postsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  postCard: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
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
  content: {
    lineHeight: "1.6",
  },
};
