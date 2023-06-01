
let ARTISTS = null;

const ArtistService = {
    fetchData: async function () {
        if(!ARTISTS) {
            const content = await import('../data/artitsts.json');
            ARTISTS = content.default;
        }
        return ARTISTS;
      },
    getArtists: async function () {
        return this.fetchData();
    },
    findArtistById: async function (id) {
        const artists = await this.getArtists();
        return artists.find(a => a.id.toLowerCase() === (id || '').toLowerCase());
    }
};
export default ArtistService;
