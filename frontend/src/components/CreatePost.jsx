import { useState } from "react";
import API from "../api/api";

export default function CreatePost({ onPostCreated }) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!title || !content) {
      setError("Title and content required");
      return;
    }

    setLoading(true);
    setError("");

    try {

      await API.post("/posts/create/", {
        title,
        content
      });

      setTitle("");
      setContent("");

      onPostCreated();

    } catch (err) {

      setError("Failed to create post");
      return err;

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">

      <h3 className="font-semibold mb-2 text-lg">Create Post</h3>

      <form onSubmit={handleSubmit}>

        <div className="w-full border p-2 rounded mb-2">
          <input
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="w-full border p-3 rounded mb-3">
          <textarea
            rows="5"
            cols="180"
            placeholder="Post content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="bg-blue-600 text-white px-3 py-1 text-lg rounded hover:bg-blue-700 inline-block">
          <button type="submit" disabled={loading}>
            {loading ? "Posting..." : "Create Post"}
          </button>
        </div>

      </form>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

    </div>
  );
}