import Head from "next/head";
import dynamic from "next/dynamic";
import { useState } from "react";
const Sketch = dynamic(import("react-p5"), { ssr: false });

import {
  Container,
  Box,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Button,
  Heading,
  IconButton,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";

let y = 50;

export default function Home() {
  const [exercises, setExercises] = useState([
    { name: "pushup", weight: 0, reps: 0 },
  ]);
  const [x, setX] = useState(50);
  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(575, 500).parent(canvasParentRef);
    //p5.noLoop();
  };

  const draw = (p5) => {
    p5.background("#f8f8f8");

    exercises.map((exercise, i) => {
      console.log("test", exercise);
      console.log({ i });

      let r = p5.random(255);
      let g = p5.random(255);
      let b = p5.random(255);
      let a = p5.random(200, 255);

      console.log({ b });
      let rep = 0;
      while (rep < exercise.reps) {
        p5.fill(r, g, b, a);
        p5.rect(rep * 30, i * 30, 25, 25);
        rep++;
      }
    });

    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
  };

  console.log({ exercises });

  return (
    <Container>
      <Heading as="h1" textAlign="center" mt={6} mb={6}>
        LIFTΞD
      </Heading>
      {exercises.map((exercise, i) => {
        console.log({ i });
        return (
          <Box key={i} mb={4}>
            <Select
              value={exercises[i].name}
              onChange={(e) => {
                setExercises([
                  ...exercises.slice(0, i),
                  {
                    ...exercises[i],
                    name: e.target.value,
                  },
                  ...exercises.slice(i + 1),
                ]);
              }}
            >
              <option value="pushup">Push Up</option>
              <option value="air-squat">Air Squat</option>
              <option value="lunge">Lunge</option>
            </Select>
            <Box>X</Box>
            <NumberInput
              onChange={(n) => {
                setExercises([
                  ...exercises.slice(0, i),
                  {
                    ...exercises[i],
                    reps: n,
                  },
                  ...exercises.slice(i + 1),
                ]);
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            <IconButton
              onClick={(e) => {
                console.log("delete", i);
                setExercises([
                  ...exercises.slice(0, i),
                  ...exercises.slice(i + 1),
                ]);
              }}
              aria-label="delete exercise"
              icon={<DeleteIcon />}
            />
          </Box>
        );
      })}
      <Button
        mb={6}
        onClick={() =>
          setExercises([...exercises, { name: "", reps: 0, weight: 0 }])
        }
      >
        Add Exercise
      </Button>
      <Box>
        {typeof window !== "undefined" ? (
          <Sketch setup={setup} draw={draw} />
        ) : null}
      </Box>
    </Container>
  );
}
