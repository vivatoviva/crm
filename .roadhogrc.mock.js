import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { recentData, listData, detailData, contactData, followData } from './mock/source'
import { employeeList } from './mock/employee'
import { format, delay } from 'roadhog-api-doc';
import { userInfo } from './mock/info';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    $desc: '获取当前用户接口',
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'genluo',
      avatar: 'https://avatars1.githubusercontent.com/u/26970959?s=460&v=4',
      userid: '00000001',
      notifyCount: 4,
    },
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/rule': getRule,
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
  'GET /api/fake_list': getFakeList,
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    if (password === '88888888' && userName === 'customer') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'customer',
      });
      return;
    }
    if (password === '88888888' && userName === 'seller') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'seller',
      });
      return;
    }
    if (password === '88888888' && userName === 'supervisor') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'supervisor',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  // mock数据
  // 资源信息(旧的)
  'GET /api/source/recent': recentData,
  'POST /api/source/list': listData,
  'GET /api/source/detail': detailData,
  'GET /api/source/record/list': contactData,
  'POST /api/query/follow': followData,
  'POST /api/source/delete': {},
  'POST /api/source/dispatch': {},
  'POST /api/source/modify': detailData,
  'POST /api/source/sign': {},
  'POST /api/source/retreat': {},
  'POST /api/source/record/operate': {
    data: {
      'recordId': 1,
      'recordType': 1,
      'status|1-5': 1,
      'recordContent': '新增，mock数据',
      person: 'genluo',
      recordPrice: '100',
      recordTime: 1280977330000,
      createTime: 1280977330000,
    }
  },
  'GET /api/source/record/delete': {},
  'POST /api/source/contract/add': {},
  'POST /api/source/add': {
    data: {
      sourceId: '1',
    }
  },
  
  //用户信息
  'GET /api/user/info': userInfo,
  // 员工接口
  'POST /api/user/list': employeeList,
  'POST /api/user/operate': {
    data: {
      "userId": "420000198901205236",
      "userName": "冯秀英",
      "userPermission": 1,
      "userPhone": 177784455445,
      "userProject_num": 20,
      "userRank": 1
    }
  },
  'POST /api/user/delete': {
    code: '10001',
    msg: '',
    data: {}
  },

};

export default (noProxy ? {} : delay(proxy, 1000));
