import PropTypes from 'prop-types'
import { Box, Typography, Grid } from '@mui/material'
import PersonCardField from './PersonCardField'

function PersonCardSection({ section, person, personId, resetKey = 0, fieldErrors = {}, onFieldChange }) {
  const hasFields = section.fields?.length > 0

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
  }).isRequired,
  person: PropTypes.object.isRequired,
  personId: PropTypes.string,
  resetKey: PropTypes.number,
  fieldErrors: PropTypes.object,
  onFieldChange: PropTypes.func,
}
