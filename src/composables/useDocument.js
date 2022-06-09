import { ref } from 'vue'
import getDocRef from 'composables/getDocRef'
import { getDoc, updateDoc as updateDocRaw } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { auth } from '@/firebase/config'
import getPlaylistIds from './getPlaylistsIds'
import { doc, deleteDoc as deleteDocRaw } from "firebase/firestore";

const useDocument = (collection, docId) => {
    const error = $ref(null)
    const isPending = $ref(false)

    // 状态 与 行为 相分离
    let docRef = getDocRef(collection, docId)

    const deleteDoc = async () => {
        isPending = true
        error = null

        try {
            await deleteDocRaw(doc(db, collection, docId));
            const res = await docRef.delete()
            isPending = false
            return res
        } catch (err) {
            console.log(err.message)
            isPending = false
            error = 'could not delete the document'
        }
    }

    const updateDoc = async (PlaylistId, updates) => {
        isPending = true
        error = null
        const uid = auth.currentUser.uid

        const PlaylistRef = doc(db, 'playlists', PlaylistId)

        try {
            const res = await updateDocRaw(PlaylistRef, updates)
            isPending = false
            return res
        } catch (err) {
            console.log(err.message)
            isPending = false
            error = 'could not update the document'
        }
    }

    const getDocData = async () => {
        
        const docSnap = await getDoc(docRef);
        const docData = $ref(null)


        if (docSnap.exists()) {
            docData = docSnap.data()
            // console.log(docData.userId)
        } else {
            error = 'that document does not exist'
            console.log("No such document!");
        }

        return $$({ docData })
    }

    // 追踪Snapshot状态和依赖,在其变更时关闭并重新运行,这样可以防止内存溢出


    return $$({ error, isPending, deleteDoc, updateDoc, getDocData })
}

export default useDocument