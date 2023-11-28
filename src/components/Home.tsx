import React from "react"
import HomeSidebar from "./HomeSidebar";
import HomeHeader from "./HomeHeader";
import PhotoDisplay from "./PhotoDisplay";
import { useNavigate } from "react-router-dom";

interface homeProps {
    backendUrl: string;
}
let tempUsername
const Home: React.FC<homeProps> = ({ backendUrl }) => {
    const [allPhotos, setAllPhotos] = React.useState<any[]>([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        //check if user exists in local storage.
        tempUsername = localStorage.getItem("username");

        // see if user exists in db.
        if (tempUsername !== null) {
            fetch(`${backendUrl}${tempUsername}`)
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('username', data.userName);
                    localStorage.setItem('userid', data.userId);
                })
                .catch(error => {
                    localStorage.setItem('username', "");
                    localStorage.setItem('userid', "");
                    navigate("/sign-up")
                });
        }

    }, [])



    React.useEffect(() => {
        //TODO:  fetch photos of USER.
        fetchPhotos();
    }, []);
    const fetchPhotos = () => {
        fetch(backendUrl + `user/${localStorage.getItem('userid')}`)
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
                <PhotoDisplay backendUrl={backendUrl} allPhotos={allPhotos} fetchPhotos={fetchPhotos} />
            </div>
        </>

    );
}

export default Home;