import {
  useEffect,
  useCallback,
  useState,
} from 'react'
import Link from 'next/link'

import { Container } from '@/styles/components/BreadCrumb'

interface IPages {
  name: string
  url: string
}

interface BreadCrumbProps {
  pages: IPages[]
}

const BreadCrumb = ({ pages }: BreadCrumbProps) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const pathArray = useCallback(() => {
    const newArray = pages.map(e => {
      return {
        breadcrumb: e.name,
        href: e.url
      }
    })

    setBreadcrumbs([...newArray]);
  }, [pages])

  useEffect(() => {
    pathArray()
  }, [pathArray])

  return (
    <Container>
      <ul className="breadcrumb">
        {/* <li>
          <a href="/">HOME</a>
        </li> */}
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <li key={index}>
              <Link href={breadcrumb.href}>
                <a title={breadcrumb.breadcrumb}>
                  {breadcrumb.breadcrumb}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

export default BreadCrumb
