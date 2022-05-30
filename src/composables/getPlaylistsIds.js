import getCollection from './getCollection'
import getUser from './getUser'

const getPlaylistId = () => {
  const { user } = getUser()
  const { documents: playlistIds } = getCollection('users', ['userId', '==', user.value.uid])

  return playlistIds
}

export default getPlaylistId