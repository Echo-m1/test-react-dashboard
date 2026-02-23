import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { selectFilteredPeople, selectFilteredCount } from '@store/selectors'
import { formatDate } from '@utils/dateUtils'
import { getGenderLabel } from '@utils/peopleUtils'
import PeopleFilters from './PeopleFilters'

const COLUMNS_COUNT = 6
const DEFAULT_ROWS_PER_PAGE = 25
const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100]

const PAGINATION_SX = {
  margin: 0,
  border: 'none',
  color: 'text.secondary',
  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
    fontSize: '0.875rem',
  },
  '& .MuiTablePagination-select': {
    fontSize: '0.875rem',
  },
  '& .MuiTablePagination-toolbar': {
    minHeight: 36,
    paddingLeft: 0,
    paddingRight: 0,
  },
}

function PeopleList() {
  const people = useSelector(selectFilteredPeople)
  const count = useSelector(selectFilteredCount)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE)

  const maxPage = count > 0 ? Math.max(0, Math.ceil(count / rowsPerPage) - 1) : 0
  const effectivePage = Math.min(page, maxPage)

  const paginatedPeople = useMemo(
    () => people.slice(effectivePage * rowsPerPage, effectivePage * rowsPerPage + rowsPerPage),
    [people, effectivePage, rowsPerPage]
  )

  const handlePageChange = (_, newPage) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number.parseInt(e.target.value, 10))
    setPage(0)
  }

  return (
    <Box
      component="section"
      aria-label="Картотека"
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
      >
        Картотека
      </Typography>

      <PeopleFilters />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          mb: 1.5,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          component="p"
          role="status"
          aria-live="polite"
        >
          Найдено записей: {count}
        </Typography>
        <TablePagination
          component="div"
          count={count}
          page={effectivePage}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          labelRowsPerPage="Строк на странице:"
          labelDisplayedRows={({ from, to, count: total }) => `${from}–${to} из ${total}`}
          sx={PAGINATION_SX}
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 'calc(100vh - 260px)',
          maxWidth: '100%',
          overflow: 'auto',
        }}
      >
        <Table
          stickyHeader
          aria-label="Таблица списка людей"
          sx={{ minWidth: 720 }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Фамилия</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Отчество</TableCell>
              <TableCell>Дата рождения</TableCell>
              <TableCell>Пол</TableCell>
              <TableCell>Город</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPeople.length ? (
              paginatedPeople.map((person) => (
                <TableRow
                  key={person.id}
                  hover
                >
                  <TableCell>{person.lastName ?? ''}</TableCell>
                  <TableCell>{person.firstName ?? ''}</TableCell>
                  <TableCell>{person.middleName ?? ''}</TableCell>
                  <TableCell>{formatDate(person.birthDate)}</TableCell>
                  <TableCell>{getGenderLabel(person.gender)}</TableCell>
                  <TableCell>{person.city ?? ''}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={COLUMNS_COUNT}
                  align="center"
                  sx={{ py: 3 }}
                >
                  Записей не найдено
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default PeopleList
