import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

export function SolveDone() {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <Alert variant="success" dismissible>
        <Alert.Heading>We have a solution for you!</Alert.Heading>
        <p>Try out step-by-step guide!</p>
      </Alert>
    );
  }
  return <></>;
}

export function SolveUnDone() {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <Alert variant="danger" dismissible>
        <Alert.Heading>Can not solve :((</Alert.Heading>
        <p>It takes forever to solve :((</p>
        <p>Please provide another gameboard!</p>
      </Alert>
    );
  }
  return <></>;
}