import {
  GENDER_OPTIONS,
  FAMILY_RELATION_TYPES,
  EDUCATION_TYPES,
  DOCUMENT_TYPES,
  ADDRESS_TYPES,
  REQUEST_STATUSES,
} from '@utils/constants'

const FIRST_NAMES_MALE = [
  'Александр',
  'Дмитрий',
  'Максим',
  'Иван',
  'Артём',
  'Михаил',
  'Никита',
  'Егор',
  'Андрей',
  'Илья',
]
const FIRST_NAMES_FEMALE = [
  'Анна',
  'Мария',
  'Елена',
  'Ольга',
  'Наталья',
  'Татьяна',
  'Ирина',
  'Екатерина',
  'Светлана',
  'Юлия',
]
const LAST_NAMES = [
  'Иванов',
  'Петров',
  'Сидоров',
  'Козлов',
  'Новиков',
  'Морозов',
  'Волков',
  'Соколов',
  'Лебедев',
  'Кузнецов',
  'Попов',
  'Васильев',
  'Смирнов',
  'Михайлов',
  'Фёдоров',
]
const MIDDLE_NAMES_MALE = [
  'Александрович',
  'Дмитриевич',
  'Иванович',
  'Михайлович',
  'Сергеевич',
  'Андреевич',
  'Алексеевич',
  'Евгеньевич',
]
const MIDDLE_NAMES_FEMALE = [
  'Александровна',
  'Дмитриевна',
  'Ивановна',
  'Михайловна',
  'Сергеевна',
  'Андреевна',
  'Алексеевна',
  'Евгеньевна',
]
const CITIES = [
  'Москва',
  'Санкт-Петербург',
  'Казань',
  'Новосибирск',
  'Екатеринбург',
  'Нижний Новгород',
  'Самара',
  'Воронеж',
  'Ростов-на-Дону',
  'Краснодар',
]
const STREETS = [
  'ул. Ленина',
  'ул. Мира',
  'пр. Победы',
  'ул. Гагарина',
  'ул. Советская',
  'ул. Центральная',
  'ул. Садовая',
  'ул. Молодёжная',
]
const INSTITUTIONS = [
  'МГУ им. Ломоносова',
  'СПбГУ',
  'МГТУ им. Баумана',
  'НИУ ВШЭ',
  'МФТИ',
  'Колледж связи',
  'Техникум №3',
]

let idCounter = 0
function nextId() {
  idCounter += 1
  return `gen-${idCounter}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 11)}`
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomDateYearsAgo(yearsMin, yearsMax) {
  const now = new Date()
  const yearsAgo = randomInt(yearsMin, yearsMax)
  const d = new Date(now)
  d.setFullYear(d.getFullYear() - yearsAgo)
  d.setMonth(randomInt(0, 11))
  d.setDate(randomInt(1, 28))
  return d.toISOString().slice(0, 10)
}

function addDays(isoDate, days) {
  const d = new Date(isoDate)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

function generatePhone() {
  const code = pick(['495', '812', '843', '383', '343'])
  return `+7 (${code}) ${randomInt(100, 999)}-${randomInt(10, 99)}-${randomInt(10, 99)}`
}

function generateEmail(firstName, lastName) {
  const domain = pick(['mail.ru', 'yandex.ru', 'gmail.com'])
  const name = `${(firstName || '').toLowerCase()}.${(lastName || '').toLowerCase()}`.replaceAll(/\s/g, '')
  return `${name}${randomInt(1, 99)}@${domain}`
}

function generatePassport(birthDate) {
  const issueYear = birthDate ? new Date(birthDate).getFullYear() + 14 : 2005
  return {
    series: String(randomInt(1000, 9999)),
    number: String(randomInt(100000, 999999)),
    issueDate: `${issueYear}-${String(randomInt(1, 12)).padStart(2, '0')}-${String(randomInt(1, 28)).padStart(2, '0')}`,
    issuedBy: 'ОВД района Центральный',
    issuedByCode: `${randomInt(100, 999)}-${randomInt(100, 999)}`,
    placeOfBirth: pick(CITIES),
    registrationAddress: `${pick(CITIES)}, ${pick(STREETS)}, д. ${randomInt(1, 150)}, кв. ${randomInt(1, 100)}`,
  }
}

function generateFamilyMember(gender) {
  const isMale = gender === 'male'
  return {
    id: nextId(),
    relationType: pick(FAMILY_RELATION_TYPES).value,
    firstName: pick(isMale ? FIRST_NAMES_MALE : FIRST_NAMES_FEMALE),
    lastName: pick(LAST_NAMES),
    middleName: pick(isMale ? MIDDLE_NAMES_MALE : MIDDLE_NAMES_FEMALE),
    birthDate: randomDateYearsAgo(5, 70),
    phone: generatePhone(),
    notes: Math.random() > 0.7 ? 'Контакт для экстренной связи' : '',
  }
}

function generateEducation() {
  const type = pick(EDUCATION_TYPES).value
  const startYear = randomInt(1995, 2015)
  let yearsToComplete = 2
  if (type === 'higher') yearsToComplete = 5
  else if (type === 'secondary_special') yearsToComplete = 3
  const endYear = startYear + yearsToComplete
  return {
    id: nextId(),
    type,
    institution: pick(INSTITUTIONS),
    faculty: pick(['Экономический', 'Юридический', 'Инженерный', 'Филологический']),
    specialty: pick(['Экономист', 'Юрист', 'Инженер', 'Программист']),
    startDate: `${startYear}-09-01`,
    endDate: `${endYear}-06-30`,
    isCompleted: true,
    diplomaNumber: `ДВ ${randomInt(100000, 999999)}`,
    notes: '',
  }
}

function generateAddress(city) {
  const type = pick(ADDRESS_TYPES).value
  const startYear = randomInt(2010, 2022)
  return {
    id: nextId(),
    type,
    city: city || pick(CITIES),
    street: pick(STREETS),
    building: String(randomInt(1, 120)),
    apartment: String(randomInt(1, 80)),
    postalCode: randomInt(100000, 199999),
    startDate: `${startYear}-01-15`,
    endDate: type === 'temporary' ? addDays(`${startYear}-01-15`, 365) : null,
    isCurrent: type !== 'temporary',
    notes: '',
  }
}

function generateDocument() {
  const type = pick(DOCUMENT_TYPES).value
  const issueYear = randomInt(2015, 2023)
  return {
    id: nextId(),
    type,
    series: type === 'passport' ? String(randomInt(1000, 9999)) : String(randomInt(10, 99)),
    number: String(randomInt(100000, 999999)),
    issueDate: `${issueYear}-${String(randomInt(1, 12)).padStart(2, '0')}-01`,
    issuedBy: 'ОВД',
    expiryDate:
      type === 'international_passport' || type === 'driver_license' ? addDays(`${issueYear}-01-01`, 365 * 10) : null,
    isActive: true,
    notes: '',
  }
}

function generateRequest() {
  const status = pick(REQUEST_STATUSES).value
  const daysAgo = randomInt(1, 365)
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  return {
    id: nextId(),
    status,
    createdAt: d.toISOString(),
  }
}

/**
 * Генерирует одного человека со связанными сущностями.
 * @returns {Object} Объект человека по схеме Person
 */
function generatePerson() {
  const gender = pick(GENDER_OPTIONS).value
  const isMale = gender === 'male'
  const firstName = pick(isMale ? FIRST_NAMES_MALE : FIRST_NAMES_FEMALE)
  const lastName = pick(LAST_NAMES)
  const middleName = pick(isMale ? MIDDLE_NAMES_MALE : MIDDLE_NAMES_FEMALE)
  const birthDate = randomDateYearsAgo(18, 65)
  const city = pick(CITIES)
  const now = new Date().toISOString()

  const familyCount = randomInt(0, 3)
  const family = Array.from({ length: familyCount }, () => generateFamilyMember(gender))

  const educationCount = randomInt(0, 2)
  const education = Array.from({ length: educationCount }, generateEducation)

  const addressCount = randomInt(1, 2)
  const addresses = Array.from({ length: addressCount }, () => generateAddress(city))

  const documentCount = randomInt(0, 2)
  const documents = Array.from({ length: documentCount }, generateDocument)

  const requestCount = randomInt(0, 3)
  const requests = Array.from({ length: requestCount }, generateRequest)

  const hasPassport = Math.random() > 0.1
  const passport = hasPassport
    ? generatePassport(birthDate)
    : {
        series: '',
        number: '',
        issueDate: '',
        issuedBy: '',
        issuedByCode: '',
        placeOfBirth: '',
        registrationAddress: '',
      }

  return {
    id: nextId(),
    firstName,
    lastName,
    middleName,
    birthDate,
    gender,
    phone: generatePhone(),
    email: generateEmail(firstName, lastName),
    city,
    street: pick(STREETS),
    building: String(randomInt(1, 100)),
    apartment: String(randomInt(1, 80)),
    postalCode: randomInt(100000, 199999),
    isMarried: Math.random() > 0.4,
    hasChildren: Math.random() > 0.5,
    isActive: Math.random() > 0.1,
    notes: Math.random() > 0.8 ? 'Примечание к карточке' : '',
    description: Math.random() > 0.7 ? 'Краткое описание' : '',
    family,
    education,
    addresses,
    documents,
    requests,
    passport,
    createdAt: now,
    updatedAt: now,
  }
}

/**
 * @param {number} [count] - Желаемое количество (ограничивается range.min и range.max)
 * @param {{ min?: number, max?: number }} [range] - Ограничение по размеру, по умолчанию { min: 20, max: 30 }
 */
export function generatePeople(count, range = { min: 20, max: 30 }) {
  const { min = 20, max = 30 } = range
  const size = count == null ? randomInt(min, max) : Math.max(min, Math.min(max, Math.floor(count)))
  return Array.from({ length: size }, generatePerson)
}
