# bar.md — Buraco negro da hero do Reflect

Referência: https://reflect.app (hero). Valores extraídos das regras CSS reais
via `document.styleSheets`, não estimados no olho.

## Mecanismos

1. **Nada brilha.** Não existe um único `box-shadow`, `glow` ou `filter: blur`
   colorido no efeito inteiro. A cor lavanda aparece só como linha de 1px em
   `rgba(186,156,255,0.3)` e preenchimento em `rgba(186,156,255,0.04)`.
   *Checagem: se alguma parte emite luz, falhou.*

2. **O buraco não é desenhado.** Não há disco preto, nem disco de acreção, nem
   anel de luz. O centro é implicado pela convergência das estrelas.
   *Checagem: cobrir as estrelas e o centro deve sumir.*

3. **As estrelas somem antes de chegar ao centro.** O container das estrelas
   (700×700) tem `mask-image: radial-gradient(50% 50%, transparent 27.08%,
   #d9d9d9 47.92%, rgba(...,.8) 75%, transparent 100%)`. Os 27% internos são
   máscara zero — a estrela é engolida, não colide.
   *Checagem: nenhuma estrela deve tocar o ponto central.*

4. **A queda é espiral, não radial.** Cada estrela translada `var(--transform)`
   até o centro (`tx = (0.5 - left%) × W`) enquanto o container inteiro gira
   -360° em 70s. Reta + rotação = espiral.
   *Checagem: seguir uma estrela; o caminho deve curvar.*

5. **Só o topo dos anéis aparece.** Cada anel leva
   `mask-image: linear-gradient(rgba(186,156,255,.6) 9.41%, rgba(186,156,255,0) 29.79%)`.
   Some antes de 30% da altura.
   *Checagem: metade de baixo dos anéis invisível.*

6. **Anéis grandes demais para caber.** 808 / 608 / 416px num palco de 1440×810
   — o maior é 56% da largura do palco e sangra para fora. O de 416 **não gira**;
   os outros dois giram em 100s. Ordem de opacidade: 1 / 0.6 / 1.
   *Checagem: os arcos devem cruzar a borda, não caber dentro dela.*

7. **Os dots são anéis vazados de 6px**, `border: 1px solid rgba(186,156,255,.3)`,
   fundo `rgba(186,156,255,.01)`, `backdrop-filter: blur(10px)`. 8 por anel.
   *Checagem: nenhum dot é uma bolinha preenchida.*

8. **O palco inteiro dissolve nas bordas:**
   `mask-image: radial-gradient(50% 50%, #fff 60.94%, transparent 100%)`.
   *Checagem: nenhuma borda reta do efeito visível dentro do card.*

## Escala para o nosso card

Palco do Reflect: 1440 de largura. O nosso: ~1164. Fator **0.808**.
Anéis 653 / 491 / 336. Estrelas 566. Estrela 2px, `border-radius` 5px,
`nth-child(3n)` com opacity .5.
