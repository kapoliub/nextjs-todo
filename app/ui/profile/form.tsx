// "use client";

// import { Button } from "@heroui/button";
// import { Input } from "@heroui/input";
// import { Card, CardBody } from "@heroui/card";
// import { FormEvent, useState, ChangeEvent } from "react";
// import z from "zod";
// import { addToast } from "@heroui/toast";
// import { redirect } from "next/navigation";

// import PasswordInput from "./password-input";

// import { type AuthState } from "@/lib/actions/auth";
// import { syncTodosWithDB } from "@/lib/actions/todos";
// import {
//   clearTodosFromLocalStorage,
//   getStoredTodosFromLocalStorage,
// } from "@/lib/helpers/localstorage";
// import { PATHS } from "@/lib/paths";

// interface AuthFormErrors {
//   email?: string[];
//   password?: string[];
//   confirmPassword?: string[];
// }

// interface AuthFormProps {
//   type: "signup" | "login";
//   onSubmit: (data: AuthState) => Promise<{ message: string }>;
// }

// type InputComponent = "input" | "passwordInput";

// type InputsList = {
//   label: string;
//   name: keyof AuthFormErrors;
//   component: InputComponent;
// }[];

// const passwordSchema = z
//   .string()
//   .min(8, "Password must be at least 8 characters long")
//   .max(32, "Password cannot exceed 32 characters")
//   .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//   .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//   .regex(/[0-9]/, "Password must contain at least one number")
//   .regex(
//     /[^A-Za-z0-9]/,
//     "Password must contain at least one special character",
//   );

// const inputs: InputsList = [
//   {
//     label: "Email",
//     name: "email",
//     component: "input",
//   },
//   {
//     label: "Password",
//     name: "password",
//     component: "passwordInput",
//   },
//   {
//     label: "Confirm Password",
//     name: "confirmPassword",
//     component: "passwordInput",
//   },
// ];

// export default function AuthForm({ type, onSubmit }: AuthFormProps) {
//   return (
//     <Card className="min-w-[300px]">
//       <CardBody>
//         <form
//           autoComplete="off"
//           className="flex flex-col gap-4 p-1"
//           onSubmit={handleSubmit}
//         >
//           {inputs.map(({ component, label, name }) => {
//             const Component = InputComponents[component];
//             const isConfirmPassword = name === "confirmPassword";

//             if (!isSignUpForm && isConfirmPassword) return null;

//             return (
//               <Component
//                 key={label}
//                 required
//                 autoComplete={name}
//                 disabled={isLoading}
//                 errorMessage={() => (
//                   <ul>
//                     {errors?.[name]?.map((error) => (
//                       <li key={error}>{error}</li>
//                     ))}
//                   </ul>
//                 )}
//                 isInvalid={!!errors?.[name]?.[0]}
//                 label={label}
//                 labelPlacement="outside-top"
//                 name={name}
//                 type={isConfirmPassword ? "password" : name}
//                 onChange={clearError}
//               />
//             );
//           })}
//           <Button disabled={isLoading} type="submit">
//             {isSignUpForm ? "Sign Up" : "Login"}
//           </Button>
//         </form>
//       </CardBody>
//     </Card>
//   );
// }
