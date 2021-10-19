// 时间组件
export function getFormat(format: string) {
    let dateFormat;
    switch (format) {
        case 'date':
            dateFormat = 'YYYY-MM-DD';
            break;
        case 'time':
            dateFormat = 'HH:mm:ss';
            break;
        case 'dateTime':
            dateFormat = 'YYYY-MM-DD HH:mm:ss';
            break;
        case 'week':
            dateFormat = 'YYYY-w';
            break;
        case 'year':
            dateFormat = 'YYYY';
            break;
        case 'month':
            dateFormat = 'YYYY-MM';
            break;
        default:
        // dateTime
            if (typeof format === 'string') {
                dateFormat = format;
            } else {
                dateFormat = 'YYYY-MM-DD';
            }
    }
    return dateFormat;
}

export function isUrl(str) {
    const protocolRE = /^(?:\w+:)?\/\/(\S+)$/;
    if (typeof str !== 'string') return false;
    return protocolRE.test(str);
}
