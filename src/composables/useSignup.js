import { ref } from "vue"
import { createUserWithEmailAndPassword, updateProfile, getAuth } from "firebase/auth";
import useCollection from "./useCollection";

const error = ref(null)
const isPending = ref(false)

const signup = async (email, password, col,name, photoURL) => {
    error.value = null
    isPending.value = true

    try {
        const auth = getAuth();
        // 这里需要把email toString()才行 ,firebase9不需要
        const res = await createUserWithEmailAndPassword(auth, email, password)
        if (!res) {
            throw new Error('Could not complete the signup')
        }

        // updateProfile(auth.currentUser, {
        //     displayName: name, photoURL: photoURL
        // })
        // 这里需要 error 设置为 null 防止向用户报错
        error.value = null
        isPending.value = false

        console.log(res.user)

        return res

    } catch (err) {
        console.log(err.message)
        error.value = err.message
        isPending.value = false
    }
}

// 这样写的话error就有缓存了,不用每次调用都执行一次signup都生成
//一个error变量,只要有一个就可以表示发生的错误类型
const useSignup = () => {
    return { error, signup, isPending }
}

export default useSignup