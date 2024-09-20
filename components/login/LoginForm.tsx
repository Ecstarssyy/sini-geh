import * as React from "react";
import { FirebaseError } from "@firebase/util";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/passwordInput";
import { LoadingIcon } from "../loading/LoadingIcon";

export interface PasswordFormValue {
  email: string;
  password: string;
}

interface PasswordFormProps
  extends Omit<JSX.IntrinsicElements["form"], "onSubmit"> {
  loading: boolean;
  onSubmit: (value: PasswordFormValue) => void;
  disabled?: boolean;
  error?: FirebaseError;
}
export function LoginForm({
  children,
  loading,
  disabled,
  error,
  onSubmit,
  ...props
}: PasswordFormProps) {
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    const data: PasswordFormValue = {
      email: values.email,
      password: values.password,
    };

    onSubmit(data);
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        {...props}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  required
                  {...field}
                  type="email"
                  placeholder="Email address"
                  disabled={disabled}
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
                <PasswordInput
                  required
                  {...field}
                  placeholder="Password"
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <FormMessage className="text-red-500" role="alert">
            {error.message}
          </FormMessage>
        )}
        {loading ? (
          <LoadingIcon className="w-full" />
        ) : (
          <Button type="submit" className="w-full">
            Submit
          </Button>
        )}
      </form>
    </FormProvider>
  );
}
