"use client";

import { useRouter } from "next/navigation";
import { IEmptyProps } from "../types";
import Heading from "./Heading";
import Btn from "./Btn";

const Empty: React.FC<IEmptyProps> = ({
  title = "No Excat Mathches",
  subtitle = "Try Changing or removing some of you're filters",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-2">
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Btn
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default Empty;
