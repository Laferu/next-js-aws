import styled from 'styled-components'

interface IChartsContainer {
  firstRow?: string
  secondRow?: string
}

export const Container = styled.div`
  display: grid;
  row-gap: 40px;
`

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

export const ChartsContainer = styled.div<IChartsContainer>`
  display: grid;
  row-gap: 40px;

  @media screen and (min-width: 998px) {
    /* grid-template-columns: 55% auto; */
    grid-template-columns: ${e => e.firstRow ? 'minmax(auto, ' + e.firstRow + ') minmax(calc(45% - 40px), auto)' : '55% auto'};
    column-gap: 40px;
    row-gap: 0;
  }
  /* grid-template-columns: 55% auto;
  column-gap: 40px; */
`

export const CardsContainer = styled.div`
  display: grid;
  row-gap: 40px;

  /* @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, calc((55% - 40px) / 2)) auto;
    column-gap: 40px;
  } */

  @media screen and (min-width: 1280px) {
    grid-template-columns: repeat(2, calc((55% - 40px) / 2)) auto;
    column-gap: 40px;
    row-gap: 0;
  }
`
