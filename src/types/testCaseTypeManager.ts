import { MapKey } from "./api"

// 关于菜单State的action
// export type MenuAction = {
//   type: string
//   keys: string[]
//   menuItem: OpenedMenu
//   list: MenuItem[],
//   path: string
// }

//
// export interface OpenedMenu {
//   key: string
//   path: string
//   title: string
// }

// export interface MenuState {
//   openedMenu: OpenedMenu[]
//   openMenuKey: string[]
//   selectMenuKey: string[]
//   menuList: MenuItem[],
//   currentPath: string
// }

// 未处理的菜单列表信息
export interface TestCaseTypeManagerItem {
    menu_id: string
    key: string | number
    typeName: string
    typeIntroduce: string
    typeExample: string
    [key: string]: any
  }

export type TestCaseTypeManagerMap = {
  [key: string]: {
    [MENU_CHILDREN]: Array<TestCaseTypeManagerItem>
  } | TestCaseTypeManagerItem
} | {
  [key: string]: TestCaseTypeManagerItem
}

export type TestCaseTypeManagerList = TestCaseTypeManagerItem[]


export type TestCaseTypeListResponse = TestCaseTypeManagerList

export type TestCaseTypeManagerResponse = {
  data: TestCaseTypeManagerList,
  mapKey: MapKey
}
