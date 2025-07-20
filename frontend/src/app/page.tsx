"use client";
import { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListSubheader,
} from "@mui/material";

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "60%", bgcolor: "background.paper" }}>
        <Typography variant="h4" gutterBottom>
          Next.js + Flask + SQLite によるToDoアプリ
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              To Do リスト
            </ListSubheader>
          }
        >
          {items.map((item, index) => (
            <ListItem key={index}>{item}</ListItem>
          ))}
        </List>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <TextField
            id="outlined-controlled"
            label="追加したいToDo"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNewItem(event.target.value);
            }}
          />
          <Button variant="outlined" onClick={addItem}>
            To Do追加
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
