import React, { Fragment } from "react"
import PhotoCard from "./PhotoCard";
import { nanoid } from "nanoid";
import ImageForm from "./ImageForm";
import PhotoModal from "./PhotoModal";

interface homeProps {
    backendUrl: string;
}


/**
 * 
 * @param param0 
 * @returns 
 */
const Home: React.FC<homeProps> = ({ backendUrl }) => {
    const [allPhotos, setAllPhotos] = React.useState<any[]>([]);

    //fetch photos again to display updated photos after addition/deletion
    const fetchPhotos = () => {
        fetch(backendUrl + `photo/all`)
            .then(response => response.json())
            .then(data => {
                setAllPhotos(data);
            })
            .catch(error => {
                console.error("Error fetching photo:", error);
            });
    }

    const removePhoto = (imageId: String) => {
        for (let photo of allPhotos) {
            if (photo.body.photoId === imageId) {
                photo = null;
                fetchPhotos();
            }
        }
    }

    React.useEffect(() => {
        // Fetch backend to get photo with the specified id
        fetchPhotos();
    }, []);


    return (
        <Fragment>
            <div>
                {allPhotos.map(photo => (
                    <PhotoCard
                        key={nanoid()}
                        imageSrc={`data:imadwge/jpeg;base64,${photo.body.image}`}
                        title={photo.body.title}
                        imageId={photo.body.photoId}
                        backendUrl={backendUrl}
                        removePhoto={removePhoto}
                    />

                ))}
                <ImageForm
                 backendUrl={backendUrl}
                 fetchPhotos={fetchPhotos}
                  />

            </div>
        </Fragment>

    );
}

export default Home;