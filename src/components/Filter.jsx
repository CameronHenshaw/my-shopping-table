import { React, useMemo, useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import regeneratorRuntime from 'regenerator-runtime';

// Component for Global Filter
export function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="filter">
      <label htmlFor="search">Search Table: </label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder=" Enter value "
        className="w-25"
        style={{
          fontSize: '1.1rem',
          margin: '15px',
          display: 'inline',
        }}
      />
    </div>
  );
}

// Component for Default Column Filter
export function DefaultFilterForColumn({
  column: {
    filterValue,
    preFilteredRows: { length },
    setFilter,
  },
}) {
  return (
    <input
      type="text"
      value={filterValue || ''}
      onChange={(e) => {
        // Set undefined to remove the filter entirely
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${length} records..`}
      style={{ marginTop: '10px' }}
    />
  );
}

// // Component for Custom Select Filter
// export function SelectColumnFilter({
//   column: { filterValue, setFilter, preFilteredRows, id },
// }) {
//   // Use preFilteredRows to calculate the options
//   const options = useMemo(() => {
//     const options = new Set();
//     preFilteredRows.forEach((row) => {
//       options.add(row.values[id]);
//     });
//     return [...options.values()];
//   }, [id, preFilteredRows]);

//   // UI for Multi-Select box
//   return (
//     <select
//       value={filterValue}
//       onChange={(e) => {
//         setFilter(e.target.value || undefined);
//       }}
//     >
//       <option value="">All</option>
//       {options.map((option, i) => (
//         <option key={i} value={option}>
//           {option}
//         </option>
//       ))}
//     </select>
//   );

//   return (
//     <div
//       style={{
//         display: 'flex',
//       }}
//     >
//       <input
//         value={filterValue[0] || ''}
//         type="number"
//         onChange={(e) => {
//           const val = e.target.value;
//           setFilter((old = []) => [
//             val ? parseInt(val, 10) : undefined,
//             old[1],
//           ]);
//         }}
//         placeholder={`Min (${min})`}
//         style={{
//           width: '70px',
//           marginRight: '0.5rem',
//         }}
//       />
//       to
//       <input
//         value={filterValue[1] || ''}
//         type="number"
//         onChange={(e) => {
//           const val = e.target.value;
//           setFilter((old = []) => [
//             old[0],
//             val ? parseInt(val, 10) : undefined,
//           ]);
//         }}
//         placeholder={`Max (${max})`}
//         style={{
//           width: '70px',
//           marginLeft: '0.5rem',
//         }}
//       />
//     </div>
//   );
// }
