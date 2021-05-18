import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  row-gap: 40px;
`

export const ChartsContainer = styled.div`
  display: grid;
  row-gap: 40px;

  @media screen and (min-width: 998px) {
    grid-template-columns: 55% auto;
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
