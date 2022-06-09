import { ref } from 'vue';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const error = $ref(null)
const isPending = $ref(false)

const login = async (email, password) => {
  error = null
  isPending = true

  try {
    const auth = getAuth()
    const res = await signInWithEmailAndPassword(auth, email, password)
    error = null
    isPending = false
    return res
  }
  catch (err) {
    console.log(err.message)
    error = 'Incorrect login credentials'
    isPending = false
  }
}

const useLogin = () => {
  return $$({ error, login, isPending })
}

export default useLogin