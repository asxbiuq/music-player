import { ref, watchEffect } from "vue";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore"
import { reactive } from "vue";
import { query, where, orderBy } from "firebase/firestore";
import getUser from "composables/getUser"
import { getDocs } from "firebase/firestore";




const getCollection = (col, que) => {
    let documents = reactive({})
    const error = $ref(null)
    let colRef = collection(db, col)
    // .orderBy('createdAt')


    if (que) {
        // colRef = query(colRef, where(...que))
        colRef = query(colRef, where(...que), orderBy('createdAt'));
    }

    const unsub = onSnapshot(colRef, (snap) => {
        let results = []
        snap.docs.forEach(doc => {
            // 如果这里没有时间戳,将在本地直接生成一个,这里没有等待服务器响应一个时间戳
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
        })
        documents = results
        console.log('documents: ', documents)
        error = null
    }, (err) => {
        console.log(err.message)
        documents = null
        error = 'could not fetch data'
    })

    // 追踪Snapshot状态和依赖,在其变更时关闭并重新运行,这样可以防止内存溢出
    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

    return $$({ documents, error })
}


export default getCollection
