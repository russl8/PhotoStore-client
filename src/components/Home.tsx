import React from "react"
import HomeSidebar from "./HomeSidebar";
import HomeHeader from "./HomeHeader";
import PhotoDisplay from "./PhotoDisplay";

interface homeProps {
    backendUrl: string;
}
let tempUsername
const Home: React.FC<homeProps> = ({ backendUrl }) => {
    const [allPhotos, setAllPhotos] = React.useState<any[]>([]);

    React.useEffect(() => {
        tempUsername = localStorage.getItem("username");
        // see if user exists in db. if so, fetch all photos by user.
        if (tempUsername !== null || tempUsername !== "") {
            fetch(`${backendUrl}${tempUsername}`)
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('username', data.userName);
                    localStorage.setItem('userid', data.userId);
                    fetchPhotos();
                    console.log("hi");
                })
                .catch(error => {
                    localStorage.setItem('username', "");
                    localStorage.setItem('userid', "");
                    window.location.href = "/sign-up"
                });
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[backendUrl]);

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