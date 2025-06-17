PROPOSTA_REFATORACAO.md
Padrão Escolhido: MVVM (Model-View-ViewModel)

Escolhi o padrão MVVM porque ele se encaixa muito bem com a forma como o React Native funciona, especialmente com o uso de Hooks, que facilitam a gestão de estado e lógica. O MVVM permite que a parte View mais 'passiva' ou 'declarativa', focando apenas em mostrar as informações. A lógica por trás da tela, fica separada, tornando o código mais organizado e fácil de manter.

1. Nova Estrutura de Arquivos para a Tela da Pokédex

        PokedexApp/
        ├─ screens/
        │  └─ Pokedex/
        │     ├─ PokedexScreen.tsx          (Camada de View)
        │     ├─ usePokedexViewModel.ts     (Camada de ViewModel, responsável pela lógica de apresentação)
        │     └─ index.ts                   (Módulo de exportação da pasta)
        ├─ components/
        │  └─ ... (Componentes de UI reutilizáveis, como o PokemonCard)
        ├─ services/
        │  └─ api.ts                         (Módulo de comunicação com APIs externas)
        ├─ types/
        │  └─ Pokemon.ts                     (Definição de tipos de dados)
        │  └─ Navigation.ts                  (Definição de tipos para navegação)
        └─ utils/
        └─ format.ts                      (Funções utilitárias)

2. Divisão de Responsabilidades

   2.1. O que ficaria na View (PokedexScreen.tsx)

   A PokedexScreen.tsx atuará como a camada de View. Sua principal responsabilidade será a de:

   - Exibir os componentes da interface do usuário, como o campo de busca, a lista de Pokémons e indicadores de estado.

   - Capturar eventos do usuário, como digitação em campos de texto e cliques em elementos interativos.

   - Interagir com o usePokedexViewModel para obter os dados a serem exibidos e para invocar as funções que disparam a lógica de negócio em resposta às interações do usuário.

   2.2. O que ficaria no ViewModel (usePokedexViewModel.ts)

   O usePokedexViewModel.ts representará a camada de ViewModel, abstraindo a lógica de apresentação e o estado da View. Suas responsabilidades incluirão:

   - Manter e gerenciar o estado da tela, incluindo a lista de Pokémons, o termo de pesquisa, e os status de carregamento e erro.

   - Coordenar a obtenção de dados de fontes externas e aplicar transformações ou filtros conforme necessário.

   - Expor funções que a View pode invocar para reagir a interações do usuário.

   - Expor os dados e o estado processado para que a View possa consumi-los e renderizá-los dinamicamente.

3. Fluxo de Dados: O que acontece quando o usuário digita no campo de busca?

- O usuário insere caracteres no campo de pesquisa (TextInput) presente na PokedexScreen.tsx (View).

- O evento onChangeText do TextInput na View invoca a função setSearchQuery() exposta pelo usePokedexViewModel.ts (ViewModel), passando o novo valor do campo de texto como argumento.

- O ViewModel atualiza seu estado interno para refletir o novo termo de pesquisa.

- Uma vez que o estado de pesquisa é alterado, um mecanismo de reatividade (e.g., useEffect ou useMemo do React) no ViewModel é acionado. Este mecanismo filtra a lista de Pokémons existente ou dispara uma nova busca de dados (se a filtragem exigir uma requisição à API) baseando-se no termo de pesquisa atual.

- O ViewModel expõe a lista de Pokémons filtrada e atualizada. A PokedexScreen.tsx (View) observa essas mudanças nos dados expostos pelo ViewModel e se re-renderiza automaticamente para exibir os resultados da pesquisa atualizados na interface do usuário.