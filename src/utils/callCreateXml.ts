import axios from 'axios'

export const callCreateXml = (): void => {
  axios
    .get('localhost:4001/')
    .then(() => {
      console.log('called')
    })
    .catch((err) => console.log(err))
}
