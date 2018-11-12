import { ajax } from '../utils/';

export const homeService = {

  initHomeData() {
    return new Promise(function (resolve) {
      setTimeout(() => {
        resolve({
          bugInfo: {
            bugTotal: 126560,
            dayAdd: 12423,
            onLineBug: 8848,
            dayOnlineBug: 1234,
            notOnlineBug: 6560,
            dayBug: 100
          },
          bugMonthList: [
            {month: "1月", value: 1117},
            {month: "2月", value: 861},
            {month: "3月", value: 936},
            {month: "4月", value: 684},
            {month: "5月", value: 1025},
            {month: "6月", value: 583},
            {month: "7月", value: 837},
            {month: "8月", value: 560},
            {month: "9月", value: 655},
            {month: "10月", value: 258},
            {month: "11月", value: 402},
            {month: "12月", value: 364}
          ],
          bugCategory: {
            bugType: {
              'UIBug': 1000,
              'ServiceBug': 3000,
              'Other': 500,
            },
            bugState: [{
              'onhold': 1000,
              'not bug': 500,
              'code change': 1000
            }]
          }
        })
      }, 1000)
    })
    // return ajax.get('/wechat');
  }
}
