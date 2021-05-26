import { useContext, useCallback } from 'react'
import Link from 'next/link'

import { GlobalContext } from '@/utils/Context'
import {
  StyledHeader,
  Logo,
  UserInfo,
  Search,
  InputIcon,
  NotificationIcon,
  SearchAndNotificationContainer,
  AvatarContainer,
  HeaderRight,
  HamburgerMenu
} from '@/styles/components/Header'

interface IPersonProperties {
  name: string
}

interface IProfileProperties {
  person: IPersonProperties
}

interface HeaderProps {
  profile: IProfileProperties
}

const Header = ({ profile }: HeaderProps) => {
  const { state: { sidebarToggle, setSidebarToggle } } = useContext(GlobalContext)

  const name = profile.person.name.split(' ')

  const handleToggle = useCallback(() => setSidebarToggle(e => !e), [])

  return (
    <StyledHeader>
      <div>
        <Link href='/'>
          <a title='Swipe'>
            <Logo title='Swipe' src='/assets/swipe-logo-min.png' />
          </a>
        </Link>
      </div>

      <UserInfo>
        <h2>Olá, <span>{name[0]}!</span></h2>
        <h3>Ultimo acesso dia 12/02/2020 às 19h</h3>
      </UserInfo>
      <HamburgerMenu isOpen={sidebarToggle} onClick={handleToggle}>
        <div className='menu'>
          <span className='hamburguer'></span>
        </div>
      </HamburgerMenu>
      {/* <HeaderRight>
        <SearchAndNotificationContainer>
          <Search>
            <input type='text' placeholder='Search' />
            <InputIcon />
          </Search>
          <NotificationIcon />
        </SearchAndNotificationContainer>
        <AvatarContainer>
          <img src='/assets/perfil.jpg' />
        </AvatarContainer>
      </HeaderRight> */}
    </StyledHeader>
  )
}

export default Header
