import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Board } from "../../types/Board";
import { AddBoardModal } from "../AddBoardModel/AddBoardModel";

interface BoardLoaderProps {
  setBoardId: React.Dispatch<React.SetStateAction<string>>;
  boardId: string;
  handleLoadButtonClick: () => Promise<void>;
}


const BoardLoader: React.FC<BoardLoaderProps> = (props) => {
  const { setBoardId, boardId, handleLoadButtonClick } = props;
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };


  const handleChange = (e) => {
    setBoardId(e.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="baseline" marginBottom={2}>
          <TextField
            fullWidth
            label="Enter a Board ID here..."
            variant="outlined"
            value={boardId}
            onChange={handleChange}
          />

          <Box marginLeft={2}>
            <Button
              variant="contained"
              color="primary"
              style={{ height: '56px' }}
              onClick={handleLoadButtonClick}
            >
              Load
            </Button>
          </Box>

          <Box marginLeft={2}>
            <Button
              variant="contained"
              color="primary"
              style={{ height: '56px' }}
              onClick={handleOpenModal}
            >
              Add Board
            </Button>
          </Box>
        </Box>

        <AddBoardModal
          openModal={openModal}
          setOpenModal={setOpenModal}
        />

      </Grid>
    </Grid>
  );
};

export default BoardLoader;