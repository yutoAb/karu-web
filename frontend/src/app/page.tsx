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
import EditIcon from "@mui/icons-material/Edit";
import { fetcher } from "../../hooks/fetcher";

type Item = {
  id: number;
  name: string;
};

export default function Home() {
  const [newItem, setNewItem] = useState("");

  const {
    data: items,
    mutate,
    isLoading,
    error,
  } = useSWR<Item[]>("http://localhost:5000/items", fetcher);

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

  const deleteItem = async (id: number) => {
    await fetch(`http://localhost:5000/items/${id}`, {
      method: "DELETE",
    });
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
                <Stack direction="row" spacing={1}>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => {
                      console.log(`編集: ${item.name}`);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteItem(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              }
            >
              <ListItemText primary={item.name} />
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
