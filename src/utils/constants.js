export const GENDER_OPTIONS = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
]

export const FAMILY_RELATION_TYPES = [
  { value: 'spouse', label: 'Супруг(а)' },
  { value: 'child', label: 'Ребёнок' },
  { value: 'parent', label: 'Родитель' },
  { value: 'sibling', label: 'Брат/Сестра' },
  { value: 'other', label: 'Другое' },
]

export const EDUCATION_TYPES = [
  { value: 'secondary', label: 'Среднее' },
  { value: 'secondary_special', label: 'Среднее специальное' },
  { value: 'incomplete_higher', label: 'Неполное высшее' },
  { value: 'higher', label: 'Высшее' },
  { value: 'postgraduate', label: 'Послевузовское' },
]

export const DOCUMENT_TYPES = [
  { value: 'passport', label: 'Паспорт' },
  { value: 'international_passport', label: 'Загранпаспорт' },
  { value: 'birth_certificate', label: 'Свидетельство о рождении' },
  { value: 'driver_license', label: 'Водительское удостоверение' },
]

export const ADDRESS_TYPES = [
  { value: 'registration', label: 'Прописка' },
  { value: 'residence', label: 'Место жительства' },
  { value: 'temporary', label: 'Временная регистрация' },
]

export const REQUEST_STATUSES = [
  { value: 'pending', label: 'В обработке' },
  { value: 'approved', label: 'Одобрено' },
  { value: 'rejected', label: 'Отклонено' },
  { value: 'completed', label: 'Завершено' },
]

export const FIELD_LABELS = {
  firstName: 'Имя',
  lastName: 'Фамилия',
  middleName: 'Отчество',
  birthDate: 'Дата рождения',
  gender: 'Пол',
  phone: 'Телефон',
  email: 'Email',
  city: 'Город',
  street: 'Улица',
  building: 'Дом',
  apartment: 'Квартира',
  postalCode: 'Почтовый индекс',
  isMarried: 'Состоит в браке',
  hasChildren: 'Есть дети',
  isActive: 'Активен',
  notes: 'Заметки',
  description: 'Описание',

  passportSeries: 'Серия паспорта',
  passportNumber: 'Номер паспорта',
  passportIssueDate: 'Дата выдачи',
  passportIssuedBy: 'Кем выдан',
  passportIssuedByCode: 'Код подразделения',
  passportPlaceOfBirth: 'Место рождения',
  passportRegistrationAddress: 'Адрес регистрации',

  relationType: 'Тип связи',

  educationType: 'Тип образования',
  institution: 'Учебное заведение',
  faculty: 'Факультет',
  specialty: 'Специальность',
  startDate: 'Дата начала',
  endDate: 'Дата окончания',
  isCompleted: 'Завершено',
  diplomaNumber: 'Номер диплома',

  addressType: 'Тип адреса',
  isCurrent: 'Текущий адрес',

  documentType: 'Тип документа',
  series: 'Серия',
  number: 'Номер',
  issueDate: 'Дата выдачи',
  issuedBy: 'Кем выдан',
  expiryDate: 'Дата окончания действия',
}
