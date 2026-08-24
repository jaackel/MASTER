# bar.md — Buraco negro da hero do Reflect

Referência: https://reflect.app — **apenas a hero**. Valores de anéis,
estrelas e máscaras extraídos das regras CSS reais via `document.styleSheets`.
Anatomia do núcleo lida das capturas da hero (imagens 11 e 14).

> **Correções de rodadas anteriores.** Duas leituras erradas custaram caro:
> 1. A primeira captura pegou a página **antes do vídeo carregar**
>    (`preload="false"`), então o teardown concluiu "nada brilha". Errado:
>    anéis e estrelas são discretos, mas o núcleo é incandescente.
> 2. A segunda rodada usou o Gargantua do filme como bar e fechou o disco
>    num anel elíptico com arco inferior. **A hero do Reflect não tem arco
>    inferior.** Nada existe abaixo da linha.

## Mecanismos

1. **É um domo sobre uma linha reta, não um anel fechado.** Tudo abaixo do
   equador é cortado. `mask-image: linear-gradient(to bottom, #000 49.4%,
   transparent 50.6%)` em cada camada do núcleo.
   *Checagem: cobrir a metade de baixo não deve remover nada.*

2. **A linha horizontal atravessa toda a largura** e vaza para além do domo,
   apagando nas pontas.
   *Checagem: a linha deve ser mais larga que o domo.*

3. **Dois lobos brancos flanqueiam o centro**, onde as pernas do domo tocam a
   linha — não um único brilho central. O meio é mais escuro que eles.
   *Checagem: três zonas na linha — claro, escuro, claro.*

4. **Arco aninhado.** Um arco externo largo e raso, e um interno mais estreito
   e mais alto, com rim branco. São duas estruturas distintas.
   *Checagem: contar dois arcos separados.*

5. **O interior do domo é preenchido de luz**, mais forte na base, subindo e
   apagando antes do topo. Não é vazio.

6. **As estrelas somem antes de chegar ao centro.** Container com
   `mask-image: radial-gradient(50% 50%, transparent 27.08%, #d9d9d9 47.92%,
   rgba(...,.8) 75%, transparent 100%)`. Os 27% internos são máscara zero.
   *Checagem: nenhuma estrela toca o centro.*

7. **A queda é espiral.** Cada estrela translada `var(--transform)` até o
   centro (`tx = (0.5 - left%) × W`) enquanto o container gira -360° em 70s.

8. **Só o topo dos anéis orbitais aparece**, com
   `mask-image: linear-gradient(rgba(...,.6) 9.41%, rgba(...,0) 29.79%)`.
   Dots são anéis vazados de 6px com borda de 1px — nunca bolinhas cheias.

9. **O palco dissolve nas bordas:**
   `mask-image: radial-gradient(50% 50%, #fff 60.94%, transparent 100%)`.

## Desvios deliberados (pedidos do cliente)

- **Cor:** azul neon do MASTERAGENT (`rgba(0,168,255,…)`) no lugar do lavanda
  `rgba(186,156,255,…)` do Reflect. Alpha das linhas subiu de `.3` para `.5`.
- **Equador ancorado em 62.5% da altura do card** — é onde cai a curva da
  linha do tempo. Se a curva mudar, é essa única porcentagem que se ajusta.
- **Anel dimensionado para conter os cards de marco** (1140px de largura).

## Escala

Palco 1240×620. Arco externo 1140×440, interno 672×392, preenchimento
648×376. Esfera 286px, fótons 310px. Estrelas 566px, 2px cada,
`nth-child(3n)` a `.5`. Anéis orbitais 653 / 491 / 336.
