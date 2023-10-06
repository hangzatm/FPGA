// 测试工具管理

import { useEffect, useState } from "react";
import { Row, Button, message, Popconfirm } from "antd";
import { getToolsManager as apiGetList, delMenu } from "@/api";
import ToolsManagerModal from "@/components/modal/toolsManager";
import MyTable from "@/components/table";
import MyIcon from "@/components/icon";
import { MenuList, MapKey } from "@/types";
import "./index.less";

export type ModalType = "add" | "addChild" | "edit";
export type SelectInfo = {
  key?: string;
  isParent?: Boolean;
};

function useToolsManager() {
  const [menus, setMenu] = useState<MenuList>([]);
  const [tabCol, setCol] = useState<MapKey>([]);
  const [selectInfo, setSelectInfo] = useState<SelectInfo>({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("add");

  const menuAction = {
    title: "操作",
    dataIndex: "action",
    key: "action",
    align: "center",
    render: (text: any, record: any) => {
      return (
        <Row>
          <Button type="link" onClick={() => openModal("edit", record)}>
            编辑
          </Button>
          {/* <Button type="link" onClick={() => openModal("addChild", record)}>
            添加子菜单
          </Button> */}
          <Popconfirm
            onConfirm={() => deleteMenu(record)}
            okText="确认"
            title="确认删除吗？"
            cancelText="取消"
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </Row>
      );
    },
  };
  const getToolManagerList = () => {
    apiGetList().then((res) => {
      if (res) {
        // 不知道为什么这里要做成加载一次apiGetList就添加一次menuAction，这种写法属实怪异
        // 【废弃】现在改成如果已经往表格列里添加过“操作”列了，就不再添加了
        // 改为先将“操作”列删掉， 再往里添加，上面这个废弃的方案我发现还是不行，如果重新进来这个页面，再点击编辑按钮就会没反应，不深究原因了，所以换种写法
        res.mapKey = res.mapKey.filter((i: any) => i.key !== "action");
        // if (res.mapKey.filter((i) => i.key === "action").length == 0) {
        //   res.mapKey.push(menuAction);
        // }
        res.mapKey.push(menuAction);
        res.mapKey.forEach((item: any) => {
          if (item.dataIndex === "icon") {
            item.render = (text: string | null) =>
              text ? <MyIcon className="preview" type={text} /> : "暂未设置";
          } else if (item.dataIndex === "keepAlive") {
            item.render = (text: string) =>
              text === "true" ? "保持" : "关闭销毁";
          }
        });
        setCol(res.mapKey);
        setMenu(res.data);
      }
    });
  };

  useEffect(() => {
    getToolManagerList();
    // eslint-disable-next-line
  }, []);

  const openModal = (type: ModalType, { key, isParent }: SelectInfo) => {
    setSelectInfo({ key, isParent: !Boolean(isParent) });
    setModalType(type);
    setShowModal(true);
  };

  const deleteMenu = (info: any) => {
    delMenu(info).then((res) => {
      const { msg, status } = res;
      if (status === 0) {
        message.success(msg);
        getToolManagerList();
      }
    });
  };
  const addMenu = () => {
    openModal("add", {});
  };
  return {
    selectInfo,
    menus,
    showModal,
    modalType,
    tabCol,
    setShowModal,
    getToolManagerList,
    addMenu,
  };
}

export default function ToolManager() {
  const {
    selectInfo,
    menus,
    showModal,
    modalType,
    tabCol,
    setShowModal,
    getToolManagerList,
    addMenu,
  } = useToolsManager();
  return (
    <div className="powermenu-container">
      <Button type="primary" onClick={addMenu}>
        新增工具
      </Button>
      <MyTable scene="测试工具" dataSource={menus} columns={tabCol} saveKey="MENUTABLE" />
      <ToolsManagerModal
        menus={menus}
        isShow={showModal}
        info={selectInfo}
        modalType={modalType}
        setShow={setShowModal}
        updateMenu={getToolManagerList}
      />
    </div>
  );
}

ToolManager.route = {
  [MENU_PATH]: "/power/toolManager",
};
