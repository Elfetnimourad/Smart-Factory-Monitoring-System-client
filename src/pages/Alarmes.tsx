import {
  Alert,
  Box,
  Stack,
  Typography,
} from "@mui/material";

import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

const alarmsData = [
  {
    id: 1,
    alarmMsg: "Manque d'eau",
  },
  {
    id: 2,
    alarmMsg: "Manque de semoule",
  },
  {
    id: 3,
    alarmMsg: "Pression trop élevée",
  },
  {
    id: 4,
    alarmMsg: "Bourrage à l'entrée du pré-séchoir",
  },
  {
    id: 5,
    alarmMsg: "Ventilateur du pré-séchoir en panne",
  },
  {
    id: 6,
    alarmMsg: "Diminution de la température",
  },
  {
    id: 7,
    alarmMsg: "Ventilateur du refroidisseur en panne",
  },

];

const Alarmes = () => {
  return (
    <Stack spacing={1.2}>
      {alarmsData.map((alarm) => (
        <Alert
          key={alarm.id}
          severity="error"
          icon={<WarningAmberRoundedIcon />}
          sx={{
            borderRadius: 1.5,
            border: "1px solid",
            borderColor: "error.light",
            backgroundColor: "#fff5f5",

            "& .MuiAlert-icon": {
              color: "error.main",
            },

            "& .MuiAlert-message": {
              width: "100%",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                color: "error.dark",
              }}
            >
              {alarm.alarmMsg}
            </Typography>

            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 700,
                color: "error.main",
                ml: 2,
              }}
            >
              ALARM
            </Typography>
          </Box>
        </Alert>
      ))}
    </Stack>
  );
};

export default Alarmes;