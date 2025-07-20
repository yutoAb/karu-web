"use client";
import { useState } from "react";
import useSWR from "swr";
import {
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetcher } from "../../hooks/fetcher";

export default function Home() {
  const [newItem, setNewItem] = useState("");

  const {
    data: items,
    mutate,
    isLoading,
    error,
  } = useSWR<string[]>("http://localhost:5000/items", fetcher);

  const addItem = async () => {
    if (!newItem) return;
    await fetch("http://localhost:5000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newItem }),
    });
    setNewItem("");
    mutate();
  };

  if (isLoading) return <Typography>読み込み中...</Typography>;
  if (error) return <Typography>エラーが発生しました。</Typography>;

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
          {items?.map((item, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <TextField
            id="outlined-controlled"
            label="追加したいToDo"
            value={newItem}
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
