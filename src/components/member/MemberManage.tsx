"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "../common/Heading";
import { Input } from "../ui/input";
import useQueryString from "@/app/hooks/useQueryString";
import { ECommentStatus, EUserRole, EUserStatus } from "@/types/enums";
import { StatusBadge } from "../common";
import TableActions from "../common/TableActions";
import TableActionItem from "../common/TableActionItem";
import Pagination from "../common/Pagination";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { allValue, userRole, userStatus } from "@/constants";
import EmptyData from "../common/EmptyData";
import { IUser } from "@/database/user.model";
import Image from "next/image";
import { updateUser } from "@/lib/actions/user.actions";

function MemberManage({
  currUser,
  users,
  totalPages = 1,
  page = 1,
  search,
  role,
  status,
}: {
  currUser: IUser;
  users: IUser[] | undefined;
  totalPages?: number;
  page: number;
  search: string;
  role: EUserRole;
  status: EUserStatus;
}) {
  const { onSearch, onChangeFilterStatus, onChangeFilterRole, onChangePage } =
    useQueryString();

  const handleChangeStatus = async (userId: string, status: EUserStatus) => {
    Swal.fire({
      title:
        status === EUserStatus.BANNED
          ? "Bạn có chắc muốn chặn nguời dùng này không"
          : "Bạn có chắc muốn xác nhận nguời dùng này không",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Cập nhật",
      cancelButtonText: "Thoát",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await updateUser({
            id: userId,
            updateData: {
              status,
            },
            path: "/manage/member",
          });
          if (res?.success) {
            toast.success("Cập nhật người dùng thành công");
          } else {
            toast.error("Cập nhật người dùng tthất bại!");
          }
          onChangeFilterStatus("");
        } catch (error) {
          toast.error("Cập nhật người dùng tthất bại!");
        }
      }
    });
  };

  const isUserAdmin = currUser.role === EUserRole.ADMIN;

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading>Quản lý nguời dùng</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              defaultValue={search || ""}
              placeholder="Tìm kiếm người dùng..."
              onChange={onSearch}
            />
          </div>
          <Select
            value={role || allValue}
            onValueChange={(value) =>
              onChangeFilterRole<EUserRole | string>(value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {userRole.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={status || allValue}
            onValueChange={(value) =>
              onChangeFilterStatus<ECommentStatus | string>(value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {userStatus.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Tên người dùng</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!users?.length && <EmptyData />}
          {!!users?.length &&
            users?.map((user) => {
              const foundUser = userStatus.find(
                (item) => item.value === user.status
              );
              const foundRole = userRole.find(
                (item) => item.value === user.role
              );
              return (
                <TableRow key={user._id}>
                  <TableCell>
                    <div className="flex gap-1 items-center">
                      <div className="size-7 relative rounded-full border borderDarkMode">
                        <Image
                          alt="avatar"
                          src={user.avatar}
                          fill
                          className="object-cover w-full h-full rounded-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <strong>{user.username}</strong>
                        <span className="text-xs">{user.name}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{foundRole?.title}</TableCell>
                  <TableCell>
                    <StatusBadge
                      item={{
                        className: foundUser?.className,
                        title: foundUser?.title!,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {currUser._id.toString() !== user._id.toString() &&
                      isUserAdmin && (
                        <>
                          {user.status !== EUserStatus.ACTIVE && (
                            <TableActions>
                              <TableActionItem
                                type="check"
                                onClick={() =>
                                  handleChangeStatus(
                                    user._id,
                                    EUserStatus.ACTIVE
                                  )
                                }
                              />
                            </TableActions>
                          )}
                          {user.status !== EUserStatus.BANNED && (
                            <TableActions>
                              <TableActionItem
                                type="cancel"
                                onClick={() =>
                                  handleChangeStatus(
                                    user._id,
                                    EUserStatus.BANNED
                                  )
                                }
                              />
                            </TableActions>
                          )}
                        </>
                      )}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Pagination
        currPage={page}
        totalPage={totalPages}
        onChangePage={onChangePage}
      />
    </div>
  );
}

export default MemberManage;
