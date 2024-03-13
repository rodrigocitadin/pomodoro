import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const BaseCountdownButton = styled.button`
  width: 100%;
  padding: 1.5rem 0;
  border-radius: 8px; 
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  border: none;
  color: ${props => props.theme.white};

  &:disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${props => props.theme["orange-500"]};

  &:hover:enabled {
    background: ${props => props.theme["orange-700"]};
  }
`

export const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${props => props.theme["red-500"]};

  &:hover:enabled {
    background: ${props => props.theme["red-700"]};
  }
`
