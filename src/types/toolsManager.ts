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
export interface ToolsManagerItem {
    menu_id: string
    toolName: string
    toolCompany: string
    key: string | number
    toolIntroduce: string
    [key: string]: any
  }

export type ToolsManagerMap = {
  [key: string]: {
    [MENU_CHILDREN]: Array<ToolsManagerItem>
  } | ToolsManagerItem
} | {
  [key: string]: ToolsManagerItem
}

export type ToolsManagerList = ToolsManagerItem[]


export type ToolsListResponse = ToolsManagerList

export type ToolsManageResponse = {
  data: ToolsManagerList,
  mapKey: MapKey
}
