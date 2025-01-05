import { locales } from '@/types/locales';

type Locale = typeof locales;
type LocaleSection = keyof Locale;
type LocaleSectionContent<S extends LocaleSection> = Locale[S];

export const useLocale = <S extends LocaleSection>(section: S): LocaleSectionContent<S> => {
    return locales[section];
};
