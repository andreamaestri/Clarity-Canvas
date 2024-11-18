import { FC } from "react";
import { Dialog, DialogTrigger, Heading, Popover } from "react-aria-components";
import { RiListCheck2 } from "react-icons/ri";
import ToolButton from "../common/ToolButton";

const PriorityListWidget: FC = () => {
  return (
    <DialogTrigger>
      <ToolButton
        label="Priority List"
        icon={RiListCheck2}
        tooltipPosition="top"
      />
      <Popover placement="top">
        <Dialog className="card bg-secondary shadow-xl p-6">
          <div className="w-48">
            <Heading
              slot="title"
              className="card-title text-center text-secondary-content mb-4"
            >
              Priority List
            </Heading>
            {/* Priority list content here */}
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};

export default PriorityListWidget;
