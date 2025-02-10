"use client";

import { Button } from "@/components/ui/button";
import { Plus, FileJson, Download, CogIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ToolbarProps {
  onAddCodeCell: () => void;
  onAddMarkdownCell: () => void;
  onImportNotebook: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onExportNotebook: () => void;
  onExecute: ()=>void;
  executing: boolean;
}

export function Toolbar({
  onAddCodeCell,
  onAddMarkdownCell,
  onImportNotebook,
  onExportNotebook,
  onExecute,
  executing
}: ToolbarProps) {


  return (
    <div className="flex items-center gap-2 p-4 border-b border-gray-700 bg-gray-900">
      <div className="flex items-center mr-8">
        <Image alt="logo" src="/logo.png" className="h-10" height={50} width={80}/>
        <span className="text-2xl font-extrabold">IDE</span>
      </div>
      <Button onClick={onAddCodeCell} variant="secondary" size="sm" className="bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 border-0">
        <Plus className="w-4 h-4 mr-2" />
        Add Code Cell
      </Button>
      <Button onClick={onAddMarkdownCell} variant="secondary" size="sm" className="bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 border-0">
        <Plus className="w-4 h-4 mr-2" />
        Add Markdown Cell
      </Button>
      <div className="flex-1" />

      <Button
        variant="secondary"
        size="sm"
        onClick={onExecute}
        className="bg-gray-800 text-green-500 hover:text-white hover:bg-green-600 border-0"
        disabled={executing}
      >
        <CogIcon className={`w-4 h-4 mr-2 ${executing?"animate-spin" : ""}`} />
        {executing?"Executing":"Execute"}
      </Button>

      <input
        type="file"
        id="notebook-import"
        accept=".ipynb"
        className="hidden"
        onChange={onImportNotebook}
      />
      
      <Button
        variant="secondary"
        size="sm"
        onClick={() => document.getElementById("notebook-import")?.click()}
        className="bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 border-0"
      >
        <FileJson className="w-4 h-4 mr-2" />
        Import Notebook
      </Button>
      <Button 
        variant="secondary" 
        size="sm" 
        onClick={onExportNotebook}
        className="bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 border-0"
      >
        <Download className="w-4 h-4 mr-2" />
        Export Notebook
      </Button>
    </div>
  );
}