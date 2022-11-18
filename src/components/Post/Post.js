
const Post = (props) => {  
        return( 
        <div className="Content" onClick={props.setSelected}>
            <div className="Field">Id:{props.id}</div>
            <div className="Field">Title:{props.title}</div>
            <div className="Field">Author:{props.author}</div>

        </div>
        );
    }
export default Post
