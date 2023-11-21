interface PhotoCardProps {
    imageSrc: string,
    title: string
}

const PhotoCard: React.FC<PhotoCardProps> = ({ title, imageSrc }) => {
    return (
        <div>
            {title}
            <img alt={title} src={imageSrc} />
        </div>
    );
}

export default PhotoCard;