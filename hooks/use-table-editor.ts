import { useState, useCallback } from "react";
import { toast } from "sonner";
import type { TableData, EditingCell } from "@/types/tableflow";
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

export function useTableEditor({
  tableData,
  onTableChange,
}: UseTableEditorProps) {
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleCellClick = useCallback(
    (rowIndex: number, colIndex: number, currentValue: string) => {
      setEditingCell({ row: rowIndex, col: colIndex });
      setEditValue(currentValue);
    },
    []
  );

  const handleHeaderClick = useCallback(
    (colIndex: number, currentValue: string) => {
      setEditingCell({ row: -1, col: colIndex });
      setEditValue(currentValue);
    },
    []
  );

  const handleCellSave = useCallback(() => {
    if (!editingCell || !tableData) return;

    if (editingCell.row === -1) {
      // Editing a header
      const updatedTableData = {
        ...tableData,
        headers: tableData.headers.map((header, index) =>
          index === editingCell.col ? editValue : header
        ),
      };
      onTableChange(updatedTableData);
    } else {
      // Editing a regular cell
      const updatedTableData = updateTableCell(
        tableData,
        editingCell.row,
        editingCell.col,
        editValue
      );
      onTableChange(updatedTableData);
    }
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
    toast.success("Row added: A new row has been added to the table.");
  }, [tableData, onTableChange]);

  const removeRow = useCallback(
    (rowIndex: number) => {
      if (!tableData) return;

      const updatedTableData = removeRowFromTable(tableData, rowIndex);
      if (updatedTableData) {
        onTableChange(updatedTableData);
        toast.success(
          "Row deleted: Selected row has been removed from the table."
        );
      }
    },
    [tableData, onTableChange]
  );

  const addColumn = useCallback(() => {
    if (!tableData) return;

    const updatedTableData = addColumnToTable(tableData);
    onTableChange(updatedTableData);
    toast.success("Column added: A new column has been added to the table.");
  }, [tableData, onTableChange]);

  const removeColumn = useCallback(
    (colIndex: number) => {
      if (!tableData) return;

      const updatedTableData = removeColumnFromTable(tableData, colIndex);
      if (updatedTableData) {
        onTableChange(updatedTableData);
        toast.success(
          "Column deleted: Selected column has been removed from the table."
        );
      }
    },
    [tableData, onTableChange]
  );

  return {
    editingCell,
    editValue,
    setEditValue,
    handleCellClick,
    handleHeaderClick,
    handleCellSave,
    handleCellCancel,
    addRow,
    removeRow,
    addColumn,
    removeColumn,
  };
}
