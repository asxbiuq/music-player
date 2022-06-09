import { db } from '@/firebase/config'
import { getAuth } from 'firebase/auth';
import { doc } from "firebase/firestore";
import getUser from 'composables/getUser';
import { ref } from 'vue'
import { auth } from '../firebase/config'

const getDocId = () => {
  try {
    // refs
    const user = $ref(auth.currentUser)

    // 监听用户身份更改变换
    auth.onAuthStateChanged(_user => {
      user = _user
    });

    const uid = user.uid
    // 这里docId 等于 uid ,仅限本项目
    const docId = uid
    console.log("docId: ", docId)
  } catch (err) {
    console.log("getDocId is fail, err:", err.message)
  }
  return docId
}

export default getDocId