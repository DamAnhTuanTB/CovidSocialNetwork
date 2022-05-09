import moment from 'moment';

const handleConvertDateStringToDateTimeComment = (dateString: any) => {
    if (!dateString) {
        return;
    }
    const dateObj = new Date(dateString);
    const currentDate = new Date();
    const datediff = Math.floor((currentDate.valueOf() - dateObj.valueOf())/(24*3600*1000));
    
    const momentObj = moment(dateObj);
    if (datediff > 0) {
      return momentObj.format('HH:mm DD/MM/YYYY');
    }

    return momentObj.format('HH:mm');
};
export default handleConvertDateStringToDateTimeComment;
