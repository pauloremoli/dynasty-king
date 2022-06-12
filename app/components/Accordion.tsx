import { ReactElement, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { Theme, useTheme } from "~/utils/ThemeProvider";
type AccordionProps = {
  title: string;
  children: ReactElement | ReactElement[];
};
const Accordion = ({ title, children }: AccordionProps) => {
  const [theme] = useTheme();
  const [isOpened, setOpened] = useState<boolean>(false);

  const HandleOpening = () => {
    setOpened(!isOpened);
  };
  return (
    <div className="border border-gray-400 dark:border-slate-800">
      <div
        onClick={HandleOpening}
        className={
          "bg-gray-300 dark:bg-[hsl(205,100%,15%)] p-4 flex justify-between text-gray-900 items-center"
        }
      >
        <h4 className="font-semibold text-xl dark:text-gray-100">{title}</h4>
        {isOpened ? (
          <AiOutlineArrowUp
            color={theme == Theme.LIGHT ? "black" : "white"}
            size={25}
          />
        ) : (
          <AiOutlineArrowDown
            color={theme == Theme.LIGHT ? "black" : "white"}
            size={25}
          />
        )}
      </div>
      <div
        className={`bg-gray-200 dark:bg-[#003459] overflow-hidden transition-all duration-200 ${
          isOpened ? "visible" : "hidden"
        }`}
      >
        <p className="p-4">{children}</p>
      </div>
    </div>
  );
};

export default Accordion;
