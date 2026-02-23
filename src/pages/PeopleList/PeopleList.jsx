import { useSelector } from 'react-redux'
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { selectFilteredPeople, selectFilteredCount } from '@store/selectors'
import { formatDate } from '@utils/dateUtils'
import { getGenderLabel } from '@utils/peopleUtils'
import PeopleFilters from './PeopleFilters'

const COLUMNS_COUNT = 6

function PeopleList() {
  const people = useSelector(selectFilteredPeople)
  const count = useSelector(selectFilteredCount)

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

      <Typography
        variant="body1"
        color="text.secondary"
        component="p"
        role="status"
        aria-live="polite"
        sx={{ mb: 2 }}
      >
        Найдено записей: {count}
      </Typography>

      <TableContainer component={Paper}>
        <Table
          stickyHeader
          aria-label="Таблица списка людей"
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
            {people.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={COLUMNS_COUNT}
                  align="center"
                  sx={{ py: 3 }}
                >
                  Записей не найдено
                </TableCell>
              </TableRow>
            ) : (
              people.map((person) => (
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
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default PeopleList
