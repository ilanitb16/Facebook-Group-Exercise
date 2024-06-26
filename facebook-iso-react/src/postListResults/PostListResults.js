import PostItem from "../postItem/PostItem";

function PostListReslts({posts, postList, setPostList, user_name, user_photo}){
    const postListOriginal = posts.map((post) => {
        return <PostItem postList={postList} setPostList={setPostList}{...post} user_name={user_name} user_photo={user_photo}/>;
      });
    return(
        <div className="row gx-3">{postListOriginal}</div>
    );
}
export default PostListReslts;