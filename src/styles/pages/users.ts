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
  grid-template-columns: 1fr 300px;
  column-gap: 50px;
  padding-bottom: 30px;
`

export const UserDataContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  column-gap: 30px;
  row-gap: 10px;
  padding-left: 30px;
  white-space: nowrap;

  h1 {
    font-size: 34px;
    font-weight: 500;
    color: ${e => e.theme.palette.primary.main};
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .icon-container {
    mask: url('/assets/icons/papers.svg');
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
    background-color: ${e => e.theme.palette.secondary.dark};
    width: 80px;
    height: 92px;
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
    }

    .cpf {
      font-size: 16px;
    }

    .date {
      font-size: 16px;
    }

    .amount {
      font-size: 22px;

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
