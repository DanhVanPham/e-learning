"use client";
import { IconSend } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "@/lib/actions/comment.actions";
import { TCreateCommentParams } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  content: z.string().min(1, "Nội dung phải được nhập"),
});

const ReplyForm = ({
  parentId,
  userId,
  lessonId,
}: {
  parentId: string;
  userId: string;
  lessonId: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const params: TCreateCommentParams = {
          parentId: parentId,
          content: values.content,
          lesson: lessonId,
          user: userId,
        };
        await createComment(params);
        toast.success("Phản hồi bình luận thành công");
      } catch (error) {
        console.log(error);
        toast.error("Phản hồi bình luận thất bại!");
      } finally {
        form.reset();
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div className="mt-2 mx-2 relative">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl className="relative">
                  <div>
                    <Textarea
                      placeholder="Nhập trả lời của bạn"
                      className="min-h-[50px] pr-8"
                      {...field}
                    />
                    <button
                      className="absolute right-1 top-[50%] translate-y-[-50%] ml-auto"
                      disabled={isPending}
                    >
                      <IconSend className="size-5 text-primary" />
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default ReplyForm;
