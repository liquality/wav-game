let ARTISTS = null;
let ARTIST_IMAGES = null;

const StaticDataService = {
  getArtistImages: async function () {
    if (!ARTIST_IMAGES) {
      const artists = await this.getArtists();
      ARTIST_IMAGES = await artists.map(({ id, image }) => ({ id, image }))
        .reduce(async (prev, current) => {
          const content = await import(`../images/artists/${current.image}`);
          const accum = await prev;
          return {...accum, [current.id] : content.default}
        }, Promise.resolve({}))
    }
    return ARTIST_IMAGES;
  },
  getArtists: async function () {
    if (!ARTISTS) {
      const content = await import("../data/artists.json");
      ARTISTS = content.default;
    }
    return ARTISTS;
  },
  findArtistById: async function (id) {
    const artists = await this.getArtists();
    return artists.find((a) => a.id.toLowerCase() === (id || "").toLowerCase());
  },

  findArtistByNumberId: async function (numberId) {
    const artists = await this.getArtists();
    return artists.find((a) => a.number_id === numberId);
  },
};
export default StaticDataService;
