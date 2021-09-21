import { useCallback } from 'react';

const useDateFormat = () => useCallback((date: Date, fmt: string) => {
    const year = date.getFullYear();
    const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds(), // 毫秒
    };
    let tmpFmt = fmt;
    if (/(y+)/.test(tmpFmt)) {
        tmpFmt = tmpFmt.replace(RegExp.$1, (`${year}`).substr(4 - RegExp.$1.length));
    }
    const keys = Object.keys(o);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (new RegExp(`(${k})`).test(tmpFmt)) {
            const len = `${o[k]}`.length;
            // @ts-ignore
            tmpFmt = tmpFmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr(`${len}`)));
        }
    }
    return tmpFmt;
}, []);
export default useDateFormat;
