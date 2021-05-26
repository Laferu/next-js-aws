import { useEffect } from 'react'
import { useRouter } from 'next/router'

interface ProtectClientProps {
  auth?: boolean
}

const ProtectedClient = ({ auth = false }: ProtectClientProps) => {
  const router = useRouter()
  useEffect(() => {
    if (!auth) {
      // Se o usuário não estiver autenticado, redirecione ele para a página `/examples`
      router.push('/examples')
    }
  }, [])
  if (!auth) return null
  return <h1>Hello User from client route!</h1>
}
export default ProtectedClient
