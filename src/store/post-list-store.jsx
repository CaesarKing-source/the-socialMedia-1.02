import { createContext, useReducer } from "react";
export const PostList = createContext({
    postList: [],
    addPost: () => {},
    getAllPost: () => {},
    deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
    let newPostList = currPostList
    if(action.type === 'DELETE_POST') {
        newPostList = currPostList.filter((post) => post.id != action.payload.postID)
    }
    else if (action.type === 'ADD_POST') {
        newPostList = [action.payload ,...currPostList]
    }
    else if (action.type === 'GET_ALL_INITIAL_POST') {
        newPostList = action.payload.posts
    }
    return newPostList
  };

const PostListProvider = ({ children }) => {
    const [postList, dispatchPostList] = useReducer( postListReducer, [] );
      
    const getAllPost = (posts) => {
        dispatchPostList({
            type: 'GET_ALL_INITIAL_POST',
            payload: {
                posts,
            }
        })
    }
    const addPost = (userID, title, body, reactions, tags) => {
        dispatchPostList({
            type: 'ADD_POST',
            payload: {
                id: Date.now(),
                title: title,
                body: body,
                reactions: reactions,
                userID: userID,
                tags: tags,
            },
        })
        console.log(`${userID} ${title} ${body} ${reactions} ${tags}`)
    }

    const deletePost = (postID) => {
       dispatchPostList({
        type: 'DELETE_POST',
        payload: { 
            postID
        }
       })
    }

    return (<PostList.Provider value={{ postList, addPost, getAllPost, deletePost }}>
        {children}
    </PostList.Provider>);
};

// const DEFAULT_POST_LIST = [
//     {
//         id: '1',
//         title: 'Going to Vacation',
//         body: 'Hi, there friends... Going to enjoy my vacation in Mumbai',
//         reactions: 2,
//         userID: 'user-4',
//         tags: ['vacation', 'mumbai', 'traveling'],
//     },

//     {
//         id: '2',
//         title: 'Test Item',
//         body: 'Hi, there friends... Test Item',
//         reactions: 4,
//         userID: 'user-2',
//         tags: ['test', 'mumbai'],
//     },
// ]

export default PostListProvider;