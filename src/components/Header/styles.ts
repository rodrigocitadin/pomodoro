import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 1rem;

    a {
      width: 2.5rem;
      height: 2.5rem;

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${props => props.theme['gray-100']};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      transition: all 0.2s;

      &:hover {
        border-bottom: 3px solid ${props => props.theme['orange-500']};
      }

      &.active {
        color: ${props => props.theme['orange-500']};
      }
    }
  }
`
