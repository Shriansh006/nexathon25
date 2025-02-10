export interface NotebookCell {
  id: string;
  type: 'code' | 'markdown';
  content: string;
  outputs?: string[];
}

export interface CellContent {
  cell_type: string,
  metadata: {},
  source: string[],
  outputs?: { output_type: string; text: string[]; }[] | undefined,
  execution_count?: number;
}

export interface Notebook {
  cells: NotebookCell[];
  metadata: {
    kernelspec: {
      name: string;
      display_name: string;
    };
    language_info: {
      name: string;
      version: string;
    };
  };
}