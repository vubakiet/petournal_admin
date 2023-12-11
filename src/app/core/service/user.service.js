import axiosClient from "./base.js";

const UserService = {
    getUsers: () => {
        return axiosClient.get("/user/getUsers");
    },
};

export default UserService;
