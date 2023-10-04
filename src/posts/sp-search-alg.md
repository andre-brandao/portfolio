---
title: Search Algorithms for Puzzle Solving
description: An study of many search algorithms and heuristics for puzzle solving.
date: '2023-4-14'
categories:
  - Python
  - Search Algorithms
  - Sliding Puzzle
published: true
---
## Table of Contents


![UI Demo](https://github.com/andre-brandao/puzzle_solving_algorithms/raw/master/rdme_images/solver_print.png)

## Description

This project is a python implementation of the following search algorithms: **A Star, BFS, DFS, and Greedy Search.**

If you are using the A* or Greedy Search algorithms, you can choose between the following heuristics: **Manhattan Distance, Euclidean Distance, and Hamming Distance.**

The algorithms are used to solve the 8-puzzle problem. The 8-puzzle problem is a puzzle invented and popularized by Noyes Palmer Chapman in the 1870s. It is played on a 3-by-3 grid with 8 square blocks labeled 1 through 8 and a blank square. The goal is to rearrange the blocks so that they are in order. The blank square is represented by the number 0. The following is an example of a 8-puzzle problem:

You can get the project code in this [Github Repo](https://github.com/andre-brandao/puzzle_solving_algorithms)

## How search algorithms work

![Search Demo](https://github.com/andre-brandao/puzzle_solving_algorithms/raw/master/rdme_images/puzzle_search.jpg)

For each valid move it creates a new board and compares it to the goal board. If the new board is the goal board, the algorithm stops and returns the solution. If the new board is not the goal board, it adds the new board to the queue and continues to the next valid move. The algorithm continues until it finds the goal board or the queue is empty.

## Algorithms

### Breadth-First Search

```python
def bfs(board: Board, **kwargs) -> SearchResult:
    depth_bound = kwargs.get("depth_bound", float("inf"))
    detect_dupes = kwargs.get("detect_dupes", True)

    # initial state
    goal = new_board(*board.shape)
    initial_state = State(np.copy(board), find_blank(board))
    unvisited = collections.deque([initial_state])
    visited: set[FrozenBoard] = set()

    # stats
    generated, expanded = 0, 0

    while unvisited:
        state = unvisited.popleft()
        expanded += 1

        # goal check
        if np.array_equal(goal, state.board):
            return SearchResult(
                board, generated, expanded, unvisited, visited, state.history
            )

        # bound
        if len(state.history) > depth_bound:
            continue

        # duplicate detection
        if detect_dupes and visit(visited, state.board):
            continue

        # children
        next_states = get_next_states(state)
        unvisited.extend(next_states)
        generated += len(next_states)

    # if we are here, no solution was found
    return SearchResult(board, generated, expanded, unvisited, visited, None)
```

### Depth-First Search

```python
def dfs(board: Board, **kwargs) -> SearchResult:
    # args
    depth_bound = kwargs.get("depth_bound", float("inf"))
    detect_dupes = kwargs.get("detect_dupes", True)

    # initial state
    goal = new_board(*board.shape)
    initial_state = State(np.copy(board), find_blank(board))
    unvisited = [initial_state]
    visited: set[FrozenBoard] = set()

    # stats
    generated, expanded = 0, 0

    while unvisited:
        state = unvisited.pop()
        expanded += 1

        # goal check
        if np.array_equal(goal, state.board):
            return SearchResult(
                board, generated, expanded, unvisited, visited, state.history
            )

        # bound
        if len(state.history) > depth_bound:
            continue

        # duplicate detection
        if detect_dupes and visit(visited, state.board):
            continue

        # children
        next_states = get_next_states(state)
        unvisited.extend(next_states)
        generated += len(next_states)

    # if we are here, no solution was found
    return SearchResult(board, generated, expanded, unvisited, visited, None)
```

### A* Search

```python

def a_star(board: Board, **kwargs) -> SearchResult:
    # args
    depth_bound = kwargs.get("depth_bound", float("inf"))
    f_bound = kwargs.get("f_bound", float("inf"))
    detect_dupes = kwargs.get("detect_dupes", True)
    heuristic = kwargs.get("heuristic", manhattan_distance)
    weight = kwargs.get("weight", 1)

    # initial state
    goal = new_board(*board.shape)
    initial_state = State(np.copy(board), find_blank(board))
    unvisited = [initial_state]
    visited: set[FrozenBoard] = set()

    # stats
    generated, expanded = 0, 0

    while unvisited:
        state = heapq.heappop(unvisited)
        expanded += 1

        # goal check
        if np.array_equal(goal, state.board):
            return SearchResult(
                board, generated, expanded, unvisited, visited, state.history
            )

        # bound
        if len(state.history) > depth_bound or state.f > f_bound:
            continue

        # duplicate detection
        if detect_dupes and visit(visited, state.board):
            continue

        # children
        next_states = get_next_states(state)
        for state in next_states:
            state.g = len(state.history)
            state.f = state.g + weight * heuristic(state.board)
            heapq.heappush(unvisited, state)
        generated += len(next_states)

    # if we are here, no solution was found
    return SearchResult(board, generated, expanded, unvisited, visited, None)
```

## Heuristics

### Manhattan Distance

```python
def manhattan_distance(board: Board) -> int:

    h, w = board.shape
    table = manhattan_tables.get((h, w), None)
    if table is None:
        table = prepare_manhattan_table(h, w)
        manhattan_tables[(h, w)] = table

    dist = 0
    for y, row in enumerate(board):
        for x, tile in enumerate(row):
            dist += table[(y, x, tile)]
    return dist
```

### Euclidean Distance

```python
def euclidean_distance(board: Board) -> float:
    h, w = board.shape
    dist = 0.0
    for y, row in enumerate(board):
        for x, tile in enumerate(row):
            if BLANK == tile:
                continue
            goal_y, goal_x = get_goal_yx(h, w, tile)
            a, b = abs(y - goal_y), abs(x - goal_x)
            dist += math.sqrt(a**2 + b**2)
    return dist
```

### Hamming Distance

```python
def hamming_distance(board: Board) -> int:
    h, w = board.shape
    dist = 0
    for y, row in enumerate(board):
        for x, tile in enumerate(row):
            if BLANK == tile:
                continue
            goal_y, goal_x = get_goal_yx(h, w, tile)
            if y != goal_y or x != goal_x:
                dist += 1
    return dist
```