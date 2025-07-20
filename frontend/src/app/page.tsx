"use client";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Home() {
  // type Item = {
  //   name: string;
  // };

  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch("http://localhost:5000/items");
    const data = await res.json();
    setItems(data);
  };

  const addItem = async () => {
    if (!newItem) return;
    const res = await fetch("http://localhost:5000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newItem }),
    });
    const data = await res.json();
    setItems([...items, data]);
    setNewItem("");
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Typography variant="h2" gutterBottom>
        Next.js + Flask + SQLite によるToDoアプリ
      </Typography>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <TextField
        id="outlined-controlled"
        label="追加したいToDo"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setNewItem(event.target.value);
        }}
      />
      <Button onClick={addItem}>To Do追加</Button>
    </Box>
  );
}
