import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const date = new Date()

export const getDayName = () => {
  const dayName = dayjs(date).format('dddd')
  return dayName
}

export const getDayPeriod = () => {
  const hour = Number(dayjs(date).format('H'))

  if (hour < 5) return 'dawn'
  else if (hour < 12) return 'morning'
  else if (hour < 17) return 'afternoon'
  else if (hour < 20) return 'evening'
  else if (hour < 24) return 'night'
  else return ''
}

export const getYear = () => {
  const year = dayjs(date).format('YYYY')
  return year
}

export const getDayNamePeriod = () => {
  const dayNamePeriod = `${getDayName()} ${getDayPeriod()}`
  return dayNamePeriod
}

export const getJoinedDate = (date) => {
  const joinedDate = dayjs(date).format('MMMM YYYY')
  return joinedDate
}

export const getPublishedDate = (date) => {
  const publishedDate = dayjs(date).format('D MMMM YYYY')
  return publishedDate
}

export const getRelativePublishedDate = (date) => {
  const relativePublishedDate = dayjs().to(dayjs(date))
  return relativePublishedDate
}

export const dayNamePeriod = `${getDayName()} ${getDayPeriod()}`
