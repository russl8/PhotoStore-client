import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface photoModalProps {
    isVisible: boolean;
    onClick: () => void;
    imageTitle: string;
    imageSrc: string;
}

const PhotoModal: React.FC<photoModalProps> = ({ isVisible, imageSrc, onClick, imageTitle }) => {
    const [zoomLevel, setZoomLevel] = useState(1);

    useEffect(() => {
        setZoomLevel(1);
    }, [isVisible]);

    if (!isVisible) return null;

    const handleZoomIn = () => {
        setZoomLevel((prevZoom) => Math.min(prevZoom + 0.25, 3));
    };

    const handleZoomOut = () => {
        setZoomLevel((prevZoom) => Math.max(prevZoom - 0.25, 0.25));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80" onClick={onClick}>
            <div className="relative h-full flex flex-col justify-center items-center">
                {/* IMAGE */}
                <div className="flex items-center justify-center h-full">
                    <img
                        alt={imageTitle}
                        src={imageSrc}
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-full max-h-full"
                        style={{ transform: `scale(${zoomLevel})` }}
                    />
                </div>

                {/* HEADER */}
                <div
                    className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-black bg-opacity-40"
                    onClick={(e) => e.stopPropagation()}
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="text-white cursor-pointer mr-8" onClick={onClick} />
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faImage} className="text-red-600 h-5 mr-2" />
                        <div className="text-md font-semibold text-white">{imageTitle}</div>
                    </div>
                    <div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleZoomIn();
                            }}
                            className="text-white mr-2"
                        >
                            Zoom In
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleZoomOut();
                            }}
                            className="text-white"
                        >
                            Zoom Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoModal;
