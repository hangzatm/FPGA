import { TableProps, ColumnType } from "antd/es/table";

export type MyTableProps = Omit<TableProps<any>, "columns"> & {
  saveKey?: string;
  loading?: boolean;
  columns: Columns;
  scene: string; //场景，是哪个页面调用的MyTable，用于导出时给压缩包取名字
};
export interface Column extends ColumnType<any> {
  range?: range;
  type?: string;
  dataIndex: string;
  render?: (text: any, record: Column) => React.ReactNode;
  [propname: string]: any;
}
export type Columns = Column[];
export type range = {
  v: string | number | boolean;
  t: string;
}[];
export type renderArugs = [any, Column];
