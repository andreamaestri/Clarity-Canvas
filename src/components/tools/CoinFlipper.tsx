import type { FC } from 'react';
import { useState } from 'react';
import { Button } from 'react-aria-components';
const CoinFlipper: FC = () => {
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);

  const flipCoin = () => {
    const outcome = Math.random() > 0.5 ? 'heads' : 'tails';
    setResult(outcome);
  };

  return (
    <div className="coin-flipper">
      <Button type="button" onPress={flipCoin} className="custom-button">
        Flip Coin
      </Button>
      {result && <div className="result">{result}</div>}
    </div>
  );
};

export default CoinFlipper;