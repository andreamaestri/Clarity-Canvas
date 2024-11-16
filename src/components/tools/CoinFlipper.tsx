import {
	Button,
	Dialog,
	DialogTrigger,
	Heading,
	OverlayArrow,
	Popover,
} from "react-aria-components";
import { useState } from "react";
import type { FC } from "react";

const CoinFlipper: FC = () => {
	const [result, setResult] = useState<"heads" | "tails" | null>(null);
	const [isFlipping, setIsFlipping] = useState(false);

	const flipCoin = () => {
		setIsFlipping(true);
		setResult(null);

		// Add animation time before showing result
		setTimeout(() => {
			const outcome = Math.random() > 0.5 ? "heads" : "tails";
			setResult(outcome);
			setIsFlipping(false);
		}, 1000);
	};

	return (
		<DialogTrigger>
			<Button className="btn btn-primary">Flip a Coin</Button>
			<Popover placement="top">
				<OverlayArrow>
					<svg width={12} height={12} viewBox="0 0 12 12">
						<path d="M0 0 L6 6 L12 0" />
					</svg>
				</OverlayArrow>
				<Dialog className="card bg-base-100 shadow-xl p-6">
					<div className="w-48">
						{" "}
						{/* Changed from w-64 to w-48 */}
						<Heading slot="title" className="card-title text-center mb-4">
							Coin Flipper
						</Heading>
						<div className="flex flex-col items-center gap-4">
							<div
								className={`text-6xl font-bold mb-4 h-8 ${
									isFlipping ? "animate-bounce" : ""
								}`}
							>
								{isFlipping ? "🪙" : result ? `${result.toUpperCase()}!` : "🪙"}
							</div>

							<Button
								onPress={flipCoin}
								className="btn btn-primary w-full"
								isDisabled={isFlipping}
							>
								{isFlipping ? "Flipping..." : "Flip Coin"}
							</Button>
						</div>
					</div>
				</Dialog>
			</Popover>
		</DialogTrigger>
	);
};

export default CoinFlipper;
