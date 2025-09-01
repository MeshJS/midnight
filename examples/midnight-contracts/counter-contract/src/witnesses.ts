// This is how we type an empty object.
export type CounterPrivateState = {
  privateCounter: number;
};

export const createPrivateState = (value: number): CounterPrivateState => {
  return {
    privateCounter: value,
  };
};

export const witnesses = {};
