import React, { useState, ChangeEvent, FormEvent } from "react";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


import { Button } from "../@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../@/components/ui/form"
import { Input } from "../@/components/ui/input"


const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title cannot be blank.",
    }),
    photo: z
        .any()
        .refine((file) => file === null, "Must include a file.")
})


interface imageFormProps {
    backendUrl: string;
    fetchPhotos: () => void;
}

const ImageForm: React.FC<imageFormProps> = ({ backendUrl, fetchPhotos }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [title, setTitle] = useState<string>("");
    const [userid, setUserid] = useState<string>("6552e9e91bf5e44bccb5b5f8");

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })


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
        if (!(selectedImage && title)) {
            alert("Please select an image and title");
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
                alert("Image, title, and userid uploaded successfully");
                //update displayed photos
                fetchPhotos();
            } else {
                alert("Failed to upload image, title, and userid");
            }
        } catch (error) {
            alert("Error occurred while uploading");
        }
    };


    return (
        <>
            <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-8 w-[250px]">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />

                                </FormControl>
                                {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="photo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Photo</FormLabel>
                                <FormControl>
                                    <Input
                                        className ="hover:bg-gray-300 "
                                        type="file"
                                        accept="image/*"
                                        name="image"
                                        onChange={handleImageChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
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
                </form>
            </Form>
        </>
    );
};

export default ImageForm;
