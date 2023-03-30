import _, { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TextField,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import Alert from '@material-ui/lab/Alert';

// api

import {refund, borrow, transfer, loan} from '../api/bank';
import {getinfo} from '../api/user';

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import { RHFTextField } from '../components/hook-form';

// mock
// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));
const TABLE_HEAD = [
  { id: 'id', label: 'Loan ID', alignRight: false },
  { id: 'borrowerAccount', label: 'Borrower', alignRight: false },
  { id: 'lenderAccount', label: 'Lender', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'dateRequest', label: 'Date Request', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  if(array.length !== 0) {
    array = array.loanList;}
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}


export default function Loans() {

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const [loanList,setLoanList] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  //const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('id');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const [durationTime, setDuration] = useState(30);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = loanList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDuration = (e) => {
    setDuration(e.target.value)
  }

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const onClickRefund = async (id) => {
    const IDLoan = {
      id: id
    }
    await refund(IDLoan) 
  };                   
  const sumbitLoan = (id) => async (e) => {
    const response = await loan({accept:e.target.textContent, loanID: id, duration:durationTime});
    if (response.code === 200){
      setError(false);
      setSuccess(true);
    } else {
      setError(true);
      setSuccess(false);
    }
    setMessage(response.message);
  }

  useEffect( () => { 
    getinfo({field :  ['loanList']})
    .then((info) => setLoanList(info));
  },[])

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - loanList.length) : 0;

  const filteredLoans = applySortFilter(loanList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredLoans.length === 0;

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Loan
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/borrow" startIcon={<Iconify icon="eva:plus-fill" />}>
            Borrow
          </Button>
        </Stack>

        <Card>
          <UserListToolbar 
          filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            { error &&
              <Alert variant="filled" severity={"error"}>
                {message}
              </Alert> 
            }
            { success &&
              <Alert variant="filled" severity={"success"}>
                {message}
              </Alert> 
            }
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={loanList.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {filteredLoans.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, borrowerAccount, lenderAccount, amount, status, dateRequest, dateLoan, duration } = row;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                      >
                        <TableCell align="left">{id}</TableCell>
                        <TableCell align="left">{borrowerAccount}</TableCell>

                        <TableCell align="left">{lenderAccount}</TableCell>
                        <TableCell align="left">{amount}</TableCell>
                        <TableCell align="left">{dateRequest.slice(0,10)}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={(status === 'declined' && 'error') || 'success'}>
                            {sentenceCase(status)}
                          </Label>
                        </TableCell>

                        <TableCell>
                        
                          {

                          status === 'asked' && sessionStorage.getItem("numAccount") == lenderAccount &&
                          <RootStyle>
                            <TextField name="Time to refund" label="Time to refund" value={durationTime} onChange={handleChangeDuration} required/>
                            <Button variant="contained" onClick={sumbitLoan(id)}color="success" >
                              accept
                            </Button>
                            <Button variant="contained" onClick={sumbitLoan(id)} color="error">
                              decline
                            </Button>
                          </RootStyle>}
                        </TableCell>
                        <TableCell>{
                          status === 'loaned' &&  sessionStorage.getItem("numAccount") == borrowerAccount &&
                          <Button variant="contained" color="secondary" onClick={ () =>{ onClickRefund(id)}} >
                            refund
                          </Button>}
                        </TableCell>
                        <TableCell align="right">
                          <UserMoreMenu />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={loanList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
