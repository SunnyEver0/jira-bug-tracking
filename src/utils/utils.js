export const util = {
  formatMobxArray(mobxArray) {
    if (mobxArray && mobxArray.length > 0) {
      mobxArray = mobxArray.slice();
    }
    return mobxArray || [];
  }
};
