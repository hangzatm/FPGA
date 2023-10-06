import React, { useEffect, useState } from "react";
import {
  Table,
  Row,
  Drawer,
  Radio,
  Tooltip,
  InputNumber,
  Button,
  message,
  notification,
} from "antd";
import MyIcon from "../icon";
import arrayMove from "array-move";
import { getKey, setKey, rmKey } from "@/utils";
import "./index.less";
import useStyle from "./style";
import { MyTableProps, Columns, renderArugs, Column } from "./types";
import { useThemeToken } from "@/hooks";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as XLSX from "xlsx";
import * as JSZip from "jszip";
import { saveAs } from "file-saver";

import { json2Excel } from "@/utils/convertToExcelAndExport.js";
import onExportZip from "@/utils/converToExcelToZip";
import { ColumnsType } from "antd/es/table";

const setColTitle: Columns = [
  {
    title: "列排序",
    dataIndex: "sort",
    key: "sort",
  },
  {
    title: "列名",
    dataIndex: "title",
    align: "center",
  },
  {
    title: "宽度",
    dataIndex: "width",
    type: "inputNumber",
  },
  {
    title: "固定",
    dataIndex: "fixed",
    width: 120,
    type: "switch",
    align: "center",
    range: [
      { v: false, t: "关" },
      { v: "left", t: "左固定" },
      { v: "right", t: "右固定" },
    ],
  },
  {
    title: "超出宽度隐藏",
    dataIndex: "ellipsis",
    type: "switch",
    align: "center",
    range: [
      { v: false, t: "否" },
      { v: true, t: "是" },
    ],
  },
  {
    title: "对齐",
    dataIndex: "align",
    type: "switch",
    align: "center",
    range: [
      { v: "left", t: "左" },
      { v: "center", t: "居中" },
      { v: "right", t: "右" },
    ],
  },
  {
    title: "隐藏",
    dataIndex: "hidden",
    type: "switch",
    align: "center",
    range: [
      { v: "hidden", t: "隐藏" },
      { v: "auto", t: "显示" },
    ],
  },
];

const defaultCol: Omit<Column, "dataIndex"> = {
  width: 80,
  fixed: false,
  ellipsis: false,
  align: "left",
  hidden: "auto",
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

const TbRow = ({ children, ...props }: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if ((child as React.ReactElement).key === "sort") {
          return React.cloneElement(child as React.ReactElement, {
            children: (
              <div
                ref={setActivatorNodeRef}
                style={{ touchAction: "none", cursor: "move" }}
                className="drag-sort"
                {...listeners}
              >
                <MyIcon type="icon_mirrorlightctrl" />
              </div>
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

function UseTable(columns: Columns, saveKey: MyTableProps["saveKey"]) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [col, setCol] = useState<Columns>([]);
  const [tbTitle, setTitle] = useState<Columns>([]);
  useEffect(() => {
    const data: Columns = getKey(true, saveKey || "");
    if (saveKey && data && columns && columns.length === data.length) {
      const columnInfo: any = {},
        dataInfo: any = {};
      columns.forEach((item) => (columnInfo[item.dataIndex] = item));
      data.forEach((item) => (dataInfo[item.dataIndex] = item));
      const isSameKey = Array.isArray(data)
        ? data.every((i) => i.dataIndex === columnInfo[i.dataIndex]?.dataIndex)
        : false;
      if (isSameKey) {
        // 如果当前表格头数据 与 缓存设置的数组长度一样，就优先使用缓存的
        const merge = data.map((item) => ({
          ...defaultCol,
          ...columnInfo[item.dataIndex],
          ...item,
        }));
        setCol(merge);
      } else {
        initDefaultCol();
      }
    } else if (!data && columns && columns.length !== col.length) {
      initDefaultCol();
    }
    // eslint-disable-next-line
  }, [saveKey, columns]);

  useEffect(() => {
    if (col.length) {
      const newTb = setColTitle.map((c) => {
        if (c.type === "switch") {
          c.render = (...args: renderArugs) => switchRender(c, ...args);
        }
        if (c.type === "inputNumber") {
          c.render = (...args) => inuputRender(c.dataIndex, ...args);
        }
        return c;
      });
      setTitle(newTb);
    }
    // eslint-disable-next-line
  }, [col]);

  function switchRender(column: Column, text: any, current: Column) {
    return (
      <Radio.Group
        buttonStyle="solid"
        value={text}
        onChange={(e) =>
          switchChange(column.dataIndex, e.target.value, current)
        }
      >
        {column.range &&
          column.range.map((r) => (
            <Row className="mt10" key={r.t} justify="center">
              <Tooltip title={r.t} arrow>
                <Radio value={r.v}>{r.t}</Radio>
              </Tooltip>
            </Row>
          ))}
      </Radio.Group>
    );
  }
  function switchChange(key: string, val: any, current: Column) {
    const dataIndex = current.dataIndex;
    let newCol = col.map((item) => {
      if (item.dataIndex === dataIndex && key) {
        item[key] = val;
      }
      return item;
    });
    setCol(newCol);
  }

  function inuputRender(dataIndex: string, text: number, col: Column) {
    return (
      <Tooltip title="失去焦点触发" arrow>
        <InputNumber
          min={0}
          max={800}
          onStep={(v) => switchChange(dataIndex, v, col)}
          onBlur={(v) => switchChange(dataIndex, Number(v.target.value), col)}
          value={text}
        />
      </Tooltip>
    );
  }
  function hiddin() {
    setShowDrawer(false);
  }
  function show() {
    setShowDrawer(true);
  }
  function saveTbSet() {
    if (!saveKey) {
      return notification.error({
        type: "error",
        description: "你未定义表格的savaKey属性，请定义后保存",
        message: "保存失败",
      });
    }
    setKey(true, saveKey, col);
    message.success("保存设置成功!");
  }
  // 删除 保存的表格显示
  const delTbSet = () => {
    if (!saveKey) {
      return notification.error({
        type: "error",
        description: "你未定义表格的savaKey属性，请定义后在点击删除",
        message: "删除失败",
      });
    }
    rmKey(true, saveKey);
    initDefaultCol();
    message.success("删除成功!");
  };
  // 初始化设置表格默认格式
  function initDefaultCol() {
    const newCol = columns.map((c, index) => ({
      ...defaultCol,
      ...c,
      index,
    }));
    setCol(newCol);
  }
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setCol((previous) => {
        const activeIndex = previous.findIndex((i) => i.index === active.id);
        const overIndex = previous.findIndex((i) => i.index === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };
  return {
    col,
    showDrawer,
    show,
    hiddin,
    tbTitle,
    saveTbSet,
    delTbSet,
    onDragEnd,
  };
}

function MyTable({
  columns,
  dataSource,
  className,
  children,
  saveKey,
  scene,
  ...Props
}: MyTableProps) {
  const {
    showDrawer,
    show,
    hiddin,
    col,
    tbTitle,
    onDragEnd,
    saveTbSet,
    delTbSet,
  } = UseTable(columns, saveKey);
  const token = useThemeToken();
  const { styles } = useStyle(token);
  // 控制多选框 start
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const [loading, setLoading] = useState(false);
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  // 控制多选框 end

  // 控制压缩上传 start

  const hasSelected = selectedRowKeys.length > 0;
  const compressAndUpload = () => {
    setLoading(true);
    //要把【操作】列给排除掉，不能导出
    columns = columns.filter((i) => i.key !== "action");
    // 只导出选中的数据
    dataSource = dataSource?.filter((i) =>
      selectedRowKeys.find((item) => item === i.key)
    );
    onExportZip(scene + "压缩包", columns, dataSource);

    // console.log("selectedRowKeys", selectedRowKeys);
    // console.log("columns", columns);
    // console.log("dataSource", dataSource);

    // const header = ['date','defaultType','device']
    // const headerName = {date:"故障日期",defaultType:"故障类型",device:"存储"}
    // json2Excel(jsonData,header,headerName,'故障分布数据表')

    // const columns2: ColumnsType<any> = [
    //   {
    //     width: 50,
    //     dataIndex: 'id',
    //     key: 'id',
    //     title: 'ID',
    //     render: (text, row) => <div><p>{row.id + 20}</p></div>,
    //     // render: (text, row) => String(text) === '0' ? '-' : text,
    //     // render: (text, row) => <div>{'hahaha'}</div>,
    //     // render: (text, row) => 'hahaha',
    //   },
    //   {
    //     width: 100,
    //     dataIndex: 'name',
    //     key: 'name',
    //     title: '姓名',
    //   },
    //   {
    //     width: 50,
    //     dataIndex: 'age',
    //     key: 'age',
    //     title: '年龄',
    //   },
    //   {
    //     width: 80,
    //     dataIndex: 'gender',
    //     key: 'gender',
    //     title: '性别',
    //   },
    // ];
    // let arr: any[] = [];
    // for (let i = 0; i < 5; i++) {
    //   arr.push({
    //     id: i,
    //     name: i % 2 === 0 ? `小明${i}号哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈啊哈嘿嘿哈哈或` : `小明${i}号`,
    //     age: 10 + i,
    //     gender: i % 2 === 0 ? '男' : '女'
    //   })
    // }

    // ajax request after empty completing
    // 开始压缩
    // 将JSON数据转换为Excel文件
    // const jsonData = [
    //   { Name: "John", Age: 30, City: "New York" },
    //   { Name: "Alice", Age: 25, City: "Los Angeles" },
    //   { Name: "Bob", Age: 35, City: "Chicago" },
    // ];
    // // 创建一个Excel工作簿
    // const ws = XLSX.utils.json_to_sheet(jsonData);
    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // // 将Excel工作簿保存为文件
    // const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

    // fs.writeFileSync("output.xlsx", excelBuffer);

    // // 创建一个ZIP文件并添加Excel文件
    // const zip = new JSZip();
    // zip.file("output.xlsx", fs.readFileSync("output.xlsx"));

    // // 将ZIP文件保存为压缩文件
    // zip
    //   .generateAsync({ type: "nodebuffer" })
    //   .then((content) => {
    //     fs.writeFileSync("output.zip", content);
    //     console.log("导出完成");
    //   })
    //   .catch((error) => {
    //     console.error("导出失败:", error);
    //   });

    // const worksheet = XLSX.utils.json_to_sheet(JSON.parse(jsonData));
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    // const excelData = XLSX.write(workbook, {
    //   bookType: "xlsx",
    //   type: "binary",
    // });

    // // 创建ZIP文件并添加Excel文件
    // const zip = new JSZip();
    // zip.file("data.xlsx", excelData, { binary: true });

    // // 生成ZIP文件并提供下载
    // zip.generateAsync({ type: "blob" }).then(function (content) {
    //   saveAs(content, "data.zip");
    // });
    message.success("数据压缩并上传成功！您也可以在本地校验压缩文件的正确性");
    setSelectedRowKeys([]);
    setLoading(false);

    // setTimeout(() => {
    //   setSelectedRowKeys([]);
    //   setLoading(false);
    // }, 1000);
  };
  // 控制压缩上传 end

  return (
    <div className="react-ant-table">
      <div style={{ display: "inline", float: "right" }}>
        {/* <Row justify="end">
          <Button
            type="primary"
            onClick={compressAndUpload}
            disabled={!hasSelected}
            loading={loading}
          >
            压缩上传
          </Button>
        </Row> */}
        <Button
          type="primary"
          style={{ bottom: "8px" }}
          onClick={compressAndUpload}
          disabled={!hasSelected}
          loading={loading}
        >
          压缩上传
        </Button>
        <Row className={styles.set} style={{ display: "inline" }} justify="end">
          <MyIcon className={styles.set} type="icon_edit" onClick={show} />
        </Row>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={col.filter((i) => i.hidden !== "hidden")}
        dataSource={dataSource}
        className={
          className
            ? `table-show-container ${className}`
            : "table-show-container"
        }
        {...Props}
      >
        {children}
      </Table>
      <Drawer
        className="table-drawer"
        width={1000}
        onClose={hiddin}
        maskClosable={true}
        open={showDrawer}
        title="表格显示设置"
      >
        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
          <SortableContext
            // rowKey array
            items={col.map((item) => item.index)}
            strategy={verticalListSortingStrategy}
          >
            <Table
              components={{
                body: {
                  row: TbRow,
                },
              }}
              columns={tbTitle}
              dataSource={col}
              rowKey="index"
              pagination={false}
            />
          </SortableContext>
        </DndContext>
        <Row justify="center" className="mt20">
          <Button type="primary" onClick={saveTbSet}>
            保存此表格设置，下次打开默认启用
          </Button>
          <Button danger type="dashed" className="del" onClick={delTbSet}>
            删除已保存的设置
          </Button>
        </Row>
      </Drawer>
    </div>
  );
}
export default MyTable;
