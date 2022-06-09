import { ref } from 'vue'
import { auth } from '@/firebase/config'

const error = $ref(null)
const isPending = $ref(false)

const logout = async () => {
  error = null
  isPending = true

  try {
    await auth  .signOut()
    isPending = false
  }
  catch(err) {
    console.log(err.message)
    error = err.message
    isPending = false
  }
}

const useLogout = () => {
  return $$({ error, logout, isPending })
}

export default useLogout