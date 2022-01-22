import { Card, CardContent, Chip, Container, Divider, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
export default function HomePage() {
  const columns = [
    {
      field: "id",
      headerName: "Job ID",
      flex: 0.1,
    },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.3,
    },
  ];

  const rows = [
    { id: 1, date: new Date(1979, 0, 1), status: "OK" },
    { id: 2, date: new Date(1979, 0, 2), status: "IN PROCESS" },
    { id: 3, date: new Date(1979, 0, 3), status: "OK" },
    { id: 4, date: new Date(1979, 0, 4), status: "OK" },
    { id: 5, date: new Date(1979, 0, 5), status: "OK" },
    { id: 6, date: new Date(1979, 0, 6), status: "OK" },
    { id: 7, date: new Date(1979, 0, 7), status: "OK" },
    { id: 8, date: new Date(1979, 0, 8), status: "OK" },
    { id: 9, date: new Date(1979, 0, 9), status: "FAILED" },
  ];

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
          <Card>
            <CardContent>
              <Typography variant="body1" color="initial">
                Jobs Done
              </Typography>
			  <Divider />
			  <br/>
              <div style={{ height: 400, width: "100%", display: "block" }}>
                <DataGrid rows={rows} columns={columns} />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item container spacing={2} xs={6} md={6}>
          <Grid item xs={6} md={6}>
            <Card>
              <CardContent>
                <Typography variant="body1" color="initial">
                  Last Job Status
                </Typography>
				<Divider />
				<br />
				<Chip label="Failed" color="error" size="small" icon={<HighlightOffOutlinedIcon />} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={6}>
            <Card>
              <CardContent>
                <Typography variant="body1" color="initial">
                  Jobs Done
                </Typography>
				<Divider />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={6}>
            <Card>
              <CardContent>
                <Typography variant="body1" color="initial">
                  Jobs Done
                </Typography>
				<Divider />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </Grid>
    </Container>
  );
}
