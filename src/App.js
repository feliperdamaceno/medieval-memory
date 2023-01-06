import { useState } from 'react'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

// Database
import { database } from './database'

// Components
import Card from './components/Card'

// Styles
import { colors } from './Global.styles'

export default function App() {
  const [cards, setCards] = useState(getCards)
  const [previousCard, setPreviousCard] = useState(null)
  const [checkingChoices, setCheckingChoises] = useState(false)
  const [turns, setTurns] = useState(0)

  function getCards() {
    const data = [...database, ...database]
    const cards = data.map((card) => ({ ...card, id: uuid() }))
    return shuffleCards(cards)
  }

  function resetCards() {
    setCards((previous) => {
      const resetedCards = previous.map((card) => ({ ...card, showing: false }))
      return shuffleCards(resetedCards)
    })
  }

  function updateStatus(id, showing) {
    setCards((previous) => {
      const currentCard = previous.find((card) => card.id === id)
      currentCard.showing = showing
      return [...previous]
    })
  }

  function shuffleCards(cards) {
    return cards.sort(() => Math.random() - 0.5)
  }

  function increaseTurn() {
    setTurns((prev) => prev + 1)
  }

  function nextTurn() {
    setPreviousCard(null)
    setCheckingChoises(false)
    increaseTurn()
  }

  function resetGame() {
    resetCards()
    setPreviousCard(null)
    setTurns(0)
  }

  function chooseCard(card) {
    if (checkingChoices) return
    updateStatus(card.id, true)

    if (previousCard) {
      checkChoices(card)
      return
    }
    setPreviousCard(card)
  }

  function checkChoices(card) {
    setCheckingChoises(true)

    if (previousCard.reference === card.reference) {
      nextTurn()
      return
    }

    setTimeout(() => {
      updateStatus(previousCard.id, false)
      updateStatus(card.id, false)
      nextTurn()
    }, 500)
  }

  return (
    <Game>
      <Title>Medieval Memory</Title>
      <Button onClick={resetGame}>New Game</Button>
      <Turns>Turns: {turns}</Turns>

      <Container>
        {cards &&
          cards.map((card) => (
            <Card key={card.id} card={card} chooseCard={chooseCard} />
          ))}
      </Container>
    </Game>
  )
}

// Styled Components
const Game = styled.div`
  background-color: ${colors.background};
  min-height: 100vh;
  text-align: center;
`

const Title = styled.h1`
  font-size: 3.2rem;
  margin: 0;
  padding: 3rem;
`

const Turns = styled.p`
  font-size: 1.8rem;
  margin: 0;
  margin-top: 3rem;
`

const Button = styled.button`
  background-color: ${colors.background};
  border-radius: 0.5rem;
  border: 0.2rem solid ${colors.light};
  color: ${colors.light};
  font-size: 1.8rem;
  font-weight: bold;
  padding-block: 1rem;
  padding-inline: 1.5rem;
  transition: background-color 100ms ease-in;
  cursor: pointer;

  :hover {
    background-color: ${colors.primary};
  }
`

const Container = styled.div`
  width: calc(100% - 3rem);
  max-width: 95rem;
  margin-inline: auto;
  padding-block: 3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`
