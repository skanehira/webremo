import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

function DeviceCard({ title, type }: { title: string, type: string }) {
  return (
    <Card className="card"
      sx={{
        minWidth: 230,
        maxWidth: 230,
        m: 1,
        transition: "0.3s",
        "&:hover": { // draw shadow and border when mouse houver
          boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
          border: "1px solid rgba(0, 0, 0, 0.3)"
        }
      }}
      onClick={() => { console.log('todo: implement') }}
    >
      <CardHeader
        avatar={
          <LightbulbOutlinedIcon />
        }
        title={title}
        subheader={type}
      />
    </Card>
  );
}

export default function App() {
  const appliances = [
    {
      id: 1,
      name: '寝室のライト',
      state: 'on',
      type: 'Light',
    },
    {
      id: 2,
      name: 'リビングのライト',
      state: 'on',
      type: 'Light',
    },
    {
      id: 3,
      name: '書斎のエアコン',
      state: 'on',
      type: 'Light',
    },
    {
      id: 4,
      name: 'キッチンライト',
      state: 'on',
      type: 'Light',
    }
  ];

  const navItems = ['About'];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            WebRemo
          </Typography>
          <Box>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            appliances.map((app) => {
              return (
                <DeviceCard key={app.id} title={app.name} type={app.type} />
              )
            })
          }
        </Box>
      </Box>
    </Box>
  );
}
