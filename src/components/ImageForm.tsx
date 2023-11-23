import React, { useState, ChangeEvent, FormEvent } from "react";

interface imageFormProps {
    backendUrl: string;
}

const ImageForm: React.FC<imageFormProps> = ({ backendUrl }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [title, setTitle] = useState<string>("");
    const [userid, setUserid] = useState<string>("6552e9e91bf5e44bccb5b5f8");

    //change the selected image
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedImage(file);
        }
    };

    //handle image submit
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!selectedImage || !title) {
            console.error("Please select an image and provide a title");
            return;
        }
        const formData = new FormData();

        //TODO: get current userid.
        formData.append("userid", userid);
        formData.append("title", title);
        formData.append("image", selectedImage);

        try {
            const response = await fetch(`${backendUrl}photo`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                console.log("Image, title, and userid uploaded successfully");
            } else {
                console.error("Failed to upload image, title, and userid");
            }
        } catch (error) {
            console.error("Error occurred while uploading", error);
        }
    };


    return (
        <div>
            <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
                {selectedImage && (
                    <div>
                        <img
                            alt="not found"
                            width={"250px"}
                            src={URL.createObjectURL(selectedImage)}
                        />
                        <br />
                    </div>
                )}
                <br />
                <br />
                <input
                    type="text"
                    className="border-black border-2"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleImageChange}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ImageForm;
