import axiosClient from "./base.js";

const UserService = {
    getUsers: () => {
        return axiosClient.get("/user/getUsers");
    },
    changeStatusUser: (body) => {
        return axiosClient.post("/user/changeStatusUser", body);
    },
    getUserById: (userId) => {
        return axiosClient.get(`/user/getUserById/${userId}`);
    }
};

export default UserService;
