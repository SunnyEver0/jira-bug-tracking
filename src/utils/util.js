export const utils = {
  transformData (data) {
    return data.map(item => {
      return {
        x: item.month + '月',
        y: item.value
      }
    })
  }
}
