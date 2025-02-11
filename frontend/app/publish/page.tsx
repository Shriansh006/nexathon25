"use client";

import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "@/components/publish/sortable-item"; // We'll define this separately
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BookCheckIcon, PackageIcon } from "lucide-react";

const Publish = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) =>
    event.preventDefault();

  const handleSortEnd = ({ active, over }: any) => {
    if (active.id !== over.id) {
      const oldIndex = files.findIndex((file) => file.name === active.id);
      const newIndex = files.findIndex((file) => file.name === over.id);
      setFiles((prevFiles) => arrayMove(prevFiles, oldIndex, newIndex));
    }
  };

  return (
    <div className="bg-gray-900 h-screen w-screen flex flex-col">
      <nav className="flex w-full items-center gap-2 p-4 border-b border-gray-700 bg-gray-900">
        <div className="flex items-center mr-8 text-white">
          <Image
            alt="logo"
            src="/logo.png"
            className="h-10"
            height={50}
            width={80}
          />
          <span className="text-2xl font-extrabold">Manim Books</span>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-white text-xl font-bold mb-1">Pubish Your Book</h1>
        <span className="text-white text-sm mb-4">Upload your chapters <code>.mbc</code> files to generate full book.</span>

        <div className="flex w-full space-x-4 px-5">
            <div
            onDrop={handleDrop}
            onDragOver={handleDragStart}
            className="w-4/5 h-80 border-2 mt-8 border-dashed border-gray-600 rounded-lg flex items-center justify-center text-gray-500 cursor-pointer"
            >
            Drag and Drop Files Here or Click to Upload
            </div>

            <div className="flex max-h-96 overflow-y-auto w-full">

                {
                    files.length === 0 &&  (
                    <div className="flex items-center justify-center w-full h-full text-white">❌ No files to display. Upload Now</div>
                    )
                }

                <DndContext
                    
                    collisionDetection={closestCenter}
                    onDragEnd={handleSortEnd}
                >
                    <SortableContext
                    items={files.map((file) => file.name)}
                    strategy={verticalListSortingStrategy}
                    >
                    <div className="w-full mt-6">
                        {files.map((file, index) => (
                        <SortableItem
                            key={file.name}
                            id={file.name}
                            index={index}
                            fileName={file.name}
                        />
                        ))}
                    </div>
                    </SortableContext>
                </DndContext>
            </div>
        </div>
      </div>

      <div className="flex justify-center w-full mt-10 space-x-4">
        <Button disabled variant="secondary" size="sm" className="w-fit bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 border-0">
            <BookCheckIcon className="w-4 h-4 mr-2" />
            Publish Book (soon)
        </Button>
        
        <Button variant="secondary" size="sm" className="w-fit bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 border-0">
            <PackageIcon className="w-4 h-4 mr-2" />
            Donwload Book
        </Button>
      </div>

    </div>
  );
};

export default Publish;