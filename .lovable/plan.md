## Causa da rejeição dos anúncios em `/deportivofutureco`

No header da página (linhas 274–291 de `src/pages/DeportivoFutureCO.tsx`) há um SVG que desenha **exatamente o swoosh da Nike** dentro de um pílula colorida:

```tsx
<svg viewBox="0 0 24 12" className="w-7 h-4" fill="white">
  <path d="M24 1.5c-3 5-8.5 9-15 9-3.5 0-6-1-7-2.5C2.5 9 4 8.5 6 8c4-1 9-3 13-5.5 1.5-1 3-2 5-2.5z" />
</svg>
```

Esse path é o logotipo registrado da Nike. Meta/TikTok detectam isso automaticamente (image hashing + revisão manual) e reprovam por **uso indevido de marca registrada de terceiros**, mesmo que o texto da página não mencione "Nike". É por isso que a `/ropaconjuntosla` (clonada da `/ropaconjuntos`, que não tem esse SVG) passa normalmente, mesmo vendendo o mesmo produto.

Detalhes adicionais que reforçam o sinal para os moderadores:
- Os tokens de cor no código se chamam `NIKE_BLACK`, `NIKE_ORANGE`, `NIKE_RED`, etc. (não aparecem para o usuário final nem para o crawler, mas vou renomear por higiene).
- O título usa "Ultra Dry · **PRO**" com swoosh ao lado, o que visualmente imita a linha "Nike Pro".

Nenhum outro elemento da página menciona marcas protegidas — o problema está concentrado no swoosh do header.

## O que vou fazer

1. **Remover o swoosh** do header e substituir por um ícone genérico neutro (ex.: ícone `Zap` do lucide-react que já está importado, ou um monograma "UD" de Ultra Dry) dentro do mesmo pílula com gradiente verde-limão/menta.
2. **Trocar "PRO" por algo genérico** como "ELITE" ou apenas remover o sufixo, para não evocar a linha "Nike Pro".
3. **Renomear constantes** `NIKE_*` → `SPORT_*` (`SPORT_BLACK`, `SPORT_ACCENT`, `SPORT_SECONDARY`, etc.) em todo o arquivo. Mudança puramente cosmética no código, sem impacto visual.

Nenhuma outra alteração: imagens do produto, formulário, preços, pixel, fluxo de pedido e textos comerciais permanecem idênticos.

## Arquivo afetado

- `src/pages/DeportivoFutureCO.tsx` (único arquivo editado)

Após essa mudança, a página deve parar de ser rejeitada e você poderá continuar usando o mesmo pixel/criativos sem precisar migrar tudo para `/ropaconjuntosla`.