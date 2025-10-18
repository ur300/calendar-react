export enum CALENDAR_VIEW {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export enum FIRST_DAY_OF_WEEK {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

export enum CALENDAR_TYPE {
  EXTERNAL = 'external',
  LOCAL = 'local',
}

export enum EVENT_FREQUENCY {
  NONE = 'none',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export enum EVENT_BY_DAY_PATTERN {
  MONDAY = 'MO',
  TUESDAY = 'TU',
  WEDNESDAY = 'WE',
  THURSDAY = 'TH',
  FRIDAY = 'FR',
  SATURDAY = 'SA',
  SUNDAY = 'SU',
}

export enum MANAGE_CALENDAR_VIEW {
  NEW = 'new',
  EDIT = 'edit',
}

export enum MOBILE_VIEW_STATE {
  MINI = 'mini',
  MONTH = 'month',
}


export enum LsStoreKey {
  SelectedCalendar = 'selectedCalendar',
  CalendarSettings = 'calendarSettings',
}
