/**
 * Created by rigel on 8/17/16.
 */
import moment from 'moment';

export class DateFormatValueConverter {
    toView(value, format) {
        if(!format) format = 'M/DD/YYYY h:mm a';
            return moment(value).format(format);

    }

    fromView(value) {
        return new Date(value);
    }
}