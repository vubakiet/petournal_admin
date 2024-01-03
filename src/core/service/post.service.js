import axiosClient from "./base.js";

const PostService = {
    getPosts: () => {
        return axiosClient.get("/post/getPosts");
    },
};

export default PostService;
