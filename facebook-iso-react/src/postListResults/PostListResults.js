import PostItem from "../postItem/PostItem";

function PostListReslts({posts}){
    const postList = posts.map((post, key) => {
        return <PostItem {...post} key={key} />;
      });
    return(
        <div className="row gx-3">{postList}</div>
    );
}
export default PostListReslts;