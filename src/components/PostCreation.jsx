import { Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const PostCreation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingPost = location.state?.postdata || null;

  const [msg, setmsg] = useState("");
  const [resmsg, setresmsg] = useState("");
  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false);
  const [data, setData] = useState({
    title: "",
    content: "",
    author: ""
  });

  const backend = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (editingPost) {
      setData({
        code: editingPost.code,
        title: editingPost.title,
        content: editingPost.content,
        author: editingPost.author
      });
    }
  }, [editingPost]);

  function handleClose() {
    setopen(false);
    navigate('/posts');
  }

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setloading(true);

    try {
      let result;

      if (editingPost) {
        result = await axios.patch(`${backend}/update-post/${editingPost._id}`, data);
        setresmsg("Success");
        setmsg("Your Blog has Been Updated!");
        setData({ code: "", title: "", content: "", author: "" });
      } else {
        result = await axios.post(`${backend}/reactpost`, data);
        setData({ title: "", content: "", author: "" });
        setresmsg("Success");
        const code = result.data.blog.code;
        setmsg(`Your Blog has Been Posted! Your Blog Code is: ${code}. Please Remember this code to edit/delete this post`);
      }

    } catch (err) {
      console.log(err);
      setresmsg("Failed");
      setmsg("Something went wrong!");
    }

    setloading(false);
    setopen(true);
  }

  const pageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Winky Sans",
    fontWeight: "500",
    padding: "20px",
    flexDirection: "column"
  };

  const formStyle = {
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    padding: "30px",
    boxSizing: "border-box",
    backdropFilter: "blur(5px)",
  };

  const labelStyle = {
    display: "block",
    textAlign: "left",
    marginBottom: "8px",
    marginTop: "16px",
    fontSize: "18px",
    color: "#fff"
  };

  const inputStyle = {
    width: "100%",
    minHeight: "45px",
    fontSize: "16px",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    opacity: 0.85,
    marginBottom: "10px",
    fontFamily: "inherit"
  };

  const textareaStyle = {
    ...inputStyle,
    height: "200px",
    resize: "vertical"
  };

  const buttonWrapper = {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center"
  };

  return (
    <div style={pageStyle}>
      <div style={formStyle}>
        <form onSubmit={handleSubmit}>
          {data.code && <input type="hidden" name="code" value={data.code} />}

          <label style={labelStyle}>Title</label>
          <input
            style={inputStyle}
            name="title"
            required
            value={data.title}
            onChange={handleChange}
          />

          <label style={labelStyle}>Content</label>
          <textarea
            style={textareaStyle}
            placeholder="Start writing your thoughts..."
            required
            name="content"
            value={data.content}
            onChange={handleChange}
          />

          <label style={labelStyle}>Written By</label>
          <input
            style={inputStyle}
            required
            name="author"
            value={data.author}
            onChange={handleChange}
          />

          <div style={buttonWrapper}>
            <Button
              variant="outlined"
              color="inherit"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  {editingPost ? "Updating..." : "Posting..."}
                  <CircularProgress
                    size={20}
                    color="inherit"
                    style={{ marginLeft: 8 }}
                  />
                </>
              ) : (
                editingPost ? "Update" : "Post"
              )}
            </Button>
          </div>
        </form>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{resmsg}</DialogTitle>
        <DialogContent>{msg}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostCreation;
