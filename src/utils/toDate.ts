import moment from 'moment';
import 'moment/locale/ru';

export const toDate = (date: string) => {
  moment.locale('ru');
  return moment(date).format('LLL');
};
