"use client";

import React, { useRef } from "react";
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
import { Editor } from "@tinymce/tinymce-react";
import { editorOptions } from "@/constants";
import { useTheme } from "next-themes";
import { TUpdateLessonParams } from "@/types";
import slugify from "slugify";
import { updateLesson } from "@/lib/actions/lesson.actions";
import { toast } from "react-toastify";

const formSchema = z.object({
  slug: z.string().optional(),
  duration: z.number().optional(),
  videoUrl: z.string().optional(),
  content: z.string().optional(),
});

const LessonItemUpdate = ({ lesson }: { lesson: ILesson }) => {
  const { theme } = useTheme();
  const editorRef = useRef<any>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: lesson.slug || "",
      duration: lesson.duration || 0,
      videoUrl: lesson.video_url || "",
      content: lesson.content || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const bodyData: TUpdateLessonParams = {
        lessonId: lesson._id,
        updateData: {
          slug:
            values.slug ||
            slugify(lesson.title, {
              lower: true,
              locale: "vi",
              remove: /[*+~.()'"!:@]/g,
            }),
          duration: values.duration,
          video_url: values.videoUrl,
          content: values.content,
        },
        path: "/manage/course/update-content",
      };
      const res = await updateLesson(bodyData);

      if (res?.success) {
        toast.success("Cập nhật bài học thành công");
      }
    } catch (error) {
      console.log(error);
    }
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
                  <Input placeholder="MUX" {...field} />
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
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
                    onInit={(_evt, editor) => {
                      (editorRef.current = editor).setContent(
                        lesson.content || ""
                      );
                    }}
                    value={field.value}
                    {...editorOptions(field, theme)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end  items-center gap-5 mt-8">
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
