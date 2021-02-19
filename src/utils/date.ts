export const date = (): string => {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
}
