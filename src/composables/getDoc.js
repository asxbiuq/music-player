import { ref, watchEffect } from "vue";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore"
import { reactive } from "vue";
import { query, where, orderBy } from "firebase/firestore";
import { getDocs } from "firebase/firestore";

//col为集合
//que为查询条件 如['userId', '==', user.uid]
//orderBy为排序属性,默认为createdAt
const getDoc = async (col, que, order = 'createdAt') => {

  const data = reactive([])
  const error = $ref(null)

  try {
    const q = query(collection(db, col), where(...que), orderBy(order));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      data.push({ ...doc.data(), id: doc.id })
      error = null
    })
  } catch (err) {
    console.log(err)
    error = 'could not fetch data (getDoc.js)'
  }

  // 追踪Snapshot状态和依赖,在其变更时关闭并重新运行
  // watchEffect((onInvalidate) => {
  //   onInvalidate(() => unsub())
  // })

  //返回reactive类型数据
  // console.log(data)
  return $$({ data, error })
}


export default getDoc
