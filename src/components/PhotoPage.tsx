import React from "react"
import { useParams } from "react-router-dom";

const PhotoPage = () => {
    const params = useParams();
    const [imageSrc, setImageSrc] = React.useState("");
    const [imageTitle, setImageTitle] = React.useState("");

    React.useEffect(() => {
        // Fetch backend to get photo with the specified id
        fetch(`http://localhost:8080/photo/${params.id}`)
            .then(response => response.json())
            .then(data => {
                // Assuming the backend returns a JSON object with an 'image' property
                const imageData = data.image;
                setImageTitle(data.title);
                setImageSrc(`data:imadwge/jpeg;base64,${imageData}`);
                console.log(typeof(imageData));
            })
            .catch(error => {
                console.error("Error fetching photo:", error);
            });
    }, [params.id]);

    return (
        <div>
            {imageTitle}
            <img src={imageSrc} alt="Photo" />

        </div>
    );
}

export default PhotoPage;