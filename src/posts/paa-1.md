---
title: PAA Sum of Subsets Backtraking
description: Fpr puc.
date: '2023-6-02'
categories:
  - Unity
  - C#
  - PUC-MG

published: true
---
## Table of Contents

## Description

O problema "Sum of Subsets" é um desafio emblemático na área de ciência da computação, situando-se na categoria dos problemas de decisão. O enigma consiste em determinar a existência de um subconjunto de números, dentro de um conjunto fornecido de inteiros, que totalize um valor alvo definido. Este é uma forma específica do problema de "Subconjunto de Soma" (Subset Sum Problem), que por sua vez, é um caso particular do problema da mochila (Knapsack Problem).

A essência do problema "Sum of Subsets" reside na sua classificação como NP-completo, indicando que, até o momento, não existe algoritmo de tempo polinomial conhecido que o resolva de maneira eficiente em todos os cenários. Estratégias comuns para sua solução incluem a utilização de técnicas de backtracking, que exploram as possibilidades de forma sistemática, retrocedendo assim que determina-se a inviabilidade de um conjunto candidato a solução, o que potencialmente reduz o espaço de busca em comparação com uma abordagem de força bruta.

Este problema é relevante em diversas aplicações práticas, tais como na área de otimização, onde é necessário selecionar um subconjunto ótimo de elementos para alcançar um objetivo específico, e na criptografia, onde a dificuldade de resolução contribui para a segurança. Trabalhar com o problema "Sum of Subsets" desenvolve competências importantes em lógica computacional e técnicas de backtracking.

## brute force

Geramos todas as combinações possíveis em um vetor de bits, onde cada bit representa se o elemento correspondente deve estar no subconjunto ou não.

Exemplo:

```py
# The array [5, 4, 9] has the following subsets:

#[5 4 9] = [5,  4,  9]
# 0 0 1  ->         9 = 9 
# 0 1 0  ->     4     = 4
# 0 1 1  ->     4 + 9 = 13
# 1 0 0  -> 5         = 5
# 1 0 1  -> 5   +   9 = 14 CORRETO
# 1 1 0  -> 5 + 4     = 9
# 1 1 1  -> 5 + 4 + 9 = 18
```

Table:

| Subset | Binary | Sum | Target Sum | Result |
|--------|--------|-----|------------|--------|
| [5]    | 001    | 5   | 14         | False  |
| [4]    | 010    | 4   | 14         | False  |
| [4, 5] | 011    | 9   | 14         | False  |
| [9]    | 100    | 9   | 14         | False  |
| [5, 9] | 101    | 14  | 14         | True   |
| [4, 5] | 110    | 9   | 14         | False  |
| [4, 5, 9] | 111 | 18  | 14         | False  |

code

```py
def subset_sum_bruteforce(array: List[int], target_sum: int) -> Tuple[List[int], int] | None:
    n = len(array)
    expanded = 0
    # Gera todas combinações possíveis
    for i in range(1, 2 ** n):
        subset = []
        subset_sum = 0
        # Para cada bit, verifica se o elemento correspondente deve estar no subconjunto
        for j in range(n):
            expanded += 1
            #  Se o bit j estiver ligado, o elemento j é adicionado ao subconjunto
            if (i >> j) & 1:
                subset.append(array[j])
                subset_sum += array[j]
        # Se a soma do subconjunto for igual ao objetivo, retorna o subconjunto
        if subset_sum == target_sum:
            return subset, expanded
    return None
```

## backtracking

Para implementar a estratégia de backtracking, podemos seguir os seguintes passos:

1 - Parametros: índice atual, subconjunto atual e soma atual

2 - No inicio da funcao verificamos se o subconjunto atual é uma solução. Se for ENCONTRAMOS A SOLUÇÃO e podemos finalizar a função.

3 - Se a soma atual for maior que o objetivo não será possivel encontrar uma solução, então retornamos None.

4 - Para cada elemento a partir do índice atual, atualizamos o subconjunto e a soma atual e voltamos para o primeiro passo.

<script>
  let restartCount = 0; // A variable to trigger reactivity

  function restartAnimation() {
    restartCount += 1; // Update the variable to trigger reactivity
    console.log(restartCount)
  }
</script>

### Exemplo [5, 4, 9] = 4

<center>
<p style="color: red; background-color: white;">Red: unexplored solutions</p>
<p style="color: green; background-color: white;">Green: correct node</p>
<p style="color: blue; background-color: white;">Blue: explored nodes</p>

</center>

<button on:click={restartAnimation}>Restart Animation</button>

{#key restartCount}
   <object id="mySVG" data="excalidraw-animate.svg" type="image/svg+xml" style="max-width: 100%; height: auto;"/>
{/key}

python code:

```py

def subset_sum_backtracking(array: List[int], target_sum: int) -> Tuple[List[int], int] | None:
    expanded = 0  # Counter to keep track of expanded nodes

    def backtrack(start, current_subset, current_sum):

        # Verifica se achamos o resultado
        if current_sum == target_sum:
            return current_subset
        # Verifica se a soma atual é maior que o objetivo ou se já percorremos todo o vetor
        if current_sum > target_sum or start >= len(array):
            return None

        for i in range(start, len(array)):
            # Counter de nos expandidos
            nonlocal expanded
            expanded += 1

            # Atualiza o subconjunto e a soma atual
            new_subset = current_subset + [array[i]]
            new_sum = current_sum + array[i]

            result = backtrack(i + 1, new_subset, new_sum)
            # Se achou o resultado retorna
            if result is not None:
                return result
        # Se não achou, retorna None
        return None

    result = backtrack(0, [], 0)
    print(f'Backtrack Expanded {expanded} nodes')
    return result, expanded
```

## Testes

Todos os testes foram realizados em um processador 10th Generation Intel Core i7-1065G7 e 16BG de RAM.

### Entradas

random.sample é uma função que retorna uma lista de elementos únicos de um determinado intervalo.

range representa o intervalo.

o ultimo numero(10 para o primeiro teste) representa o valor objetivo para o problema.

o codigo para todos os testes pode ser encontrado em: [testes.py](https://github.com/andre-brandao/PAA/blob/main/main.py)

```py
# Testes variados
test_data = [
    ([1, 2, 3, 4, 5], 10),
    ([3, 7, 2, 8, 4], 15),
    (random.sample(range(1, 11), 10), 12),
    (random.sample(range(1, 51), 50), 70),
    (random.sample(range(1, 101), 100), 123),
    (random.sample(range(1, 201), 200), 234),
    (random.sample(range(1, 501), 500), 567),
    (random.sample(range(1, 1001), 1000), 123),
    (random.sample(range(1, 1001), 1000), 1234),
    (random.sample(range(1, 10001), 10000), 12345),
]
```

### Teste 1

Nesse primeiro teste, executamos os algoritmos com entradas variadas para podermos identificar quais testes poderiam ser relevantes para identificarmos as diferenças, vantagens e desvantagens dos algoritmos de brute force e backtracking.

![test1](paa-1-test1.png)

### Teste 2

![test2](paa-1-test2.png)

### Teste 3

No teste 3 os algoritmos foram executados com entradas de tamanho crescente, sempre mantendo o valor da soma o dobro do número de elementos do array. O objetivo desse teste é observar a variação de tempo conforme o tamanho do array vai aumentando.

![test3](paa-1-test3.png)

### Teste 4

![test4](paa-1-test4.png)

### Teste 5

![test5](paa-1-test5.png)

### Teste 6

![test6](paa-1-test6.png)
