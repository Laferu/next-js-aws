import { useContext } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { GlobalContext, GlobalProvider } from '@/utils/Context'
import GlobalStyles from '@/styles/GlobalStyles'

const wrapper = ({ children }) => (
  <GlobalProvider>
    <GlobalStyles />
    {children}
  </GlobalProvider>
)

describe('Context Hook', () => {
  it('Verificar o Context', () => {
    const { result } = renderHook(() => useContext(GlobalContext), {
      wrapper,
    })

    expect(result.current.state.messageConfirmModal).toBe('')
  })
})
