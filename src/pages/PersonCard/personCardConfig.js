import { L } from '@utils/personSchema'

/**
 * Конфигурация вкладок и секций карточки человека.
 * Рассчитана на масштаб до 150+ параметров и до 20 связанных таблиц:
 * новые вкладки и секции добавляются в массив без изменения разметки.
 * maxLength согласован со схемой валидации (personSchema.L).
 *
 * @typedef {'text'|'date'|'select'|'checkbox'|'textarea'} FieldType
 * @typedef {{ path: string, type: FieldType, label: string, optionsKey?: string, required?: boolean, maxLength?: number }} FieldConfig
 * @typedef {{ key: string, label: string, optionsKey?: string }} TableColumnConfig
 * @typedef {{ id: string, title: string, fields?: FieldConfig[], arrayKey?: string, tableColumns?: TableColumnConfig[], editFields?: FieldConfig[] }} SectionConfig
 * @typedef {{ id: string, label: string, sections: SectionConfig[] }} TabConfig
 */

/** @type {TabConfig[]} */
export const PERSON_CARD_TABS = [
  {
    id: 'main',
    label: 'Основное',
    sections: [
      {
        id: 'personal',
        title: 'ФИО и дата рождения',
        fields: [
          { path: 'lastName', type: 'text', label: 'Фамилия', required: true, maxLength: L.name },
          { path: 'firstName', type: 'text', label: 'Имя', required: true, maxLength: L.name },
          { path: 'middleName', type: 'text', label: 'Отчество', maxLength: L.name },
          { path: 'birthDate', type: 'date', label: 'Дата рождения', required: true },
          { path: 'gender', type: 'select', label: 'Пол', optionsKey: 'GENDER_OPTIONS', required: true },
        ],
      },
      {
        id: 'contacts',
        title: 'Контакты',
        fields: [
          { path: 'phone', type: 'text', label: 'Телефон', required: false, maxLength: L.phone },
          { path: 'email', type: 'text', label: 'Email', required: false },
        ],
      },
      {
        id: 'address',
        title: 'Адрес',
        fields: [
          { path: 'city', type: 'text', label: 'Город', required: true, maxLength: L.long },
          { path: 'street', type: 'text', label: 'Улица', required: true, maxLength: L.long },
          { path: 'building', type: 'text', label: 'Дом', required: true, maxLength: L.short },
          { path: 'apartment', type: 'text', label: 'Квартира', required: true, maxLength: L.short },
          { path: 'postalCode', type: 'text', label: 'Почтовый индекс', required: false, maxLength: 20 },
        ],
      },
      {
        id: 'family-status',
        title: 'Семейное положение и прочее',
        fields: [
          { path: 'isMarried', type: 'checkbox', label: 'Состоит в браке' },
          { path: 'hasChildren', type: 'checkbox', label: 'Есть дети' },
          { path: 'isActive', type: 'checkbox', label: 'Активен' },
          { path: 'notes', type: 'textarea', label: 'Заметки', maxLength: L.note },
          { path: 'description', type: 'textarea', label: 'Описание', maxLength: L.note },
        ],
      },
    ],
  },
  {
    id: 'family',
    label: 'Семья',
    sections: [
      {
        id: 'relatives',
        title: 'Родственники',
        arrayKey: 'family',
        tableColumns: [
          { key: 'relationType', label: 'Тип связи', optionsKey: 'FAMILY_RELATION_TYPES' },
          { key: 'lastName', label: 'Фамилия' },
          { key: 'firstName', label: 'Имя' },
          { key: 'birthDate', label: 'Дата рождения' },
          { key: 'phone', label: 'Телефон' },
          { key: 'notes', label: 'Заметки' },
        ],
        editFields: [
          {
            path: 'relationType',
            type: 'select',
            label: 'Тип связи',
            optionsKey: 'FAMILY_RELATION_TYPES',
            required: true,
          },
          { path: 'lastName', type: 'text', label: 'Фамилия', required: true, maxLength: L.name },
          { path: 'firstName', type: 'text', label: 'Имя', required: true, maxLength: L.name },
          { path: 'middleName', type: 'text', label: 'Отчество', maxLength: L.name },
          { path: 'birthDate', type: 'date', label: 'Дата рождения' },
          { path: 'phone', type: 'text', label: 'Телефон', maxLength: L.phone },
          { path: 'notes', type: 'textarea', label: 'Заметки', maxLength: L.note },
        ],
      },
    ],
  },
  {
    id: 'education',
    label: 'Образование',
    sections: [
      {
        id: 'education-records',
        title: 'Учебные заведения',
        arrayKey: 'education',
        tableColumns: [
          { key: 'type', label: 'Тип', optionsKey: 'EDUCATION_TYPES' },
          { key: 'institution', label: 'Учебное заведение' },
          { key: 'faculty', label: 'Факультет' },
          { key: 'specialty', label: 'Специальность' },
          { key: 'startDate', label: 'Начало' },
          { key: 'endDate', label: 'Окончание' },
          { key: 'diplomaNumber', label: 'Диплом' },
        ],
        editFields: [
          { path: 'type', type: 'select', label: 'Тип образования', optionsKey: 'EDUCATION_TYPES', required: true },
          { path: 'institution', type: 'text', label: 'Учебное заведение', required: true, maxLength: L.long },
          { path: 'faculty', type: 'text', label: 'Факультет', required: true, maxLength: L.long },
          { path: 'specialty', type: 'text', label: 'Специальность', required: true, maxLength: L.long },
          { path: 'startDate', type: 'date', label: 'Дата начала' },
          { path: 'endDate', type: 'date', label: 'Дата окончания' },
          { path: 'isCompleted', type: 'checkbox', label: 'Завершено' },
          { path: 'diplomaNumber', type: 'text', label: 'Номер диплома', maxLength: L.short },
          { path: 'notes', type: 'textarea', label: 'Заметки', maxLength: L.note },
        ],
      },
    ],
  },
  {
    id: 'passport',
    label: 'Паспорт',
    sections: [
      {
        id: 'passport-data',
        title: 'Паспортные данные',
        fields: [
          {
            path: 'passport.series',
            type: 'text',
            label: 'Серия паспорта',
            required: true,
            maxLength: L.passportSeriesLen,
          },
          {
            path: 'passport.number',
            type: 'text',
            label: 'Номер паспорта',
            required: true,
            maxLength: L.passportNumberLen,
          },
          { path: 'passport.issueDate', type: 'date', label: 'Дата выдачи', required: true },
          {
            path: 'passport.issuedBy',
            type: 'text',
            label: 'Кем выдан',
            required: true,
            maxLength: L.long,
          },
          {
            path: 'passport.issuedByCode',
            type: 'text',
            label: 'Код подразделения',
            required: true,
            maxLength: L.issuedByCodeLen,
          },
          {
            path: 'passport.placeOfBirth',
            type: 'text',
            label: 'Место рождения',
            required: true,
            maxLength: L.long,
          },
          {
            path: 'passport.registrationAddress',
            type: 'textarea',
            label: 'Адрес регистрации',
            required: true,
            maxLength: L.note,
          },
        ],
      },
    ],
  },
  {
    id: 'addresses',
    label: 'Адреса',
    sections: [
      {
        id: 'address-list',
        title: 'Адреса регистрации и проживания',
        arrayKey: 'addresses',
        tableColumns: [
          { key: 'type', label: 'Тип', optionsKey: 'ADDRESS_TYPES' },
          { key: 'city', label: 'Город' },
          { key: 'street', label: 'Улица' },
          { key: 'building', label: 'Дом' },
          { key: 'apartment', label: 'Квартира' },
          { key: 'postalCode', label: 'Индекс' },
          { key: 'startDate', label: 'С' },
          { key: 'isCurrent', label: 'Текущий' },
        ],
        editFields: [
          { path: 'type', type: 'select', label: 'Тип адреса', optionsKey: 'ADDRESS_TYPES', required: true },
          { path: 'city', type: 'text', label: 'Город', required: true, maxLength: L.long },
          { path: 'street', type: 'text', label: 'Улица', required: true, maxLength: L.long },
          { path: 'building', type: 'text', label: 'Дом', required: true, maxLength: L.short },
          { path: 'apartment', type: 'text', label: 'Квартира', required: true, maxLength: L.short },
          { path: 'postalCode', type: 'text', label: 'Почтовый индекс', maxLength: 20 },
          { path: 'startDate', type: 'date', label: 'Дата начала' },
          { path: 'endDate', type: 'date', label: 'Дата окончания' },
          { path: 'isCurrent', type: 'checkbox', label: 'Текущий адрес' },
          { path: 'notes', type: 'textarea', label: 'Заметки', maxLength: L.note },
        ],
      },
    ],
  },
]
