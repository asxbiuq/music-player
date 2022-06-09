import { ref } from "vue";
import { getDoc } from "firebase/firestore";
// getCollection 一直保持者链接,所以没必要加动画
import getDocRef from "composables/getDocRef";

//col为集合 docId 为文档id
const getDocData = async (col, docId) => {
    //col 是集合 docId是 集合下的次目录 ,docId在这个项目里和uid一致


    let docRef =  getDocRef(col, docId)

    const docSnap = await getDoc(docRef);

    const docData = $ref(null)
    const error = $ref(null)

    if (docSnap.exists()) {
        docData = docSnap.data()
        console.log('docData:', docData)
    } else {
        // doc.data() will be undefined in this case
        error = 'that document does not exist'
        console.log("No such document!");
    }



    return $$({ docData, error })

}



export default getDocData

