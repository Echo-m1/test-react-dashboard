import PropTypes from 'prop-types'
import { Box, Typography, Grid } from '@mui/material'
import PersonCardField from './PersonCardField'
import PersonCardRelatedSection from './PersonCardRelatedSection'

function PersonCardSection({
  section,
  person,
  personId,
  resetKey = 0,
  fieldErrors = {},
  onFieldChange,
  onRelatedArrayChange,
}) {
  const hasFields = section.fields?.length > 0
  const hasRelatedTable = section.arrayKey && section.tableColumns?.length > 0

  if (hasRelatedTable) {
    return (
      <PersonCardRelatedSection
        section={section}
        person={person}
        onArrayChange={onRelatedArrayChange}
      />
    )
  }

  return (
    <Box
      component="section"
      aria-labelledby={`section-${section.id}`}
      sx={{
        p: 2.5,
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 10px 30px rgba(15,23,42,0.08)',
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
      <Grid
        container
        spacing={2}
      >
        {hasFields ? (
          section.fields.map((field) => (
            <Grid
              size={{ xs: 12, sm: 6 }}
              key={field.path}
            >
              <PersonCardField
                key={`${personId ?? 'no-person'}-${field.path}-${resetKey}`}
                person={person}
                field={field}
                fieldError={fieldErrors[field.path]}
                onFieldChange={onFieldChange}
              />
            </Grid>
          ))
        ) : (
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Раздел в разработке.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default PersonCardSection

PersonCardSection.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(PropTypes.object),
    arrayKey: PropTypes.string,
    tableColumns: PropTypes.array,
    editFields: PropTypes.array,
  }).isRequired,
  person: PropTypes.object.isRequired,
  personId: PropTypes.string,
  resetKey: PropTypes.number,
  fieldErrors: PropTypes.object,
  onFieldChange: PropTypes.func,
  onRelatedArrayChange: PropTypes.func,
}
