import { ColumnDef } from "@tanstack/react-table";
import { MAX_CELLS } from "./constants";

export const generateTable = (rows: number, columns: number) => {
  return [...Array(rows)].map((_) => ({
    ...Array(columns).fill(""),
  }));
};

export const generateHeaderColumns = (
  columns: number
): ColumnDef<unknown, any>[] => {
  return [...Array(columns)].map((_, index) => ({
    header: `${index + 1}`,
    accessorKey: `col-${index}`,
    cell: (info) => info.getValue(),
  }));
};

export const preventNegativeValue = (n: number): number =>
  !!n && Math.abs(n) >= 0 ? Math.abs(n) : 0;

export const preventOutOfRange = (n: number): number => {
  n = preventNegativeValue(n);
  return n > MAX_CELLS ? MAX_CELLS : n;
};
