import { L } from '@utils/personSchema'

/**
 * Конфигурация вкладок и секций карточки человека.
 * Рассчитана на масштаб до 150+ параметров и до 20 связанных таблиц:
 * новые вкладки и секции добавляются в массив без изменения разметки.
 * maxLength согласован со схемой валидации (personSchema.L).
 *
 * @typedef {'text'|'date'|'select'|'checkbox'|'textarea'} FieldType
 * @typedef {{ path: string, type: FieldType, label: string, optionsKey?: string, required?: boolean, maxLength?: number }} FieldConfig
 * @typedef {{ id: string, title: string, fields?: FieldConfig[] }} SectionConfig
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
    sections: [{ id: 'relatives', title: 'Родственники' }],
  },
  {
    id: 'education',
    label: 'Образование',
    sections: [{ id: 'education-records', title: 'Учебные заведения' }],
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
    sections: [{ id: 'address-list', title: 'Адреса регистрации и проживания' }],
  },
]
