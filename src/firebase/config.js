import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage"
import { Timestamp } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAfxiLj1tYScQcWeQNazne0cQb9Y9n0ECw",
  authDomain: "my-project-3000-fbea1.firebaseapp.com",
  projectId: "my-project-3000-fbea1",
  storageBucket: "my-project-3000-fbea1.appspot.com",
  messagingSenderId: "537083208389",
  appId: "1:537083208389:web:e5ded69153d895e70546ac"
};

initializeApp(firebaseConfig)
//数据库实例
const db = getFirestore()
//鉴权
const auth = getAuth()
// 使用storage
const storage = getStorage()
// 时间戳
const timestamp = Timestamp.now()

// 导出数据库服务实例
export { db, storage, timestamp, auth }
