import React, { useState, ChangeEvent, FormEvent } from "react";
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "../@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../@/components/ui/form"
import { Input } from "../@/components/ui/input"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


interface imageFormProps {
    backendUrl: string;
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title cannot be blank.",
    }),
    photo: z
        .any()
        .refine((file) => file === null, "Must include a file.")
})

const ImageForm: React.FC<imageFormProps> = ({ backendUrl }) => {
    React.useEffect(() => {
        let tempUsername = localStorage.getItem("username");
        // see if user exists in db.
        if (tempUsername !== null) {
            fetch(`${backendUrl}${tempUsername}`)
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('username', data.userName);
                    localStorage.setItem('userid', data.userId);
                })
                .catch(error => {
                    localStorage.setItem('username', "");
                    localStorage.setItem('userid', "");
                    window.location.href = "/sign-up"
                });
        }

    }, [])

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [title, setTitle] = useState<string>("");
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
    })


    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedImage(file);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!(selectedImage && title)) {
            alert("Please select an image and title");
            return;
        }
        const formData = new FormData();

        //TODO: get current userid.


        formData.append("userid", localStorage.getItem('userid') ?? '');
        formData.append("title", title);
        formData.append("image", selectedImage);

        try {
            const response = await fetch(`${backendUrl}photo`, {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                navigate("/");
            } else {
                alert("Username and password fields must not be blank.");
            }
        } catch (error) {
            alert("Error occurred while signing up .");
        }
    };


    return (
        <div className="flex flex-col items-center p-4 pt-8 w-[100vw]">
            <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-8 w-[250px]">
                    <div className="flex flex-row">
                        <Button className="mr-4" variant="outline" size="icon" onClick={() => { navigate("/") }} >
                            <FontAwesomeIcon icon={faArrowLeft} className="text-black cursor-pointer" />
                        </Button>
                        <p className="font-bold text-2xl mb-6">Upload Image</p>
                    </div>

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
                                        className="hover:bg-gray-300 "
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
                    <Button type="submit">Upload</Button>
                </form>
            </Form>

            {/* small screen image preview */}
            <div className="sm:hidden">
                {selectedImage && (
                    <div>
                        <img
                            className=" mt-4 h-[200px] max-w-[250px] border-slate-900 border-2"
                            alt="not found"
                            src={URL.createObjectURL(selectedImage)}
                        />
                        <br />
                    </div>
                )}
            </div>

            {/* large screen image preview */}
            <div className="hidden sm:block align-middle">
                {selectedImage && (
                    <div>
                        <img
                            className=" mt-4 max-h-[350px] max-w-[750px] border-slate-900 border-2"
                            alt="not found"
                            src={URL.createObjectURL(selectedImage)}
                        />
                        <br />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageForm;
