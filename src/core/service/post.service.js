import axiosClient from "./base.js";

const PostService = {
    getPosts: () => {
        return axiosClient.get("/post/getPosts");
    },
    getPostById: (postId) => {
        return axiosClient.get(`/post/getPostById/${postId}`);
    },
    changeStatusPost: (body) => {
        return axiosClient.post("/post/changeStatusPost", body);
    },
};

export default PostService;
