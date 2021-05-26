import { useCallback, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PerfectScrollbar from '@/components/PerfectScrollbar'
import useConfirmModal from '@/hooks/useConfirmModal';
import { GlobalContext } from '@/utils/Context'

import {
  Container,
  NavItem
} from '@/styles/components/Sidebar'


const menuList = [
  {
    title: 'Home',
    href: '/',
    icon: 'home'
  },
  {
    title: 'Histórico de transação',
    href: '/history-transactions',
    icon: 'extract'
  },
  {
    title: 'Usuários',
    href: '/users',
    icon: 'user'
  },
  {
    title: 'Configurações',
    href: '/settings',
    icon: 'settings'
  },
  {
    title: 'Sair',
    href: '/logout',
    icon: 'exit'
  },
]

const Sidebar = () => {
  const {
    state: {
      sidebarToggle,
      selectedMenu,
      setTransactionsData
    }
  } = useContext(GlobalContext)
  const { pathname, push } = useRouter()

  const removeCredentials = useCallback(() => {
    push('/logout')
  }, [])

  const exit = useConfirmModal('Tem certeza que deseja sair?', removeCredentials)

  const handleExit = useCallback(() => {
    exit.run()
  }, [])

  const resetTransactions = useCallback(() => {
    setTransactionsData(e => ({
      ...e,
      filters: [],
      transactions: [],
      pageCount: 1,
      currentPage: 1
    }))
  }, [])

  return (
    <Container isOpen={sidebarToggle}>
      <PerfectScrollbar>
        {menuList.map((e, index) => {
          return (
            <NavItem
              key={index}
              icon={e.icon}
              active={selectedMenu
                ? selectedMenu === e.href
                : `/${pathname.split('/')[1]}` === e.href}
            >
              {
                e.href === '/logout' ? (
                  <button onClick={handleExit}>{e.title}</button>
                ) : (
                  <Link href={e.href} passHref>
                    <a onClick={resetTransactions} title={e.title}>{e.title}</a>
                  </Link>
                )
              }
            </NavItem>
          )
        })}
      </PerfectScrollbar>
    </Container>
  )
}

export default Sidebar
