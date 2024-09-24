"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
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

const CommentForm = ({
  userId,
  lessonId,
}: {
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
          content: values.content,
          lesson: lessonId,
          user: userId,
        };
        console.log(params);
        await createComment(params);
        toast.success("Tạo bình luận thành công");
      } catch (error) {
        console.log(error);
        toast.error("Tạo bình luận thất bại!");
      } finally {
        form.reset();
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div className="flex flex-col gap-5 mt-10">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Nhập bình luận của bạn"
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-[140px] ml-auto"
            isLoading={isPending}
          >
            Đăng bình luận
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommentForm;
