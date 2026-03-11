"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signUpSchema} from "@/app/schemas/auth";
import {Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,} from "@/components/ui/field";
  import {z} from "zod"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { Loader2 } from "lucide-react"
export default function CardDemo() {
  const [isPending,startTransition]=useTransition();
  const router=useRouter();
  const form =useForm({
      resolver: zodResolver(signUpSchema),
      mode: "onSubmit", 
    defaultValues:{
        email:"",
        name:"",
        password:"",
    }
  })
 async function onSubmit(data:z.infer<typeof signUpSchema>){

   startTransition(async()=>{

     await authClient.signUp.email({
       email:data.email,
       name:data.name,
       password:data.password,
       fetchOptions:{
                                onSuccess:()=>{
                                  toast.success("Account created successfully")
                                  router.push('/');
                                },
                                onError:(error)=>{
                                  toast.error(error.error.message);
                                }
                              }
                            })
      })
  }
  return (
    <Card className="w-full max-w-sm"> 
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Enter your details to register your account 
        </CardDescription>
        {/* <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction> */}
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
         <FieldGroup>
            <Controller

              name="name"
              control={form.control}
              render={({field,fieldState})=>(
                
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input aria-invalid={fieldState.invalid}   placeholder="John Doe" {...field}/>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>

              )}
            
            />
             <Controller

              name="email"
              control={form.control}
              render={({field,fieldState})=>(
                
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input aria-invalid={fieldState.invalid}  placeholder="John@Doe.com" {...field}/>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}/>
                  )}
                </Field>

              )}
            
            />
             <Controller

              name="password"
              control={form.control}
              render={({field,fieldState})=>(
                
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input aria-invalid={fieldState.invalid}   placeholder="******" {...field}/>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}/>
                  )}
                </Field>

              )}
            
            />
            <Button disabled={isPending}>{isPending?(
                <>
                    <Loader2 className="size-4 animate-spin"/>
                    <span>Loading...</span>
                </>
            ):(
                <span>SignUp</span>
            )}
            </Button>
         </FieldGroup>
        </form>
      </CardContent>
     
    </Card>
  )
}
