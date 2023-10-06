import { MapKey } from "./api";

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
export interface TestCaseManagerItem {
  menu_id: string;
  key: string | number;
  testToolName: string;
  testDirection: string;
  testCase: string;
  testContent: string;
  testMethod: string;
  testResult: string;
  [key: string]: any;
}

export type TestCaseManagerMap =
  | {
      [key: string]:
        | {
            [MENU_CHILDREN]: Array<TestCaseManagerItem>;
          }
        | TestCaseManagerItem;
    }
  | {
      [key: string]: TestCaseManagerItem;
    };

export type TestCaseManagerList = TestCaseManagerItem[];

export type TestCaseListResponse = TestCaseManagerList;

export type TestCaseManagerResponse = {
  data: TestCaseManagerList;
  mapKey: MapKey;
};
