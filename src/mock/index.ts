import dayjs from "dayjs";
import { message } from "antd";
import {
  PowerApi,
  LoginApi,
  ResponseData,
  MenuInfoApi,
  MessageList,
  MessageAPi,
  MenuResponse,
  MenuList,
  MenuItem,
} from "@/types";
import { formatMenu } from "@/utils";
import { ToolsManageResponse } from "@/types/toolsManager";
import { TestCaseManagerResponse } from "@/types/testCaseManager";
import { TestCaseTypeManagerResponse } from "@/types/testCaseTypeManager";
import { dapanData,visitData } from './daPan';


type MockDataType = {
  "/getmenu": MenuResponse;
  "/getToolsManager": ToolsManageResponse;
  "/getTestCaseManager": TestCaseManagerResponse;
  "/getTestCaseTypeManager": TestCaseTypeManagerResponse;
  "/getpower": PowerApi;
  "/login": LoginApi;
  "/addmenu": ResponseData;
  "/addmessage": ResponseData;
  "/getmessage": MessageAPi;
  "/delmenu": ResponseData;
  "/getmenuinfo": ResponseData & { data: MenuItem | null };
  "/editmenuinfo": ResponseData;
  "/getvisitordata": ResponseData;
  [key: string]:
    | ResponseData
    | ToolsManageResponse
    | TestCaseManagerResponse
    | TestCaseTypeManagerResponse
    | MenuList
    | PowerApi
    | LoginApi
    | MenuInfoApi
    | MenuResponse;
};

const userInfoList = [
  {
    user_id: 1,
    username: "张同学",
    account: "admin",
    type_id: "超级管理员",
    t_id: 1,
  },
  {
    user_id: 2,
    username: "王五",
    account: "user",
    type_id: "用户",
    t_id: 2,
  },
  {
    user_id: 4,
    username: "李四",
    account: "qq123456",
    type_id: "游客",
    t_id: 3,
  },
  {
    user_id: 5,
    username: "路过的老鼠",
    account: "jake",
    type_id: "低权游客",
    t_id: 4,
  },
  {
    user_id: 6,
    username: "站长",
    account: "superAdmin",
    type_id: "超级管理员",
    t_id: 1,
  },
];
let currentUser = userInfoList[0];

let menu: MenuList = [
  {
    menu_id: 9,
    [MENU_TITLE]: "列表页",
    [MENU_PATH]: "/list",
    [MENU_KEY]: "list",
    [MENU_PARENTKEY]: "",
    [MENU_ICON]: "icon_list",
    [MENU_KEEPALIVE]: "false",
    order: 1,
  },
  {
    menu_id: 10,
    [MENU_TITLE]: "卡片列表",
    [MENU_PATH]: "/card",
    [MENU_KEY]: "listCard",
    [MENU_PARENTKEY]: "list",
    [MENU_ICON]: "",
    [MENU_KEEPALIVE]: "false",
    order: 5485,
  },
  {
    menu_id: 11,
    [MENU_TITLE]: "查询列表",
    [MENU_PATH]: "/search",
    [MENU_KEY]: "listSearch",
    [MENU_PARENTKEY]: "list",
    [MENU_ICON]: "",
    [MENU_KEEPALIVE]: "false",
    order: 9588,
  },
  {
    menu_id: 7,
    [MENU_TITLE]: "表单页",
    [MENU_PATH]: "/form",
    [MENU_KEY]: "from",
    [MENU_PARENTKEY]: "",
    [MENU_ICON]: "icon_form",
    [MENU_KEEPALIVE]: "false",
    order: 3,
  },
  {
    menu_id: 6,
    [MENU_TITLE]: "基础表单",
    [MENU_PATH]: "/index",
    [MENU_KEY]: "formIndex",
    [MENU_PARENTKEY]: "from",
    [MENU_ICON]: "",
    [MENU_KEEPALIVE]: "false",
    order: 9654,
  },
  {
    menu_id: 1,
    [MENU_TITLE]: "详情页",
    [MENU_PATH]: "/details",
    [MENU_KEY]: "details",
    [MENU_PARENTKEY]: "",
    [MENU_ICON]: "icon_edit",
    [MENU_KEEPALIVE]: "false",
    order: 3,
  },
  {
    menu_id: 2,
    [MENU_TITLE]: "个人中心",
    [MENU_PATH]: "/person",
    [MENU_KEY]: "detailsPerson",
    [MENU_PARENTKEY]: "details",
    [MENU_ICON]: "icon_infopersonal",
    [MENU_KEEPALIVE]: "false",
    order: 9998,
  },
  {
    menu_id: 16,
    [MENU_TITLE]: "结果页",
    [MENU_PATH]: "/result",
    [MENU_KEY]: "result",
    [MENU_PARENTKEY]: "",
    [MENU_ICON]: "icon_voiceprint",
    [MENU_KEEPALIVE]: "false",
    order: 4,
  },
  {
    menu_id: 3,
    [MENU_TITLE]: "403",
    [MENU_PATH]: "/403",
    [MENU_KEY]: "error403",
    [MENU_PARENTKEY]: "result",
    [MENU_ICON]: "icon_locking",
    [MENU_KEEPALIVE]: "false",
    order: 0,
  },
  {
    menu_id: 4,
    [MENU_TITLE]: "404",
    [MENU_PATH]: "/404",
    [MENU_KEY]: "error404",
    [MENU_PARENTKEY]: "result",
    [MENU_ICON]: "icon_close",
    [MENU_KEEPALIVE]: "false",
    order: 1,
  },
  {
    menu_id: 5,
    [MENU_TITLE]: "500",
    [MENU_PATH]: "/500",
    [MENU_KEY]: "error500",
    [MENU_PARENTKEY]: "result",
    [MENU_ICON]: "icon_privacy_closed",
    [MENU_KEEPALIVE]: "false",
    order: 4568,
  },
  {
    menu_id: 17,
    [MENU_TITLE]: "统计",
    [MENU_PATH]: "/statistics",
    [MENU_KEY]: "statistics",
    [MENU_PARENTKEY]: "",
    [MENU_ICON]: "icon_MTR",
    [MENU_KEEPALIVE]: "true",
    order: 5,
  },
  {
    menu_id: 18,
    [MENU_TITLE]: "访客统计",
    [MENU_PATH]: "/visitor",
    [MENU_KEY]: "visitor",
    [MENU_PARENTKEY]: "statistics",
    [MENU_ICON]: "icon_addresslist",
    [MENU_KEEPALIVE]: "true",
    order: 1,
  },
  {
    menu_id: 12,
    [MENU_TITLE]: "权限管理",
    [MENU_PATH]: "/power",
    [MENU_KEY]: "power",
    [MENU_PARENTKEY]: "",
    [MENU_ICON]: "icon_set",
    [MENU_KEEPALIVE]: "false",
    order: 9,
  },
  {
    menu_id: 14,
    [MENU_TITLE]: "权限类别",
    [MENU_PATH]: "/type",
    [MENU_KEY]: "powerType",
    [MENU_PARENTKEY]: "power",
    [MENU_ICON]: "icon_safety",
    [MENU_KEEPALIVE]: "true",
    order: 12,
  },
  {
    menu_id: 13,
    [MENU_TITLE]: "菜单管理",
    [MENU_PATH]: "/menu",
    [MENU_KEY]: "powerMenu",
    [MENU_PARENTKEY]: "power",
    [MENU_ICON]: "icon_menu",
    [MENU_KEEPALIVE]: "true",
    order: 1475,
  },
  {
    menu_id: 16,
    [MENU_TITLE]: "工具管理",
    [MENU_PATH]: "/toolManager",
    [MENU_KEY]: "powerToolManager",
    [MENU_PARENTKEY]: "power",
    [MENU_ICON]: "icon_menu",
    [MENU_KEEPALIVE]: "true",
    order: 1476,
  },
  {
    menu_id: 17,
    [MENU_TITLE]: "测试用例管理",
    [MENU_PATH]: "/testCaseManager",
    [MENU_KEY]: "powerTestCaseManager",
    [MENU_PARENTKEY]: "power",
    [MENU_ICON]: "icon_menu",
    [MENU_KEEPALIVE]: "true",
    order: 1477,
  },
  {
    menu_id: 18,
    [MENU_TITLE]: "用例类型管理",
    [MENU_PATH]: "/testCaseTypeManager",
    [MENU_KEY]: "powerTestCaseTypeManager",
    [MENU_PARENTKEY]: "power",
    [MENU_ICON]: "icon_menu",
    [MENU_KEEPALIVE]: "true",
    order: 1478,
  },
  {
    menu_id: 15,
    [MENU_TITLE]: "用户管理",
    [MENU_PATH]: "/user",
    [MENU_KEY]: "powerUser",
    [MENU_PARENTKEY]: "power",
    [MENU_ICON]: "icon_infopersonal",
    [MENU_KEEPALIVE]: "true",
    order: 1593,
  },
  {
    menu_id: 8,
    [MENU_TITLE]: "图标库",
    [MENU_PATH]: "/icons",
    [MENU_KEY]: "icons",
    [MENU_PARENTKEY]: "",
    [MENU_ICON]: "icon_pen",
    [MENU_KEEPALIVE]: "true",
    order: 10,
  },
];
const typeList = [
  {
    type_id: 1,
    name: "超级管理员",
    menu_id: "2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,1",
  },
  { type_id: 2, name: "用户", menu_id: "1,9,10,11,2,7,6,17,18,16,3,4,5,8" },
  { type_id: 3, name: "游客", menu_id: "9,1,10,11,2,7,6,17,18,12" },
  { type_id: 4, name: "低权游客", menu_id: "9,10" },
];
const power = {
  status: 0,
  data: typeList,
  mapKey: [
    { title: "权限id", dataIndex: "type_id", key: "type_id" },
    { title: "权限简称", dataIndex: "name", key: "name" },
    { title: "显示菜单列表id", dataIndex: "menu_id", key: "menu_id" },
  ],
  menu: formatMenu(menu),
};

// FPGA工具管理 start
const toolsManagerData = [
  {
    menu_id: "tool_1",
    key: "tool_1",
    toolName: "Xilinx Vivado",
    toolCompany: "Xilinx公司",
    toolIntroduce:
      "是一种用于设计、仿真、综合、实现和验证Xilinx FPGA和SoC（片上系统）的综合性工具。Vivado支持Xilinx的Artix、Kintex、Virtex系列FPGA和Zynq系列SoC",
  },
  {
    menu_id: "tool_2",
    key: "tool_2",
    toolName: "Synopsys Synplify",
    toolCompany: "Synopsys公司",
    toolIntroduce: "将高级RTL代码转换为门级网表",
  },
  {
    menu_id: "tool_3",
    key: "tool_3",
    toolName: "Altera Quartus Prime",
    toolCompany: "英特尔",
    toolIntroduce:
      "是一种用于设计、仿真、综合、实现和验证Altera FPGA的工具。Quartus Prime支持Altera的Cyclone、Arria和Stratix系列FPGA。",
  },
  {
    menu_id: "tool_4",
    key: "tool_4",
    toolName: "Mentor Graphics ModelSim",
    toolCompany: "Mentor Graphics公司",
    toolIntroduce: "用于FPGA设计的仿真工具，可用于验证设计的功能和时序",
  },
  {
    menu_id: "tool_5",
    key: "tool_5",
    toolName: "Xilinx ISE",
    toolCompany: "Xilinx公司",
    toolIntroduce:
      "虽然Xilinx已经推出了Vivado，但是ISE仍然在一些旧的项目中使用。它支持旧的Xilinx FPGA系列，如Spartan和Virtex系列。 请注意，这些工具链的功能和兼容性可能会根据不同的版本和更新而有所不同。在选择FPGA工具链时，通常需要考虑FPGA型号、设计需求、性能要求以及开发团队的经验和熟悉度。",
  },
  {
    menu_id: "tool_6",
    key: "tool_6",
    toolName: "Lattice Diamond",
    toolCompany: "Lattice Semiconductor公司",
    toolIntroduce:
      "用于设计和开发Lattice FPGA。它支持iCE40、MachXO、ECP等系列FPGA。",
  },
];
const toolsManager = {
  // status: 0,
  data: toolsManagerData,
  mapKey: [
    { title: "工具名称", dataIndex: "toolName", key: "toolName" },
    { title: "所属公司", dataIndex: "toolCompany", key: "toolCompany" },
    { title: "工具介绍", dataIndex: "toolIntroduce", key: "toolIntroduce" },
  ],
  // menu: formatMenu(menu),
};

// FPGA工具管理 end

// FPGA测试用例管理 start
const testCaseManagerData = [
  {
    menu_id: "testCase_1",
    key: "testCase_1",
    testToolName: "Xilinx Vivado",
    testDirection: "逻辑功能测试",
    testCase: "验证4输入AND门的功能",
    testContent: "使用Vivado创建新项目，包含一个4输入AND门电路",
    testMethod:
      "编写仿真测试台，定义输入信号。输入所有可能的输入组合（16种）并运行仿真。检查仿真波形，验证输出是否与AND门的真值表一致。",
    testResult:
      "对于输入0000、0001、0010、0011...1111，输出都与AND门真值表相匹配，符合预期结果。",
  },
  {
    menu_id: "testCase_2",
    key: "testCase_2",
    testToolName: "Altera Quartus Prime",
    testDirection: "时序测试",
    testCase: "验证时钟上升沿触发器的功能。",
    testContent: "使用Quartus Prime创建新项目，设计一个时钟上升沿触发器电路。",
    testMethod:
      "创建仿真测试台，包括时钟信号和数据输入信号。模拟时钟信号上升沿，同时改变数据输入信号。运行仿真并分析触发器的输出。",
    testResult:
      "时钟上升沿触发器：触发器在时钟上升沿捕获数据输入信号的值并在下一个时钟上升沿输出。时钟下降沿触发器：触发器在时钟下降沿捕获数据输入信号的值并在下一个时钟下降沿输出。",
  },
  {
    menu_id: "testCase_3",
    key: "testCase_3",
    testToolName: "Lattice Diamond",
    testDirection: "电路综合测试",
    testCase: "验证电路综合后的电路逻辑等效性。",
    testContent: "使用Lattice Diamond创建新项目，包含多个逻辑门",
    testMethod:
      "进行电路综合，生成综合后的网表。使用模拟器验证综合后的电路与原始RTL设计的行为是否一致。",
    testResult: "综合后的电路与原始RTL设计在逻辑功能上完全等效，输出一致。",
  },
  {
    menu_id: "testCase_4",
    key: "testCase_4",
    testToolName: "Microsemi Libero SoC",
    testDirection: "时序优化测试",
    testCase: " 进行时序闭环测试。",
    testContent: "使用Libero SoC创建新项目，包括时序约束和时序优化步骤。",
    testMethod:
      "添加时序约束以定义时钟频率和数据路径。运行时序优化，确保时序约束得到满足。",
    testResult:
      "时序闭环成功，时序约束得到满足，系统在目标时钟频率下稳定工作。",
  },
  {
    menu_id: "testCase_5",
    key: "testCase_5",
    testToolName: "Synopsys Synplify Pro",
    testDirection: "时钟分析",
    testCase: " 进行时钟域交叉分析。",
    testContent: "使用Synplify Pro创建新项目，包含不同时钟域的模块。",
    testMethod:
      "定义时钟域和数据路径。运行时钟域交叉分析工具，识别潜在的时序问题。",
    testResult: "时钟域交叉问题得到识别并解决，确保时序一致性。",
  },
  {
    menu_id: "testCase_6",
    key: "testCase_6",
    testToolName: "Altera Quartus Prime",
    testDirection: "时序测试",
    testCase: " 验证时钟边沿触发器的功能",
    testContent: "使用Synplify Pro创建新项目，包含不同时钟域的模块。",
    testMethod:
      "创建一个新的FPGA项目。在项目中添加一个时钟边沿触发器电路。设计一个测试环境，包括一个时钟信号和一个数据输入信号。编写测试脚本，模拟时钟信号上升沿和下降沿的情况，同时改变数据输入信号。运行仿真，检查触发器的输出与预期结果是否一致。",
    testResult:
      "时钟上升沿触发器：当时钟上升沿出现时，触发器捕获数据输入信号的值并在下一个时钟上升沿输出。时钟下降沿触发器：当时钟下降沿出现时，触发器捕获数据输入信号的值并在下一个时钟下降沿输出。",
  },
  {
    menu_id: "testCase_7",
    key: "testCase_7",
    testToolName: "Xilinx Vivado",
    testDirection: "逻辑功能测试",
    testCase: " 逻辑功能测试-验证基本逻辑门的功能",
    testContent: "验证基本逻辑门的功能",
    testMethod:
      "使用FPGA工具链创建一个新的FPGA项目。在项目中添加一个逻辑门电路，例如AND门。编写适当的输入测试向量，包括所有可能的输入组合。运行工具链中的仿真器，查看仿真结果。验证仿真结果是否与预期的逻辑门真值表相匹配。",
    testResult:
      "对于AND门：输入00，输出为0。输入01，输出为0。输入10，输出为0。输入11，输出为1。",
  },
];
const testCaseManager = {
  // status: 0,
  data: testCaseManagerData,
  mapKey: [
    { title: "测试工具", dataIndex: "testToolName", key: "testToolName" },
    { title: "测试方向", dataIndex: "testDirection", key: "testDirection" },
    { title: "测试用例", dataIndex: "testCase", key: "testCase" },
    { title: "测试内容", dataIndex: "testContent", key: "testContent" },
    { title: "测试方法", dataIndex: "testMethod", key: "testMethod" },
    { title: "测试结果", dataIndex: "testResult", key: "testResult" },
  ],
  // menu: formatMenu(menu),
};

// FPGA测试用例管理 end

// FPGA测试用例类型管理 start
const testCaseTypeManagerData = [
  {
    menu_id: "type_1",
    key: "type_1",
    typeName: "逻辑功能测试",
    typeIntroduce:
      "验证FPGA设计的逻辑功能是否按预期工作。这包括测试组合逻辑和时序逻辑，以确保设计在各种输入和时序条件下正确运行",
    typeExample:
      "AND、OR、NOT等基本逻辑门的功能验证。复杂逻辑电路（如加法器、乘法器等）的功能验证。逻辑门的组合和级联测试。",
  },
  {
    menu_id: "type_2",
    key: "type_2",
    typeName: "时序测试",
    typeIntroduce:
      "测试FPGA设计的时序要求是否满足。这包括验证时钟频率、时钟间隔、时序路径等，以确保设计在时序限制下能够正确工作。",
    typeExample:
      "时钟边沿的触发器（Flip-Flop）测试。同步和异步重置信号的测试。时序约束（Constraint）验证。",
  },
  {
    menu_id: "type_3",
    key: "type_3",
    typeName: "电路综合测试",
    typeIntroduce:
      "验证FPGA设计在综合过程中是否正确转换为门级电路。这包括验证逻辑等效性、时序一致性和资源利用等。",
    typeExample:
      "电路综合后的电路逻辑等效性验证。电路综合后的资源使用和功耗估算验证。",
  },
  {
    menu_id: "type_4",
    key: "type_4",
    typeName: "时序优化测试",
    typeIntroduce:
      "通过对FPGA设计进行优化，以改善时序性能。这包括优化关键路径、减少延迟和提高时钟频率等，以满足设计的时序要求。",
    typeExample:
      "时序驱动（Timing-Driven）综合和优化验证。 时序闭环（Timing Closure）测试。",
  },
  {
    menu_id: "type_5",
    key: "type_5",
    typeName: "IP核集成测试",
    typeIntroduce:
      "测试将第三方IP核集成到FPGA设计中的功能和兼容性。这包括验证IP核的接口、功能和性能，并确保其与其他设计模块正确交互。",
    typeExample:
      "第三方IP核的集成测试，包括验证其与FPGA设计的兼容性。IP核的性能和功能测试。",
  },
  {
    menu_id: "type_6",
    key: "type_6",
    typeName: "FPGA布局布线测试",
    typeIntroduce:
      "验证FPGA设计的布局和布线是否满足物理约束和时序要求。这包括测试布局布线工具的性能、资源利用和时序分析等。",
    typeExample:
      "FPGA芯片上的布局布线（Place and Route）验证。 路由（Routing）完整性测试。",
  },
  {
    menu_id: "type_7",
    key: "type_7",
    typeName: "时序分析和约束验证",
    typeIntroduce:
      "分析FPGA设计的时序路径和约束，并验证其是否满足时序要求。这包括时序分析、路径优化、约束验证和时序收敛等。",
    typeExample: "时序约束的正确性验证。时序分析报告的检查。",
  },
  {
    menu_id: "type_8",
    key: "type_8",
    typeName: "功耗测试",
    typeIntroduce:
      "评估FPGA设计的功耗消耗。这包括测试静态功耗、动态功耗和功耗优化策略，以确保设计在功耗方面符合要求。",
    typeExample:
      "FPGA设计的功耗分析。 电源管理单元（Power Management Unit）的功能验证。",
  },
  {
    menu_id: "type_9",
    key: "type_9",
    typeName: "仿真测试",
    typeIntroduce:
      "使用仿真工具对FPGA设计进行功能验证和性能评估。这包括功能仿真、时序仿真和性能仿真，以确保设计在各种情况下正常工作。",
    typeExample:
      "通过仿真工具验证设计在FPGA上的行为。仿真测试向量的生成和分析。",
  },
  {
    menu_id: "type_10",
    key: "type_10",
    typeName: "高级功能测试",
    typeIntroduce:
      "测试FPGA设计的高级功能和特性。这可能涉及测试高级算法、通信接口、图像处理、信号处理等，以验证设计在特定应用领域的功能和性能。",
    typeExample:
      "高速串行接口（如PCIe、Ethernet等）的功能验证。高级功能模块（如DSP块、片上RAM等）的性能测试。",
  },
];
const testCaseTypeManager = {
  // status: 0,
  data: testCaseTypeManagerData,
  mapKey: [
    { title: "用例类型名称", dataIndex: "typeName", key: "typeName" },
    { title: "类型介绍", dataIndex: "typeIntroduce", key: "typeIntroduce" },
    { title: "举例", dataIndex: "typeExample", key: "typeExample" },
  ],
  // menu: formatMenu(menu),
};

// FPGA测试用例类型管理 end


// FPGA大盘 start



// FPGA大盘 end

const userInfo = {
  msg: "登录成功",
  status: 0,
  token: "12323",
  data: {
    user_id: 1,
    username: "超级管理员",
    account: "admin",
    type: "0",
    isLogin: true,
  },
};

const addMenu = {
  msg: "添加成功,菜单栏需要关闭页面重新打开即可生效！",
  status: 0,
};
const addMsg = { msg: "添加成功", status: 0 };

const msgList: MessageList = [
  {
    m_id: 1,
    name: "第一条消息",
    description: "我创建的第一天消息",
    creator: "超级管理员",
    add_time: "2021-04-20 17:01:09",
  },
  {
    m_id: 2,
    name: "RegExp",
    description:
      "RegExp 对象表示正则表达式,它是对字符串执行模式匹配的强大工具。 ",
    creator: "超级管理员",
    add_time: "2021-04-20 17:48:42",
  },
  {
    m_id: 3,
    name: "Ant Design",
    description:
      "antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。",
    creator: "超级管理员",
    add_time: "2021-04-20 17:46:44",
  },
  {
    m_id: 4,
    name: "react-ant-admin",
    description:
      "此框架使用与二次开发，前端框架使用react，UI框架使用ant-design，全局数据状态管理使用redux，ajax使用库为axios。用于快速搭建中后台页面。",
    creator: "超级管理员",
    add_time: "2021-04-20 17:28:45",
  },
];
const msg: MessageAPi = {
  status: 0,
  data: {
    mapKey: [
      { title: "消息id", dataIndex: "m_id", key: "m_id" },
      { title: "消息名称", dataIndex: "name", key: "name" },
      { title: "消息描述词", dataIndex: "description", key: "description" },
      { title: "创建人", dataIndex: "creator", key: "creator" },
      { title: "创建时间", dataIndex: "add_time", key: "add_time" },
    ],
    list: msgList,
    total: 4,
  },

  msg: "",
};
const delMenu = { msg: "操作成功", status: 0 };
// const MenuMapKey = [
//   { title: "菜单id", dataIndex: "menu_id", key: "menu_id" },
//   { title: "菜单名称", dataIndex: "title", key: "title" },
//   { title: "菜单路由", dataIndex: "path", key: "path" },
//   { title: "菜单唯一key", dataIndex: "key", key: "key" },
//   { title: "菜单父级key", dataIndex: "parentKey", key: "parentKey" },
//   { title: "菜单图标", dataIndex: "icon", key: "icon" },
//   { title: "页面是否保持状态", dataIndex: "keepAlive", key: "keepAlive" },
//   { title: "菜单排序", dataIndex: "order", key: "order" },
// ]
const MockData: MockDataType = {
  "/getmenu": formatMenu(menu),
  "/getToolsManager": toolsManager,
  "/getTestCaseManager": testCaseManager,
  "/getTestCaseTypeManager": testCaseTypeManager,
  "/getpower": power,
  "/login": userInfo,
  "/addmenu": addMenu,
  "/addmessage": addMsg,
  "/getmessage": msg,
  "/delmenu": delMenu,
  "/getmenuinfo": { status: 0, msg: "", data: null },
  "/editmenuinfo": { status: 0, msg: "修改成功！" },
  // "/getvisitordata": { status: 1, msg: "暂无" },
  "/getvisitordata": visitData,
};
type UrlType = keyof MockDataType;
function get(url: UrlType) {
  return new Promise((res) => {
    setTimeout(() => {
      if (url === "/getmenu") {
        let typeId = currentUser.t_id;
        if (typeId) {
          let action: string | undefined | number[] = typeList.find(
            (i) => i.type_id === typeId
          )?.menu_id;
          action = action ? action.split(",").map(Number) : [];
          let menuList = menu.filter((i) =>
            (action as number[]).includes(i.menu_id)
          );
          MockData[url] = formatMenu(menuList);
        }
        res(MockData[url]);

        return;
      }

      res(MockData[url]);
    }, 500);
  }).then((res) => {
    if (res) {
      return res;
    } else {
      message.error("接口暂未配置");
      return Promise.reject("接口暂未配置");
    }
  });
}

function post(url: UrlType, data: any) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      switch (url) {
        case "/login":
          userInfo.data.account = data.account;
          if (data.account.indexOf("admin") === -1) {
            userInfo.data.type = "1";
            userInfo.data.username = "普通用户";
          }
          return res(userInfo);
        case "/addmenu":
          menu.push(data);
          return res(MockData[url]);
        case "/addmessage":
          msgList.push({
            ...data,
            m_id: Math.random(),
            creator: userInfo.data.username,
            add_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          });
          if (msg.data) {
            msg.data.total = msgList.length;
          }
          return res(MockData[url]);
        case "/delmenu":
          let newMenu = menu.filter((i) => i.key !== data.key);
          menu = newMenu.filter((i) => i.parentKey !== data.key);
          return res(MockData[url]);
        case "/getmenuinfo": {
          const findInfo = menu.find((i) => i.key === data.key);
          if (findInfo) {
            MockData[url].data = findInfo;
          }
          return res(MockData[url]);
        }
        case "/editmenuinfo":
          menu = menu.map((item) => {
            if (item.key === data.key) {
              return data;
            }
            return item;
          });
          return res(MockData[url]);
        case "/getmessage":
          let list = [...msgList];
          if (data.name) {
            list = list.filter((i) => i.name.includes(data.name));
          }
          if (data.description) {
            list = list.filter((i) => i.description.includes(data.description));
          }

          if (msg.data) {
            msg.data.total = list.length;
            msg.data.list = list;
          }
          return res(msg);
        default:
          res({ status: 1, msg: "暂无" });
          break;
      }
    }, 100);
  }).then((res: any) => {
    if (res.status === 0) {
      return res;
    } else {
      message.error("接口暂未配置");
      return Promise.reject("接口暂未配置");
    }
  });
}

const mock = { get, post };

export default mock;
