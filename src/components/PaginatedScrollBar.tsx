import InfiniteScroll from 'react-infinite-scroll-component'

import {
  PaginatedScrollVerticalChild,
  ContentPosition
} from '@/styles/components/PaginatedScrollBar'
import Loading from '@/components/Loading'

const PaginatedScrollBar = ({
  scrollableTarget,
  dataLength,
  hasMore,
  next,
  isLoading,
  children
}) => {
  const loadingContainer = (
    <ContentPosition visible={isLoading}>
      <Loading
        isLoading={isLoading}
        errorMessage=''
        isError={false}
        min
        noBackground
        children={<></>}
      />
    </ContentPosition>
  )

  const messageContainer = (
    // <ContentPosition visible={!hasMore}>
    //   <p>Não há mais resultados</p>
    // </ContentPosition>
    <></>
  )

  return (
    <InfiniteScroll
      dataLength={dataLength}
      next={next}
      hasMore={hasMore}
      loader={loadingContainer}
      // hasChildren={true}
      endMessage={messageContainer}
      scrollableTarget={scrollableTarget}
    >
      <PaginatedScrollVerticalChild>
        {children}
      </PaginatedScrollVerticalChild>
    </InfiniteScroll>
  )
}

export default PaginatedScrollBar
