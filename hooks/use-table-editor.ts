import { useState, useCallback } from "react";
import { toast } from "sonner";
import type { TableData, EditingCell } from "@/types/tablio";
import {
  addRowToTable,
  removeRowFromTable,
  addColumnToTable,
  removeColumnFromTable,
  updateTableCell,
} from "@/utils/table-operations";

interface UseTableEditorProps {
  tableData: TableData | null;
  onTableChange: (data: TableData) => void;
}

export function useTableEditor({ tableData, onTableChange }: UseTableEditorProps) {
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleCellClick = useCallback(
    (rowIndex: number, colIndex: number, currentValue: string) => {
      setEditingCell({ row: rowIndex, col: colIndex });
      setEditValue(currentValue);
    },
    []
  );

  const handleCellSave = useCallback(() => {
    if (!editingCell || !tableData) return;

    const updatedTableData = updateTableCell(
      tableData,
      editingCell.row,
      editingCell.col,
      editValue
    );
    onTableChange(updatedTableData);
    setEditingCell(null);
    setEditValue("");
  }, [editingCell, editValue, tableData, onTableChange]);

  const handleCellCancel = useCallback(() => {
    setEditingCell(null);
    setEditValue("");
  }, []);

  const addRow = useCallback(() => {
    if (!tableData) return;

    const updatedTableData = addRowToTable(tableData);
    onTableChange(updatedTableData);
    toast.success("Satır eklendi: Tabloya yeni bir satır eklendi.");
  }, [tableData, onTableChange]);

  const removeRow = useCallback(
    (rowIndex: number) => {
      if (!tableData) return;

      const updatedTableData = removeRowFromTable(tableData, rowIndex);
      if (updatedTableData) {
        onTableChange(updatedTableData);
        toast.success("Satır silindi: Seçilen satır tablodan kaldırıldı.");
      }
    },
    [tableData, onTableChange]
  );

  const addColumn = useCallback(() => {
    if (!tableData) return;

    const updatedTableData = addColumnToTable(tableData);
    onTableChange(updatedTableData);
    toast.success("Sütun eklendi: Tabloya yeni bir sütun eklendi.");
  }, [tableData, onTableChange]);

  const removeColumn = useCallback(
    (colIndex: number) => {
      if (!tableData) return;

      const updatedTableData = removeColumnFromTable(tableData, colIndex);
      if (updatedTableData) {
        onTableChange(updatedTableData);
        toast.success("Sütun silindi: Seçilen sütun tablodan kaldırıldı.");
      }
    },
    [tableData, onTableChange]
  );

  return {
    editingCell,
    editValue,
    setEditValue,
    handleCellClick,
    handleCellSave,
    handleCellCancel,
    addRow,
    removeRow,
    addColumn,
    removeColumn,
  };
}