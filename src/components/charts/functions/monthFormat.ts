import { sub, format } from 'date-fns'

interface monthFormatProps {
  value: number
  date: Date
}

const monthFormat = (data: monthFormatProps[]) => {
  const dateNow = new Date()

  const months = [
    {
      name: format(dateNow, 'MMM'),
      date: sub(dateNow, { months: 0 })
    },
    {
      name: format(sub(dateNow, { months: 1 }), 'MMM'),
      date: sub(dateNow, { months: 1 })
    },
    {
      name: format(sub(dateNow, { months: 2 }), 'MMM'),
      date: sub(dateNow, { months: 2 })
    },
    {
      name: format(sub(dateNow, { months: 3 }), 'MMM'),
      date: sub(dateNow, { months: 3 })
    },
    {
      name: format(sub(dateNow, { months: 4 }), 'MMM'),
      date: sub(dateNow, { months: 4 })
    },
    {
      name: format(sub(dateNow, { months: 5 }), 'MMM'),
      date: sub(dateNow, { months: 5 })
    },
    {
      name: format(sub(dateNow, { months: 6 }), 'MMM'),
      date: sub(dateNow, { months: 6 })
    },
    {
      name: format(sub(dateNow, { months: 7 }), 'MMM'),
      date: sub(dateNow, { months: 7 })
    },
    {
      name: format(sub(dateNow, { months: 8 }), 'MMM'),
      date: sub(dateNow, { months: 8 })
    },
    {
      name: format(sub(dateNow, { months: 9 }), 'MMM'),
      date: sub(dateNow, { months: 9 })
    },
    {
      name: format(sub(dateNow, { months: 10 }), 'MMM'),
      date: sub(dateNow, { months: 10 })
    },
    {
      name: format(sub(dateNow, { months: 11 }), 'MMM'),
      date: sub(dateNow, { months: 11 })
    }
  ]

  const dataFormated = data.map(e => {
    const month = months.filter(f => {
      if (f.date <= e.date) {

        return true
      }
      return false
    })

    return { ...e, label: month[0]?.name || '' }
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

export default monthFormat
