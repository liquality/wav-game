
import { CustomModal } from "../../components/Modal";

export const ArtistBioModal = (props) => {
    const { show, setShow, artist } = props;
    const content = () => {
        return (<div>{artist.name}</div>);
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