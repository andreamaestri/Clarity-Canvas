import { Button, Dialog, DialogTrigger, Heading, Popover } from "react-aria-components";
import { useState } from "react";
import type { FC } from "react";
import ToolButton from "../common/ToolButton";
import { RiCopperCoinLine } from "react-icons/ri";

const CoinFlipper: FC = () => {
  const [result, setResult] = useState<"heads" | "tails" | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipCount, setFlipCount] = useState(0);

  const flipCoin = () => {
    setIsFlipping(true);
    setResult(null);
    setFlipCount((prev) => prev + 1);

    const flips = 5; // Number of rotations before result
    let currentFlip = 0;

    const flipInterval = setInterval(() => {
      currentFlip++;
      if (currentFlip >= flips) {
        clearInterval(flipInterval);
        const outcome = Math.random() > 0.5 ? "heads" : "tails";
        setResult(outcome);
        setIsFlipping(false);
      }
    }, 200);
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
          <Dialog className="card bg-secondary shadow-xl p-8 animate-in slide-in-from-top-4 duration-300">
            <div className="w-72">
              <Heading
                slot="title"
                className="card-title text-center text-secondary-content text-2xl mb-6 animate-in fade-in duration-500"
              >
                Coin Flipper
              </Heading>
              <div className="flex flex-col items-center gap-6">
                <div className="text-secondary-content h-40 flex items-center justify-center perspective-[1000px]">
                  {isFlipping ? (
                    <span className="text-8xl animate-[spin_0.2s_linear_infinite] transform-gpu">
                      🪙
                    </span>
                  ) : result ? (
                    <div className="space-y-2 text-center animate-in zoom-in duration-300">
                      <span className="text-4xl font-bold animate-bounce inline-block">
                        {result.toUpperCase()}!
                      </span>
                      <p className="text-sm opacity-75 animate-in fade-in duration-500">
                        Flipped {flipCount} times
                      </p>
                    </div>
                  ) : (
                    <DialogTrigger>
                      <span
                      className="text-8xl hover:rotate-12 transition-transform duration-300 cursor-pointer hover:scale-110"
                      >
                      🪙
                      </span>
                    </DialogTrigger>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={flipCoin}
                  className="btn btn-primary w-full text-lg font-semibold hover:scale-105 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
                  disabled={isFlipping}
                >
                  {isFlipping ? "Flipping..." : "Flip Coin"}
                </Button>
              </div>
            </div>
          </Dialog>
        </Popover>
      </DialogTrigger>
    </>
  );
};

export default CoinFlipper;
