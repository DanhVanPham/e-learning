'use client'

import { allValue } from "@/constants";
import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback } from "react";

export default function useQueryString() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString =  (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    if(!value || value === allValue) params.delete(name) 

    // Reset the 'page' param if the updated param is not 'page'
    if (name !== 'page') {
      params.delete('page'); // Remove 'page' parameter when a different parameter is updated
    }
    router.push(`${pathname}?${params}`)
  }

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    createQueryString("search", e.target.value);
  }, 500);

  const changeFilterStatus = <TStatus extends string>(status: TStatus) => {
    createQueryString("status", status);
  }

  const changeFilterRole = <TRole extends string>(role: TRole) => {
    createQueryString("role", role);
  }

  const handleChangePage = (page: number) => {
    createQueryString("page", Number(page).toString());
  };

  const handleChangeQs = (key: string, value: string) => {
    createQueryString(key, value)
  }

  return { createQueryString, 
    router, pathname, 
    onSearch: handleSearch,
    onChangeFilterStatus: changeFilterStatus,
    onChangeFilterRole: changeFilterRole,
    onChangePage: handleChangePage,
    onChangeQs: handleChangeQs
  }
}