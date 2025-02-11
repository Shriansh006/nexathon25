"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { openDB, IDBPDatabase } from "idb";
import { Cell } from "@/components/notebook/cell";
import { Toolbar } from "@/components/notebook/toolbar";
import { NotebookCell, Notebook, CellContent, ExecutionResponse } from "../types/notebook";
import { v4 as uuidv4 } from "uuid";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { backendService } from "@/lib/execute";
import Preview from "@/components/notebook/preview";
import axios from "axios";
import { resolve } from "node:path";
import toast from "react-hot-toast";

// Database configuration
const DB_NAME = "NotebookDB";
const STORE_NAME = "notebook";
const DB_VERSION = 1;

// Open or initialize the IndexedDB
const initializeDB = async (): Promise<IDBPDatabase> => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

export default function Home() {

  const [previewUrl , setPreviewUrl] = useState("");
  const [executing , setExecuting] = useState(false);
  const [fileName, setFileName] = useState("chapter.mbc");
  const [error , setError] = useState("");
  const frameRef = useRef<HTMLIFrameElement>(null);

  const notebookRef = useRef<Notebook>({
    cells: [],
    metadata: {
      kernelspec: {
        name: "python3",
        display_name: "Python 3",
      },
      language_info: {
        name: "python",
        version: "3.8",
      },
    },
  });

  const [, setRerender] = useState(false); // Dummy state to force re-renders

  // Fetch notebook from IndexedDB
  const fetchNotebook = useCallback(async () => {
    const db = await initializeDB();
    const storedNotebook = await db.get(STORE_NAME, "notebook");
    if (storedNotebook) {
      notebookRef.current = storedNotebook;
      setRerender((prev) => !prev); // Trigger re-render
    }
  }, []);

  // Save notebook to IndexedDB
  const saveNotebook = useCallback(async () => {
    const db = await initializeDB();
    await db.put(STORE_NAME, { id: "notebook", ...notebookRef.current });
    console.log("Notebook saved to IndexedDB.");
  }, []);

  // Load notebook on mount
  useEffect(() => {
    fetchNotebook();
  }, [fetchNotebook]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "s":
            e.preventDefault();
            toast('Saved',
              {
                icon: '✅',
                style: {
                  borderRadius: '10px',
                  background: '#282c34',
                  color: '#fff',
                },
              }
            );
            saveNotebook();
            break;
          case "b":
            e.preventDefault();
            toast('Created code block',
              {
                icon: '🤖',
                style: {
                  borderRadius: '10px',
                  background: '#282c34',
                  color: '#fff',
                },
              }
            );
            addCell("code");
            break;
          case "m":
            e.preventDefault();
            toast('Created markdown block',
              {
                icon: '🪄',
                style: {
                  borderRadius: '10px',
                  background: '#282c34',
                  color: '#fff',
                },
              }
            );
            addCell("markdown");
            break;
          case "/":
            e.preventDefault();
            document.getElementById("ai-btn")?.click();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [saveNotebook]);

  const addCell = useCallback(
    (type: "code" | "markdown", index?: number) => {
      const newCell: NotebookCell = {
        id: uuidv4(),
        type,
        content: "",
        outputs: [],
      };
      const cells = [...notebookRef.current.cells];
      if (typeof index === "number") {
        cells.splice(index + 1, 0, newCell);
      } else {
        cells.push(newCell);
      }
      notebookRef.current.cells = cells;
      setRerender((prev) => !prev); // Trigger re-render
    },
    []
  );

  const updateCell = useCallback((id: string, content: string) => {
    notebookRef.current.cells = notebookRef.current.cells.map((cell) =>
      cell.id === id ? { ...cell, content } : cell
    );
  }, []);

  const deleteCell = useCallback((id: string) => {
    notebookRef.current.cells = notebookRef.current.cells.filter(
      (cell) => cell.id !== id
    );
    setRerender((prev) => !prev); // Trigger re-render
  }, []);

  const moveCell = useCallback((id: string, direction: "up" | "down") => {
    const cells = [...notebookRef.current.cells];
    const index = cells.findIndex((cell) => cell.id === id);
    if (direction === "up" && index > 0) {
      [cells[index - 1], cells[index]] = [cells[index], cells[index - 1]];
    } else if (direction === "down" && index < cells.length - 1) {
      [cells[index], cells[index + 1]] = [cells[index + 1], cells[index]];
    }
    notebookRef.current.cells = cells;
    setRerender((prev) => !prev); // Trigger re-render
  }, []);

  const importNotebook = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const content = JSON.parse(e.target?.result as string);
          const cells = content.cells.map((cell: any) => ({
            id: uuidv4(),
            type: cell.cell_type === "code" ? "code" : "markdown",
            content: cell.source.join(""),
            outputs: cell.outputs
              ?.map((output: any) =>
                output.text?.join("") || output.data?.["text/plain"]?.join("") || ""
              )
              .filter(Boolean) || [],
          }));
          notebookRef.current = {
            cells,
            metadata: content.metadata,
          };
          setRerender((prev) => !prev); // Trigger re-render
          // Save imported notebook to IndexedDB
          const db = await initializeDB();
          await db.put(STORE_NAME, { id: "notebook", ...notebookRef.current });
        } catch (error) {
          console.error("Error importing notebook:", error);
        }
      };
      reader.readAsText(file);
    }
  }, []);

  const exportNotebook = useCallback(() => {
    const ipynb = {
      cells: notebookRef.current.cells.map((cell) => {
        const format: CellContent = {
          cell_type: cell.type,
          metadata: {},
          source: [cell.content],
        };

        if (cell.type === "code") {
          format.outputs = cell.outputs?.map((output) => ({
            output_type: "stream",
            text: [output],
          }));
          format.execution_count = 0;
        }

        return format;
      }),
      metadata: notebookRef.current.metadata,
      nbformat: 4,
      nbformat_minor: 5,
    };

    const blob = new Blob([JSON.stringify(ipynb, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName?fileName:"notebook.ipynb";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);



  const executeNotebook = useCallback(async () => {
    setExecuting(true);
    setError("");
    const ipynb = {
      cells: notebookRef.current.cells.map((cell) => {
        const format: CellContent = {
          cell_type: cell.type,
          metadata: {},
          source: [cell.content],
        };
  
        if (cell.type === "code") {
          format.outputs = cell.outputs?.map((output) => ({
            output_type: "stream",
            text: [output],
          }));
          format.execution_count = 0;
        }
  
        return format;
      }),
      metadata: notebookRef.current.metadata,
      nbformat: 4,
      nbformat_minor: 5,
    };
  
    try {
      const preview: ExecutionResponse = await backendService(JSON.stringify(ipynb), uuidv4());
      await new Promise((resolve) => setTimeout(resolve, 3000)); 
      setPreviewUrl(preview.url);
  
      // Poll for status
      const pollStatus = async (url: string) => {
        try {
          while (true) {
            try{
              const response = await axios.post("/api/success", { previewUrl: url });
              if (response.status === 200) {
                if(!response.data.done){
                  setError(response.data.error);
                }
                break;
              }
            }
            catch(e){
              // Pass 404 Error
              await new Promise((resolve) => setTimeout(resolve, 3000)); // 3-second delay
            }
          }
        } catch (error) {
          console.error("Error while polling status:", error);
        }
      };
  
      await pollStatus(preview.url);
      if (frameRef.current) {
        frameRef.current.src = preview.url;
      }
    } catch (error) {
      console.error("Error during notebook execution:", error);
    } finally {
      setExecuting(false); 
    }
  }, []);
  



  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Toolbar
        onAddCodeCell={() => addCell("code")}
        onAddMarkdownCell={() => addCell("markdown")}
        onImportNotebook={importNotebook}
        onExportNotebook={exportNotebook}
        onExecute={executeNotebook}
        executing={executing}
        fileName={fileName}
        setFileName={setFileName}
      />
      <div className="grid grid-cols-2">
        <div className="p-4 overflow-y-auto max-h-[calc(100vh-64px)]">
          <div className="space-y-1">
            {notebookRef.current.cells.map((cell, index) => (
              <div key={cell.id}>
                <Cell
                  cell={cell}
                  onUpdate={updateCell}
                  onDelete={deleteCell}
                  onMoveUp={(id) => moveCell(id, "up")}
                  onMoveDown={(id) => moveCell(id, "down")}
                  isFirst={index === 0}
                  isLast={index === notebookRef.current.cells.length - 1}
                />
                <div className="h-1 group relative">
                  <div className="absolute inset-x-0 -top-2 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                    <div className="w-full flex h-px bg-gray-700" />
                    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => addCell("code", index)}
                          className="h-6 min-w-[80px] bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full text-xs"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add Code
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => addCell("markdown", index)}
                          className="h-6 min-w-[80px] bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full text-xs"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add Markdown
                        </Button>
                    </div>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-900 border-l border-gray-700 h-[calc(100vh-74px)] sticky top-[64px]">
          <Preview previewUrl={previewUrl} frameRef={frameRef} executing={executing} error={error} />
        </div>
      </div>
    </div>
  );
}
