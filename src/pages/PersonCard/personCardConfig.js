/**
 * Конфигурация вкладок и секций карточки человека.
 * Рассчитана на масштаб до 150+ параметров и до 20 связанных таблиц:
 * новые вкладки и секции добавляются в массив без изменения разметки.
 *
 * @typedef {'text'|'date'|'select'|'checkbox'|'textarea'} FieldType
 * @typedef {{ path: string, type: FieldType, label: string, optionsKey?: string }} FieldConfig
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
          { path: 'lastName', type: 'text', label: 'Фамилия' },
          { path: 'firstName', type: 'text', label: 'Имя' },
          { path: 'middleName', type: 'text', label: 'Отчество' },
          { path: 'birthDate', type: 'date', label: 'Дата рождения' },
          { path: 'gender', type: 'select', label: 'Пол', optionsKey: 'GENDER_OPTIONS' },
        ],
      },
      {
        id: 'contacts',
        title: 'Контакты',
        fields: [
          { path: 'phone', type: 'text', label: 'Телефон' },
          { path: 'email', type: 'text', label: 'Email' },
        ],
      },
      {
        id: 'address',
        title: 'Адрес',
        fields: [
          { path: 'city', type: 'text', label: 'Город' },
          { path: 'street', type: 'text', label: 'Улица' },
          { path: 'building', type: 'text', label: 'Дом' },
          { path: 'apartment', type: 'text', label: 'Квартира' },
          { path: 'postalCode', type: 'text', label: 'Почтовый индекс' },
        ],
      },
      {
        id: 'family-status',
        title: 'Семейное положение и прочее',
        fields: [
          { path: 'isMarried', type: 'checkbox', label: 'Состоит в браке' },
          { path: 'hasChildren', type: 'checkbox', label: 'Есть дети' },
          { path: 'isActive', type: 'checkbox', label: 'Активен' },
          { path: 'notes', type: 'textarea', label: 'Заметки' },
          { path: 'description', type: 'textarea', label: 'Описание' },
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
          { path: 'passport.series', type: 'text', label: 'Серия паспорта' },
          { path: 'passport.number', type: 'text', label: 'Номер паспорта' },
          { path: 'passport.issueDate', type: 'date', label: 'Дата выдачи' },
          { path: 'passport.issuedBy', type: 'text', label: 'Кем выдан' },
          { path: 'passport.issuedByCode', type: 'text', label: 'Код подразделения' },
          { path: 'passport.placeOfBirth', type: 'text', label: 'Место рождения' },
          { path: 'passport.registrationAddress', type: 'textarea', label: 'Адрес регистрации' },
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
