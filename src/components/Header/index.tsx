import { Fire, Scroll, Timer } from "phosphor-react";
import { HeaderContainer } from "./styles";

export default function Header() {
  return (
    <HeaderContainer>
      <Fire size={40}/>
      <nav>
        <a href="/">
          <Timer size={28}/>
        </a>
        <a href="/history">
          <Scroll size={28}/>
        </a>
      </nav>
    </HeaderContainer>
  );
}
