import { ajax } from '../utils/';

export const homeService = {

  initHomeData() {
    return new Promise(function (resolve) {
      setTimeout(() => {
        resolve({
          bugInfo: {
            bugTotal: 9999,
            dayAdd: 12423,
            onLineBug: 88899,
            dayOnlineBug: 1234,
            notOnlineBug: 656099,
            dayBug: 100
          },
          bugMonthList: [
            {month: "1", value: 1117},
            {month: "2", value: 861},
            {month: "3", value: 936},
            {month: "4", value: 684},
            {month: "5", value: 1025},
            {month: "6", value: 583},
            {month: "7", value: 837},
            {month: "8", value: 560},
            {month: "9", value: 655},
            {month: "10", value: 258},
            {month: "11", value: 402},
            {month: "12", value: 364}
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
