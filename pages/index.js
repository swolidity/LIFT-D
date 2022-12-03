import Head from "next/head";
import dynamic from "next/dynamic";
import { useState } from "react";

const ReactP5Wrapper = dynamic(
  () => import("react-p5-wrapper").then((mod) => mod.ReactP5Wrapper),
  { ssr: false }
);

import {
  Container,
  Box,
  Flex,
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

import { DeleteIcon, SmallCloseIcon } from "@chakra-ui/icons";

function sketch(p5) {
  p5.setup = () => {
    p5.createCanvas(575, 500);
  };

  let exercises = [];

  p5.updateWithProps = (props) => {
    console.log("props", props);
    if (props.exercises) {
      exercises = props.exercises;
    }
  };

  p5.draw = () => {
    p5.background("#f8f8f8");

    exercises.map((exercise, i) => {
      let r = p5.random(255);
      let g = p5.random(255);
      let b = p5.random(255);
      let a = p5.random(200, 255);
      p5.fill(r, g, b, a);

      let rep = 0;
      while (rep < exercise.reps) {
        p5.rect(rep * 30, i * 30, 25, 25);
        rep++;
      }
    });
  };
}

export default function Home() {
  const [exercises, setExercises] = useState([
    { name: "pushup", weight: 0, reps: 0 },
  ]);

  return (
    <Container>
      <Heading as="h1" textAlign="center" mt={6} mb={6}>
        LIFTΞD
      </Heading>
      {exercises.map((exercise, i) => {
        return (
          <Flex key={i} mb={4}>
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
            <Box mx={2} alignItems="center">
              <SmallCloseIcon />
            </Box>
            <NumberInput
              mx={2}
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
                setExercises([
                  ...exercises.slice(0, i),
                  ...exercises.slice(i + 1),
                ]);
              }}
              aria-label="delete exercise"
              icon={<DeleteIcon />}
            />
          </Flex>
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
        <ReactP5Wrapper sketch={sketch} exercises={[...exercises]} />
      </Box>
    </Container>
  );
}
