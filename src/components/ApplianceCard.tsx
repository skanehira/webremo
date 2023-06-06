import { type Appliance } from "nature-remo";
import CustomCard from "./CustomCard";
import CardForm from "./CardForm";
import { useState } from "react";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import AdUnitsOutlinedIcon from "@mui/icons-material/AdUnitsOutlined";
import HeatPumpOutlinedIcon from "@mui/icons-material/HeatPumpOutlined"; // AirCon

type Props = {
  app: Appliance;
};

function getIcon(appType: string) {
  switch (appType) {
    case "LIGHT":
      return <LightbulbOutlinedIcon />;
    case "TV":
      return <TvOutlinedIcon />;
    case "AC":
      return <HeatPumpOutlinedIcon />;
    default:
      return <AdUnitsOutlinedIcon />;
  }
}

export default function ApplianceCard({ app }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CustomCard
        icon={getIcon(app.type)}
        title={app.nickname}
        subTitle={app.type}
        onClick={() => {
          setOpen(true);
        }}
      />
      {open && <CardForm id={app.id} open={open} setOpen={setOpen} />}
    </>
  );
}
