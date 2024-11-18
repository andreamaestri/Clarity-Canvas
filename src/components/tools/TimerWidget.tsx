import { memo } from "react";
import { RiTimerLine } from "react-icons/ri";
import ToolButton from "../common/ToolButton";

const TimerWidget = memo(() => (
  <ToolButton
    label="Timer"
    icon={RiTimerLine}
    onPress={() => console.log("Open timer")}
    tooltipPosition="top"
  />
));

TimerWidget.displayName = "TimerWidget";

export default TimerWidget;
