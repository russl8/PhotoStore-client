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
    username: z.string().min(1, {
        message: "Title cannot be blank.",
    }),
    password: z.string().min(1, {
        message: "Title cannot be blank.",
    })
})

const SignUpForm: React.FC<imageFormProps> = ({ backendUrl }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
    })



    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("username", username);
        formData.append("password", password);

        try {
            const response = await fetch(`${backendUrl}photo`, {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                navigate("/");
            } else {
                alert("Title and image fields must not be blank.");
            }
        } catch (error) {
            alert("Error occurred while uploading.");
        }
    };


    return (
        <div className="flex flex-col items-center p-4 pt-8 w-[100vw] sm:pl-[75px] sm:flex-row sm:justify-around  sm:items-start">
            <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-8 w-[250px]">
                    <div className="flex flex-row">
                        <Button className="mr-4" variant="outline" size="icon" onClick={() => { navigate("/") }} >
                            <FontAwesomeIcon icon={faArrowLeft} className="text-black cursor-pointer" />
                        </Button>
                        <p className="font-bold text-2xl mb-6">Sign Up</p>
                    </div>

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        value={password}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Sign Up</Button>
                </form>
            </Form>



        </div>
    );
};

export default SignUpForm;
