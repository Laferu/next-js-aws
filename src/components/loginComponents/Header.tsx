import { useContext } from 'react'
import Link from 'next/link'
import { GlobalContext } from '@/utils/Context'

import { StyledHeader } from '@/styles/components/loginComponents/Header'

const Header = () => {
  const { url } = useContext(GlobalContext)
  return (
    <StyledHeader>
      <Link href={'/'} passHref>
        <a title='Swipe'>
          <img width='230' title='Swipe' src='/assets/swipe-logo.png' />
        </a>
      </Link>
    </StyledHeader>
  )
}

export default Header
