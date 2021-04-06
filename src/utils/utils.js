/**
 * 
 * @param { 时间(s) } time 
 * @returns 分:秒(3:00)
 */
export function getTime(time) {
  const minutes = Math.floor(time / 60)
  let seconds = Math.floor(time % 60).toString()
  seconds = seconds.padStart(2,'0')
  return `${minutes}:${seconds}`
}