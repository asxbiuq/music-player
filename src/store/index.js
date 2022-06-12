const isPending = $ref(false)

const { isPending: isSignupPending } = $(useSignup())
const { isPending: isLoginPending } = $(useLogin())
const { isPending: isDocumentPending } = $(useDocument())
const { isPending: uploadImagePending } = $(useStorage())
const { isPending: addDocPending } = $(useCollection('playlists'))
const { isPending: MusicPending } = $(useStorage())

const useIsPending = () => {
  return $$({ isPending })
}

watchEffect(() => {
  if (isSignupPending || isLoginPending || isDocumentPending || uploadImagePending || addDocPending || MusicPending) {
    isPending = true
  } else {
    isPending = false
  }
  console.log('isPending is change, now is :', isPending)
})

export { useIsPending }