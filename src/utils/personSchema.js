import { z } from 'zod'
import {
  GENDER_OPTIONS,
  FAMILY_RELATION_TYPES,
  EDUCATION_TYPES,
  ADDRESS_TYPES,
  DOCUMENT_TYPES,
  REQUEST_STATUSES,
} from '@utils/constants'
import { getByPath, setByPath } from '@utils/objectPath'

// Константы лимитов (max — длина строк). Экспорт для использования в UI (maxLength).
export const L = {
  short: 50,
  name: 200,
  phone: 30,
  long: 500,
  note: 2000,
  passportSeries: 4,
  passportNumber: 6,
  issuedByCode: 7,
  minPhoneDigits: 10, // при вводе: не пусто → не менее 10 цифр
  passportSeriesLen: 4,
  passportNumberLen: 6,
  issuedByCodeLen: 7, // формат 000-000
}

// Обязательная строка (для полей required в конфиге)
const requiredString = (maxLen, message = 'Обязательное поле') => z.string().trim().min(1, message).max(maxLen)

// Дата в формате YYYY-MM-DD или пусто; пробелы обрезаются
const dateString = z
  .string()
  .trim()
  .max(L.short)
  .refine((val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: 'Укажите дату в формате ГГГГ-ММ-ДД',
  })

// Обязательная дата (не пусто, формат ГГГГ-ММ-ДД)
const requiredDateString = z
  .string()
  .trim()
  .min(1, 'Обязательное поле')
  .max(L.short)
  .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: 'Укажите дату в формате ГГГГ-ММ-ДД',
  })

// Необязательная дата (пустая строка или null)
const optionalDateString = z
  .string()
  .trim()
  .max(L.short)
  .nullable()
  .refine((val) => val === null || val === '' || /^\d{4}-\d{2}-\d{2}$/.test(String(val)), {
    message: 'Укажите дату в формате ГГГГ-ММ-ДД',
  })

const postalCode = z.string().trim().max(20).nullable()

const createOptionalEnum = (options) => z.union([z.enum(options.map((o) => o.value)), z.literal('')])

// Пол обязательный (в конфиге required) — пустое значение не допускается
const genderRequiredEnum = z.enum(
  GENDER_OPTIONS.map((o) => o.value),
  { errorMap: () => ({ message: 'Выберите пол' }) }
)
const familyRelationEnum = createOptionalEnum(FAMILY_RELATION_TYPES)
const educationTypeEnum = createOptionalEnum(EDUCATION_TYPES)
const addressTypeEnum = createOptionalEnum(ADDRESS_TYPES)
const documentTypeEnum = createOptionalEnum(DOCUMENT_TYPES)
const requestStatusEnum = createOptionalEnum(REQUEST_STATUSES)

// Email опциональный: в Zod .optional() разрешает только undefined.
// Пустую строку из формы приводим к undefined перед валидацией (см. validatePerson).
const emailSchema = z.email({ message: 'Введите корректный email' }).nullish()

// Обязательные поля паспорта (в конфиге required)
const passportSeriesRequired = z
  .string()
  .trim()
  .length(L.passportSeriesLen, 'Серия — 4 цифры')
  .regex(/^\d{4}$/, 'Серия — 4 цифры')
const passportNumberRequired = z
  .string()
  .trim()
  .length(L.passportNumberLen, 'Номер — 6 цифр')
  .regex(/^\d{6}$/, 'Номер — 6 цифр')
const issuedByCodeRequired = z
  .string()
  .trim()
  .length(L.issuedByCodeLen, 'Формат: 000-000')
  .regex(/^\d{3}-\d{3}$/, 'Формат: 000-000')

export const passportSchema = z.object({
  series: passportSeriesRequired,
  number: passportNumberRequired,
  issueDate: requiredDateString,
  issuedBy: requiredString(L.long, 'Обязательное поле'),
  issuedByCode: issuedByCodeRequired,
  placeOfBirth: requiredString(L.long, 'Обязательное поле'),
  registrationAddress: requiredString(L.note, 'Обязательное поле'),
})

export const requestSchema = z.object({
  id: z.string().trim().max(L.short),
  status: requestStatusEnum,
  createdAt: z.string().trim().max(L.short),
})

// При вводе: пусто — ок; не пусто — ровно minPhoneDigits цифр (используется в person и family)
const phoneSchema = z
  .string()
  .trim()
  .max(L.phone)
  .nullish()
  .refine((v) => !v?.trim() || v.replaceAll(/\D/g, '').length === L.minPhoneDigits, {
    message: `Телефон должен содержать ${L.minPhoneDigits} цифр`,
  })

export const familyMemberSchema = z.object({
  id: z.string().trim().max(L.short),
  relationType: familyRelationEnum,
  firstName: z.string().trim().max(L.name),
  lastName: z.string().trim().max(L.name),
  middleName: z.string().trim().max(L.name).nullish(),
  birthDate: dateString,
  phone: phoneSchema,
  notes: z.string().trim().max(L.note),
})

export const educationSchema = z.object({
  id: z.string().trim().max(L.short),
  type: educationTypeEnum,
  institution: z.string().trim().max(L.long),
  faculty: z.string().trim().max(L.long),
  specialty: z.string().trim().max(L.long),
  startDate: dateString,
  endDate: optionalDateString,
  isCompleted: z.boolean(),
  diplomaNumber: z.string().trim().max(L.short),
  notes: z.string().trim().max(L.note),
})

export const addressSchema = z.object({
  id: z.string().trim().max(L.short),
  type: addressTypeEnum,
  city: z.string().trim().max(L.long),
  street: z.string().trim().max(L.long),
  building: z.string().trim().max(L.short),
  apartment: z.string().trim().max(L.short),
  postalCode,
  startDate: dateString,
  endDate: optionalDateString,
  isCurrent: z.boolean(),
  notes: z.string().trim().max(L.note),
})

export const documentSchema = z.object({
  id: z.string().trim().max(L.short),
  type: documentTypeEnum,
  series: z.string().trim().max(L.short),
  number: z.string().trim().max(L.short),
  issueDate: dateString,
  issuedBy: z.string().trim().max(L.long),
  expiryDate: optionalDateString,
  isActive: z.boolean(),
  notes: z.string().trim().max(L.note),
})

export const personSchema = z.object({
  id: z.string().trim().max(L.short),
  firstName: requiredString(L.name),
  lastName: requiredString(L.name),
  middleName: z.string().trim().max(L.name).nullish(),
  birthDate: requiredDateString,
  gender: genderRequiredEnum,
  phone: phoneSchema,
  email: emailSchema,
  city: requiredString(L.long),
  street: requiredString(L.long),
  building: requiredString(L.short),
  apartment: requiredString(L.short),
  postalCode,
  isMarried: z.boolean(),
  hasChildren: z.boolean(),
  isActive: z.boolean(),
  notes: z.string().trim().max(L.note),
  description: z.string().trim().max(L.note),
  family: z.array(familyMemberSchema),
  education: z.array(educationSchema),
  addresses: z.array(addressSchema),
  documents: z.array(documentSchema),
  passport: passportSchema,
  requests: z.array(requestSchema),
  createdAt: z.string().trim().max(L.short),
  updatedAt: z.string().trim().max(L.short),
})

// Пути полей, где пустая строка из формы должна трактоваться как undefined (.nullish() в схеме).
// При добавлении новых опциональных строк (например телефон в другой сущности) — добавить путь сюда.
const OPTIONAL_STRING_PATHS = ['email']

function normalizeOptionalStrings(person) {
  if (!person || typeof person !== 'object') return person
  const normalized = structuredClone(person)
  for (const path of OPTIONAL_STRING_PATHS) {
    const v = getByPath(normalized, path)
    if (v === '') setByPath(normalized, path, undefined)
  }
  return normalized
}

function pathToFieldKey(path) {
  if (!Array.isArray(path) || !path.length) return ''
  return path.join('.')
}

/**
 * Валидирует объект человека по personSchema.
 * При успехе возвращает { success: true, data } — data это нормализованный объект (trim, приведённые типы).
 * В форме при сохранении нужно передавать в store result.data, а не сырой ввод.
 */
export function validatePerson(person) {
  const normalized = normalizeOptionalStrings(person)
  const result = personSchema.safeParse(normalized)
  if (result.success) {
    return { success: true, data: result.data }
  }
  const errors = {}
  for (const issue of result.error.issues) {
    const key = pathToFieldKey(issue.path)
    if (key && !(key in errors)) {
      errors[key] = issue.message || 'Ошибка валидации'
    }
  }
  return { success: false, errors }
}
