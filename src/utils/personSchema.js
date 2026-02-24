import { z } from 'zod'
import {
  GENDER_OPTIONS,
  FAMILY_RELATION_TYPES,
  EDUCATION_TYPES,
  ADDRESS_TYPES,
  DOCUMENT_TYPES,
  REQUEST_STATUSES,
} from '@utils/constants'

// Константы лимитов (max — длина строк). Для части полей минимум проверяется только при непустом вводе (refine).
const L = {
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

// Дата в формате YYYY-MM-DD или пусто; пробелы обрезаются
const dateString = z
  .string()
  .trim()
  .max(L.short)
  .refine((val) => !val || /^\d{4}-\d{2}-\d{2}/.test(val), {
    message: 'Укажите дату в формате ГГГГ-ММ-ДД',
  })

// Необязательная дата (пустая строка или null)
const optionalDateString = z
  .string()
  .trim()
  .max(L.short)
  .nullable()
  .refine((val) => val === null || val === '' || /^\d{4}-\d{2}-\d{2}/.test(String(val)), {
    message: 'Укажите дату в формате ГГГГ-ММ-ДД',
  })

const postalCode = z.string().trim().max(20).nullable()

const createOptionalEnum = (options) => z.union([z.enum(options.map((o) => o.value)), z.literal('')])

const genderEnum = createOptionalEnum(GENDER_OPTIONS)
const familyRelationEnum = createOptionalEnum(FAMILY_RELATION_TYPES)
const educationTypeEnum = createOptionalEnum(EDUCATION_TYPES)
const addressTypeEnum = createOptionalEnum(ADDRESS_TYPES)
const documentTypeEnum = createOptionalEnum(DOCUMENT_TYPES)
const requestStatusEnum = createOptionalEnum(REQUEST_STATUSES)

// Email опциональный: в Zod .optional() разрешает только undefined.
// Пустую строку из формы приводим к undefined перед валидацией (см. validatePerson).
const emailSchema = z.email({ message: 'Введите корректный email' }).nullish()

// При вводе: пусто — ок; не пусто — проверка формата/длины
const passportSeriesSchema = z
  .string()
  .trim()
  .max(L.passportSeries)
  .refine((v) => !v || (v.length === L.passportSeriesLen && /^\d+$/.test(v)), {
    message: 'Серия — 4 цифры',
  })
const passportNumberSchema = z
  .string()
  .trim()
  .max(L.passportNumber)
  .refine((v) => !v || (v.length === L.passportNumberLen && /^\d+$/.test(v)), {
    message: 'Номер — 6 цифр',
  })
const issuedByCodeSchema = z
  .string()
  .trim()
  .max(L.issuedByCode)
  .refine((v) => !v || /^\d{3}-\d{3}$/.test(v), {
    message: 'Формат: 000-000',
  })

export const passportSchema = z.object({
  series: passportSeriesSchema,
  number: passportNumberSchema,
  issueDate: dateString,
  issuedBy: z.string().trim().max(L.long),
  issuedByCode: issuedByCodeSchema,
  placeOfBirth: z.string().trim().max(L.long),
  registrationAddress: z.string().trim().max(L.note),
})

export const requestSchema = z.object({
  id: z.string().trim().max(L.short),
  status: requestStatusEnum,
  createdAt: z.string().trim().max(L.short),
})

export const familyMemberSchema = z.object({
  id: z.string().trim().max(L.short),
  relationType: familyRelationEnum,
  firstName: z.string().trim().max(L.name),
  lastName: z.string().trim().max(L.name),
  middleName: z.string().trim().max(L.name),
  birthDate: dateString,
  phone: z.string().trim().max(L.phone),
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

// При вводе: пусто — ок; не пусто — ровно minPhoneDigits цифр
const phoneSchema = z
  .string()
  .trim()
  .max(L.phone)
  .nullish()
  .refine((v) => !v?.trim() || v.replaceAll(/\D/g, '').length === L.minPhoneDigits, {
    message: `Телефон должен содержать ${L.minPhoneDigits} цифр`,
  })

export const personSchema = z.object({
  id: z.string().trim().max(L.short),
  firstName: z.string().trim().max(L.name),
  lastName: z.string().trim().max(L.name),
  middleName: z.string().trim().max(L.name),
  birthDate: dateString,
  gender: genderEnum,
  phone: phoneSchema,
  email: emailSchema,
  city: z.string().trim().max(L.long),
  street: z.string().trim().max(L.long),
  building: z.string().trim().max(L.short),
  apartment: z.string().trim().max(L.short),
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

// Пути полей, где пустая строка из формы должна трактоваться как undefined (.nullish() в схеме)
const OPTIONAL_STRING_PATHS = ['email']

function setByPath(obj, pathStr, value) {
  if (!pathStr || typeof obj !== 'object' || obj == null) return
  const keys = pathStr.split('.')
  let current = obj
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (current[key] == null) current[key] = {}
    current = current[key]
  }
  current[keys[keys.length - 1]] = value
}

function getByPath(obj, pathStr) {
  if (!pathStr || typeof obj !== 'object' || obj == null) return undefined
  return pathStr.split('.').reduce((acc, key) => acc?.[key], obj)
}

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

export function validatePerson(person) {
  const normalized = normalizeOptionalStrings(person)
  const result = personSchema.safeParse(normalized)
  if (result.success) {
    return { success: true }
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
