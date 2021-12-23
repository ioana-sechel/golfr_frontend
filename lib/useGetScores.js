import useSWR from 'swr'
import { getToken } from './userAuth'

export const USER_URL = userId => `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`

const useGetScores = userId => {
  const fetcher = extractData => async url => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok) {
      const error = new Error('There was an error while fetching the data.')
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json().then(extractData)
  }

  const userName = USER_URL(userId)
  const score = USER_URL(userId) + '/scores'

  const { data: name, error } = useSWR(userId && userName, fetcher(data => data.name))
  const { data: scores } = useSWR(userId && score, fetcher(data => data.scores))

  return { name, scores, error }
}


export default useGetScores
