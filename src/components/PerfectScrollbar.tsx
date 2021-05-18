import dynamic from 'next/dynamic'
import {default as Scrollbar, ScrollBarProps as ScrollBarPropsCopy } from 'react-perfect-scrollbar'
const NoCustomScrollbar = dynamic(() => import('@/styles/GlobalStyles').then(e => e.NoCustomScrollbar), { ssr: false })

const PerfectScrollbar = (props: ScrollBarPropsCopy) => {
  if (global.navigator) {
    if (
      navigator?.userAgent?.match(/Android/i)
      || navigator?.userAgent?.match(/webOS/i)
      || navigator?.userAgent?.match(/iPhone/i)
      || navigator?.userAgent?.match(/iPad/i)
      || navigator?.userAgent?.match(/iPod/i)
      || navigator?.userAgent?.match(/BlackBerry/i)
      || navigator?.userAgent?.match(/Windows Phone/i)
    ) {
      return (
        <NoCustomScrollbar {...props}>
          <div>
            {props.children}
          </div>
        </NoCustomScrollbar>
      )
    } else {
      return (
        <Scrollbar {...props} options={{
          wheelPropagation: props?.options?.wheelPropagation || false
        }}
        >
          <div>
            {props.children}
          </div>
        </Scrollbar>
      )
    }
  } else {
    return (
      <Scrollbar {...props} options={{
        wheelPropagation: false
      }}>
        <div>
          {props.children}
        </div>
      </Scrollbar>
    )
  }
}

export interface ScrollBarProps extends ScrollBarPropsCopy {}

export default PerfectScrollbar
