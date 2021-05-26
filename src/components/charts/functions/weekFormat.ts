import { sub } from 'date-fns'

interface WeekFormatProps {
  value: number
  date: Date
}

const weekFormat = (data: WeekFormatProps[]) => {
  const dateNow = new Date()

  const weeks = [
    {
      name: '4° Sem',
      date: sub(dateNow, { weeks: 0 })
    },
    {
      name: '3° Sem',
      date: sub(dateNow, { weeks: 1 })
    },
    {
      name: '2° Sem',
      date: sub(dateNow, { weeks: 2 })
    },
    {
      name: '1° Sem',
      date: sub(dateNow, { weeks: 3 })
    },
  ]

  const dataFormated = data.map(e => {
    const week = weeks.filter(f => {
      if (f.date <= e.date) {

        return true
      }
      return false
    })

    return { ...e, label: week[0]?.name || '' }
  }).reduce((acc, cur, index) => {
    if (index !== 0 && acc[index - 1]?.label === cur.label) {
      acc.push({ ...cur, label: '' })
    } else {
      acc.push(cur)
    }

    return acc;
  }, [])

  return dataFormated
}

export default weekFormat
