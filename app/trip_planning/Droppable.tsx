import { useDroppable } from "@dnd-kit/core";
import { ScheduledClassItem } from "./Draggable";

export type ClassItem = {
  id: string;
  name: string;
  color: string;
};

export type Schedule = {
  [key: string]: ClassItem | undefined;
};

// Droppable time slot
export const DroppableCell = ({
  day,
  time,
  item,
}: {
  day: string;
  time: string;
  item?: ClassItem;
}) => {
  const cellId = `${day}-${time}`;
  const { setNodeRef, isOver } = useDroppable({
    id: cellId,
    data: { type: "cell", day, time },
  });

  return (
    <td
      ref={setNodeRef}
      className={`border border-gray-300 px-4 py-2 min-h-12 h-12 ${
        isOver ? "bg-gray-700/30" : ""
      }`}
      aria-label={`${day} at ${time}`}
    >
      {item && <ScheduledClassItem item={item} cellId={cellId} />}
    </td>
  );
};
export const DeleteArea = () => {
  const { setNodeRef, isOver } = useDroppable({
    id: "delete-area",
    data: { type: "delete" },
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-full h-16 flex items-center justify-center border-2 border-corbinGray/70 rounded-2xl border-dashed ${
        isOver ? "bg-corbinRed/50" : "bg-0"
      }`}
      aria-label="Delete area"
    >
      <span className="text-corbinGray/70">Drag here to delete</span>
    </div>
  );
};

type TimeTableRowsProps = {
  times: string[];
  hoveredTime: string | null;
  hoveredColor: string | null;
  textColor: string | null;
  days: string[];
  schedule: Schedule;
};

export const TimeTableRows: React.FC<TimeTableRowsProps> = ({
  times,
  hoveredTime,
  hoveredColor,
  textColor,
  days,
  schedule,
}) => {
  return (
    <>
      {times.map((time) => (
        <tr key={time}>
          <th
            className={`px-4 py-2 text-left ${
              hoveredTime === time ? hoveredColor : "text-white"
            } ${textColor === time ? textColor : "text-white"}`}
            scope="row"
          >
            {time}
          </th>
          {days.map((day) => (
            <DroppableCell
              key={`${day}-${time}`}
              day={day}
              time={time}
              item={schedule[`${day}-${time}`]}
            />
          ))}
        </tr>
      ))}
    </>
  );
};
