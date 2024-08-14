"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILesson } from "@/database/lesson.model";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  slug: z.string().optional(),
  duration: z.number().optional(),
  videoUrl: z.string().optional(),
  content: z.string().optional(),
});

const LessonItemUpdate = ({ lesson }: { lesson: ILesson }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: lesson.slug || "",
      duration: lesson.duration || 0,
      videoUrl: lesson.video_url || "",
      content: lesson.content || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn</FormLabel>
                <FormControl>
                  <Input placeholder="bai-1-tong-quan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thời lượng</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập thời lượng bài học"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="MUX"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="col-start-1 col-end-3">
                <FormLabel>Nội dung</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Khóa học hướng dẫn từ A-Z"
                    {...field}
                    className="h-[200px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end  items-center gap-5">
          <Button type="submit">Cập nhật</Button>
          <Link href="/" className="text-sm text-slate-600">
            Xem trước
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LessonItemUpdate;
