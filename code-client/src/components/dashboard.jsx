import React from "react";
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
    PieSeries,
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
import { Link } from "@material-ui/core";
import { withRouter } from "react-router";

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
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    zIndex:1000
};

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
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
            carbonEntries:[]
        };
    }

    componentDidMount() {
        this.getCarbonEntry();  
        this.get3DayEmission();
        this.getMonthEmission();
        this.getWeekEmission();
    }

    redirectToEntry(){
        const { history } = this.props;
        history.push('/carbonEntryPage')
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
        console.log("get month emission data");

        fetch('http://localhost:8000/api-carbon/recent-entries/30/', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    monthEmission:data
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
        console.log("get week emission data ");

        fetch('http://localhost:8000/api-carbon/recent-entries/7/', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState(
                { weekEmissions: data }
                )
            })
            .catch(error => {
                console.log(error);
            });
    }

    get3DayEmission(){
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
        console.log("get 3 day emission data");

        fetch('http://localhost:8000/api-carbon/recent-entries/3/', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    threeDayEmission:data
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
        console.log("get carbon entries");

        fetch('http://localhost:8000/api-carbon/logs', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    carbonEntries:data
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return <div>
            <Container>
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
                        <Title text="This Week's Overview" />
                        <Animation />
                    </Chart>
                </Paper>
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
                        <Title text="The Last 3 Days' Overview" />
                        <Animation />
                    </Chart>
                </Paper>
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
                        <Title text="This Month's Overview" />
                        <Animation />
                    </Chart>
                </Paper>
                <div>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table" style={{ marginTop: "5%" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Dessert (100g serving)</TableCell>
                                    <TableCell align="right">Calories</TableCell>
                                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <Fab variant="extended" color="primary" aria-label="add" className={classes.margin} style={style} onClick={this.redirectToEntry.bind(this)}>
                    <AddIcon />
                    Add Entry
                </Fab>
            </Container>
        </div>
    }
}

export default withRouter(Dashboard);