"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import slugify from "slugify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createCourse } from "@/lib/actions/course.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IUser } from "@/database/user.model";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateUser } from "@/lib/actions/user.actions";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { IconCancel } from "@/components/icons";

const formSchema = z.object({
  name: z.string().min(1, "Tên phải được nhập"),
  username: z.string().min(1, "Username phải được nhập"),
  email: z.string().min(1, "Email phải được nhập"),
  bio: z.string().optional(),
  avatar: z.string().optional(),
});

const ProfileForm = ({ user }: { user: IUser }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      email: user.email || "",
      bio: user.bio || "",
      avatar: user.avatar || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const res = await updateUser({
        id: user._id.toString(),
        updateData: values,
        path: "/profile",
      });

      toast.success("Cập nhật thông tin thành công");
      if (res?.data) {
        router.push(`/profile`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div>
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div
                    className="h-[120px] w-[120px] bg-white rounded-full border border-gray-50
                    flex items-center justify-center relative mx-auto
                    "
                  >
                    {!field.value ? (
                      <UploadButton
                        endpoint="imageUploader"
                        className="invisible-upload-btn"
                        onClientUploadComplete={(res) => {
                          field.onChange(res[0].url);
                        }}
                        onUploadError={(error: Error) => {
                          console.error(`ERROR! ${error.message}`);
                        }}
                      />
                    ) : (
                      <>
                        <Image
                          alt="avatar user"
                          src={field.value || ""}
                          fill
                          className="object-cover w-full h-full rounded-full"
                        />
                        <button
                          type="button"
                          className="absolute bottom-[6px] right-[6px] size-5 border borderDarkMode bg-white rounded-full text-center flex justify-center items-center"
                          onClick={() => field.onChange("")}
                        >
                          <IconCancel className="size-3 text-red-500" />
                        </button>
                      </>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-8 mb-8 mt-10">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input placeholder="Danh pham" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="danh_pham" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="danhskipper@gmail.com"
                    disabled
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className="w-[120px]"
          >
            Cập nhật
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
