import { ref } from 'vue'
import { auth } from '@/firebase/config'
// getUser在后台执行.所以没必要显示动画

// refs
const user = $ref(auth.currentUser)



// 监听用户身份更改变换,只需一个监听器
auth.onAuthStateChanged(_user => {
  console.log('User state change. Current user is:', _user)
  user = _user
});

const getUser = () => {
  return $$({ user }) 
}

export default getUser