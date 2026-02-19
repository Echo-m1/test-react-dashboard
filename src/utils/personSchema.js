/**
 * Базовая структура объекта человека
 * @typedef {Object} Person
 * @property {string} id - Уникальный идентификатор
 * @property {string} firstName - Имя (text input)
 * @property {string} lastName - Фамилия (text input)
 * @property {string} middleName - Отчество (text input)
 * @property {string} birthDate - Дата рождения в формате ISO (date input)
 * @property {string} gender - Пол: 'male' | 'female' (select)
 * @property {string} phone - Телефон (text input с маской)
 * @property {string} email - Email (email input)
 * @property {string} city - Город (text input / autocomplete)
 * @property {string} street - Улица (text input)
 * @property {string} building - Дом (text input)
 * @property {string} apartment - Квартира (text input)
 * @property {number|null} postalCode - Почтовый индекс (number input, пустое — null)
 * @property {boolean} isMarried - Состоит в браке (checkbox)
 * @property {boolean} hasChildren - Есть дети (checkbox)
 * @property {boolean} isActive - Активен (checkbox)
 * @property {string} notes - Заметки (textarea)
 * @property {string} description - Описание (textarea)
 * @property {Array<FamilyMember>} family - Массив родственников (один ко многим)
 * @property {Array<Education>} education - Массив образований (один ко многим)
 * @property {Array<Address>} addresses - Массив адресов (один ко многим)
 * @property {Array<Document>} documents - Массив документов (один ко многим)
 * @property {Passport} passport - Паспортные данные (объект)
 * @property {Array<Request>} requests - Заявки в отдел кадров (для дашборда)
 * @property {string} createdAt - Дата создания в формате ISO (date)
 * @property {string} updatedAt - Дата обновления в формате ISO (date)
 */

/**
 * Заявка (для агрегатов дашборда)
 * @typedef {Object} Request
 * @property {string} id - Уникальный идентификатор
 * @property {string} status - Статус (REQUEST_STATUSES: pending, approved, rejected, completed)
 * @property {string} createdAt - Дата создания в формате ISO
 */

/**
 * Структура родственника
 * @typedef {Object} FamilyMember
 * @property {string} id - Уникальный идентификатор
 * @property {string} relationType - Тип родственной связи (select: FAMILY_RELATION_TYPES)
 * @property {string} firstName - Имя (text input)
 * @property {string} lastName - Фамилия (text input)
 * @property {string} middleName - Отчество (text input)
 * @property {string} birthDate - Дата рождения в формате ISO (date input)
 * @property {string} phone - Телефон (text input)
 * @property {string} notes - Заметки (textarea)
 */

/**
 * Структура образования
 * @typedef {Object} Education
 * @property {string} id - Уникальный идентификатор
 * @property {string} type - Тип образования (select: EDUCATION_TYPES)
 * @property {string} institution - Название учебного заведения (text input)
 * @property {string} faculty - Факультет (text input)
 * @property {string} specialty - Специальность (text input)
 * @property {string} startDate - Дата начала в формате ISO (date input)
 * @property {string} endDate - Дата окончания в формате ISO (date input)
 * @property {boolean} isCompleted - Завершено (checkbox)
 * @property {string} diplomaNumber - Номер диплома (text input)
 * @property {string} notes - Заметки (textarea)
 */

/**
 * Структура адреса
 * @typedef {Object} Address
 * @property {string} id - Уникальный идентификатор
 * @property {string} type - Тип адреса (select: ADDRESS_TYPES)
 * @property {string} city - Город (text input)
 * @property {string} street - Улица (text input)
 * @property {string} building - Дом (text input)
 * @property {string} apartment - Квартира (text input)
 * @property {number|null} postalCode - Почтовый индекс (number input, пустое — null)
 * @property {string} startDate - Дата начала регистрации в формате ISO (date input)
 * @property {string} endDate - Дата окончания регистрации в формате ISO (date input, nullable)
 * @property {boolean} isCurrent - Текущий адрес (checkbox)
 * @property {string} notes - Заметки (textarea)
 */

/**
 * Структура документа
 * @typedef {Object} Document
 * @property {string} id - Уникальный идентификатор
 * @property {string} type - Тип документа (select: DOCUMENT_TYPES)
 * @property {string} series - Серия (text input)
 * @property {string} number - Номер (text input)
 * @property {string} issueDate - Дата выдачи в формате ISO (date input)
 * @property {string} issuedBy - Кем выдан (text input)
 * @property {string} expiryDate - Дата окончания действия в формате ISO (date input, nullable)
 * @property {boolean} isActive - Действителен (checkbox)
 * @property {string} notes - Заметки (textarea)
 */

/**
 * Структура паспортных данных
 * @typedef {Object} Passport
 * @property {string} series - Серия паспорта (text input, 4 цифры)
 * @property {string} number - Номер паспорта (text input, 6 цифр)
 * @property {string} issueDate - Дата выдачи в формате ISO (date input)
 * @property {string} issuedBy - Кем выдан (text input)
 * @property {string} issuedByCode - Код подразделения (text input)
 * @property {string} placeOfBirth - Место рождения (text input)
 * @property {string} registrationAddress - Адрес регистрации (textarea)
 */

/**
 * Создаёт новый объект паспортных данных по умолчанию
 * @returns {Passport}
 */
export function createPassportSchema() {
  return {
    series: '',
    number: '',
    issueDate: '',
    issuedBy: '',
    issuedByCode: '',
    placeOfBirth: '',
    registrationAddress: '',
  }
}

/**
 * Создаёт новый объект заявки по умолчанию
 * @returns {Request}
 */
export function createRequestSchema() {
  return {
    id: '',
    status: '',
    createdAt: '',
  }
}

/**
 * Создаёт новый объект человека по умолчанию
 * @returns {Person}
 */
export function createPersonSchema() {
  return {
    id: '',
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    gender: '',
    phone: '',
    email: '',
    city: '',
    street: '',
    building: '',
    apartment: '',
    postalCode: null,
    isMarried: false,
    hasChildren: false,
    isActive: true,
    notes: '',
    description: '',
    family: [],
    education: [],
    addresses: [],
    documents: [],
    requests: [],
    passport: createPassportSchema(),
    createdAt: '',
    updatedAt: '',
  }
}

/**
 * Создаёт новый объект родственника по умолчанию
 * @returns {FamilyMember}
 */
export function createFamilyMemberSchema() {
  return {
    id: '',
    relationType: '',
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    phone: '',
    notes: '',
  }
}

/**
 * Создаёт новый объект образования по умолчанию
 * @returns {Education}
 */
export function createEducationSchema() {
  return {
    id: '',
    type: '',
    institution: '',
    faculty: '',
    specialty: '',
    startDate: '',
    endDate: '',
    isCompleted: false,
    diplomaNumber: '',
    notes: '',
  }
}

/**
 * Создаёт новый объект адреса по умолчанию
 * @returns {Address}
 */
export function createAddressSchema() {
  return {
    id: '',
    type: '',
    city: '',
    street: '',
    building: '',
    apartment: '',
    postalCode: null,
    startDate: '',
    endDate: null,
    isCurrent: false,
    notes: '',
  }
}

/**
 * Создаёт новый объект документа по умолчанию
 * @returns {Document}
 */
export function createDocumentSchema() {
  return {
    id: '',
    type: '',
    series: '',
    number: '',
    issueDate: '',
    issuedBy: '',
    expiryDate: null,
    isActive: true,
    notes: '',
  }
}
