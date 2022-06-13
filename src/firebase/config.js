import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage"
import { Timestamp } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAUVPQw7GCL5o3U6TcwH9C0KHfF86VI9JM",
  authDomain: "music-player-273f1.firebaseapp.com",
  projectId: "music-player-273f1",
  storageBucket: "music-player-273f1.appspot.com",
  messagingSenderId: "477319477581",
  appId: "1:477319477581:web:14bb66c2f1d94b780d9f04"
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
