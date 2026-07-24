# PED Calc

Calculadora independente de apoio à terapia intensiva pediátrica. A aplicação reúne venóclise, infusões, scores, percentis de pressão arterial, folha de parada pediátrica, antimicrobianos hospitalares e domiciliares e correções hidroeletrolíticas.

> Ferramenta de apoio matemático. Não substitui prescrição, protocolo institucional, avaliação clínica, validação farmacêutica nem dupla checagem independente.


## Impressão rápida

O módulo de pressão arterial possui o botão **Imprimir percentis de pressão**, e a folha de parada possui o botão **Imprimir folha de parada**. Durante a impressão, menus, fundo e controles de ação são ocultados automaticamente, mantendo apenas o conteúdo clínico em formato A4 paisagem.


## Módulo de PA pediátrica e parada

- **Percentis de PA:** informe a idade em dias, meses ou anos para consultar PAS, PAD e PAM nos níveis P5, P10, P50, P90, P95 e P95 + 12 mmHg, além de FC e FR por faixa etária. Para 1–17 anos, P5 e P10 são exibidos como estimativas matemáticas; P50, P90, P95 e P95 + 12 mmHg seguem a tabela da SBP na coluna de estatura P50.
- **Folha de parada:** utiliza o peso rápido do site para calcular volumes, energias de desfibrilação e itens da sequência rápida de intubação.
- Para 1 a 17 anos, a interface usa tabelas separadas para masculino e feminino e a estatura de referência no percentil 50.
- As planilhas originais não foram incluídas no repositório porque continham campos com identificação de pacientes; somente as tabelas clínicas sem dados pessoais foram transcritas.

## Requisitos

- Node.js 22.13 ou superior
- npm
- Conta gratuita ou paga na Cloudflare, caso queira publicar
- Git, caso queira manter o código no GitHub

## Executar no computador

```bash
npm ci
npm run dev
```

Abra o endereço exibido no terminal. Para verificar a versão antes de publicar:

```bash
npm run lint
npm run typecheck
npm test
```

## Colocar no GitHub

1. Crie um repositório vazio no GitHub, por exemplo `ped-calc`.
2. Na pasta extraída deste projeto, execute:

```bash
git init
git add .
git commit -m "Publica PED Calc"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/ped-calc.git
git push -u origin main
```

Substitua `SEU-USUARIO` pelo seu nome de usuário. Não envie arquivos `.env`, tokens ou credenciais ao repositório.

## Publicar diretamente na Cloudflare

No primeiro uso, autentique a sua conta:

```bash
npx wrangler login
```

Valide o pacote sem publicar:

```bash
npm run deploy:cloudflare:check
```

Depois publique:

```bash
npm run deploy:cloudflare
```

O build gera automaticamente `dist/server/wrangler.json`, usado pelo comando de deploy. Ao final, o terminal informa o endereço `workers.dev` criado pela Cloudflare.

## Importar o repositório pelo painel da Cloudflare

Na tela **Workers & Pages → Importar um repositório**, use:

- **Nome do Worker:** `ped-calc`
- **Diretório raiz:** deixe vazio se `package.json` estiver na primeira tela do repositório. Se existir uma pasta `ped-calc` contendo o projeto, informe `ped-calc`.
- **Comando de build:** `npm run build`
- **Comando de implantação:** `npx wrangler deploy --config dist/server/wrangler.json`
- **Branch de produção:** `main`

Também é possível deixar somente `npx wrangler deploy` como comando de implantação: o arquivo `wrangler.jsonc` da raiz executará o build antes de enviar o Worker. A forma com `--config dist/server/wrangler.json` é preferível no painel porque usa diretamente a configuração produzida pelo Vinext.

Se o painel mostrar **No dependencies detected**, a Cloudflare está na pasta errada. Corrija o **Diretório raiz** até que `package.json`, `app`, `lib` e `wrangler.jsonc` fiquem na raiz selecionada.

## Publicação automática pelo GitHub

O arquivo `.github/workflows/deploy-cloudflare.yml` pode publicar toda alteração enviada à branch `main`.

No GitHub, abra **Settings → Secrets and variables → Actions** e crie estes segredos:

- `CLOUDFLARE_API_TOKEN`: token com permissão para editar Workers.
- `CLOUDFLARE_ACCOUNT_ID`: identificador da conta Cloudflare.

Depois disso, cada `git push` para `main` executará testes, build e publicação. Se preferir publicar manualmente, remova o arquivo de workflow.

## Organização principal

- `app/`: interface, dados clínicos e componentes.
- `lib/`: funções matemáticas isoladas.
- `tests/`: testes automatizados de cálculos e renderização.
- `public/`: ícones e arquivos públicos.
- `scripts/`: build e validação.

As referências clínicas oficiais aparecem dentro da própria interface. Antes de uso assistencial, valide apresentações, concentrações e fluxos com a CCIH, farmácia e protocolo vigente da instituição.


## Atualização de navegação e pressão arterial

- Atalhos superiores reorganizados por módulo: manutenção, distúrbios hidroeletrolíticos, infusões, antimicrobianos e pressões.
- Atalho fixo no cabeçalho para a área de folha de parada e pressão arterial.
- Percentis de PA de 1 a 17 anos com seleção masculina ou feminina e estatura de referência no P50.

## Atualização de módulos — julho de 2026

- Peso rápido inicial alterado para 10 kg.
- Atalhos e seções padronizados em seis módulos: venóclise, distúrbios hidroeletrolíticos, medicamentos de infusão contínua, antimicrobianos, folha de parada + percentil de pressão e scores clínicos.
- Contagem de antibióticos domiciliares vinculada dinamicamente às 14 opções cadastradas.


## Atualização de percentis de pressão arterial

- Para 1 a 17 anos, P50, P90, P95 e P95 + 12 mmHg usam as tabelas da Sociedade Brasileira de Pediatria, separadas por sexo e considerando a coluna de estatura P50.
- P5 e P10 foram incluídos como estimativas matemáticas por simetria em torno do P50: P10 = 2 × P50 − P90 e P5 = 2 × P50 − P95.
- A PAM voltou a ser exibida e é calculada pela fórmula (PAS + 2 × PAD) ÷ 3 em todos os níveis.
- As faixas de frequência cardíaca e frequência respiratória voltaram à tela de PA.
- O sistema identifica visualmente P5 e P10 como estimados para não confundi-los com valores publicados diretamente pela SBP.

## Atualização desta versão

- Medicamentos de infusão contínua separados em Analgossedação, Vasoativas, Broncodilatadores, Diuréticos e Anticoagulantes.
- Salbutamol, sulfato de magnésio e terbutalina em Broncodilatadores.
- Furosemida e furosemida + aminofilina em Diuréticos.
- Heparina não fracionada em Anticoagulantes.
- Preparos intramusculares em pó com seleção de 2, 3 ou 4 mL de água destilada e cálculo automático da concentração resultante e do volume por dose.
- Apresentações líquidas IM exibidas como sem reconstituição.
- Impressões de percentis de PA e folha de parada compactadas para uma folha A4 em paisagem.
- A comparação opcional da pressão medida é ocultada apenas na impressão.

## Módulo 07 - Nutrição parenteral total

A versão inclui uma calculadora de NPT pediátrica baseada na planilha fornecida, com quota hídrica disponível, VIG, aminoácidos, lipídios, eletrólitos, oligoelementos, vitaminas, relação Ca:P, calorias, osmolaridade e composição copiável. O módulo também contém um guia resumido e disponibiliza o fluxograma em PDF e a planilha original na pasta `public`.
