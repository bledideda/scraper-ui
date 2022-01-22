import { Container, Grid } from "@mui/material";

export default function HomePage() {
  return (
		<Container>
			<Grid container spacing={2}>
				<Grid item xs={6} md={3}>
					Messages
				</Grid>
				<Grid item xs={6} md={3}>
					CArd
				</Grid>
				<Grid item xs={6} md={3}>
					CArd
				</Grid>
				<Grid item xs={6} md={3}>
					CArd
				</Grid>
			</Grid>
		</Container>
	);
}
