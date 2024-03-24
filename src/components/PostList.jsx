import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoaderSpinner from "./LoaderSpinner";

const PostList = () => {
  const { postList, getAllPost } = useContext(PostListData);
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoadingSpinner(true)
    fetch("https://dummyjson.com/posts", {signal})
      .then((res) => res.json())
      .then(data => {
          getAllPost(data.posts)
          setLoadingSpinner(false)
      });

      return () => {
        controller.abort();
      }
  }, [])

  return (
    <>
      <div className="post-container">
        {loadingSpinner && <LoaderSpinner />}
        {!loadingSpinner && postList.length === 0 && <WelcomeMessage/>}
        {!loadingSpinner && postList.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default PostList;
