import React from "react";
import PhotoCard from "./PhotoCard";
import { nanoid } from "nanoid";

interface photoDisplayProps {
    backendUrl: string;
    fetchPhotos: () => void;
    allPhotos: any[];
}


const PhotoDisplay: React.FC<photoDisplayProps> = ({ backendUrl, fetchPhotos, allPhotos }) => {
    const removePhoto = (imageId: String) => {
        for (let photo of allPhotos) {
            if (photo.body.photoId === imageId) {
                photo = null;
                fetchPhotos();
            }
        }
    }
    return (
        <div className="flex flex-col w-full  p-4 my-2 bg-white rounded-xl">
            <p className="  mb-4 text-2xl font-semibold">Welcome, {localStorage.getItem("username")}</p>
            <div className="grid grid-cols-auto-fill gap-0">
                {allPhotos.map(photo => (
                    <PhotoCard
                        key={nanoid()}
                        imageSrc={`data:image/jpeg;base64,${photo.body.image}`}
                        title={photo.body.title}
                        imageId={photo.body.photoId}
                        backendUrl={backendUrl}
                        removePhoto={removePhoto}
                    />
                ))}
            </div>


        </div>

    );
}



export default PhotoDisplay;