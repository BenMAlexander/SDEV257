import React, { useState, useEffect } from "react";
import { fetchItems } from "./api";
import List from "./List";

function mapItems(items) {
    return items.map((value, index) => ({ key:{index}, value }));}


function FilmsList() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("");
    const [asc, setAsc] = useState(true);
  
    useEffect(() => {
      fetchItems(filter, asc)
        .then((data) => {
          setData(data.items);
        })
        .catch((error) => {
          console.error("Error fetching films:", error);
        });
    }, [data, filter, asc]);
  
    return (
        <List
        data={data}
        asc={asc}
        onFilter={(text) => {
          fetchItems(text, asc)
            .then((resp) => resp.json())
            .then(({ items }) => {
              setFilter(text);
              setData(mapItems(items));
            });
        }}
        onSort={() => {
          fetchItems(data, filter, !asc)
            .then((resp) => resp.json())
            .then(({ items }) => {
              setAsc(!asc);
              setData(mapItems(items));
            });
        }}
      />
      );
  }
  
  export default FilmsList;
