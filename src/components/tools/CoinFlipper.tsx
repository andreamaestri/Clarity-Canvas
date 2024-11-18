import { Dialog, DialogTrigger, Heading, Popover } from "react-aria-components";
import { useState } from "react";
import type { FC } from "react";
import ToolButton from "../common/ToolButton";
import { RiCopperCoinLine } from "react-icons/ri";

const CoinFlipper: FC = () => {
  const [result, setResult] = useState<"heads" | "tails" | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const flipCoin = () => {
    setIsFlipping(true);
    setResult(null);

    setTimeout(() => {
      const outcome = Math.random() > 0.5 ? "heads" : "tails";
      setResult(outcome);
      setIsFlipping(false);
    }, 1000);
  };

  return (
    <>
      <DialogTrigger>
        <ToolButton
          label="Flip Coin"
          icon={RiCopperCoinLine}
          onPress={flipCoin}
          isActive={isFlipping}
          variant="ghost"
          size="md"
        />

        <Popover placement="top">
          <Dialog className="card bg-secondary shadow-xl p-8">
            <div className="w-64">
              <Heading
                slot="title"
                className="card-title text-center text-secondary-content text-2xl mb-6"
              >
                Coin Flipper
              </Heading>
              <div className="flex flex-col items-center gap-6">
                <div className="text-secondary-content h-32 flex items-center justify-center">
                  {isFlipping ? (
                    <span className="animate-spin text-8xl">🪙</span>
                  ) : result ? (
                    <span className="text-3xl font-bold animate-bounce">
                      {result.toUpperCase()}!
                    </span>
                  ) : (
                    <span className="text-8xl hover:rotate-12 transition-transform">
                      🪙
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={flipCoin}
                  className="btn btn-primary w-full text-lg font-semibold hover:scale-105 transition-transform"
                  disabled={isFlipping}
                ></button>
              </div>
            </div>
          </Dialog>
        </Popover>
      </DialogTrigger>
    </>
  );
};

export default CoinFlipper;
