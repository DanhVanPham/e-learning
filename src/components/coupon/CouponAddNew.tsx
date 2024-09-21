"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getAllCourses } from "@/lib/actions/course.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IUser } from "@/database/user.model";
import { couponFormSchema, couponTypes } from "@/constants";
import { ECouponType } from "@/types/enums";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import InputFormatCurrency from "@/components/ui/input-format";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { format } from "date-fns";
import { Checkbox } from "../ui/checkbox";
import { debounce } from "lodash";
import { IconClose } from "../icons";
import { createCoupon } from "@/lib/actions/coupon.actions";
import { TCreateCouponParams } from "@/types";

const CouponAddNew = ({ user }: { user?: IUser }) => {
  const router = useRouter();

  const [findCourse, setFindCourse] = useState<any[] | undefined>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof couponFormSchema>>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      active: true,
      type: ECouponType.PERCENT,
      value: 0,
      limit: 0,
      title: "",
      code: "",
      start_date: undefined,
      end_date: undefined,
      courses: [],
    },
  });

  const selectedCourses = (form.watch("courses") ?? []) as any[];
  const couponTypeWatch = form.watch("type");

  async function onSubmit(values: z.infer<typeof couponFormSchema>) {
    setIsSubmitting(true);
    console.log(values);
    const {
      title,
      code,
      start_date,
      end_date,
      active = true,
      type,
      value,
      limit,
      courses,
    } = values;
    try {
      const params: TCreateCouponParams = {
        title,
        code,
        start_date: start_date ? format(start_date, "dd/MM/yyyy") : undefined,
        end_date: end_date ? format(end_date, "dd/MM/yyyy") : undefined,
        active,
        type,
        value: String(value),
        limit,
        courses: courses?.map((course) => course._id),
      };
      const resCoupon = await createCoupon(params);
      if (resCoupon?.success) {
        form.reset();
        toast.success("Tạo mới mã giảm giá thành công");
        return;
      }

      toast.error(resCoupon?.message || "Tạo mới mã giảm giá thất bại");
    } catch (error) {
      console.log(error);
      toast.error("Tạo mới mã giảm giá thất bại");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleSearchCourse = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const courseList = await getAllCourses({ search: value });
      setFindCourse(courseList?.items);
      if (!value) setFindCourse([]);
    },
    250
  );

  const handleSelectCourse = (checked: boolean | string, course: any) => {
    if (checked) {
      form.setValue("courses", [...selectedCourses, course]);
    } else {
      form.setValue(
        "courses",
        selectedCourses.filter(
          (selectedCourse) => selectedCourse._id !== course._id
        )
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 mt-10">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="title">Tiêu đề</FormLabel>
                <FormControl>
                  <Input id="title" placeholder="Tiêu đề" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="code">Code</FormLabel>
                <FormControl>
                  <Input
                    id="code"
                    placeholder="Mã giảm giá"
                    className="font-bold uppercase"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => {
              const startDate = field.value;
              return (
                <FormItem>
                  <FormLabel htmlFor="start_date">Ngày bắt đầu</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className="w-full">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? (
                            format(startDate, "dd/MM/yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          initialFocus
                          selected={startDate}
                          onSelect={(date) => field.onChange(date)}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => {
              const endDate = field.value;
              return (
                <FormItem>
                  <FormLabel htmlFor="end_date">Ngày kết thúc</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className="w-full">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? (
                            format(endDate, "dd/MM/yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          initialFocus
                          selected={endDate}
                          onSelect={(date) => field.onChange(date)}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại coupon</FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue={ECouponType.PERCENT}
                    className="flex gap-5 h-10"
                    onValueChange={field.onChange}
                  >
                    {couponTypes.map((type) => (
                      <div
                        className="flex items-center space-x-2"
                        key={type.value}
                      >
                        <RadioGroupItem value={type.value} id={type.value} />
                        <Label htmlFor={type.value} className="cursor-pointer">
                          {type.title}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field: { onChange, ...rest } }) => (
              <FormItem>
                <FormLabel htmlFor="value">Giá trị</FormLabel>
                <FormControl>
                  <>
                    {couponTypeWatch === ECouponType.PERCENT ? (
                      <Input
                        id="value"
                        type="number"
                        placeholder="100"
                        {...rest}
                        onChange={(e) => onChange(e.target.valueAsNumber)}
                      />
                    ) : (
                      <InputFormatCurrency
                        id="value"
                        {...rest}
                        onValueChange={(values) => {
                          onChange(values.floatValue);
                        }}
                      />
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="active">Trạng thái</FormLabel>
                <FormControl>
                  <div className="flex flex-col h-10 justify-center">
                    <Switch
                      id="active"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="limit">Số lượng tối đa</FormLabel>
                <FormControl>
                  <Input
                    id="limit"
                    type="number"
                    placeholder="100"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="courses"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="courses">Khóa học</FormLabel>
                <FormControl>
                  <>
                    <Input
                      id="courses"
                      placeholder="Tìm kiếm khóa học..."
                      onChange={handleSearchCourse}
                    />
                    {findCourse && findCourse.length > 0 && (
                      <div className="flex flex-col gap-2 !mt-5">
                        {findCourse?.map((course) => (
                          <Label
                            key={course.title}
                            className="flex items-center gap-2 font-medium text-sm cursor-pointer"
                            htmlFor={course.title}
                          >
                            <Checkbox
                              id={course.title}
                              onCheckedChange={(checked) =>
                                handleSelectCourse(checked, course)
                              }
                              checked={selectedCourses.some(
                                (el) => el._id === course._id
                              )}
                            />
                            <span>{course.title}</span>
                          </Label>
                        ))}
                      </div>
                    )}
                    {selectedCourses.length > 0 && (
                      <div className="flex items-start flex-wrap gap-2 !mt-5">
                        {selectedCourses?.map((course) => (
                          <div
                            key={course.title}
                            className="inline-flex items-center gap-2 font-semibold text-sm px-3 py-1 rounded-lg border borderDarkMode bgDarkMode"
                          >
                            <span>{course.title}</span>
                            <button
                              type="button"
                              onClick={() => handleSelectCourse(false, course)}
                            >
                              <IconClose className="size-5 text-gray-400 hover:text-gray-600" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-end lg:hidden">
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              className="w-[150px] mx-auto flex"
            >
              Tạo mã
            </Button>
          </div>
        </div>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="w-[150px] mx-auto flex"
        >
          Tạo mã
        </Button>
      </form>
    </Form>
  );
};

export default CouponAddNew;
