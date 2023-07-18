import React from 'react';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/posts';
export const Home = () => {
const dispatch = useDispatch();
const userData = useSelector(state => state.auth.data);
const { posts } = useSelector(state => state.posts);
React.useEffect(() => {
  dispatch(fetchPosts());
}, []);
  //  console.log(chat,"thnis")
  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {posts.items.map((obj,index) => (
            <Post
            key={index}
              id={obj._id}
              title={obj.text}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={2}
              isEditable={userData?._id===obj.user._id}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};


//   const [ chat,setchat ]=useState([]);
//   const userData = useSelector((state) => state.auth.data);

// console.log(userData)
//   React.useEffect(() =>{
//     const ReqChat=async()=>{
//       const responce =await axios.get('/chat')
//         setchat(responce.data)
//     }
//     ReqChat()
//     },[])