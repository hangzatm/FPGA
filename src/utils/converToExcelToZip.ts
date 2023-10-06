// 将数据转换为Excel再转换为zip导出
// 参考 https://juejin.cn/post/7080169896209809445/#comment

import { Columns } from "@/components/table/types";
import { downloadFiles2Zip } from "../utils/excelUtils";

function onExportZip(
  fileName: string,
  columns: any,
  list: readonly any[] | undefined,
) {
  downloadFiles2Zip({
    zipName: fileName,
    files: [
      {
        filename: fileName,
        sheets: [
          {
            sheetName: "sheet1",
            columns: columns,
            dataSource: list,
          },
        ],
      },
    ],
  });
}

export default onExportZip;