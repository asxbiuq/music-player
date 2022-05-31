import { storage } from '@/firebase/config'
import { ref } from "vue"
import getUser from "composables/getUser"
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase/config';
import { getStorage, ref as fireRef, deleteObject } from "firebase/storage";
const { user } = getUser()

const useStorage = () => {
    const error = ref(null)
    let url = ref(null)
    const filePath = ref(null)
    const isPending = ref(false)

    const uploadImage = async (file) => {
        isPending.value = true
        filePath.value = `covers/${user.value.uid}/${file.name}`
        const storageRef = fireRef(storage, filePath.value);
        try {
            //需要先上传,所以这里需要阻塞以下
            await uploadBytes(storageRef, file)
                .then((snapshot) => {
                    console.log('Uploaded file!')
                })
            url = await getDownloadURL(storageRef)
                .then(url => {
                    return url
                })
            error.value = null
            isPending.value = false
            return url
        } catch (err) {
            console.log(err.message)
            error.value = err
        }
    }

    const deleteImage = async (filePath) => {
        isPending.value = true
        // filePath.value = `covers/${user.value.uid}/${file.name}`
        const desertRef = fireRef(storage, filePath);
        // Delete the file
        deleteObject(desertRef).then(() => {
            // File deleted successfully

            console.log(filePath," is delete success")
            error.value = null
            isPending.value = false
        }).catch((err) => {
            // Uh-oh, an error occurred!
            console.log(err.message)
            error.value = err.message
        });
        // try {
        //     await deleteDoc(doc(db, col, doc));

        //     error.value = null
        //     isPending.value = false
        // } catch (err) {
        //     console.log(err.message)
        //     error.value = err.message
        // }
    }



    return { url, filePath, error, uploadImage, deleteImage, isPending }
}

export default useStorage








