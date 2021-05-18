const formatMoney = (value: number, options?: object) => {
  const result = new Intl.NumberFormat(
    'pt-BR', {
      style: 'currency',
      currency: 'BRL',
      ...options
    }
  ).format(value)

  return result
}

export default formatMoney
