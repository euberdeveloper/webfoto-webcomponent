import dayjs from "dayjs";

import 'dayjs/locale/it';
import 'dayjs/locale/de';
import 'dayjs/locale/es';
import 'dayjs/locale/fr';

function getNavigatorLanguage() {
    if (navigator.languages && navigator.languages.length) {
        return navigator.languages[0];
    } else {
        return (navigator as any).userLanguage || navigator.language || (navigator as any).browserLanguage || 'en';
    }
}

export default function setDayjsLocale(): void {
    const lang = getNavigatorLanguage().split('-')[0];
    dayjs.locale(lang);
}