import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

type Props = {
  title: string;
  subTitle: string;
  icon?: JSX.Element;
  onClick?: () => void;
};

export default function CustomCard({
  title,
  subTitle,
  icon,
  onClick,
}: Props) {
  return (
    <Card
      className="card"
      sx={{
        minWidth: 230,
        maxWidth: 230,
        m: 1,
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
          border: "1px solid rgba(0, 0, 0, 0.3)",
        },
      }}
      onClick={onClick}
    >
      <CardHeader avatar={icon} title={title} subheader={subTitle} />
    </Card>
  );
}
