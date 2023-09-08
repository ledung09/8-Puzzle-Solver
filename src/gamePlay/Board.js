import { useState } from "react";
import { validMove, randomBoard } from "./GamePlay";
import { gameSolve } from "../solver/Solver";
import { SolveDone, SolveUnDone } from "../solver/SolveState";

import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Board() {
  const disX = [0, 101, 201, -202, -101];
  const disY = [0, 100, 200, -200, -100];

  const [tmp, setTmp] = useState(0);
  const [havSol, setHavSol] = useState(-1);
  const [midBub, setMidBub] = useState(-1);
  const [solStep, setSolStep] = useState([[], -1]);
  const [board, SetBoard] = useState(
    // Draw pieces:0 - blank
    [1, 2, 3, 4, 5, 6, 7, 8, 0]
  );
  const [intVal, SetInitVal] = useState(
    // Init pos for 7 blocks
    [0, 1, 2, 3, 4, 5, 6, 7]
  );

  function solvee(board) {
    const result = gameSolve(board);
    if (result === []) setHavSol(0);
    else setHavSol(1);
    setSolStep([[...result], 1]);
  }

  const [val, SetVal] = useState([
    { x: 0, y: 0, currPos: 0, bodyVal: 1 },
    { x: 0, y: 0, currPos: 1, bodyVal: 2 },
    { x: 0, y: 0, currPos: 2, bodyVal: 3 },
    { x: 0, y: 0, currPos: 3, bodyVal: 4 },
    { x: 0, y: 0, currPos: 4, bodyVal: 5 },
    { x: 0, y: 0, currPos: 5, bodyVal: 6 },
    { x: 0, y: 0, currPos: 6, bodyVal: 7 },
    { x: 0, y: 0, currPos: 7, bodyVal: 8 },
  ]);

  const shoot = (move, idx) => {
    const updateMove = [...val];
    var oldX = val[idx].x;
    var oldY = val[idx].y;
    var newX = move[0] === 1 ? oldX + 1 : move[0] === -1 ? oldX - 1 : oldX;
    var newY = move[1] === 1 ? oldY + 1 : move[1] === -1 ? oldY - 1 : oldY;
    var newPos = intVal[idx] + newX + newY * 3;

    updateMove[idx] = {
      x: newX,
      y: newY,
      currPos: newPos,
      bodyVal: updateMove[idx].bodyVal,
    };
    SetVal(updateMove);

    const piece = document.querySelectorAll(".piece");
    piece[idx].style.transform = `translate(
      ${disX[newX === -1 ? 4 : newX === -2 ? 3 : newX]}px, 
      ${disY[newY === -1 ? 4 : newY === -2 ? 3 : newY]}px)`;
    piece[idx].style.transition = "transform 0.3s";
  };

  const handler = (block_idx) => {
    const [move, newBoard] = validMove(board, val[block_idx].currPos);
    SetBoard(newBoard);
    if (move !== []) shoot(move, block_idx);
  };

  const rand = () => {
    setHavSol(-1);
    const pieces = document.querySelectorAll(".piece");
    pieces.forEach((piece) => {
      piece.style.transform = "translate(0px,0px)";
      piece.style.transition = "transform 0s";
    });

    const parentDiv = document.querySelector(".board");
    const elementToRemove = parentDiv.querySelector(".die-piece");
    if (elementToRemove) {
      parentDiv.removeChild(elementToRemove);
    }

    let board = [1, 2, 3, 4, 5, 6, 7, 8]; // Board to draw
    let initVal = [0, 1, 2, 3, 4, 5, 6, 7]; // Init value piece

    const updateMove = [...val];
    const randBoard = randomBoard();
    const indexZ = randBoard.indexOf(0);

    randBoard.splice(indexZ, 1);
    board.splice(indexZ, 0, 0);

    let tmp = 0;
    for (let i = 0; i < board.length; i++) {
      if (board[i] != 0) {
        board[i] = randBoard[tmp];
        tmp++;
      } else continue;
    }

    SetBoard(board);

    initVal.forEach((value, idx) => {
      if (idx >= indexZ) {
        initVal[idx] = value + 1;
      }
    });

    SetInitVal(initVal);

    for (let i = 0; i < 8; i++) {
      updateMove[i] = {
        x: 0,
        y: 0,
        currPos: i >= indexZ ? i + 1 : i,
        bodyVal: randBoard[i],
      };
    }

    SetVal(updateMove);

    const newDiv = document.createElement("div");
    newDiv.className = "die-piece";
    const thirdChild = parentDiv.children[indexZ];
    parentDiv.insertBefore(newDiv, thirdChild);
  };

  const solve = () => {
    solvee(board);
  };

  function traceValToId(bodyV, valArr) {
    for (let i = 0; i < valArr.length; i++)
      if (valArr[i].bodyVal === bodyV) return i;
    return -1;
  }

  function differ(arr1, arr2) {
    let tmp = [];
    let tmpVal = [...val];

    for (let i = 0; i < arr1.length; i++) if (arr1[i] !== arr2[i]) tmp.push(i);

    let shootPie = 0;
    if (arr1[tmp[0]] === 0) {
      shootPie = traceValToId(arr1[tmp[1]], tmpVal);
    } else {
      shootPie = traceValToId(arr1[tmp[0]], tmpVal);
    }

    let move = [];

    if (arr1[tmp[0]] === 0) {
      if (tmp[1] - tmp[0] === 1) move = [-1, 0];
      else move = [0, -1];
    } else {
      if (tmp[0] - tmp[1] === 1) move = [1, 0];
      else move = [0, 1];
    }
    return [move, shootPie];
  }

  const userPlay = (piece_id) => {
    const [sol, step] = solStep;
    if (sol === [] || step === -1) {
      return;
    }

    if (step === sol.length) {
      setMidBub(-1);
      return;
    }
    const [move, piece_idx] = differ(sol[step - 1], sol[step]);

    if (midBub !== piece_id && midBub !== -1) {
      setMidBub(-1);
      setHavSol(-1);
      setSolStep([[], -1]);
      return;
    }

    setMidBub(piece_idx);
    setSolStep([[...sol], step + 1]);
    setHavSol(-1);
  };

  return (
    <div className="container">
      <div className="board">
        <div
          className="piece"
          onClick={() => {
            handler(0);
            userPlay(0);
          }}
        >
          {midBub === 0 && tmp === 1 && (
            <div className="piece-child piece-circle"></div>
          )}
          <div className="piece-child piece-txt">{val[0].bodyVal}</div>
        </div>
        <div
          className="piece"
          onClick={() => {
            handler(1);
            userPlay(1);
          }}
        >
          {midBub === 1 && tmp === 1 && (
            <div className="piece-child piece-circle"></div>
          )}
          <div className="piece-child piece-txt">{val[1].bodyVal}</div>
        </div>
        <div
          className="piece"
          onClick={() => {
            handler(2);
            userPlay(2);
          }}
        >
          {midBub === 2 && tmp === 1 && (
            <div className="piece-child piece-circle"></div>
          )}
          <div className="piece-child piece-txt">{val[2].bodyVal}</div>
        </div>
        <div
          className="piece"
          onClick={() => {
            handler(3);
            userPlay(3);
          }}
        >
          {midBub === 3 && tmp === 1 && (
            <div className="piece-child piece-circle"></div>
          )}
          <div className="piece-child piece-txt">{val[3].bodyVal}</div>
        </div>
        <div
          className="piece"
          onClick={() => {
            handler(4);
            userPlay(4);
          }}
        >
          {midBub === 4 && tmp === 1 && (
            <div className="piece-child piece-circle"></div>
          )}
          <div className="piece-child piece-txt">{val[4].bodyVal}</div>
        </div>
        <div
          className="piece"
          onClick={() => {
            handler(5);
            userPlay(5);
          }}
        >
          {midBub === 5 && tmp === 1 && (
            <div className="piece-child piece-circle"></div>
          )}
          <div className="piece-child piece-txt">{val[5].bodyVal}</div>
        </div>
        <div
          className="piece"
          onClick={() => {
            handler(6);
            userPlay(6);
          }}
        >
          {midBub === 6 && tmp === 1 && (
            <div className="piece-child piece-circle"></div>
          )}
          <div className="piece-child piece-txt">{val[6].bodyVal}</div>
        </div>
        <div
          className="piece"
          onClick={() => {
            handler(7);
            userPlay(7);
          }}
        >
          {midBub === 7 && tmp === 1 && (
            <div className="piece-child piece-circle"></div>
          )}
          <div className="piece-child piece-txt">{val[7].bodyVal}</div>
        </div>
      </div>
      <div className="board-setting">
        <Row>
          <Col className="st-col st-c1" xs={3}>
            <p className="st-header">Step 1: Random gameboard</p>

            <ul>
              <li>Click the button below↓ to get a random gameboard. </li>
              <li>You can manually random the gameboard as you wish :))</li>
              <li>Reload page ⟳ to reset the gameboard! </li>
            </ul>

            <div className="st-btn">
              <Button variant="outline-danger" onClick={() => rand()}>
                Random
              </Button>
            </div>
          </Col>
          <Col className="st-col st-c2" xs={3}>
            <p className="st-header">Step 2: Generate solution</p>
            <ul>
              <li>
                Click the button below↓ to generate a solution for the gameboard
                above.{" "}
              </li>
              <li>Please wait to recieve solution's status!</li>
            </ul>
            <div className="st-btn">
              <Button
                className="solve-btn"
                variant="outline-success"
                onClick={() => {
                  solve();
                }}
              >
                Solve
              </Button>
            </div>
            <div className="non-mobile-sol">
              {havSol === 0 ? (
                <SolveUnDone />
              ) : havSol === 1 ? (
                <SolveDone />
            ) : null}
            </div>

            
          </Col>
          <Col className="st-col st-c3" xs={3}>
            <p className="st-header">Step 3: Step-by-step guide</p>
            <ul>
              <li>
                Click the button below↓ to get a step-by-step guide of the
                solution.
              </li>
              <li>
                If you miss a step, the guide will be cancelled immediately :((
              </li>
              <li>After the guide, repeat step 1 to start a new game :3</li>
            </ul>

            <div className="st-btn">
              {havSol === 1 ? (
                <>
                  <Button
                    className="non-mobile"
                    variant="outline-dark"
                    onClick={() => {
                      userPlay();
                      setTmp(1);
                    }}
                  >
                    Step-by-step guide
                  </Button>
                  <Button
                    className="mobile"
                    variant="outline-dark"
                    onClick={() => {
                      userPlay();
                      setTmp(1);
                    }}
                  >
                    Walkthrough
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    className="non-mobile"
                    variant="outline-dark" 
                    disabled
                  >
                    Step-by-step guide
                  </Button>
                  <Button 
                  className="mobile"
                  variant="outline-dark" 
                  disabled
                >
                  Walkthrough
                </Button>
              </>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <div className="mobile-sol">
              {havSol === 0 ? (
                <SolveUnDone />
              ) : havSol === 1 ? (
                <SolveDone />
            ) : null}
            </div>
    </div>
  );
}
