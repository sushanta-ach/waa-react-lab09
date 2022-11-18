import axios from 'axios';
import React, { useContext,useEffect, useState } from 'react';
import { SelectedIdContext } from '../../context/SelectedIdContext';
import Comment from '../../components/Comment/Comment';
import './PostDetail.css';

const PostDetail = ({deletePost}) => {
    const id=useContext(SelectedIdContext)
    const [detail, setDetail] = useState({});
    const [comments, setComments] = useState([]);
   
    useEffect(() => {
        if (id === 0) {
            return;
        }
        axios.get(`http://localhost:8080/posts/${id}`)
            .then(response => {
                setDetail(response.data);
               // console.log(response);
            })
            .catch(error => {
                console.log(error.message)
                //console.log(id)
            });
    }, [id]);

    useEffect(() => {
        if (id === 0) {
            return;
        }
        axios.get(`http://localhost:8080/posts/${id}/comments`)
            .then(response => {
                setComments(response.data);
                //console.log(response);
            })
            .catch(error => {
                console.log(error.message)
                //console.log(id)
            });
    }, [id]);

    const editBtnHandler = (e) => {
        e.preventDefault();
        console.log('Edit clicked for id : ' + id);
    };
    const deleteBtnHandler = (e) => {
        e.preventDefault();
        deletePost(id);
    }

    if (id === 0) {
        return (
            <div className='post-detail'>
                <p>Select a post to see details</p>
            </div>
        );
    }
    return (
        <div className='post-detail'>
            <h2>Title: {detail.title}</h2>
            <h4>Author: {detail.author}</h4>
            <p>Content: {detail.content}</p>
            
            <div>
                <h4>Comments</h4>
                {comments.length !==0 ? comments.map(comment => {
                    return <Comment key={comment.id} name={comment.name} />
                }) :""}
            </div>
            <div className='detail-action'>
                <a href='/' onClick={editBtnHandler}>Edit </a> &nbsp; &nbsp;
                <a href='/' onClick={deleteBtnHandler}>Delete</a>
            </div>
            
        </div>
    );
};

export default PostDetail;

