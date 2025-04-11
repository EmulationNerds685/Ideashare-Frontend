
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Stack,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const Post = () => {
  const navigate = useNavigate();
  
  const [open, setopen] = useState(false);
  const [verbox, setverbox] = useState(false);
  const [opendel, setopendel] = useState(false);
  const [NotAccess, setNotAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const [cnf, setcnf] = useState(false);
  const [cnfdel,setcnfdel]=useState(false)
  const [posts, setPosts] = useState([]);
 
  const [expandedPosts, setExpandedPosts] = useState({});
  const [code, setcode] = useState({
    vercode: "",
  });
  const [blogid, setblogid] = useState({
    postid: "",
  });
  
  const backend = import.meta.env.VITE_BACKEND_URL;
  
  useEffect(() => {
    axios
      .get(`${backend}/post`)
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
      })
      .finally(() => {
        setLoading(false); // Stop loading after fetch is done
      });
  }, []);
  
  
  const toggleExpand = (id) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  function edit(id) {
    setverbox(true);
    setblogid({ ...blogid, postid: id });
  }
function delete_post(id){
  setopendel(true);
  
  setblogid({...blogid, postid: id })
}

  function handleChange(e) {
    setcode({ ...code, vercode: e.target.value });
  }
  async function handledelete() {
    const result = await axios.post(`${backend}/delete`, blogid);
    if(result.data.message=="Post Deleted"){
      setcnf(false)
      setcnfdel(true)
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== blogid.postid));

    }else{
      setcnfdel(false)
    }
  }
  async function handleEdit() {
    const result = await axios.post(`${backend}/edit`, blogid);
   
    const postdata = result.data;
    setopen(false)
    navigate("/create", { state: { postdata } });
  }
  async function verify() {
    try {
      const result = await axios.post(`${backend}/verify`, {
        code: code.vercode,
        blogid: blogid.postid,
      });
      if (result.data.Message === "User Confirmed") {
        setverbox(false)
        setopen(true)
        
        
      } else {
        setverbox(false)
       setNotAccess(true)
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function verify_del() {
    try {
      const result = await axios.post(`${backend}/verify`, {
        code: code.vercode,
        blogid: blogid.postid,
      });
      if (result.data.Message === "User Confirmed") {
        setopendel(false)
       
        setcnf(true);
      } else {
        setopendel(false)
        setNotAccess(true)
      }
    } catch (err) {
      console.log(err);
    }
  }



  const postStyle = {
    width: "100%",
    minHeight: "100vh",
    textAlign: "center",
    fontFamily: "Winky Sans",
    fontWeight: 500,
    padding: "20px",
    boxSizing: "border-box",
    
  };
  const blogStyle = {
    width: "95%",
    maxWidth: "800px",
    margin: "25px auto",
    padding: "25px",
    borderRadius: "16px",
    backgroundColor: "#fff",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.08)",
    borderLeft: "6px solid rgb(82, 86, 88)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const animatedContentStyle = (isExpanded) => ({
    maxHeight: isExpanded ? "1000px" : "120px",
    overflow: "hidden",
    transition: "max-height 0.5s ease",
    position: "relative",
  });


  const buttonStyle = {
    margin: "6px",
    minWidth: "100px",
  };
  
  const contentFadeStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "40px",
    width: "100%",
    background: "linear-gradient(to top, white, transparent)",
  };
  
  const titleStyle = {
    fontSize: "24px",
    fontWeight: "600",
    color: "#333",
    margin: "0",
  };
  
  const dateStyle = {
    fontSize: "14px",
    color: "#666",
    marginBottom: "5px",
  };

  return (
    <div style={postStyle}>
      <h2>Blog Posts</h2>
      {loading ? (
  <p>Fetching posts...</p>
) : posts.length === 0 ? (
  <p>No Posts Available...</p>
) : (

        posts.map((post) => {
          const isExpanded = expandedPosts[post._id];
          const isLongContent = post.content.length > 300;

          return (
            <div key={post._id} style={blogStyle}>
            <Typography variant="h4" style={titleStyle}>{post.title}</Typography>
          
            <Typography variant="body2" style={dateStyle}>
              Created At: {new Date(post.createdAt).toLocaleDateString()}
            </Typography>
            {post.updatedAt !== post.createdAt && (
              <Typography variant="body2" style={dateStyle}>
                Last Updated: {new Date(post.updatedAt).toLocaleDateString()}
              </Typography>
            )}
          
            <div style={animatedContentStyle(isExpanded)}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {post.content}
              </Typography>
              {!isExpanded && isLongContent && <div style={contentFadeStyle} />}
            </div>
          
            {isLongContent && (
              <Button size="small" onClick={() => toggleExpand(post._id)}>
                {isExpanded ? "Read Less" : "Read More"}
              </Button>
            )}
          
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mt: 1 }}>
              By - {post.author}
            </Typography>
          
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
              <Button
                variant="contained"
                color="info"
                onClick={() => edit(post._id)}
                style={buttonStyle}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => delete_post(post._id)}
                style={buttonStyle}
              >
                Delete
              </Button>
            </Box>
          </div>
          );
        })
      )}
{/* --- Verification Dialog --- */}
<Dialog open={verbox} onClose={() => setverbox(false)} fullWidth maxWidth="xs">
  <DialogTitle>🔒 Enter Post Code</DialogTitle>
  <DialogContent>
    <Stack spacing={2} mt={1}>
    <TextField
  label="Post Code"
  variant="outlined"
  onChange={handleChange}
  required
  fullWidth
  size="small"
  sx={{
    '& .MuiInputBase-root': {
      padding: 0, // ⛔ remove that 30px padding
    },
    '& .MuiInputBase-input': {
      padding: '6px 10px', // ✅ optional: tweak inner input padding
    },
  }}
/>



      <Button variant="contained" onClick={verify} fullWidth>
        Verify
      </Button>
    </Stack>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setverbox(false)} fullWidth>Cancel</Button>
  </DialogActions>
</Dialog>


{/* --- Success Dialog --- */}
<Dialog open={open} onClose={() => setopen(false)} fullWidth maxWidth="xs">
  <DialogTitle>✅ Verified</DialogTitle>
  <DialogContent>
    <Typography>
      You are now authorized to edit this post.
    </Typography>
    <Box mt={3} textAlign="center">
      <Button variant="contained" onClick={handleEdit}>
        Proceed to Edit
      </Button>
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setopen(false)} fullWidth>Close</Button>
  </DialogActions>
</Dialog>


{/* --- Delete Verification Dialog --- */}
<Dialog open={opendel} onClose={() => setopendel(false)} fullWidth maxWidth="xs">
  <DialogTitle>🛑 Confirm Delete</DialogTitle>
  <DialogContent>
    <Stack spacing={2} mt={1}>
    <TextField
  label="Post Code"
  variant="outlined"
  onChange={handleChange}
  required
  fullWidth
  size="small"
  sx={{
    '& .MuiInputBase-root': {
      padding: 0, // ⛔ remove that 30px padding
    },
    '& .MuiInputBase-input': {
      padding: '6px 10px', // ✅ optional: tweak inner input padding
    },
  }}
/>


      <Button variant="contained" color="error" onClick={verify_del} fullWidth>
        Verify & Delete
      </Button>
    </Stack>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setopendel(false)} fullWidth>Cancel</Button>
  </DialogActions>
</Dialog>


{/* --- Confirm Delete Dialog --- */}
<Dialog open={cnf} onClose={() => setcnf(false)} fullWidth maxWidth="xs">
  <DialogTitle>⚠️ Final Confirmation</DialogTitle>
  <DialogContent>
    <Typography>
      Are you sure you want to delete this post? This action cannot be undone.
    </Typography>
    <Box mt={3} textAlign="center">
      <Button variant="contained" color="warning" onClick={handledelete}>
        Yes, Delete It
      </Button>
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setcnf(false)} fullWidth>Cancel</Button>
  </DialogActions>
</Dialog>

{/* --- Delete Success Dialog --- */}
<Dialog open={cnfdel} onClose={() => setcnfdel(false)} fullWidth maxWidth="xs">
  <DialogTitle>✅ Post Deleted</DialogTitle>
  <DialogContent>
    <Typography>
      The post has been successfully deleted.
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setcnfdel(false)} fullWidth>Close</Button>
  </DialogActions>
</Dialog>



{/* --- Invalid Code Dialog --- */}
<Dialog open={NotAccess} onClose={() => setNotAccess(false)} fullWidth maxWidth="xs">
  <DialogTitle>❌ Invalid Code</DialogTitle>
  <DialogContent>
    <Typography>
      The post code you entered is incorrect. Please try again.
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setNotAccess(false)} fullWidth>Close</Button>
  </DialogActions>
</Dialog>



    </div>
  );
};

export default Post;
