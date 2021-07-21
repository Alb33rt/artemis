import React from "react";
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from "@material-ui/core";
import { withRouter } from "react-router";
import { Grid } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const style = {
    margin: 0,
    top: 'auto',
    right: 40,
    bottom: 40,
    left: 'auto',
    position: 'fixed',
    zIndex: 1000
};

function createData(itemName, quantity, unit, details, timeCreated) {
    return { itemName, quantity, unit, details, timeCreated };
}
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

const classes = useStyles;
class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            entries: null,
            weekEmissions: Array(7),
            threeDayEmission: Array(3),
            monthEmission: Array(30),
            weekGreen: Array(7),
            threeDayGreen: Array(3),
            monthGreen: Array(30),
            weekCombined: Array(7),
            threeCombined: Array(3),
            monthCombined: Array(30),
            carbonEntries: [],
        };
    }

    componentDidMount() {
        const { history } = this.props;
        if (!localStorage.getItem('isLoggedIn')) {
            history.push("/signin");
        }
        this.getCarbonEntry();
        this.get3DayEmission();
        this.getMonthEmission();
        this.getWeekEmission();
        this.get3DayGreen();
        this.getMonthGreen();
        this.getWeekGreen();
        this.get3DayCombined();
    }

    checkLogin() {
        const { history } = this.props;
        if (!localStorage.getItem('isAuthenticated')) {
            history.push("/signin");
        }
    }

    redirectToHome() {
        const { history } = this.props;
        history.push('/');
    }

    redirectToEntry() {
        const { history } = this.props;
        history.push('/carbonEntryPage')
    }
    combineData() {
        const result = {};
        let key;
        for (key in this.state.weekEmissions) {
            if (this.state.weekEmissions.hasOwnProperty(key)) {
                result[key] = this.state.weekEmissions[key];
            }
        }

        for (key in this.state.weekGreen) {
            if (this.state.weekGreen.hasOwnProperty(key)) {
                result[key] = this.state.weekGreen[key];
            }
        }
    }
    getMonthEmission() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Access-Control-Request-Method": "GET",
                "Origin": "https://127.0.0.1:3000",
                "Authorization": localStorage.getItem("Authentication"),
                'x-csrftoken': csrftoken
            },
            mode: "cors",
            credentials: "include"
        };

        fetch('http://localhost:8000/api-carbon/recent-carbon-entries/30/', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    monthEmission: data
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    getWeekEmission() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Access-Control-Request-Method": "GET",
                "Origin": "https://127.0.0.1:3000",
                "Authorization": localStorage.getItem("Authentication"),
                'x-csrftoken': csrftoken
            },
            mode: "cors",
            credentials: "include"
        };

        fetch('http://localhost:8000/api-carbon/recent-carbon-entries/7/', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState(
                    { weekEmissions: data }

                )
                const today_emissions = data["6"]["emissions"]
                if (today_emissions > 0) {
                    toast.warn("You have accumulated " + today_emissions + " g of Carbon Emissions. Get to work to save Earth!");
                }
            })
            .catch(error => {
                console.log(error);
            });
        this.combineData();
    }

    get3DayEmission() {
        const { history } = this.props
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Access-Control-Request-Method": "GET",
                "Origin": "https://127.0.0.1:3000",
                "Authorization": localStorage.getItem("Authentication"),
                'x-csrftoken': csrftoken
            },
            mode: "cors",
            credentials: "include"
        };

        try {
        fetch('http://localhost:8000/api-carbon/recent-carbon-entries/3/', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    threeDayEmission: data
                })
            })
            .catch(error => {
                console.log(error);
            });
        } catch {
            history.push('/')
        }
    }

    getMonthGreen() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Access-Control-Request-Method": "GET",
                "Origin": "https://127.0.0.1:3000",
                "Authorization": localStorage.getItem("Authentication"),
                'x-csrftoken': csrftoken
            },
            mode: "cors",
            credentials: "include"
        };

        fetch('http://localhost:8000/api-carbon/recent-green-entries/30/', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    monthGreen: data
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    getWeekGreen() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Access-Control-Request-Method": "GET",
                "Origin": "https://127.0.0.1:3000",
                "Authorization": localStorage.getItem("Authentication"),
                'x-csrftoken': csrftoken
            },
            mode: "cors",
            credentials: "include"
        };

        fetch('http://localhost:8000/api-carbon/recent-green-entries/7/', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState(
                    { weekGreen: data }
                )
            })
            .catch(error => {
                console.log(error);
            });
    }

    get3DayGreen() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Access-Control-Request-Method": "GET",
                "Origin": "https://127.0.0.1:3000",
                "Authorization": localStorage.getItem("Authentication"),
                'x-csrftoken': csrftoken
            },
            mode: "cors",
            credentials: "include"
        };

        fetch('http://localhost:8000/api-carbon/recent-green-entries/3/', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    threeDayGreen: data
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    getCarbonEntry() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Access-Control-Request-Method": "POST",
                "Origin": "https://127.0.0.1:3000",
                "Authorization": localStorage.getItem("Authentication"),
                'x-csrftoken': csrftoken
            },
            mode: "cors",
            credentials: "include"
        };

        fetch('http://localhost:8000/api-carbon/carbon-logs', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    carbonEntries: data
                })
            })
            .catch(error => {
                console.log(error);
            });

    }

    get3DayCombined() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Access-Control-Request-Method": "GET",
                "Origin": "https://127.0.0.1:3000",
                "Authorization": localStorage.getItem("Authentication"),
                'x-csrftoken': csrftoken
            },
            mode: "cors",
            credentials: "include"
        };

        fetch('http://localhost:8000/api-carbon/recent-combine-entries/3', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    threeCombined: data,
                })
            })
            .catch(error => {
                console.log(error);
            });

    }

    render() {
        var tempRows = [];
        for (let i = 0; i < this.state.carbonEntries.length; i++) {
            tempRows.push(createData(this.state.carbonEntries[i]['item_name'], this.state.carbonEntries[i]['quantity'], this.state.carbonEntries[i]['unit_name'], this.state.carbonEntries[i]['details'], this.state.carbonEntries[i]['time_created'].substring(0, 10)))
        }
        const rows = tempRows
        return (<div><Box m={7}>
            <Container>
                <Grid container spacing={2}>
                    <Typography variant="h4">
                        Dashboard
                    </Typography>
                    <Grid item xs={12}>
                        <Paper>
                            <Chart
                                data={this.state.weekEmissions}
                            >
                                <ArgumentAxis />
                                <ValueAxis />

                                <BarSeries
                                    valueField="emissions"
                                    argumentField="days"
                                />
                                <BarSeries
                                    valueField="green"
                                    argumentField="days"
                                />
                                <Title text="This Week's Greenlife Overview" />
                                <Animation />
                            </Chart>
                        </Paper>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <Paper>
                            <Chart
                                data={this.state.threeDayEmission}
                            >
                                <ArgumentAxis />
                                <ValueAxis />

                                <BarSeries
                                    valueField="emissions"
                                    argumentField="days"
                                />
                                <BarSeries
                                    valueField="oxygen"
                                    argumentField="days"
                                />
                                <Title text="Within 3 Days" />
                                <Animation />
                            </Chart>
                        </Paper>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <Paper>
                            <Chart
                                data={this.state.monthEmission}
                            >
                                <ArgumentAxis />
                                <ValueAxis />

                                <BarSeries
                                    valueField="emissions"
                                    argumentField="days"
                                />
                                <Title text="Within this month" />
                                <Animation />
                            </Chart>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Container container>
                                <Box mt={4}>
                                    <Typography variant="h6">
                                        Recent Carbon Entries
                                    </Typography>
                                </Box>
                            </Container>
                            <Table className={classes.table} aria-label="simple table" style={{ marginTop: "5%" }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Unit</TableCell>
                                        <TableCell align="right">Details</TableCell>
                                        <TableCell align="right">Date Created</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.itemName}>
                                            <TableCell component="th" scope="row">
                                                {row.itemName}
                                            </TableCell>
                                            <TableCell align="right">{row.quantity}</TableCell>
                                            <TableCell align="right">{row.unit}</TableCell>
                                            <TableCell align="right">{row.details}</TableCell>
                                            <TableCell align="right">{row.timeCreated}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Fab variant="extended" color="primary" aria-label="add" className={classes.margin} style={style} onClick={this.redirectToEntry.bind(this)}>
                    <AddIcon />
                    Add Entry
                </Fab>
            </Container>
        </Box>
        </div>);
    }
}

export default withRouter(Dashboard);