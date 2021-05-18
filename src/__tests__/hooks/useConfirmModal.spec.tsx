import { renderHook, act } from '@testing-library/react-hooks'
import useConfirmModal from '@/hooks/useConfirmModal'
import { GlobalProvider } from '@/utils/Context'
import GlobalStyles from '@/styles/GlobalStyles'

const wrapper = ({ children }) => (
  <GlobalProvider>
    <GlobalStyles />
    {children}
  </GlobalProvider>
)

describe('useConfirmModal Hook', () => {
  let teste: string
  it('Verificar o modal', async () => {
    const { result } = renderHook(() => useConfirmModal('Teste bem sucedido', () => {}), {
      wrapper,
    })

    act(() => {
      teste = result.current.run()
    })

    expect(teste).toBe('Teste bem sucedido')
  })
})
