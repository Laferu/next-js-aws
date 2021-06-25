import { IFilterCategoryList } from "./IDropdownList"

export interface IUserData {
  id: string
  name: string
  document: string
  status: string
  amount?: number
}

export interface IUsersData {
  filters: IFilterCategoryList[]
  users: IUserData[]
  pageCount: number
  currentPage: number
}
