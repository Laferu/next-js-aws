export interface IFilterCategoryListItems {
  name: string
  checked?: boolean
  fieldValue: string
  categoryValue?: string
  format?: string
}

export interface IFilterCategoryList {
  name: string
  type: string
  fieldName: string
  format?: string
  list?: IFilterCategoryListItems[]
  value?: any
  date?: Date[]
}
