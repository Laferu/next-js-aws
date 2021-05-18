export const validatePassword = (e: string) => {
  const regex = /^(?=.*[Az])(?=.*[AZ])(?=.*\D)[a-zA-Z\d\w\W]{9,40}$/

  const result = regex.test(e)

  return result
}
