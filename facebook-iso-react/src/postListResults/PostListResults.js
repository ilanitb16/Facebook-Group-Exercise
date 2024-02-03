import PostItem from "../postItem/PostItem";

function PostListReslts({posts, postList, setPostList}){
    const postListOriginal = posts.map((post, key) => {
        return <PostItem postList={postList} setPostList={setPostList}{...post} key={key} />;
      });
    return(
        <div className="row gx-3">{postListOriginal}</div>
    );
}
export default PostListReslts;