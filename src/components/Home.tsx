import React, { Fragment } from "react"
import PhotoCard from "./PhotoCard";
import { nanoid } from "nanoid";
import ImageForm from "./ImageForm";
import PhotoModal from "./PhotoModal";
import HomeSidebar from "./HomeSidebar";
import HomeHeader from "./HomeHeader";

interface homeProps {
    backendUrl: string;
}

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
        <>
            <HomeHeader />

            <div className="flex flex-row h-full bg-slate-50">
                <HomeSidebar />

                <div className="flex flex-col w-full  p-4 my-2 bg-white rounded-xl">
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

                    <ImageForm
                        backendUrl={backendUrl}
                        fetchPhotos={fetchPhotos}
                    />
                </div>
            </div>
        </>

    );
}

export default Home;