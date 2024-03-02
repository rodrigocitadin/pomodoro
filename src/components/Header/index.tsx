import { Fire, Scroll, Timer } from 'phosphor-react';
import { HeaderContainer } from './styles';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <HeaderContainer>
      <Fire size={40} />
      <nav>
        <NavLink to='/' title='Timer'>
          <Timer size={28} />
        </NavLink>
        <NavLink to='/history' title='History'>
          <Scroll size={28} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
