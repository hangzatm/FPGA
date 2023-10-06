// 大盘的数据 mock
export const dapanData = {
  status: 0,
  data: {
    deal: [
      {
        time: "2023-08-19",
        value: 12,
      },
      {
        time: "2023-08-20",
        value: 10,
      },
      {
        time: "2023-08-21",
        value: 41,
      },
      {
        time: "2023-08-22",
        value: 43,
      },
      {
        time: "2023-08-23",
        value: 61,
      },
      {
        time: "2023-08-24",
        value: 38,
      },
      {
        time: "2023-08-25",
        value: 39,
      },
      {
        time: "2023-08-26",
        value: 10,
      },
      {
        time: "2023-08-27",
        value: 14,
      },
      {
        time: "2023-08-28",
        value: 50,
      },
      {
        time: "2023-08-29",
        value: 36,
      },
      {
        time: "2023-08-30",
        value: 41,
      },
      {
        time: "2023-08-31",
        value: 47,
      },
      {
        time: "2023-09-01",
        value: 43,
      },
      {
        time: "2023-09-02",
        value: 21,
      },
      {
        time: "2023-09-03",
        value: 15,
      },
      {
        time: "2023-09-04",
        value: 46,
      },
      {
        time: "2023-09-05",
        value: 49,
      },
      {
        time: "2023-09-06",
        value: 52,
      },
      {
        time: "2023-09-07",
        value: 42,
      },
      {
        time: "2023-09-08",
        value: 47,
      },
      {
        time: "2023-09-09",
        value: 15,
      },
      {
        time: "2023-09-10",
        value: 14,
      },
      {
        time: "2023-09-11",
        value: 45,
      },
      {
        time: "2023-09-12",
        value: 40,
      },
      {
        time: "2023-09-13",
        value: 41,
      },
      {
        time: "2023-09-14",
        value: 45,
      },
      {
        time: "2023-09-15",
        value: 45,
      },
      {
        time: "2023-09-16",
        value: 22,
      },
      {
        time: "2023-09-17",
        value: 13,
      },
      {
        time: "2023-09-18",
        value: 47,
      },
      {
        time: "2023-09-19",
        value: 47,
      },
      {
        time: "2023-09-20",
        value: 33,
      },
      {
        time: "2023-09-21",
        value: 41,
      },
      {
        time: "2023-09-22",
        value: 42,
      },
      {
        time: "2023-09-23",
        value: 12,
      },
      {
        time: "2023-09-24",
        value: 13,
      },
      {
        time: "2023-09-25",
        value: 33,
      },
      {
        time: "2023-09-26",
        value: 42,
      },
      {
        time: "2023-09-27",
        value: 33,
      },
      {
        time: "2023-09-28",
        value: 37,
      },
      {
        time: "2023-09-29",
        value: 13,
      },
      {
        time: "2023-09-30",
        value: 7,
      },
      {
        time: "2023-10-01",
        value: 8,
      },
      {
        time: "2023-10-02",
        value: 14,
      },
      {
        time: "2023-10-03",
        value: 15,
      },
      {
        time: "2023-10-04",
        value: 8,
      },
      {
        time: "2023-10-05",
        value: 12,
      },
      {
        time: "2023-10-06",
        value: 18,
      },
    ],
    today: {
      deal: 51,
      ips: 18,
    },
  },
};

export const visitData = {
  status: 0,
  data: {
    list: [
      {
        url: "/login",
        time: "2023-10-05 22:52:41",
        status: "200",
        visitor: "管理员",
        s_id: 1,
      },
      {
        url: "/getmenu",
        time: "2023-10-05 12:22:11",
        status: "304",
        visitor: "管理员",
        s_id: 2,
      },
      {
        url: "/getpower",
        time: "2023-10-04 14:11:05",
        status: "304",
        visitor: "李同学",
        s_id: 3,
      },
      {
        url: "/getmenu",
        time: "2023-10-04 02:18:34",
        status: "304",
        visitor: "王同学",
        s_id: 4,
      },
      {
        url: "/getmessage",
        time: "2023-10-04 02:22:53",
        status: "200",
        visitor: "李同学",
        s_id: 5,
      },
      {
        url: "/login",
        time: "2023-10-03 15:12:13",
        status: "200",
        visitor: "王同学",
        s_id: 6,
      },
      {
        url: "/getmenu",
        time: "2023-10-03 16:13:11",
        status: "200",
        visitor: "王同学",
        s_id: 7,
      },
      {
        url: "/getmenu",
        time: "2023-10-03 15:12:55",
        status: "304",
        visitor: "黄同学",
        s_id: 8,
      },
      {
        url: "/getmessage",
        time: "2023-10-03 14:55:44",
        status: "200",
        visitor: "黄同学",
        s_id: 9,
      },
      {
        url: "/login",
        time: "2023-10-02 21:03:31",
        status: "200",
        visitor: "虞同学",
        s_id: 10,
      },
    ],
    total: 110613,
    mapKey: [
      {
        title: "访问序号",
        dataIndex: "s_id",
        key: "s_id",
      },
      {
        title: "访问人员",
        dataIndex: "visitor",
        key: "visitor",
      },
      {
        title: "访问地址",
        dataIndex: "url",
        key: "url",
      },
      {
        title: "访问时间",
        dataIndex: "time",
        key: "time",
      },
      {
        title: "访问状态码",
        dataIndex: "status",
        key: "status",
      },
    ],
  },
};
