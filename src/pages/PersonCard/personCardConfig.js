/**
 * Конфигурация вкладок и секций карточки человека.
 * Рассчитана на масштаб до 150+ параметров и до 20 связанных таблиц:
 * новые вкладки и секции добавляются в массив без изменения разметки.
 *
 * @typedef {{ id: string, label: string, sections: Array<{ id: string, title: string }> }} TabConfig
 */

/** @type {TabConfig[]} */
export const PERSON_CARD_TABS = [
  {
    id: 'main',
    label: 'Основное',
    sections: [
      { id: 'personal', title: 'ФИО и дата рождения' },
      { id: 'contacts', title: 'Контакты' },
      { id: 'address', title: 'Адрес' },
      { id: 'family-status', title: 'Семейное положение и прочее' },
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
    sections: [{ id: 'passport-data', title: 'Паспортные данные' }],
  },
  {
    id: 'addresses',
    label: 'Адреса',
    sections: [{ id: 'address-list', title: 'Адреса регистрации и проживания' }],
  },
]
