import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HomeHeader = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.setItem('username', "");
          localStorage.setItem('userid', "");
          navigate("sign-up")
    }
    return (
        <div className="flex items-center w-[100vw] h-[50px] bg-slate-50">
                <div className="flex justify-center items-center text-xl mx-4 cursor-pointer">
                    <FontAwesomeIcon icon={faImages} className="h-[25px] mr-2 " />
                    <p className=" font-semibold">PhotoStore</p>
                </div>

                <Button onClick = {handleSignOut}>Sign Out</Button>
        </div>
    );
}

export default HomeHeader;