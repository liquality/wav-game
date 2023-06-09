import { CustomModal } from "../../components/Modal";

export const ArtistBioModal = (props) => {
  const { show, setShow, artist, image } = props;
  const content = () => {
    return (
      <div className="container contentView">
        <div className="flex flex-row mt-5">
          <div className="flex h-full items-center flex-col">
            <div className="flex flex-col px-5 gap-4">
              <div
                className="artist-image-bio"
                style={{ backgroundImage: `url(${image})`, ...artist.profileStyles }}
              />
              <div className="bio-artist-name">{artist.name}</div>
              <div className="bio-artist-desc">{artist.description}</div>
            </div>
          </div>
          <div className="flex flex-col gap-4 pr-5">
            <p>{artist.bio}</p>
            <p>{artist.readMore}</p>
            <p>{artist.quote}</p>
            <br></br>
            <div className="bio-artist-desc mt-4">FAVORITE GAMES:</div>
            <p>{artist.favoriteGames}</p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <CustomModal
      show={show}
      setShow={setShow}
      content={content}
      modalHeaderText={"Artist Bio"}
    >
      {" "}
      {}
    </CustomModal>
  );
};
