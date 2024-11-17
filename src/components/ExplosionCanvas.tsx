import { useEffect, useRef, useState } from "react";
import { useEditor } from "tldraw";

interface ExplosionCanvasProps {
  trigger: boolean;
  onComplete: () => void;
}

const ExplosionCanvas: React.FC<ExplosionCanvasProps> = ({
  trigger,
  onComplete,
}) => {
  const rCanvas = useRef<HTMLCanvasElement>(null);
  const editor = useEditor();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const cvs = rCanvas.current!;
    const rect = cvs.getBoundingClientRect();
    cvs.width = rect.width;
    cvs.height = rect.height;
  }, [editor]);

  useEffect(() => {
    if (!trigger) return;
    setIsAnimating(true);

    const cvs = rCanvas.current!;
    const ctx = cvs.getContext("2d")!;

    let opacity = 1;
    let radius = 0;
    const camera = editor.getCamera();

    const animate = () => {
      ctx.resetTransform();
      ctx.clearRect(0, 0, cvs.width, cvs.height);

      // Apply camera transform with smooth scaling
      ctx.translate(cvs.width / 2, cvs.height / 2);
      ctx.scale(camera.z * (1 + radius / 1000), camera.z * (1 + radius / 1000));
      ctx.translate(camera.x, camera.y);

      // Create explosion effect with improved colors
      ctx.globalAlpha = opacity;

      // Enhanced flash effect with multiple colors
      const gradientColors = [
        `rgba(255, ${Math.random() * 100 + 100}, 0, ${opacity})`,
        `rgba(255, ${Math.random() * 50}, 0, ${opacity})`,
        `rgba(255, 255, ${Math.random() * 100}, ${opacity})`,
      ];

      gradientColors.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(0, 0, radius * (1 - i * 0.2), 0, Math.PI * 2);
        ctx.fill();
      });

      // Particles effect
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.arc(x, y, radius * 0.05, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, ${Math.random() * 255}, 0, ${opacity})`;
        ctx.fill();
      }

      radius += 30 * (1 - radius / 1000); // Gradually slow down expansion
      opacity -= 0.015; // Slower fade out

      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(-cvs.width / 2, -cvs.height / 2, cvs.width, cvs.height);
        editor.selectAll().delete();
        setIsAnimating(false);
        onComplete();
      }
    };

    animate();
  }, [trigger, editor, onComplete]);

  return (
    <canvas
      ref={rCanvas}
      className={`
        absolute inset-0 w-full h-full pointer-events-none z-[999]
        ${isAnimating ? "animate-in fade-in zoom-in duration-300" : ""}
      `}
    />
  );
};

export default ExplosionCanvas;
