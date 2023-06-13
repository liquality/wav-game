
import { CustomModal } from "../../components/Modal";

export const ArtistBioModal = (props) => {
    const { show, setShow, artist, image } = props;
    const content = () => {
        return (
        <div className="flex mt-5">
            <div className="flex grow-0 w-[1.25rem]">
            <img className="mt-" src={image} alt="" />
            </div>
            <div className="flex justify-center items-center margin-auto">{artist.name}</div>
        </div>);
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