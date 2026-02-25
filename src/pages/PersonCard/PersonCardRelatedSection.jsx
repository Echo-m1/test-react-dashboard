import { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { formatDate, formatDateForInput } from '@utils/dateUtils'
import { getOptionLabel } from '@utils/peopleUtils'
import { getDefaultItem } from '@utils/relatedTableDefaults'
import { setByPath, getByPath } from '@utils/objectPath'
import { FIELD_COMPONENTS } from './fields'

function RelatedItemDialog({ open, title, item, editFields, arrayKey, onSave, onClose }) {
  const [localItem, setLocalItem] = useState(() => (item ? structuredClone(item) : getDefaultItem(arrayKey)))

  const handleFieldChange = useCallback((path, value) => {
    setLocalItem((prev) => {
      const next = structuredClone(prev)
      setByPath(next, path, value)
      return next
    })
  }, [])

  const handleSubmit = useCallback(() => {
    onSave(localItem)
    onClose()
  }, [localItem, onSave, onClose])

  if (open) {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="related-item-dialog-title"
      >
        <DialogTitle id="related-item-dialog-title">{title}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid
            container
            spacing={2}
            sx={{ pt: 1 }}
          >
            {editFields.map((field) => {
              const value = getByPath(localItem, field.path)
              const id = `related-edit-${field.path}`
              const FieldComponent = FIELD_COMPONENTS[field.type]
              if (!FieldComponent) return null

              const handleDebouncedChange = (path, newValue) => handleFieldChange(path, newValue)
              const flushSync = (path, rawValue) => handleFieldChange(path, rawValue)
              const textValue = value ?? ''
              const gridSize = field.type === 'checkbox' || field.type === 'textarea' ? { xs: 12 } : { xs: 12, sm: 6 }

              return (
                <Grid
                  size={gridSize}
                  key={field.path}
                >
                  <FieldComponent
                    id={id}
                    field={field}
                    localValue={value}
                    textValue={textValue}
                    dateDisplay={field.type === 'date' ? formatDateForInput(value) : ''}
                    fieldError={undefined}
                    maxLengthHelper={undefined}
                    textLength={textValue.length}
                    counterInBorderSx={{}}
                    handleDebouncedChange={handleDebouncedChange}
                    flushSync={flushSync}
                  />
                </Grid>
              )
            })}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={onClose}
            aria-label="Отмена"
          >
            Отмена
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            aria-label="Сохранить"
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
  return null
}

RelatedItemDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  item: PropTypes.object,
  editFields: PropTypes.arrayOf(PropTypes.object).isRequired,
  arrayKey: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

function PersonCardRelatedSection({ section, person, onArrayChange }) {
  const arrayKey = section.arrayKey
  const tableColumns = section.tableColumns || []
  const editFields = section.editFields || []
  const items = useMemo(() => (person && Array.isArray(person[arrayKey]) ? person[arrayKey] : []), [person, arrayKey])

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [dialogKey, setDialogKey] = useState(0)

  const handleAdd = useCallback(() => {
    setEditingItem(null)
    setDialogKey((k) => k + 1)
    setDialogOpen(true)
  }, [])

  const handleEdit = useCallback((item) => {
    setEditingItem(structuredClone(item))
    setDialogKey((k) => k + 1)
    setDialogOpen(true)
  }, [])

  const handleDelete = useCallback(
    (itemId) => {
      const newArray = items.filter((it) => it.id !== itemId)
      onArrayChange(arrayKey, newArray)
    },
    [items, arrayKey, onArrayChange]
  )

  const handleDialogSave = useCallback(
    (updatedItem) => {
      const idx = items.findIndex((it) => it.id === updatedItem.id)
      const newArray =
        idx >= 0 ? [...items.slice(0, idx), updatedItem, ...items.slice(idx + 1)] : [...items, updatedItem]
      onArrayChange(arrayKey, newArray)
      setDialogOpen(false)
      setEditingItem(null)
    },
    [items, arrayKey, onArrayChange]
  )

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false)
    setEditingItem(null)
  }, [])

  const getCellDisplay = (item, col) => {
    const value = item[col.key]
    if (col.optionsKey) return getOptionLabel(col.optionsKey, value)
    if (col.key === 'birthDate' || col.key === 'startDate' || col.key === 'endDate') return formatDate(value) || ''
    if (col.key === 'isCurrent' || col.key === 'isCompleted') return value ? 'Да' : 'Нет'
    return value == null ? '' : String(value)
  }

  const dialogTitle = editingItem ? 'Редактировать' : 'Добавить'

  return (
    <Box
      component="section"
      aria-labelledby={`section-${section.id}`}
      sx={{
        p: 2,
        borderRadius: 1,
        bgcolor: 'action.hover',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        id={`section-${section.id}`}
        variant="subtitle1"
        component="h2"
        fontWeight={600}
        gutterBottom
        sx={{ mb: 2 }}
      >
        {section.title}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <Button
          startIcon={<AddIcon />}
          onClick={handleAdd}
          size="small"
          variant="outlined"
          aria-label={`Добавить запись в ${section.title}`}
        >
          Добавить
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ overflow: 'auto' }}
      >
        <Table
          size="small"
          aria-label={section.title}
        >
          <TableHead>
            <TableRow>
              {tableColumns.map((col) => (
                <TableCell
                  key={col.key}
                  scope="col"
                >
                  {col.label}
                </TableCell>
              ))}
              <TableCell
                scope="col"
                align="right"
                sx={{ width: 100 }}
              >
                Действия
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length + 1}
                  align="center"
                  sx={{ py: 2 }}
                >
                  Нет записей
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  {tableColumns.map((col) => (
                    <TableCell key={col.key}>{getCellDisplay(item, col)}</TableCell>
                  ))}
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(item)}
                      aria-label="Редактировать запись"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(item.id)}
                      aria-label="Удалить запись"
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <RelatedItemDialog
        key={dialogKey}
        open={dialogOpen}
        title={dialogTitle}
        item={editingItem}
        editFields={editFields}
        arrayKey={arrayKey}
        onSave={handleDialogSave}
        onClose={handleDialogClose}
      />
    </Box>
  )
}

PersonCardRelatedSection.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    arrayKey: PropTypes.string.isRequired,
    tableColumns: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        optionsKey: PropTypes.string,
      })
    ).isRequired,
    editFields: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  person: PropTypes.object.isRequired,
  onArrayChange: PropTypes.func.isRequired,
}

export default PersonCardRelatedSection
