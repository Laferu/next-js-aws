import styled from 'styled-components'

export const StyledHeader = styled.header`
  /* padding: 0 15px; */

  @media screen and (min-width: 768px) {
    /* padding: 0 30px; */
  }
`

export const TitleContainer = styled.div`
  padding: 0 10px;
  margin-bottom: 15px;
`

export const UserHeaderContainer = styled.div`
  display: grid;
  max-width: 1000px;
  /* grid-template-columns: 1fr 300px; */
  column-gap: 50px;
  padding-bottom: 30px;
`

export const UserDataContainer = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  column-gap: 10px;
  row-gap: 10px;
  padding-left: 10px;
  white-space: nowrap;

  @media screen and (min-width: 768px) {
    grid-template-columns: 100px 1fr;
    padding-left: 30px;
    column-gap: 30px;
  }

  h1 {
    font-size: 20px;
    font-weight: 500;
    color: ${e => e.theme.palette.primary.main};
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;

    @media screen and (min-width: 768px) {
      font-size: 24px;
    }
  }

  .icon-container {
    mask: url('/assets/icons/papers.svg');
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
    background-color: ${e => e.theme.palette.secondary.dark};
    width: 40px;
    height: 46px;

    @media screen and (min-width: 768px) {
      width: 80px;
      height: 92px;
    }
  }

  .data-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100px;
    color: ${e => e.theme.palette.secondary.dark};
    font-weight: 500;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      font-size: 14px;

      @media screen and (min-width: 768px) {
        font-size: 16px;
      }
    }

    .amount {
      span {
        color: ${e => e.theme.palette.primary.main};
      }
    }
  }
`

export const TableWrapper = styled.div`
  max-height: 500px;
  display: flex;
  width: 100%;
  flex-direction: column;

  td[data-label='Categoria'] {
    text-transform: capitalize;
  }
`
