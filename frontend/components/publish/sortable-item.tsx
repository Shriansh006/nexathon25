import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Move } from "lucide-react";

const SortableItem = ({ id, index, fileName }: any) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
  
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="flex space-x-2 items-center justify-between bg-gray-800 text-white p-2 rounded-lg mb-2"
      >
        <div className="flex space-x-2 items-center">
            <Move className="size-6 text-gray-500" />
            <span className="text-gray-300 font-bold">{index + 1}</span>
        </div>
        <span>{fileName}</span>
      </div>
    );
  };


export default SortableItem;