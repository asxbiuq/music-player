import { db } from '@/firebase/config'
import { doc } from "firebase/firestore";


const getDocRef = (docCol, docId) => {

  try {
    //这里不知道为什么报错
    const docRef = doc(db, docCol, docId);
    return docRef
  } catch (err) {
    // console.log('getDocRef is failed:', err.message)
  }

}

export default getDocRef