interface PhotoCardProps {
    imageSrc: string,
    title: string
}

const PhotoCard: React.FC<PhotoCardProps> = ({ title, imageSrc }) => {
    return (
        <div className = "flex flex-col w-[250px]  justify-center rounded-lg mx-4 my-4 px-2 py-4 bg-slate-200 hover:bg-gray-300">
            <div className="text-md font-semibold pb-4">{title}</div>


            <div className="overflow-hidden w-full">
                <img className="w-full rounded-md h-[100px]" alt={title} src={imageSrc} />

            </div>

        </div>
    );
}

export default PhotoCard;