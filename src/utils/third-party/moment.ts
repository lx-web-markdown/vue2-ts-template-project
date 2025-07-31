import moment from 'moment'

// 获取当前时间（格式化）
function getCurrentTime() {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}

// 获取当前日期（格式化）
function getCurrentDate() {
  return moment().format('YYYY-MM-DD')
}

// 加减时间（如加天、加小时等）
function addTime(
  date: moment.MomentInput,
  amount: number,
  unit: moment.unitOfTime.DurationConstructor,
  format = 'YYYY-MM-DD HH:mm:ss'
) {
  return moment(date).add(amount, unit).format(format)
}

function subtractTime(
  date: moment.MomentInput,
  amount: number,
  unit: moment.unitOfTime.DurationConstructor,
  format = 'YYYY-MM-DD HH:mm:ss'
) {
  return moment(date).subtract(amount, unit).format(format)
}

// 时间比较
function isBefore(date1: moment.MomentInput, date2: moment.MomentInput, unit?: moment.unitOfTime.StartOf) {
  return moment(date1).isBefore(date2, unit)
}

function isAfter(date1: moment.MomentInput, date2: moment.MomentInput, unit?: moment.unitOfTime.StartOf) {
  return moment(date1).isAfter(date2, unit)
}

function isSame(date1: moment.MomentInput, date2: moment.MomentInput, unit?: moment.unitOfTime.StartOf) {
  return moment(date1).isSame(date2, unit)
}

// 时间差
function getTimeDifference(
  date1: moment.MomentInput,
  date2: moment.MomentInput,
  unit: moment.unitOfTime.Diff = 'milliseconds',
  float = false
) {
  return moment(date1).diff(moment(date2), unit, float)
}

// 时间格式化
function formatTime(date: moment.MomentInput, format = 'YYYY-MM-DD HH:mm:ss') {
  return moment(date).format(format)
}

// 解析字符串为时间
function parseTime(dateStr: string, format?: string) {
  return format ? moment(dateStr, format) : moment(dateStr)
}

// 获取时间戳
function getTimestamp(date: moment.MomentInput) {
  return moment(date).valueOf()
}

function getUnixTimestamp(date: moment.MomentInput) {
  return moment(date).unix()
}

export default {
  getCurrentTime,
  getCurrentDate,
  addTime,
  subtractTime,
  isBefore,
  isAfter,
  isSame,
  getTimeDifference,
  formatTime,
  parseTime,
  getTimestamp,
  getUnixTimestamp
}
