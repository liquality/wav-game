import NetworkService from "./NetworkService";

const UserService = {
  createUser: async function (userObject, jwt) {
    return NetworkService.postResourceWithAuth("/v1/user/", userObject, jwt);
  },

  getUserByUserId: async function (userId, jwt) {
    return NetworkService.getResourceWithAuth("/v1/user/" + userId, jwt);
  },

  getGameByUserId: async function (userId, artist_number_id, jwt) {
    return NetworkService.getResourceWithAuth(
      "/v1/games/" + userId + "/" + artist_number_id,
      jwt
    );
  },

  createGame: async function (gameObject, jwt) {
    return NetworkService.postResourceWithAuth("/v1/game/", gameObject, jwt);
  },

  updateGame: async function (gameObject, jwt) {
    return NetworkService.putResourceWithAuth("/v1/game/", gameObject, jwt);
  },

  levelUpTrade: async function (gameObject, jwt) {
    return NetworkService.putResourceWithAuth(
      "/v1/gamelevelup",
      gameObject,
      jwt
    );
  },

  getLeaderboardData: async function (gameID, jwt) {
    return NetworkService.getResourceWithAuth(
      "/v1/game/leaderboard/" + gameID,
      jwt
    );
  },

  loginUser: async function (userEmail) {
    return NetworkService.getResourceWithAuth("/v1/user/login/" + userEmail);
  },
};
export default UserService;
