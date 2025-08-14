import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";
import { EditableCell } from "./EditableCell";
import type { TableData, EditingCell } from "@/types/tablio";

interface EditableTableProps {
  tableData: TableData;
  editingCell: EditingCell | null;
  editValue: string;
  onEditValueChange: (value: string) => void;
  onCellClick: (rowIndex: number, colIndex: number, currentValue: string) => void;
  onHeaderClick: (colIndex: number, currentValue: string) => void;
  onCellSave: () => void;
  onCellCancel: () => void;
  onRemoveRow: (rowIndex: number) => void;
  onRemoveColumn: (colIndex: number) => void;
}

export function EditableTable({
  tableData,
  editingCell,
  editValue,
  onEditValueChange,
  onCellClick,
  onHeaderClick,
  onCellSave,
  onCellCancel,
  onRemoveRow,
  onRemoveColumn,
}: EditableTableProps) {
  return (
    <Card className="p-3 sm:p-6 transition-all duration-200 hover:shadow-md">
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
        Tablo Önizleme
      </h3>

      {/* Mobile table wrapper with horizontal scroll */}
      <div className="tablio-table border rounded-lg overflow-x-auto -mx-3 sm:mx-0">
        <div className="min-w-max sm:min-w-0">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                {tableData.headers.map((header, index) => (
                  <th
                    key={index}
                    className="text-left p-2 sm:p-3 font-medium text-foreground relative group min-w-[120px] sm:min-w-0"
                  >
                    <EditableCell
                      value={header}
                      isEditing={
                        editingCell?.row === -1 &&
                        editingCell?.col === index
                      }
                      editValue={editValue}
                      onEditValueChange={onEditValueChange}
                      onSave={onCellSave}
                      onCancel={onCellCancel}
                      onClick={() => onHeaderClick(index, header)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveColumn(index)}
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-all duration-200 w-5 h-5 sm:w-6 sm:h-6 p-0 hover:bg-destructive hover:text-destructive-foreground hover:scale-110 touch-manipulation"
                    >
                      <Minus className="w-2 h-2 sm:w-3 sm:h-3" />
                    </Button>
                  </th>
                ))}
                <th className="w-8 sm:w-10"></th>
              </tr>
            </thead>
            <tbody>
              {tableData.rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b hover:bg-muted/30 group transition-colors duration-200"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="p-2 sm:p-3 text-foreground relative min-w-[120px] sm:min-w-0"
                    >
                      <EditableCell
                        value={cell}
                        isEditing={
                          editingCell?.row === rowIndex &&
                          editingCell?.col === cellIndex
                        }
                        editValue={editValue}
                        onEditValueChange={onEditValueChange}
                        onSave={onCellSave}
                        onCancel={onCellCancel}
                        onClick={() => onCellClick(rowIndex, cellIndex, cell)}
                      />
                    </td>
                  ))}
                  <td className="p-2 sm:p-3 w-8 sm:w-10">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveRow(rowIndex)}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-200 w-5 h-5 sm:w-6 sm:h-6 p-0 hover:bg-destructive hover:text-destructive-foreground hover:scale-110 touch-manipulation"
                    >
                      <Minus className="w-2 h-2 sm:w-3 sm:h-3" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-muted-foreground mt-3 animate-in fade-in duration-300 text-center sm:text-left">
        {tableData.rows.length} satır, {tableData.headers.length} sütun
      </p>
    </Card>
  );
}