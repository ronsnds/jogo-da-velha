import { useState } from "react";
import './App.css';
import { calcularVencedor } from "./components/calcularVencedor.jsx";

export default function Tabuleiro() {
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [click, setClick] = useState(0);

  const vencedor = calcularVencedor(tabuleiro);

  function handleClick(i) {
    if (tabuleiro[i] || vencedor) {
      return;
    }

    const novoTabuleiro = tabuleiro.slice();
    novoTabuleiro[i] = player;
    setTabuleiro(novoTabuleiro);
    setPlayer(player === "X" ? "O" : "X");

    setClick(click + 1);
    return;
  }

  function renderizarBotao(i) {
    return (
      <button className="botao" onClick={() => handleClick(i)}>
        {tabuleiro[i]}
      </button>
    );
  }

  function restart() {
    setTabuleiro(Array(9).fill(null));
    setClick(0);
    return;
  }

  return (
    <>
      <header>
        <h1>Jogo da Velha</h1>
        <button className="restart" onClick={restart}>Reiniciar</button>
      </header>

      <div className="tabuleiro">
        <div className="linha">
          {renderizarBotao(0)}
          {renderizarBotao(1)}
          {renderizarBotao(2)}
        </div>
        <div className="linha">
          {renderizarBotao(3)}
          {renderizarBotao(4)}
          {renderizarBotao(5)}
        </div>
        <div className="linha">
          {renderizarBotao(6)}
          {renderizarBotao(7)}
          {renderizarBotao(8)}
        </div>
      </div>

      <div className="status">
        {click === 9 && vencedor == null ?
          <>
            Nenhum vencedor<br />
            Reinicie o jogo!
          </>
          : (
            <>
              {vencedor
                ? (<> O vencedor é {vencedor} <br /> Reinicie o jogo! </>)
                : (<>É a vez de {player}</>)}
            </>
          )}

      </div>
    </>
  );
}