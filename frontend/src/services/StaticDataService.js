
let ARTISTS = null;
let LEVELS = null;

const StaticDataService = {
    fetchData: async function (path) {
        const content = await import(path);
        return content.default;
    },
    getArtists: async function () {
        if (!ARTISTS) {
            ARTISTS = await this.fetchData('../data/artitsts.json');;
        }
        return ARTISTS;
    },
    getLevels: async function () {
        if (!LEVELS) {
            LEVELS = await this.fetchData('../data/levels.json');;
        }
        console.log('levelts', LEVELS)
        return LEVELS;
    },
    findArtistById: async function (id) {
        const artists = await this.getArtists();
        return artists.find(a => a.id.toLowerCase() === (id || '').toLowerCase());
    }
};
export default StaticDataService;
