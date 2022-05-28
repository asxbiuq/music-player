import { storage } from '@/firebase/config'
import { ref } from "vue"
import getUser from "composables/getUser"
import { ref as fireRef, uploadBytes, getDownloadURL } from "firebase/storage";

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

    const deleteImage = async (path) => {
        isPending.value = true
        const storageRef = ref(storage);

        try {
            await storageRef.delete()
            error.value = null
            isPending.value = false
        } catch (err) {
            console.log(err.message)
            error.value = err.message
        }
    }



    return { url, filePath, error, uploadImage, deleteImage, isPending }
}

export default useStorage








