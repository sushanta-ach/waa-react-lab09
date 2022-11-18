import axios from 'axios'
import React,{useRef} from 'react';
import './NewPost.css';
const NewPostRef = () => {
    const addPostRef=useRef();
    const addButtonClicked = () => {
        const form = addPostRef.current;
        const data = {
            title: form['title'].value,
            author: form['author'].value,
            content: form['content'].value
        };
        console.log(data);

        axios.post('http://localhost:8080/posts/', data)
            .then(data => {
                console.log('Success', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
   
    return (
        <div className="NewPost">

            <h1>Add a Post</h1>
        <form ref={addPostRef}>
            <label>Title</label>
            <input type="text"
                label={'title'}
                name={'title'}
            />
            <label>Author</label>
            <input type="text"
                label={'author'}
                name={'author'}
            />
            <label>Content</label>
            <input type="text"
                label={'content'}
                name={'content'}
            />
        </form>
            <button onClick={addButtonClicked}>Add Post </button>
        </div>
    );

}

export default NewPostRef;