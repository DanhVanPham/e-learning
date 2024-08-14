"use client";

import React, { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useImmer } from "use-immer";
import { NumericFormat } from "react-number-format";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { updateCourse } from "@/lib/actions/course.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ICourse } from "@/database/course.model";
import { Textarea } from "../ui/textarea";
import { ECourseLevel, ECourseStatus } from "@/types/enums";
import { IconAdd } from "../icons";
import { courseLevel, courseStatus } from "@/constants";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(10, "Tên khóa học phải có ít nhất 10 ký tự"),
  slug: z.string().optional(),
  price: z.coerce.number().nonnegative().optional(),
  sale_price: z.coerce.number().nonnegative().optional(),
  intro_url: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  views: z.coerce.number().nonnegative().optional(),
  status: z
    .enum([
      ECourseStatus.APPROVED,
      ECourseStatus.PENDING,
      ECourseStatus.REJECTED,
    ])
    .optional(),
  level: z
    .enum([
      ECourseLevel.BEGINNER,
      ECourseLevel.INTERMEDIATE,
      ECourseLevel.ADVANCED,
    ])
    .optional(),
  info: z.object({
    requirements: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    qa: z
      .array(
        z.object({
          question: z.string().optional(),
          answer: z.string().optional(),
        })
      )
      .optional(),
  }),
});

const CourseUpdate = ({ course }: { course: ICourse }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courseInfo, setCourseInfo] = useImmer({
    requirements: course.info.requirements,
    benefits: course.info.benefits,
    qa: course.info.qa,
  });

  const defaultValues = useMemo(
    () => ({
      title: course.title || "",
      slug: course.slug || "",
      price: course.price || 0,
      sale_price: course.sale_price || 0,
      intro_url: course.intro_url || "",
      views: course.views || 0,
      description: course.description || "",
      image: course.image || "",
      status: course.status || ECourseStatus.PENDING,
      level: course.level || ECourseLevel.BEGINNER,
    }),
    [course]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const imageWatch = form.watch("image");

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const data = {
        slug: course.slug,
        updateData: {
          title: values.title,
          slug: values.slug,
          price: values.price,
          sale_price: values.sale_price,
          intro_url: values.intro_url,
          description: values.description,
          image: values.image,
          status: values.status,
          level: values.level,
          info: {
            requirements: courseInfo.requirements,
            benefits: courseInfo.benefits,
            qa: courseInfo.qa,
          },
        },
      };

      const res = await updateCourse(data);
      if (res?.success) {
        toast.success("Cập nhật khóa học thành công");
        if (course.slug !== res.data.slug) {
          router.replace(`/manage/course/update?slug=${res.data.slug}`);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div className="grid grid-cols-2 gap-8 mt-10 mb-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên khóa học*</FormLabel>
                <FormControl>
                  <Input placeholder="Tên khóa học" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn khóa học</FormLabel>
                <FormControl>
                  <Input placeholder="khoa-hoc-lap-trinh" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá khuyến mãi</FormLabel>
                <FormControl>
                  <NumericFormat
                    placeholder="599,000"
                    {...field}
                    thousandSeparator
                    customInput={Input}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sale_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá gốc</FormLabel>
                <FormControl>
                  <NumericFormat
                    placeholder="999,000"
                    {...field}
                    thousandSeparator
                    customInput={Input}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả khóa học</FormLabel>
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

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ảnh đại diện</FormLabel>
                <FormControl>
                  <div
                    className="h-[200px] bg-white rounded-md border border-gray-50
                    flex items-center justify-center relative
                    "
                  >
                    {!imageWatch ? (
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          // Do something with the response
                          console.log("Files: ", res);
                          form.setValue("image", res[0].url);
                        }}
                        onUploadError={(error: Error) => {
                          console.error(`ERROR! ${error.message}`);
                        }}
                      />
                    ) : (
                      <Image
                        alt="image course"
                        src={imageWatch}
                        fill
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="intro_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Youtube URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://youtube.com/afkfwf78"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="views"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lượt xem</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {courseStatus.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trình độ</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Trình độ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {courseLevel.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="info.requirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between gap-5">
                  <span>Yêu cầu</span>
                  <button
                    type="button"
                    className="text-primary"
                    onClick={() => {
                      setCourseInfo((draft) => {
                        draft.requirements.push("");
                      });
                    }}
                  >
                    <IconAdd className="size-5" />
                  </button>
                </FormLabel>
                <FormControl>
                  <>
                    {courseInfo.requirements.map((r, index) => (
                      <Input
                        key={index}
                        value={r}
                        placeholder={`Yêu cầu số ${index + 1}`}
                        onChange={(e) => {
                          setCourseInfo((draft) => {
                            draft.requirements[index] = e.target.value;
                          });
                        }}
                      />
                    ))}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="info.benefits"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between gap-5">
                  <span>Lợi ích</span>
                  <button
                    type="button"
                    className="text-primary"
                    onClick={() => {
                      setCourseInfo((draft) => {
                        draft.benefits.push("");
                      });
                    }}
                  >
                    <IconAdd className="size-5" />
                  </button>
                </FormLabel>
                <FormControl>
                  <>
                    {courseInfo.benefits.map((b, index) => (
                      <Input
                        key={index}
                        value={b}
                        placeholder={`Lợi ích số ${index + 1}`}
                        onChange={(e) => {
                          setCourseInfo((draft) => {
                            draft.benefits[index] = e.target.value;
                          });
                        }}
                      />
                    ))}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="info.qa"
            render={({ field }) => (
              <FormItem className="col-start-1 col-end-3">
                <FormLabel className="flex items-center justify-between gap-5">
                  <span>Question & Answer</span>
                  <button
                    type="button"
                    className="text-primary"
                    onClick={() => {
                      setCourseInfo((draft) => {
                        draft.qa.push({
                          question: "",
                          answer: "",
                        });
                      });
                    }}
                  >
                    <IconAdd className="size-5" />
                  </button>
                </FormLabel>
                <FormControl>
                  <>
                    {courseInfo.qa.map((qa, index) => (
                      <div className="grid grid-cols-2 gap-5" key={index}>
                        <Input
                          value={qa.question}
                          placeholder={`Câu hỏi số ${index + 1}`}
                          onChange={(e) => {
                            setCourseInfo((draft) => {
                              draft.qa[index].question = e.target.value;
                            });
                          }}
                        />
                        <Input
                          value={qa.answer}
                          placeholder={`Câu trả lời số ${index + 1}`}
                          onChange={(e) => {
                            setCourseInfo((draft) => {
                              draft.qa[index].answer = e.target.value;
                            });
                          }}
                        />
                      </div>
                    ))}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="w-[150px]"
        >
          Cập nhật khóa học
        </Button>
      </form>
    </Form>
  );
};

export default CourseUpdate;
