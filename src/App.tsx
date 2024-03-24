import * as React from 'react';
import { TodoTablePage } from './pages/TodoTablePage/TodoTablePage';
import KanbanBoard from './pages/KanbanBoardPage/KanbanBoardPage';
import { BottomNavigation, Box, Button, } from '@mui/material';

import { BrowserRouter as Router, Route, Routes, useNavigate, NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import Preview from '@mui/icons-material/Preview';


function App() {
  const [value, setValue] = React.useState(0);
  const handleChange = (newValue) => {
    setValue(newValue);
  };


  return (
    <Router>
      <Box sx={{ width: 500 }}>
        <BottomNavigation showLabels value={value} onChange={handleChange}>
          <Button component={NavLink} to="/Incode-Todo-Client" startIcon={<HomeIcon />}>
            Home
          </Button>
          <Button component={NavLink} to="/Incode-Todo-Client/table" startIcon={<Preview />}>
            Table Data
          </Button>
        </BottomNavigation>
      </Box>
      <Routes>
        <Route index path="/Incode-Todo-Client" element={<KanbanBoard />} />
        <Route path="/Incode-Todo-Client/table" element={<TodoTablePage />} />
      </Routes>
    </Router>
  );
}

export default App;
