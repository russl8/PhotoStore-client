import React from "react"
import PhotoCard from "./PhotoCard";
import {nanoid} from "nanoid";

const Home = () => {
    //fetch all posts for now 
    //LATER: ALL POSTS BY SIGNED IN USER
    //then display
    const [allPhotos, setAllPhotos] = React.useState<any[]>([]);

    React.useEffect(() => {
        // Fetch backend to get photo with the specified id
        fetch(`http://localhost:8080/photo/all`)
            .then(response => response.json())
            .then(data => {
                setAllPhotos(data);
                for (let photo of data) {
                    // console.log(photo.body);
                }
            })
            .catch(error => {
                console.error("Error fetching photo:", error);
            });
    }, []);



    return (
        <div>
            {allPhotos.map(photo => (
                <PhotoCard
                    key={nanoid()}
                    imageSrc={`data:imadwge/jpeg;base64,${photo.body.image}`}
                    title={photo.body.title} />
            ))}

        </div>
    );
}

export default Home;