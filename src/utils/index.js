let MyPlugin = {
  install: (Vue) => {
    Vue.prototype.$formatTime = (time, format = 'YYYY-MM-DD') => { // 日期格式化函数
      if(!time) return
      // 将-替换成/防止苹果系不兼容
      time = time.replace ? time.replace(/-/g, '/') : time
      let tempDate = new Date(time)
      if(tempDate.toString() === 'Invalid Date'){ // 非法值不做转换
        return time
      }
      let year = tempDate.getFullYear() // 年
      let month = tempDate.getMonth() + 1 // 月
      month = month > 9 ? month : ('0' + month)
      let day = tempDate.getDate() // 日
      day = day > 9 ? day : ('0' + day)
      let hours = tempDate.getHours() // 时
      hours = hours > 9 ? hours : ('0' + hours)
      let minutes = tempDate.getMinutes() // 分
      minutes = minutes > 9 ? minutes : ('0' + minutes)
      let seconds = tempDate.getMinutes() // 秒
      seconds = seconds > 9 ? seconds : ('0' + seconds)
      if(format.toUpperCase() === 'YYYY-MM-DD'){
        return `${year}-${month}-${day}`
      }else if(format.toUpperCase() === 'YYYY/MM/DD'){
        return `${year}/${month}/${day}`
      }else if(format.toUpperCase() === 'YYYY-MM-DD HH:MM:SS'){
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      }else if(format.toUpperCase() === 'YYYY/MM/DD HH:MM:SS'){
        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
      }else if(format.toUpperCase() === 'YYYY-MM-DD HH:MM'){
        return `${year}-${month}-${day} ${hours}:${minutes}`
      }else if(format.toUpperCase() === 'MM-DD HH:MM:SS'){
        return `${month}-${day} ${hours}:${minutes}:${seconds}`
      }else if(format.toUpperCase() === 'YYYY/MM/DD HH:MM'){
        return `${year}/${month}/${day} ${hours}:${minutes}`
      }else if(format.toUpperCase() === 'YYYY/MM'){
        return `${year}/${month}`
      }else if(format.toUpperCase() === 'YYYY-MM'){
        return `${year}-${month}`
      }else if(format.toUpperCase() === 'MM-DD'){
        return `${month}-${day}`
      }else if(format.toUpperCase() === 'MM/DD'){
        return `${month}/${day}`
      }else if(format.toUpperCase() === 'HH:MM:SS'){
        return `${hours}:${minutes}:${seconds}`
      }else if(format.toUpperCase() === 'YYYY.MM.DD'){
        return `${year}.${month}.${day}`
      }else if(format.toUpperCase() === 'YYYY.MM'){
        return `${year}.${month}`
      }else{
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      }
    }
  }
}

export const deepClone = (data) => { // 简单的深拷贝方法
  if(Object.prototype.toString.call(data) === '[object Array]'){ // 数组
    let arr = []
    data.forEach(item => {
      if(['[object Array]', '[object Object]'].includes(Object.prototype.toString.call(item))){
        arr.push(deepClone(item))
      }else{
        arr.push(item)
      }
    })
    return arr
  }else if(Object.prototype.toString.call(data) === '[object Object]'){ // 对象
    let obj = {}
    for(let i in data){
      if(['[object Array]', '[object Object]'].includes(Object.prototype.toString.call(data[i]))){
        obj[i] = deepClone(data[i])
      }else{
        obj[i] = data[i]
      }
    }
    return obj
  }else{
    return data
  }
}

export default MyPlugin