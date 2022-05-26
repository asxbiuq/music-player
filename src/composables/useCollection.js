import { ref } from 'vue'
import { db } from '@/firebase/config'
import { getAuth } from 'firebase/auth';
import { doc, setDoc, getDoc as getDocRaw } from "firebase/firestore";

const useCollection = (col) => {
  // 因为我们可能会使用多个集合,所以生成一个全局的error没有意义,需要每次都生成一个
  let error = ref(null)
  const isPending = ref(false)

  const addDoc = async (docData) => {
    error.value = null
    isPending.value = true

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const uid = user.uid;
      await setDoc(doc(db, col, uid + ''), docData);

      isPending.value = false
    }
    catch (err) {
      console.log(err.message)
      error.value = 'could not send the message'
      isPending.value = false
    }
  }
  const getDoc = async () => {
    const auth = getAuth(); 
    const user = auth.currentUser;
    const uid = user.uid;
    const docRef = doc(db, col, uid + '');
    const docSnap = await getDocRaw(docRef);

    return docSnap
  }

  return { error, addDoc, isPending, getDoc }
}

export default useCollection