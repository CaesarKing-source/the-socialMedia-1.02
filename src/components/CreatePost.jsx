import { useContext, useRef } from "react"
import { PostList } from "../store/post-list-store";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const navigate = useNavigate();
    const userIDEl = useRef();
    const titleEl = useRef();
    const bodyEl = useRef();
    const reactionEl = useRef();
    const tagEl = useRef();

    const {addPost} = useContext(PostList)
    const handleAddPost = (event) => {
        event.preventDefault();

        const userID = userIDEl.current.value;
        const title = titleEl.current.value;
        const body = bodyEl.current.value;
        const reactions = reactionEl.current.value;
        const tags = tagEl.current.value.split(" ");
        addPost(userID, title, body, reactions, tags);
        navigate('/');
    }

    return (
        <>
        <form className="create_post" onSubmit={handleAddPost}>
            <div className="mb-3">
                <label htmlFor="userID" className="form-label">User ID</label>
                <input type="text" className="form-control" id="userID" ref={userIDEl} placeholder="Enter your User ID"/>
            </div>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Post Title</label>
                <input type="text" className="form-control" id="title" ref={titleEl} placeholder="What's in your mind..."/>
            </div>
            <div className="mb-3">
                <label htmlFor="body" className="form-label">Post Body</label>
                <textarea className="form-control" id="body" rows="4" ref={bodyEl} placeholder="Tell us more about it"></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="reactions" className="form-label">Reactions</label>
                <input type="text" className="form-control" id="reactions" ref={reactionEl} placeholder="Number of people reacted on this post"/>
            </div>
            <div className="mb-3">
                <label htmlFor="tags" className="form-label">Tags</label>
                <input type="text" className="form-control" id="tags" ref={tagEl} placeholder="Enter post tags"/>
            </div>
            <div className="btn-group">
                <button type="submit" className="btn btn-primary">Create Post</button>
            </div>
        </form>
        </>
    )
}

export default CreatePost
