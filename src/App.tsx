import { ChangeEvent, useMemo, useState } from "react";
import { Table } from "./components/Table";
import {
  generateHeaderColumns,
  generateTable,
  preventOutOfRange,
} from "./utils";
import { DEBOUNCE_DELAY, MAX_CELLS, MIN_CELLS } from "./utils/constants";
import useDebounce from "./utils/useDebounce";

const App = (): JSX.Element => {
  const [n, setN] = useState<number>(5);
  const [m, setM] = useState<number>(5);
  const debouncedRows = useDebounce<number>(n, DEBOUNCE_DELAY);
  const debouncedCols = useDebounce<number>(m, DEBOUNCE_DELAY);

  const handleRowsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setN(preventOutOfRange(Number(e.target.value)));
  };

  const handleColumnsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setM(preventOutOfRange(Number(e.target.value)));
  };

  const cells = useMemo(
    () => generateTable(debouncedRows, debouncedCols),
    [debouncedRows, debouncedCols]
  );

  const columns = useMemo(
    () => generateHeaderColumns(debouncedCols),
    [debouncedCols]
  );

  return (
    <div className="flex flex-col h-screen m-2">
      <form>
        <label>
          N:
          <input
            type="number"
            min={MIN_CELLS}
            max={MAX_CELLS}
            className="border"
            value={n}
            onChange={handleRowsChange}
          />
        </label>
        <label>
          M:
          <input
            type="number"
            min={MIN_CELLS}
            max={MAX_CELLS}
            className="border"
            value={m}
            onChange={handleColumnsChange}
          />
        </label>
      </form>
      <Table data={cells} columns={columns} />
    </div>
  );
};

export default App;
