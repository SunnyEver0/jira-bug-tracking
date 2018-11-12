export const util = {
  formatMobxArray(mobxArray) {
    if (mobxArray && mobxArray.length > 0) {
      mobxArray = mobxArray.slice();
    }
    return mobxArray || [];
  },

  transformData(data) {
    return data.map(item => {
      return {
        x: item.month + '月',
        y: item.value
      }
    })
  }
};
