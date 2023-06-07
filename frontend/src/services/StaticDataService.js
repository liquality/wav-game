
let ARTISTS = null;
let LEVELS = null;

const StaticDataService = {
    fetchData: async function (path) {
        const content = await import(path);
        return content.default;
    },
    getArtists: async function () {
        if (!ARTISTS) {
            const content = await import('../data/artists.json');
            ARTISTS = content.default;
        }
        return ARTISTS;
    },
    getLevels: async function () {
        if (!LEVELS) {
            const content = await import('../data/levels.json');
            LEVELS = content.default;
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
