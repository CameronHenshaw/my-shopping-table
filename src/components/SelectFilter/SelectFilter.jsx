import { useMemo } from 'react';
// import { React } from 'react';

export function SelectFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      const items = row.values[id].split(',').map(function (item) {
        return item.trim();
      });
      for (var i = 0; i < items.length; i++) {
        if (items[i] != '') {
          options.add(items[i]);
        }
      }
    });
    return [...options.values()].sort();
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      className="dropdown"
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
