import React, { useState } from "react";
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "../@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../@/components/ui/form"
import { Input } from "../@/components/ui/input"
import { useNavigate } from "react-router-dom";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface imageFormProps {
    backendUrl: string;

}

const formSchema = z.object({
    username: z.string().min(1, {
        message: "Title cannot be blank.",
    }),
})

const SignUpForm: React.FC<imageFormProps> = ({ backendUrl }) => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [username, setUsername] = useState<string>("");
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
    })
    const onLogin = async (e: any) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", username);

        fetch(`${backendUrl}${username}`)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('username', data.userName);
                localStorage.setItem('userid', data.userId);
                navigate("/")

            })
            .catch(error => {
                alert("User does not exist.")
            });
    }

    const onRegister = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", username);
        fetch(`${backendUrl}`, {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('username', data.userName);
                localStorage.setItem('userid', data.userId);
                navigate("/")
            })
            .catch(error => {
                alert("A problem occurred with creating user.")
            });

    }


    return (
        <div className="flex flex-col items-center p-4 pt-8 w-[100vw] sm:pl-[75px] sm:flex-row sm:justify-around  sm:items-start">


            <Form {...form}>
                <form className="space-y-8 w-[250px]" >
                    <div className="flex justify-center items-center text-xl mx-4 cursor-pointer">
                        <FontAwesomeIcon icon={faImages} className="h-[25px] mr-2 " />
                        <p className=" font-semibold">PhotoStore</p>
                    </div>
                    <p className="text-center text-sm">Log in to continue.</p>

                    <div className="flex flex-row">
                        <Button variant={isLogin ? `default` : "outline"} onClick={() => setIsLogin(true)} className="flex w-full mr-1" type="button">Login</Button>
                        <Button variant={isLogin ? `outline` : "default"} onClick={() => setIsLogin(false)} className="flex w-full ml-1" type="button" >Register</Button>
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
                    <Button type="button" onClick={isLogin ? (e) => onLogin(e) : (e) => onRegister(e)}>
                        {isLogin ? "Login" : "Register"}
                    </Button>
                </form>
            </Form>



        </div>
    );
};

export default SignUpForm;
