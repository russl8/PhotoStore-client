import React, { Fragment } from "react"
import PhotoCard from "./PhotoCard";
import { nanoid } from "nanoid";
import ImageForm from "./ImageForm";
import PhotoModal from "./PhotoModal";

interface homeProps {
    backendUrl: string;
}


const Home: React.FC<homeProps> = ({ backendUrl }) => {
    const [allPhotos, setAllPhotos] = React.useState<any[]>([]);


    React.useEffect(() => {
        // Fetch backend to get photo with the specified id
        fetch(backendUrl + `photo/all`)
            .then(response => response.json())
            .then(data => {
                setAllPhotos(data);
            })
            .catch(error => {
                console.error("Error fetching photo:", error);
            });
    }, []);


    return (
        <Fragment>

            <div>
                {allPhotos.map(photo => (
                    <PhotoCard
                        key={nanoid()}
                        imageSrc={`data:imadwge/jpeg;base64,${photo.body.image}`}
                        title={photo.body.title} 
                        />
                        
                ))}
                <ImageForm backendUrl={backendUrl} />

            </div>
        </Fragment>

    );
}

export default Home;