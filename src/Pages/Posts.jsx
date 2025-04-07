import { useEffect, useState } from "react";
import axios from "axios";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:2400/post")
      .then((response) => {
        const fetchedPosts = response.data;
        setPosts(fetchedPosts);

        const initState = {};
        fetchedPosts.forEach((post) => {
          initState[post._id] = false;
        });
        setExpandedPosts(initState);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const toggleExpand = (id) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const postStyle = {
    width: "100%",
    minHeight: "100vh",
    textAlign: "center",
    fontFamily: "Winky Sans",
    fontWeight: "500",
    padding: "20px",
    
  };

  const blogStyle = {
    width: "90%",
    textAlign: "left",
    backgroundColor: "#fefefe" // Ya try "#f9f9f9" / "#fcfcfc"
,
    borderRadius: "20px",
    padding: "25px",
    margin: "25px auto",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    borderLeft: "5px solid rgb(82, 86, 88)",
    transition: "transform 0.3s ease",
":hover": {
  transform: "scale(1.01)",
}

  };
  
  

  const animatedContentStyle = (isExpanded) => ({
    maxHeight: isExpanded ? "1000px" : "120px",
    overflow: "hidden",
    transition: "max-height 0.5s ease",
    position: "relative",
  });

  return (
    <div style={postStyle}>
      <h2>Blog Posts</h2>
      {posts.length === 0 ? (
        <p>No posts...</p>
      ) : (
        posts.map((post) => {
          const isExpanded = expandedPosts[post._id];
          const isLongContent = post.content.length > 300;

          return (
            <div key={post._id} style={blogStyle}>
              <h1>{post.title}</h1>
              <h5>Created At: {new Date(post.createdAt).toLocaleDateString()}</h5>

              <div style={animatedContentStyle(isExpanded)}>
                <p style={{ marginBottom: "10px" }}>{post.content}</p>
                {!isExpanded && isLongContent && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      height: "40px",
                      width: "100%",
                      background: "linear-gradient(to top, white, transparent)",
                    }}
                  />
                )}
              </div>

              {isLongContent && (
                <button onClick={() => toggleExpand(post._id)}>
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              )}

              <h3>By - {post.author}</h3>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Post;
