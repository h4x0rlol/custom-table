import { memo } from "react";

export const Cell = memo(() => {
  return <td>{Math.floor(Math.random() * 150)}</td>;
});
