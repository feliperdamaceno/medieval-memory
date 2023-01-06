import styled from 'styled-components'
import background from '../assets/images/background.png'

export default function Card({ card, chooseCard }) {
  const { src, showing } = card

  function handleClick() {
    chooseCard(card)
  }

  const flipAnimation = {
    transform: showing ? 'rotateY(0)' : 'rotateY(180deg)',
    backgroundImage: showing ? `url(${src})` : `url(${background})`
  }

  return (
    <Button style={flipAnimation} onClick={handleClick} disabled={showing} />
  )
}

const Button = styled.button`
  background-color: transparent;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: drop-shadow(0 0 0.25rem rgba(0, 0, 0, 0.25));
  transition: transform 500ms ease, background-image 250ms ease;
  width: 8rem;
  aspect-ratio: 1/1;
  cursor: pointer;

  @media (min-width: 500px) {
    & {
      width: 12rem;
    }
  }

  @media (min-width: 700px) {
    & {
      width: 20rem;
    }
  }
`
