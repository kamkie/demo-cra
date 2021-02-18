import React, { memo, ReactNode, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const contextPath = process.env.REACT_APP_CONTEXT_PATH === '/' ? '' : process.env.REACT_APP_CONTEXT_PATH || '';

interface CounterProps {
  counter: number;
  step: number;
  children: ReactNode;
}

const Code = styled.pre`
  text-align: left;
`;

const Counter = (props: CounterProps) => {
  const [step, setStep] = useState<number>(props.step);
  const [counter, setCounter] = useState<number>(props.counter);
  const [info, setInfo] = useState<object>({});
  const updateStep = useCallback(() => setStep((old) => old + 1), []);
  const increment = useCallback(() => setCounter((old) => old + step), [step]);
  useEffect(() => {
    fetch(`${contextPath}/actuator/info`)
      .then((response) => response.json())
      .then((info) => info.build)
      .then((body) => setInfo(body))
      .catch((error) => setInfo(error));
  }, []);

  return (
    <div>
      <p>
        counter: <span>{counter}</span>
      </p>
      <input value={step} onChange={updateStep} />
      <button onClick={increment}>+</button>
      <Code>{JSON.stringify(info, null, 4)}</Code>
      <div>{props.children}</div>
    </div>
  );
};

export default memo(Counter);
