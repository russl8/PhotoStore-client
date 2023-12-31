import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import PhotoModal from './PhotoModal';
import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface PhotoCardProps {
    imageSrc: string,
    title: string,
    imageId: string,
    backendUrl: string;
    removePhoto: (imageId: string) => void
}
const PhotoCard: React.FC<PhotoCardProps> = ({ title, imageSrc, imageId, backendUrl, removePhoto }) => {
    const [showModal, setShowModal] = React.useState(false);
    const handleDeleteImage = (e: any) => {
        e.stopPropagation();
        fetch(`${backendUrl}photo/${imageId}`, { method: "DELETE" })
            .then(res => {
                if (res.ok) {
                    alert("Photo " + imageId + " deleted.")
                    //remove photo from the photos array to invoke page refresh   
                    removePhoto(imageId);
                }
            })
            .catch(e => {
                alert("Photo could not be deleted.")
            })
    }

    return (
        <>
            <div
                className="flex flex-col w-[225px] justify-center rounded-lg px-2 py-4 mb-4 bg-slate-200 hover:bg-gray-300 hover:cursor-pointer"
                onClick={() => setShowModal(!showModal)} >

                <div className ="flex justify-between items-center pb-4">
                    <div className="flex items-center text-centerborder-4 ">
                        <FontAwesomeIcon icon={faImage} className=" text-red-600 h-5 mr-2" />
                        <div className="text-md font-semibold ">{title}</div>
                    </div>
                    <FontAwesomeIcon className =""icon={faTrash} onClick={handleDeleteImage} />
                </div>

                <div className="overflow-hidden w-full">
                    <img className="w-full rounded-md h-[120px]" alt={title} src={imageSrc} />
                </div>

            </div>
            <PhotoModal
                onClick={() => setShowModal(!showModal)}
                isVisible={showModal}
                imageSrc={imageSrc}
                imageTitle={title}
            />

        </>

    );
}

export default PhotoCard;