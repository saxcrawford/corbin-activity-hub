"use client";

import { useState } from "react";
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    useDroppable,
} from "@dnd-kit/core";
import { DraggableClassItem } from "./Draggable";
import { TimeTableRows } from "./Droppable";
import Navbar from "../components/navbar";
import { DeleteArea } from "./Droppable";

export type ClassItem = {
    id: string;
    name: string;
    color: string;
};
export type Schedule = {
    [key: string]: ClassItem | undefined;
};

// Add type definitions for drag data
type DragData = {
    type: 'class' | 'scheduledClass' | 'cell' | 'delete';
    item?: ClassItem;
    cellId?: string;
    day?: string;
    time?: string;
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
];

const initialClasses: ClassItem[] = [
    { id: "1", name: "Trails", color: "bg-corbinBlue" },
    { id: "2", name: "Restaurants", color: "bg-corbinRed" },
    { id: "3", name: "Shops", color: "bg-corbinLightBlue" },
];

function Timetable() {
    const [schedule, setSchedule] = useState<Schedule>({});
    const [hoveredDay, setHoveredDay] = useState<string | null>(null);
    const [hoveredTime, setHoveredTime] = useState<string | null>(null);
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);
    const [textColor, setTextColor] = useState<string | null>(null);
    const [activeItem, setActiveItem] = useState<ClassItem | null>(null);

    const resetDragState = () => {
        setActiveItem(null);
        setHoveredDay(null);
        setHoveredTime(null);
        setHoveredColor(null);
        setTextColor(null);
    };

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        })
    );

    const generateUniqueId = () =>
        `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const activeData = active.data.current as DragData;

        if (activeData && activeData.item) {
            setActiveItem(activeData.item);
            setHoveredColor(activeData.item.color.split(" ")[0]);
            setTextColor(activeData.item.color);
        }
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { over } = event;

        if (over) {
            const overData = over.data.current as DragData;

            if (overData?.type === "cell") {
                setHoveredDay(overData.day || null);
                setHoveredTime(overData.time || null);
            }
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            resetDragState();
            return;
        }

        const activeData = active.data.current as DragData;
        const overData = over.data.current as DragData;

        if (activeData && overData) {
            if (overData.type === "cell" && overData.day && overData.time) {
                const cellId = `${overData.day}-${overData.time}`;

                if (activeData.type === "class" && activeData.item) {
                    const classItem = activeData.item;
                    const newClassInstance = { ...classItem, id: generateUniqueId() };

                    setSchedule((prev) => ({
                        ...prev,
                        [cellId]: newClassInstance,
                    }));
                }
                else if (activeData.type === "scheduledClass" && activeData.item && activeData.cellId) {
                    const sourceCell = activeData.cellId;
                    const classItem = activeData.item;

                    if (sourceCell !== cellId) {
                        setSchedule((prev) => {
                            const updated = { ...prev };
                            delete updated[sourceCell];
                            return {
                                ...updated,
                                [cellId]: classItem,
                            };
                        });
                    }
                }
            }
            else if (overData.type === "delete" && activeData.cellId) {
                const cellId = activeData.cellId;

                setSchedule((prev) => {
                    const updated = { ...prev };
                    delete updated[cellId];
                    return updated;
                });
            }
        }

        resetDragState();
    };

    // Droppable area
    const { setNodeRef: setClassListRef } = useDroppable({
        id: "class-list",
        data: { type: "classList" },
    });

    return (
        <div className="bg-background min-h-screen flex flex-col">
            <div className="w-full">
                <Navbar />
            </div>

            <div className="bg-corbinRedLight/10 border-2 rounded-2xl border-corbinRed p-4 mb-6 mx-auto">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-corbinRed" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-corbinRed">
                            <strong>Work in Progress:</strong> We&apos;re actively improving this trip planning tool.
                            Some features are still being refined.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-corbinRed">
                        Plan Your Trip
                    </h1>
                    <p className="text-lg sm:text-xl font-semibold text-corbinBlue mt-2">
                        A place to discover, plan, and share outdoor activities in and
                        around Corbin, Kentucky
                    </p>
                </div>

                <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    <div className="text-lightCorbin">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
                            <div className="bg-corbinGreen rounded-xl p-4 lg:p-5 mb-auto">
                                <div
                                    ref={setClassListRef}
                                    className="bg-corbinGray/50 shadow-md rounded-xl p-4 h-full"
                                    aria-label="Available Activities"
                                >
                                    <h2 className="text-xl font-bold mb-4 text-white">
                                        Available Activities
                                    </h2>
                                    <ul className="list-none space-y-2">
                                        {initialClasses.map((cls) => (
                                            <DraggableClassItem key={cls.id} item={cls} />
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-4">
                                    <DeleteArea />
                                </div>
                            </div>

                            <div className="lg:col-span-4 bg-corbinGreen p-4 lg:p-5 rounded-xl">
                                <div className="bg-corbinGray/50 shadow-md p-4 rounded-xl overflow-auto">
                                    <h2 className="text-xl font-bold mb-4 text-white">
                                        Current Schedule
                                    </h2>
                                    <div className="overflow-x-auto">
                                        {" "}
                                        <table className="table-auto w-full min-w-[640px]">
                                            <thead>
                                            <tr>
                                                <th className="py-2 text-left pl-2"></th>
                                                {days.map((day) => (
                                                    <th
                                                        key={day}
                                                        className={`px-4 py-2 text-center ${
                                                            hoveredDay === day ? hoveredColor : "text-white"
                                                        } ${
                                                            textColor === day ? textColor : "text-white"
                                                        }`}
                                                    >
                                                        {day}
                                                    </th>
                                                ))}
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <TimeTableRows
                                                times={times}
                                                hoveredTime={hoveredTime}
                                                hoveredColor={hoveredColor}
                                                textColor={textColor}
                                                days={days}
                                                schedule={schedule}
                                            />
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DragOverlay>
                        {activeItem && (
                            <div
                                className={`p-2 rounded ${activeItem.color} text-white shadow-lg`}
                            >
                                {activeItem.name}
                            </div>
                        )}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    );
}

export default Timetable;