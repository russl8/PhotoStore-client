
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../@/components/ui/button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


const HomeSidebar = () => {
    return (
        <div className="bg-slate-50 h-[100vh] w-[250px]  hidden md:block px-4">

            <Button className="flex">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Photo
            </Button>
        </div>

    );
}

export default HomeSidebar;