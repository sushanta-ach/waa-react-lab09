
import Posts from '../../components/Dashboard/Posts'
import PostDetail from '../../components/PostDetail/PostDetail';
import NewPost from '../Post/NewPost'
import {useState,useEffect} from 'react'
import axios from 'axios';
const Dashboard=()=>{
   // const [prodId, setProdId] = useState(114);
    const [posts,setPosts]=useState([
        {id:111, title:"Happiness",author:"John"},
        {id:112, title:"MIU",author:"Dean"},
        {id:113, title:"Enjoy Life",author:"Jasmine"}
    ])
    const[selectedState, setSelectedState]=useState(0);
    const [post, setPost] = useState(
        {
            title: "",
            author: "",
            content:""
        }
    )
    const onChange = (events) => {
        const updatedPost = { ...post, [events.target.name]: events.target.value };
        setPost(updatedPost);
    }
    
    const addButtonClicked = () => {
        // const copy = { ...post };
        // copy.id = prodId;
        // setProdId(prodId+1);
        // const copyPosts = [...posts]
        // copyPosts.push(copy);
        // setPosts(copyPosts);
        axios.post('http://localhost:8080/posts/', post,{withCredentials:false})
            .then(response => {
                // setPost(response);
                fetchPosts();
            })

    }

    const fetchPosts = () => {
        axios.get('http://localhost:8080/posts/')
            .then(response => {
                setPosts(response.data);
                //console.log(response);
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    useEffect(() => {
        fetchPosts()
    }, []);

    
    const setSelected=(id)=>{
        setSelectedState(id);
    }
    const deletePost = (id) => {
        axios.delete('http://localhost:8080/posts/' + id)
            .then(response => {
                fetchPosts();
            })
            .catch(err => {
                console.error(err);
                console.log("delete method" +id)
            })
    }
    return(
        <div>
            <div className='Post'>
                <Posts posts={posts} setSelected={setSelected}/>
            </div>
            <PostDetail id={selectedState} deletePost={deletePost}/>
            <div>
                <NewPost
                title={post.title}
                author={post.author}
                content={post.content}
                onChange={(event) => { onChange(event) }}
                addButtonClicked={addButtonClicked}
                />
            </div>
        </div>
    )
}
export default Dashboard