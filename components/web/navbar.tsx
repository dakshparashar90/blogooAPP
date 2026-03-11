"use client"
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import {ThemeToggle} from "@/components/ui/theme-toggle"
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function Navbar(){
    const{isAuthenticated,isLoading}=useConvexAuth();
    const router=useRouter();
    return (
        <nav className="w-full py-5 flex items-center justify-between">
            <div className="flex items-center gap-6 " >
                <Link href="/">
                    <h1 className="text-2xl py-2" >
                        Next<span className="text-3xl font-bold text-blue-500"  >Pro</span>
                    </h1>
                </Link>

                <Link href="/">
                    About
                </Link>
                <Link href="/">
                    Contact 
                </Link>
            </div>
            <div className="flex items-center gap-6 mr-1" >
                {isLoading ? null : isAuthenticated ?(
                    <Button onClick={()=>{
                        authClient.signOut({
                            fetchOptions:{
                                onSuccess:()=>{
                                    toast.success("Logged out successfully")
                                    router.push('/');
                                },
                                onError:(error)=>{
                                    toast.error(error.error.message);
                                }
                            }
                        })
                    }}>Logout</Button>
                ):
                (

                    <><Link href="/auth/sign-up" className={buttonVariants()}>
                            SignUp
                        </Link><Link href="/auth/login" className={buttonVariants({ variant: "secondary" })}>
                                SignIn
                            </Link>
                            </>
            )}
            <ThemeToggle />
            </div>

        </nav>
    )
}