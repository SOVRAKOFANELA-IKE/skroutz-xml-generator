export const date = (): string => {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth()}-${date.getHours()} ${date.getMinutes()}:${date.getSeconds()}`
}
