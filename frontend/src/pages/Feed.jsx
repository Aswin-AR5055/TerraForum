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
        return <h2>Loading...</h2>;
    }

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />
            <div className="max-w-2x1 mx-auto p-4">
            <h1 className="max-w-2x1 mx-auto p-4 font-bold text-lg">Terraforum Feed</h1>
            <CreatePost onPostCreated={fetchPosts} />

            {posts.length === 0 ? (
                <p className="text-lg">No posts yet</p>
            ) : (
                posts.map((post) => (
                    <div
                        key={post.id} 
                        className="bg-white rounded-lg shadow-md p-4 mb-4"
                    >
                        <h2 className="text-xl font-semibold text-gray-800">
                            {post.title}
                        </h2>
                        <p className="mt-2 text-gray-700">
                            {post.content}
                        </p>

                        <div className="mt-2 text-sm text-gray-500">
                            Posted by {post.author_username}
                        </div>

                        <div className="mt-2 font-medium">
                            {post.like_count || 0} likes
                        </div>

                        <div className="space-x-2">
                            <button 
                                onClick={() => handleLike(post.id)}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded"
                            >
                                Like
                            </button>

                            <button
                                onClick={() => handleDelete(post.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Delete
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