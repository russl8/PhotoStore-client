import React from "react"
import HomeSidebar from "./HomeSidebar";
import HomeHeader from "./HomeHeader";
import PhotoDisplay from "./PhotoDisplay";

interface homeProps {
    backendUrl: string;
}

const Home: React.FC<homeProps> = ({ backendUrl }) => {
    const [allPhotos, setAllPhotos] = React.useState<any[]>([]);
    React.useEffect(() => {
        //TODO:  fetch photos of USER.
        fetchPhotos();
    }, []);
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

    return (
        <>
            <HomeHeader />
            <div className="flex flex-row h-full bg-slate-50">
                <HomeSidebar />
                <PhotoDisplay backendUrl={backendUrl} allPhotos={allPhotos} fetchPhotos={ fetchPhotos}/>
            </div>
        </>

    );
}

export default Home;