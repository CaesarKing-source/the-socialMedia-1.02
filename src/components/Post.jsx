import { useContext } from 'react'
import styles from './Post.module.css'
import { PostList } from '../store/post-list-store'

const Post = ({ post }) => {

    const {deletePost} = useContext(PostList)
    return (
        <>
            <div className={`card ${styles.post_body}`} style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{post.title}
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
                        onClick={() => deletePost(post.id)}>
                        <i className="ri-chat-delete-line"></i>
                    </span>
                    </h5>
                    <p className="card-text">{post.body}</p>
                    <p className={styles.likes}>Likes: <span>{post.reactions}</span></p>

                    {post.tags.map((tag) => (
                        <span key={tag} className="badge bg-primary mx-1">{tag}</span>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Post
