import { useState, useEffect } from "react";
import CreatePost from "../components/CreatePost";
import CommentSection from "../components/CommentSection";
import API from "../api/api";
import Navbar from "../components/NavBar";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await API.get("/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postID) => {
    try {
      await API.post(`/posts/${postID}/like/`);
      fetchPosts();
    } catch (error) {
      console.error("Like failed", error);
    }
  };

  const handleDelete = async (postID) => {
    try {
      await API.delete(`/posts/${postID}/delete/`);
      fetchPosts();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-400 text-lg">Loading feed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-x-hidden">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-blue-400">🌍</span>
          TerraForum Feed
        </h1>
        <CreatePost onPostCreated={fetchPosts} />

        {posts.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-12 text-center">
            <p className="text-gray-400 text-lg">No posts yet. Be the first to share!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-gradient-to-br from-gray-900 to-black shadow-xl rounded-xl p-6 mb-6 border border-gray-800 hover:border-gray-700 transition">
              <h2 className="text-2xl font-bold text-white mb-3">{post.title}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">{post.content}</p>

              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-800">
                <div className="text-sm text-gray-500">
                  Posted by <span className="text-blue-400 font-semibold">{post.author_username}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-red-400">👍</span>
                  <span className="font-semibold">{post.like_count || 0}</span>
                </div>
              </div>

              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-600 hover:to-yellow-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg transform hover:scale-105"
                >
                  👍 Like
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-all"
                >
                  🗑️ Delete
                </button>
              </div>

              <CommentSection postId={post.id} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}