import {
  useState,
  useCallback,
  useEffect
} from 'react'
import formatMoney from '@/utils/formatMoney'

import {
  Container,
  TitleContainer,
  Title,
  OptionsButton,
  TabsContainer,
  Tab,
  CardValueContainer,
  CardValue,
  CardIcon
} from '@/styles/components/charts'

const Volume = () => {
  const [tabSelected, setTabSelected] = useState<number>(0)
  const [value, setValue] = useState<number>(0)

  const handleTab = useCallback(e => {
    setTabSelected(e)

    switch (e) {
      case 0:
        setValue(6000)
        break
      case 1:
        setValue(30000)
        break
      case 2:
        setValue(97125)
        break
    }
  }, [])

  const initialValues = useCallback(() => {
    setValue(97125)
  }, [])

  useEffect(() => {
    initialValues()
  }, [initialValues])

  const tabs = [
    {
      index: 0,
      title: 'Semanal'
    },
    {
      index: 1,
      title: 'Mensal'
    },
    {
      index: 2,
      title: 'Anual'
    }
  ]

  return (
    <Container height='190px'>
      <header>
        <TitleContainer>
          <Title>Volume</Title>
          <OptionsButton />
        </TitleContainer>
      </header>
      <CardValueContainer>
        <CardIcon icon='box' />
        <CardValue>
          {formatMoney(value, {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0
          })}
        </CardValue>
      </CardValueContainer>

      <TabsContainer>
        {tabs.map(e => (
          <Tab
            key={e.index}
            onClick={() => handleTab(e.index)}
            active={e.index === tabSelected}
          >
            <div>
              {e.title}
            </div>
          </Tab>
        ))}
      </TabsContainer>
    </Container>
  )
}

export default Volume
