import { ref, watchEffect } from "vue";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore"
import { reactive } from "vue";
import { query, where, orderBy } from "firebase/firestore";
import getUser from "composables/getUser"
import { getDocs } from "firebase/firestore";



//col为集合  
//que为查询条件 如['userId', '==', user.value.uid]
//orderBy为排序属性,默认为createdAt
const getDoc = async (col, que, orderBy = 'createdAt') => {

    const data = reactive([])

    const q = query(collection(db, col), where(...que), orderBy(orderBy));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        playlists.push({ ...doc.data(), id: doc.id })
    })
    //返回reactive类型数据
    return data
}



const getCollection = (col, que) => {
    let documents = reactive({})
    const error = ref(null)
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

export { getCollection, getDoc }
export default getCollection
