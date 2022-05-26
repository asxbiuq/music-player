import { ref } from 'vue'
import getDocRef from 'composables/getDocRef'
import { getDoc, updateDoc as updateDocRaw } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { auth } from '@/firebase/config'
import { doc } from 'firebase/firestore'

const useDocument = (collection, docId) => {
    const error = ref(null)
    const isPending = ref(false)

    // 状态 与 行为 相分离
    let docRef = getDocRef(collection, docId)

    const deleteDoc = async () => {
        isPending.value = true
        error.value = null

        try {
            const res = await docRef.delete()
            isPending.value = false
            return res
        } catch (err) {
            console.log(err.message)
            isPending.value = false
            error.value = 'could not delete the document'
        }
    }

    const updateDoc = async (updates) => {
        isPending.value = true
        error.value = null
        const uid = auth.currentUser.uid
        const docRef =  doc(db, "playlists", uid)

        try {
            const res = await updateDocRaw(docRef, updates)
            isPending.value = false
            return res
        } catch (err) {
            console.log(err.message)
            isPending.value = false
            error.value = 'could not update the document'
        }
    }

    const getDocData = async () => {
        const docSnap = await getDoc(docRef);
        const docData = ref(null)


        if (docSnap.exists()) {
            docData.value = docSnap.data()
            // console.log(docData.value.userId)
        } else {
            error.value = 'that document does not exist'
            console.log("No such document!");
        }
        return { docData }
    }

    return { error, isPending, deleteDoc, updateDoc, getDocData }
}

export default useDocument