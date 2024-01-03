import axiosClient from "./base.js";

const AuthService = {
    login: (user) => {
        return axiosClient.post("/auth/login", user);
    },
};

export default AuthService;
