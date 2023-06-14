
import { CustomModal } from "../../components/Modal";

export const ArtistBioModal = (props) => {
    const { show, setShow, artist, image } = props;
    const content = () => {
        return (
            <div className="container contentView">
                <div className="flex flex-row mt-5">
                    <div className="flex h-full items-center flex-col w-[15.25rem]">
                        <div className="flex flex-col px-5 gap-4 mt-5">
                            <img className="" src={image} alt="" />
                            <div className="bio-artist-name">{artist.name}</div>
                            <div className="bio-artist-desc">{artist.description}</div>
                        </div>
                    </div>
                    <div className="flex flex-wrap flex-row">
                        <p>
                            {artist.bio}
                        </p>
                        <p>
                            {artist.quote}
                        </p>
                    </div>
                </div></div>);
    };
    return (
        <CustomModal
            show={show}
            setShow={setShow}
            content={content}
            modalHeaderText={'Artist Bio'}
        >
            {" "}
            { }
        </CustomModal>
    );
};