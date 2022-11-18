import React from 'react';

import './Comment.css'

const Comment = ((props) => {
    console.log("RENDER FROM REVIEW");
    return (

        <div className='Comment'>
            {props.name}
        </div>
    );

})

export default Comment; 