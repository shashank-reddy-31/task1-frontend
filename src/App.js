import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState([]);

    // Fetch posts from the backend
    const fetchPosts = async () => {
        const response = await axios.get('http://localhost:3000/posts');
        setPosts(response.data);
    };
    // Handle post submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content) return; // Prevent empty posts
        await axios.post('http://localhost:3000/posts', { content });
        setContent('');
        fetchPosts(); // Refresh the posts
    };

    useEffect(() => {
        fetchPosts(); // Fetch posts on component mount
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Social Media App</h1>
            <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    required
                    style={{ width: '100%', height: '100px' }}
                />
                <button type="submit">Post</button>
            </form>

            <h2>Posts:</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {posts.map((post) => (
                    <li key={post._id} style={{ border: '1px solid black', margin: '10px 0', padding: '10px' }}>
                        <p>{post.content}</p>
                        <small>{new Date(post.createdAt).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </div>
  );
}

export default App;