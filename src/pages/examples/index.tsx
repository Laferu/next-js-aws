import { useCallback, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'

import SEO from '@/components/SEO'
// import { GlobalContext } from '@/utils/Context'
import { useGet, usePost } from '@/hooks/useRest'
import { getServerSide } from '@/functions/restServerSide'

const Modal = dynamic(
  () => import ('@/components/examples/Modal'),
  { loading: () => <p>Carregando...</p>, ssr: false }
)

export interface ITest {
  id: number
  title: string
}

export interface ExamplesProps {
  dataArray: ITest[]
}

const Examples = ({ dataArray }: ExamplesProps) => {
  // const { url, state } = useContext(GlobalContext)
  const [isModal, setIsModal] = useState(false)
  const testeGet = useGet('data')
  const post = usePost('data')

  useEffect(() => {
    console.log(dataArray)
  }, [])

  const handleModal = useCallback(async () => {
    setIsModal(e => !e)
  }, [])

  const handlePost = useCallback(async () => {
    // const data = await axios.post('http://localhost:3333/data', { id: 3, title: 'teste3' })

    post.post({ id: 12, title: "teste12" })
  }, [])

  const handleGet = useCallback(async () => {
    const get = await testeGet.refetch()

    console.log(get)
  }, [])

  // DYNAMIC IMPORT EXAMPLE
  // const handleSum = () => {
  //   const math = await import('../lib/math')

  //   alert(math.sum(3, 5))
  // }

  return (
    <div>
      <SEO
        title='Swipe'
        shouldExcludeTitleSuffix
        image='logo.png'
      />
      <h1>Hello World</h1>
      {dataArray.map(e => {
        return (
          <p key={e.id}>{e.title}</p>
        )
      })}
      <button onClick={handleModal}>
        Open Modal
      </button>
      <button onClick={handleGet}>
        Get Test
      </button>
      <button onClick={handlePost}>
        Post Test
      </button>

      {isModal && <Modal />}
    </div>
  )
}

export const testeGetServerSide = () => {
  const get = useGet('data')

  const teste = get.refetch()

  return teste
}

// SOMENTE PARA DADOS DO SERVIDOR QUE PRECISAM ESTAR DISPONÍVEIS NO PRIMEIRO CARREGAMENTO
export const getServerSideProps: GetServerSideProps<ExamplesProps> = async () => {
  const data = await getServerSide('data')

  // console.log(get)

  // const data = await axios.get('http://localhost:3333/data')

  return {
    props: {
      dataArray: data.data
    }
  }
}

export default Examples
