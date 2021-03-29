// const base = "http://localhost:5000";
const base = "https://devsnest-teams.herokuapp.com";

const urls = {
    updateSore: `${base}/api/v1/softskill/update-score`,
    getUsers: `${base}/api/v1/softskill/get-users`,
    checkPassword: `${base}/api/v1/admin/check-password`,
    getUser: `${base}/api/v1/softskill/get-user`,
};

export default urls;