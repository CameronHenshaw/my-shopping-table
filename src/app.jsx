import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import { SelectFilter } from './components/SelectFilter/SelectFilter';

// import regeneratorRuntime from "regenerator-runtime";

import './App.css';

function App() {
  const [status, setStatus] = useState('idle');
  const [jsonData, setJsonData] = useState();
  const [data, setData] = useState();

  async function fetchItems() {
    const response = await fetch(
      'https://docs.google.com/spreadsheets/d/1t1iO6bhWXOu_ACd3Xts3KfKSitrqU-YuQnfvRViTHGE/gviz/tq?tqx=out:json',
      {
        method: 'GET',
        majorDimension: 'ROWS',
      },
    );

    const textData = await response.text();
    if (!textData.error) {
      // console.log(textData)
      setStatus('success');
      const startIndex = textData.indexOf('{');
      const endIndex = textData.lastIndexOf('}') + 1;
      const data = JSON.parse(textData.slice(startIndex, endIndex));
      console.log(data);
      setJsonData(data);
    } else {
      setStatus('error');
    }
  }

  const parseData = async (data) => {
    let columnHeaders = [
      'Name',
      'Website',
      'Category',
      'Product Types',
      'themes',
      'Newsletter',
      'Other',
      'Date Added',
    ];

    const reformattedData = Object.values(data.table.rows).map((item) => {
      return item.c.reduce((result, entry, index) => {
        for (let i = 0; i < columnHeaders.length; i++) {
          if (index === i) {
            if (!entry) {
              result[columnHeaders[i]] = '';
            } else {
              result[columnHeaders[i]] = entry.v;
            }
          }
        }
        return result;
      }, {});
    });
    console.log(reformattedData);
    let arrayOfReformattedData = [];
    for (const key in reformattedData) {
      if (!isNaN(key)) {
        // Check if the key is a number
        arrayOfReformattedData.push(reformattedData[key]);
      }
    }
    console.log('wwoo');
    console.log(arrayOfReformattedData);
    setData(arrayOfReformattedData);
    console.log(Array.isArray(arrayOfReformattedData));
  };

  useEffect(() => {
    console.log(`running data fetching`);
    fetchItems();
  }, []);

  useEffect(() => {
    if (status === 'success') {
      parseData(jsonData);
    }
  }, [jsonData]);

  const BadgeGroup = ({ values }) => {
    const options = [];

    if (values == null) {
      return null;
    } else {
      const items = values.split(',').map(function (item) {
        return item.trim();
      });

      return (
        <>
          {items.map((badge, idx) => {
            let myClasses = 'badge';

            if (badge !== '') {
              if (badge === 'Ghosts') {
                myClasses += ' ghost';
              } else if (badge === 'Nature') {
                myClasses += ' nature';
              } else if (badge === 'Cute') {
                myClasses += ' cute';
              } else if (badge === 'LGBT') {
                myClasses += ' rainbow';
              } else if (badge === 'Retro') {
                myClasses += ' retro';
              } else if (badge === 'Fantasy') {
                myClasses += ' fantasy';
              } else if (badge === 'Goth') {
                myClasses += ' goth';
              } else if (badge === 'Punk') {
                myClasses += ' punk';
              } else if (badge === 'Cool') {
                myClasses += ' cool';
              }
            }

            options.push(badge);

            return (
              <div className="badgegroup">
                <span key={idx} className={myClasses}>
                  {badge}
                </span>
              </div>
            );
          })}
        </>
      );
    }
  };

  const columns = [
    {
      Header: 'Name',
      accessor: 'Name',
      disableFilters: true,
    },
    {
      Header: 'Website',
      accessor: 'Website',
      Cell: ({ cell: { value } }) => <a href={value}>{value}</a>,
      disableFilters: true,
    },
    {
      Header: 'Category',
      accessor: 'Category',
      Cell: ({ cell: { value } }) => <BadgeGroup values={value} />,
      Filter: SelectFilter,
      filter: 'includes',
    },
    {
      Header: 'Product Types',
      accessor: 'Product Types',
      Cell: ({ cell: { value } }) => <BadgeGroup values={value} />,
      Filter: SelectFilter,
      filter: 'includes',
    },
    {
      Header: 'Themes / Styles',
      accessor: 'themes',
      Cell: ({ cell: { value } }) => <BadgeGroup values={value} />,
      Filter: SelectFilter,
      filter: 'includes',
    },
    // {
    //   Header: 'Other',
    //   accessor: 'Other',
    //   Cell: ({ cell: { value } }) => <BadgeGroup values={value} />,
    //   Filter: SelectFilter,
    //   filter: 'includes',
    // },
  ];

  return (
    <>
      <div className="App">
        <h1>
          <center>Online Stores of Small Creators</center>
        </h1>
        {data ? <Table columns={columns} data={data} /> : <p>Loading...</p>}
      </div>
    </>
  );
}

export default App;
