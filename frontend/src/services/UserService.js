import NetworkService from "./NetworkService";

const UserService = {
  createUser: async function (userObject, jwt) {
    return NetworkService.postResourceWithAuth("/v1/user/", userObject, jwt);
  },

  getUserByUserId: async function (userId, jwt) {
    return NetworkService.getResourceWithAuth("/v1/user/" + userId, jwt);
  },

  getGameByUserId: async function (userId, jwt) {
    return NetworkService.getResourceWithAuth("/v1/games/" + userId, jwt);
  },

  createGame: async function (gameObject, jwt) {
    return NetworkService.postResourceWithAuth("/v1/game/", gameObject, jwt);
  },

  updateGame: async function (gameObject, jwt) {
    return NetworkService.putResourceWithAuth("/v1/game/", gameObject, jwt);
  },

  loginUser: async function (userEmail) {
    return NetworkService.getResourceWithAuth("/v1/user/login/" + userEmail);
  },
};
export default UserService;
