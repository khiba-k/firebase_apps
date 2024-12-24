"use client";
import React, { useState, useRef } from "react";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import handleBlogPost from "@/screens/blog/utils/BlogEditor";
import { auth } from "@/lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import "primeicons/primeicons.css";

const BlogEditor = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [user, userLoading, userError] = useAuthState(auth);
  const [isPosting, setIsPosting] = useState<boolean>(false);

  // Properly typing the toast ref to avoid 'null' warning
  const toast = useRef<Toast | null>(null);

  const handlePostClick = async () => {
    if (!title || !text) {
      if (toast.current) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Please fill out both the title and content before posting.",
          life: 3000,
        });
      }
      return;
    }

    if (user) {
      setIsPosting(true);
      const postBlog = await handleBlogPost(title, text, user.uid);
      if (postBlog) {
        setIsPosting(false);
        setTitle("");
        setText("");
      }
    }
  };

  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {/* Toast component to display notifications */}
      <Toast
        ref={toast}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          borderRadius: "8px",
          fontFamily: "'Arial', sans-serif",
          backgroundColor: "blue",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          gap: "1.5rem",
          backgroundColor: "#f9f9f9",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        {/* Title Input */}
        <div className="w-full flex justify-start">
          <InputText
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            style={{
              backgroundColor: "#f9f9f9",
              color: "#FF3D00",
              fontSize: "18px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "0.75rem 1rem",
              width: "100%",
            }}
          />
        </div>

        {/* Text Editor */}
        <Editor
          value={text}
          onTextChange={(e) => setText(e.htmlValue || "")}
          style={{
            height: "100%",
            width: "100%",
            maxWidth: "800px",
            minWidth: "300px",
            maxHeight: "400px",
            minHeight: "200px",
            resize: "both",
            overflow: "auto",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "12px",
            fontFamily: "'Arial', sans-serif",
            fontSize: "16px",
            backgroundColor: "#fff",
          }}
        />

        {/* Post Button */}
        {isPosting ? (
          <i
            className="pi pi-spin pi-spinner"
            style={{ fontSize: "2rem", color: "#FF3D00" }}
          ></i>
        ) : (
          <Button
            icon="pi pi-send"
            onClick={handlePostClick}
            className="p-button-success"
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "16px",
              borderRadius: "5px",
              backgroundColor: "#FF3D00",
              color: "#fff",
              border: "none",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#E04000")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#FF3D00")
            }
          />
        )}
      </div>
    </div>
  );
};
export default BlogEditor;
