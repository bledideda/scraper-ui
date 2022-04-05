import {
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { useEffect, useState } from "react";
import { deleteJob, exportCSV, getCategories, getJobs, retryScrap, startScraper } from "../../service";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ReplayIcon from '@mui/icons-material/Replay';


const getColorByStatus = (status) => {
  if (status === "PENDING") return "primary";
  if (status === "FAILED") return "error";
  if (status === "SUCCESS") return "success";
  return "primary";
};

export default function HomePage() {
  const [isScrapping, setIsScrapping] = useState(false);
  const [jobName, setJobName] = useState("");
  const [jobs, setJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [categories, setCategories] = useState(null);

  const renderActionButtons = ({ id }) => {
    return (
      <>
        <IconButton color="primary" component="span" onClick={() => downloadCSV(id)}>
          <ArrowDownwardIcon />
        </IconButton>
        {isScrapping ?
          <IconButton color="default" component="span" onClick={() => alert('Job in progress...')}>
            <ReplayIcon />
          </IconButton>
          :
          <IconButton color="warning" component="span" onClick={() => retryFailedJobs(id)}>
            <ReplayIcon />
          </IconButton>
        }
        <IconButton color="error" component="span" onClick={() => handleDelete(id)}>
          <HighlightOffIcon />
        </IconButton>

      </>
    )
  }

  const columns = [
    {
      field: "id",
      headerName: "Job ID",
      flex: 0.1,
    },
    {
      field: "description",
      headerName: "Name",
      flex: 0.2,
    },
    {
      field: "tsCreated",
      headerName: "Date",
      type: "date",
      flex: 0.3,
      renderCell: (data) => {
        let _date = new Date(data.value);
        let year = _date.getFullYear();
        let month = _date.getMonth() + 1;
        let date = _date.getDate();
        let hours = _date.getHours();
        let minutes = _date.getMinutes();
        return (
          <p>{month + "/" + date + "/" + year + " " + hours + ":" + minutes}</p>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.2,
      renderCell: (data) => {
        return (
          <Chip
            label={data.value}
            color={getColorByStatus(data.value)}
            size="small"
            variant="outlined"
            icon={<HighlightOffOutlinedIcon />}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.2,
      renderCell: (data) => {
        return renderActionButtons(data)
      },
    },
  ];

  const handleClick = () => {
    setIsScrapping(true);
    startScraper({ description: jobName, category: selectedCategory })
      .then((res) => {
        if (res.statusCode === 200) {
          // setTimeout(() => {
          //   setIsScrapping(false);
          // }, 30000);
        } else {
          setIsScrapping(false);
          alert(
            "Error, contact the sytem admin and show the code: 2005 or try again later!"
          );
        }
      })
      .catch((e) => {
        setIsScrapping(false);
        alert(
          "Error, contact the sytem admin and show the code: 2006 or try again later!"
        );
      });
  };

  const handleChange = ({ target: { value } }) => {
    setJobName(value);
  };

  const handleSelectChange = ({ target: { value } }) => {
    setSelectedCategory(value);
  };

  const downloadCSV = (jobId) => {
    exportCSV({ jobId })
    // .then((res) => {
    //   // console.log(res.data);
    //   let csv = res.data;
    //   let downloadLink = document.createElement("a");
    //   let blob = new Blob(["\ufeff", csv]);
    //   let url = URL.createObjectURL(blob);
    //   downloadLink.href = url;
    //   downloadLink.download = "data.csv";
    //   document.body.appendChild(downloadLink);
    //   downloadLink.click();
    //   document.body.removeChild(downloadLink);
    // });
  };

  const handleDelete = (jobId) => {
    deleteJob({ jobId });
  };

  useEffect(() => {
    const checkJobs = () => {
      let pending = jobs.filter((job) => {
        return job.status === "PENDING";
      });
      if (pending.length) {
        setIsScrapping(true);
      } else {
        setIsScrapping(false);
      }
    };
    checkJobs();
  }, [jobs]);

  useEffect(() => {
    getCategories()
      .then((res) => {
        if (res.statusCode === 200) {
          setCategories(res.data.data.categories);
        } else {
          alert(
            "Error, contact the sytem admin and show the code: 2007 or try again later!"
          );
        }
      })
      .catch((e) => {
        alert(
          "Error, contact the sytem admin and show the code: 2008 or try again later!"
        );
      });
  }, []);

  useEffect(() => {
    const loadJobs = () => {
      getJobs()
        .then((res) => {
          if (res.statusCode === 200) {
            let _jobs = res.data.data.jobs;
            setJobs(_jobs.reverse());
            setTimeout(() => loadJobs(), 10000);
          } else {
            alert(
              "Error, contact the sytem admin and show the code: 2009 or try again later!"
            );
          }
        })
        .catch((e) => {
          alert(
            "Error, contact the sytem admin and show the code: 2010 or try again later!"
          );
        });
    };
    loadJobs();
  }, []);

  const retryFailedJobs = (id) => {

    retryScrap({ jobId: id }).then(res => {
      setIsScrapping(true);
    })

  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
          {!isScrapping ? (
            <>
              <div>
                <FormControl fullWidth>
                  <TextField
                    id="jobName"
                    placeholder="Job Name ( optional )"
                    value={jobName}
                    onChange={!isScrapping ? handleChange : console.log("wait")}
                  />
                </FormControl>
              </div>
              <br />
              <div>
                <FormControl fullWidth>
                  <InputLabel id="category">Category ( optional )</InputLabel>
                  <Select
                    labelId="category"
                    id="category"
                    value={selectedCategory}
                    label="Category ( optional )"
                    onChange={handleSelectChange}
                    multiple
                  >
                    <MenuItem value="">All</MenuItem>
                    {categories &&
                      categories.map((category) => {
                        return (
                          <MenuItem value={category} key={category}>
                            {category}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>
              <br />
              <div>
                <FormControl fullWidth>
                  {/* {isScrapping ? (
                  <Button variant="contained">Scrapping...</Button>
                ) : ( */}
                  <Button variant="contained" onClick={handleClick}>
                    Start job
                  </Button>
                  {/* )} */}
                </FormControl>
              </div>
            </>
          ) : (
            <div className="loaderScrapper">
              <CircularProgress disableShrink />
              <Typography variant="body1" color="initial">
                Scrapping in progres...
              </Typography>
            </div>
          )}
        </Grid>

        <Grid item container spacing={2} xs={6} md={6}>
          {jobs.length !== 0 && (
            <Grid item xs={6} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="body1" color="initial">
                    Last Job Status
                  </Typography>
                  <Divider />
                  <br />
                  <Chip
                    label={jobs[0].status}
                    color={getColorByStatus(jobs[0].status)}
                    size="small"
                    icon={<HighlightOffOutlinedIcon />}
                  />
                </CardContent>
              </Card>
            </Grid>
          )}
          <Grid item xs={6} md={6}>
            <Card>
              <CardContent>
                <Typography variant="body1" color="initial">
                  Actions
                </Typography>
                <Divider />
                <br />
                <Button variant="contained" onClick={() => downloadCSV(jobs[0].id)}>
                  Export CSV{" "}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {jobs.length &&
          <Grid item xs={12} md={12}>
            <br></br>
            <Card>
              <CardContent>
                <Typography variant="body1" color="initial">
                  Jobs Done
                </Typography>
                <Divider />
                <br />
                <div style={{ height: 400, width: "100%", display: "block" }}>
                  <DataGrid rows={jobs} columns={columns} />
                </div>
              </CardContent>
            </Card>
          </Grid>
        }

      </Grid>
    </Container>
  );
}
