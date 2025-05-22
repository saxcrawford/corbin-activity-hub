
"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import type { ClassItem } from "./Droppable";

export const DraggableClassItem = ({ item }: { item: ClassItem }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `class-${item.id}`,
    data: {
      type: "class",
      item,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  // Placeholder during server rendering
  if (!isMounted) {
    return (
        <li
            className={`${item.color} p-2 rounded text-white`}
        >
          {item.name}
        </li>
    );
  }

  return (
      <li
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          className={`${item.color} p-2 rounded text-white cursor-grab active:cursor-grabbing`}
          style={style}
      >
        {item.name}
      </li>
  );
};

export const ScheduledClassItem = ({
                                     item,
                                     cellId,
                                   }: {
  item: ClassItem;
  cellId: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `scheduled-${item.id}`,
    data: {
      type: "scheduledClass",
      item,
      cellId,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  if (!isMounted) {
    return (
        <div className={`${item.color} p-2 rounded text-white`}>
          {item.name}
        </div>
    );
  }

  return (
      <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          className={`${item.color} p-2 rounded text-white cursor-grab active:cursor-grabbing`}
          style={style}
      >
        {item.name}
      </div>
  );
};