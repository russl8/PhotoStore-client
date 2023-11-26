import React from "react"
import HomeSidebar from "./HomeSidebar";
import HomeHeader from "./HomeHeader";
import PhotoDisplay from "./PhotoDisplay";

interface homeProps {
    backendUrl: string;
}

const Home: React.FC<homeProps> = ({ backendUrl }) => {

    return (
        <>
            <HomeHeader />
            <div className="flex flex-row h-full bg-slate-50">
                <HomeSidebar />
                <PhotoDisplay backendUrl={backendUrl} />
            </div>
        </>

    );
}

export default Home;