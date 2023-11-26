import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomeHeader = () => {
    return (
        <div className="flex items-center w-[100vw] h-[50px] bg-slate-50">
                <div className="flex justify-center items-center text-xl mx-4 cursor-pointer">
                    <FontAwesomeIcon icon={faImages} className="h-[25px] mr-2 " />
                    <p className=" font-semibold">PhotoStore</p>
                </div>
        </div>
    );
}

export default HomeHeader;