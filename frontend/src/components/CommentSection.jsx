import { useCallback, useEffect, useState } from "react";
import API from "../api/api";

export default function CommentSection({ postId }) {

  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComments = useCallback(async () => {

    try {

      const response = await API.get(`/comments/${postId}/`);

      setComments(response.data);

    } catch (error) {

      console.error("Failed to fetch comments", error);

    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [postId, fetchComments]);


  const handleAddComment = async () => {

    if (!content) return;

    setLoading(true);

    try {

      await API.post("/comments/create/", {
        post_id: postId,
        content: content
      });

      setContent("");

      fetchComments();

    } catch (error) {

      console.error("Failed to add comment", error);

    } finally {

      setLoading(false);

    }
  };

  const handleDeleteComment = async (commentId) => {
    setLoading(true);
    try {
      await API.delete(`/comments/delete/${commentId}/`);
      fetchComments();
    } catch (error) {
      console.error("Failed to delete comment", error);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="mt-4">

      <div className="flex flex-col sm:flex-row gap-2">
      <h4 className="text-lg font-semibold text-gray-300 sm:hidden">Comments</h4>

      <input
        type="text"
        placeholder="Add comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 border p-2 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0"
      />

      <button 
      onClick={handleAddComment} 
      disabled={loading}
      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 whitespace-nowrap"
      >
        Add
      </button>

      </div>

      <div className="mt-2">
      {comments.map((comment) => (
        <div key={comment.id} 
        className="border border-gray-700 p-2 rounded-xl mt-2"
        >
          <span className="font-semibold text-white">
            {comment.author_username}</span>

            <span className="ml-2 text-white">
            {comment.content}
            </span>
            <br /> <br />
            <button
              onClick={() => handleDeleteComment(comment.id)}
              disabled={loading}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
                Delete
            </button>
        </div>
      ))}
      </div>

    </div>
  );
}