import { sub, format } from 'date-fns'

interface yearFormatProps {
  value: number
  date: Date
}

const yearFormat = (data: yearFormatProps[]) => {
  const dateNow = new Date()

  const years = [
    {
      name: format(dateNow, 'yyyy'),
      date: sub(dateNow, { years: 0 })
    },
    {
      name: format(sub(dateNow, { years: 1 }), 'yyyy'),
      date: sub(dateNow, { years: 1 })
    },
    {
      name: format(sub(dateNow, { years: 2 }), 'yyyy'),
      date: sub(dateNow, { years: 2 })
    },
    {
      name: format(sub(dateNow, { years: 3 }), 'yyyy'),
      date: sub(dateNow, { years: 3 })
    },
    {
      name: format(sub(dateNow, { years: 4 }), 'yyyy'),
      date: sub(dateNow, { years: 4 })
    },
    {
      name: format(sub(dateNow, { years: 5 }), 'yyyy'),
      date: sub(dateNow, { years: 5 })
    },
    {
      name: format(sub(dateNow, { years: 6 }), 'yyyy'),
      date: sub(dateNow, { years: 6 })
    },
    {
      name: format(sub(dateNow, { years: 7 }), 'yyyy'),
      date: sub(dateNow, { years: 7 })
    },
    {
      name: format(sub(dateNow, { years: 8 }), 'yyyy'),
      date: sub(dateNow, { years: 8 })
    },
    {
      name: format(sub(dateNow, { years: 9 }), 'yyyy'),
      date: sub(dateNow, { years: 9 })
    },
  ]

  const dataFormated = data.map(e => {
    const year = years.filter(f => {
      if (f.date <= e.date) {

        return true
      }
      return false
    })

    return { ...e, label: year[0]?.name || '' }
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

export default yearFormat
