import React, {memo, PropsWithChildren, useCallback, useState} from "react";

interface CounterProps extends PropsWithChildren<any> {
  counter: number,
  step: number
}

const Counter = (props: CounterProps) => {
  const [step, setStep] = useState<number>(props.step);
  const [counter, setCounter] = useState<number>(props.counter);
  const updateStep = useCallback(() => setStep(old => old + 1), []);
  const increment = useCallback(() => setCounter(old => old + step), [step]);

  return (
    <div>
      <p>counter: <span>{counter}</span></p>
      <input value={step} onChange={updateStep}/>
      <button onClick={increment}>+</button>
    </div>
  )
};

export default memo(Counter);
