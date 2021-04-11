/**
 * 
 * @param { 时间(s) } time 
 * @returns 分:秒(3:00)
 */
export function getTime(time) {
  const minutes = Math.floor(time / 60)
  let seconds = Math.floor(time % 60).toString()
  seconds = seconds.padStart(2, '0')
  return `${minutes}:${seconds}`
}

/**
 * 
 * @param {最小值} min 
 * @param {最大值} max 
 * @returns [min~max]之间的一个随机数
 */
export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(array) {
  const newArray = [...array]
  console.log("newArray",newArray);
  for (let index = 0; index < newArray.length; index++) {
    const randomNum = getRandom(0, index)
    const temp = newArray[index];
    newArray[index] = newArray[randomNum]
    newArray[randomNum] = temp
  }
  return newArray
}

/**
 * 
 * @param {时间(00:00)} time 
 * @returns 多少秒(例200s)
 */
export function getTimeFormate(time){
  const index = time.indexOf(":");
  const min = time.substring(0, index);
  const seconds = time.substring(index + 1, time.length);
  return min * 60 + seconds * 1;
}