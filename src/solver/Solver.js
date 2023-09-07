import PriorityQueue from "./PriorityQueue";
import PriorityQueueRetrieve from "./PriorityQueueRetrieve";

function containsArray(arrOfArrays, targetArray) {
  return arrOfArrays.some(
    (arr) =>
      arr.length === targetArray.length &&
      arr.every((element, index) => element === targetArray[index])
  );
}

function mapIdxij(idx) {
  if (idx === 1) return [0, 0];
  if (idx === 2) return [1, 0];
  if (idx === 3) return [2, 0];
  if (idx === 4) return [0, 1];
  if (idx === 5) return [1, 1];
  if (idx === 6) return [2, 1];
  if (idx === 7) return [0, 2];
  if (idx === 8) return [1, 2];
  return [2, 2]; // idx = 0
}

function adjPiece(piece_idx) {
  if (piece_idx === 0) return [1, 3];
  if (piece_idx === 1) return [0, 2, 4];
  if (piece_idx === 2) return [1, 5];
  if (piece_idx === 3) return [0, 4, 6];
  if (piece_idx === 4) return [1, 3, 5, 7];
  if (piece_idx === 5) return [2, 4, 8];
  if (piece_idx === 6) return [3, 7];
  if (piece_idx === 7) return [4, 6, 8];
  return [5, 7];
}

function swapPiece(board, i, j) {
  const ans = [...board];
  [ans[i], ans[j]] = [ans[j], ans[i]];
  return ans;
}

export function heurCal(board) {
  let s = 0;
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      const [i_, j_] = mapIdxij(board[i + j * 3]);
      const dis = (i - i_) * (i - i_) + (j - j_) * (j - j_);
      s += dis;
    }
  }
  return s;
}

export function genChildBoard(board) {
  let ans = [];
  for (let i = 0; i < 9; i++) {
    if (board[i] === 0) {
      let adjPi = adjPiece(i);
      for (let j = 0; j < adjPi.length; j++) {
        ans.push(swapPiece(board, i, adjPi[j]));
      }
    }
  }
  return ans;
}

export function gameSolve(board) {
  const pq = new PriorityQueue(); //open set
  let exploredSet = []; // close set
  const pq_expl = new PriorityQueueRetrieve(); //explore set full

  let id = 1;
  let treeLv = 1;
  let subBoards;
  let topQueue;
  let initState = [board, heurCal(board), 0, -1];

  pq.enqueue(initState);

  while (!pq.isEmpty()) {
    topQueue = pq.dequeue();
    if (heurCal(topQueue[0]) === 0) {
      pq_expl.enqueue(topQueue);
      break;
    }

    exploredSet.push(topQueue[0]);
    pq_expl.enqueue(topQueue);

    subBoards = genChildBoard(topQueue[0]);
    for (let i = 0; i < subBoards.length; i++) {
      if (!containsArray(exploredSet, subBoards[i])) {
        pq.enqueue([
          subBoards[i],
          treeLv + heurCal(subBoards[i]),
          id,
          topQueue[2],
        ]);
        id++;
        if (id >= 180000) return [];
      }
    }
    treeLv++;
  }
  return pq_expl.retrieve();
}
