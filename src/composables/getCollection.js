import { ref, watchEffect } from "vue";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore"


const getCollection = (col, que) => {
    const documents = ref(null)
    const error = ref(null)

    let colRef = collection(db,col)
        // .orderBy('createdAt')

    if(que){
        colRef = query(colRef, where(...que))
    }

    const unsub = onSnapshot(colRef,(snap) => {
        let results = []
        snap.docs.forEach(doc => {
            // 如果这里没有时间戳,将在本地直接生成一个,这里没有等待服务器响应一个时间戳
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
        })
        documents.value = results
        error.value = null   
    }, (err) => {
        console.log(err.message)
        documents.value = null
        error.value = 'could not fetch data'
    }) 
   
    // 追踪Snapshot状态和依赖,在其变更时关闭并重新运行,这样可以防止内存溢出
    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

    return { documents, error }
}

export default getCollection

