"use client";
import React, { useState } from "react";
import Form from "./Form";
import { handleForget } from "@/actions/auth/handlers/handleForget";
import { useRouter } from "next/navigation";

const ForgetPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    let response = await handleForget({...formData, provider:"credentials"});
    if (response) {
      
      if (response.success) {
        setSuccess(true);
        setError(false);
        setIsLoading(false);
        router.push(`/auth/code?email=${formData?.email}&process=reset`);
      } else {
        setSuccess(false);
        setError(true);
        setIsLoading(false);
      }
      if (response.message) {
        setMessage(response.message);
      }
    } else {
      setIsLoading(false);
    }
  };

  const forgetPasswordFields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "abc@gmail.com", 
      required: true,
    },
    
  ];

  return (
    <div className=" w-full">
      {/* Forget Password Form */}
      <Form
        title="Recover Your Account"
        description="Provide your email to regain access."
        buttonText="Send code"
        onSubmit={handleFormSubmit}
        fields={forgetPasswordFields}
        error={error}
        success={success}
        message={message}
        footerText="Already Remembered?"
        footerLinkText="Sign In"
        footerLinkHref="/auth/signin"
        isLoading={isLoading}
      />
    </div>
  );
};

export default ForgetPassword;
