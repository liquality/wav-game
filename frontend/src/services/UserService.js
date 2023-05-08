import NetworkService from "./NetworkService";

const UserService = {
  getUserByID: async function (userId, session) {
    return NetworkService.getResourceWithAuth("v1/user/" + userId, session);
  },

  createUser: async function (session) {
    return NetworkService.postResourceWithAuth("v1/user/", session);
  },
};
export default UserService;
