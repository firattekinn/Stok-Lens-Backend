import { ERROR_TYPES } from "../enums/errorTypes.js";

export const Messages = {
  [ERROR_TYPES.INVALID_CREDENTIALS]: {
    message: {
      en: 'Invalid Credentials',
      tr: 'Geçersiz Kimlik Bilgileri'
    }
  },
  [ERROR_TYPES.UNAUTHORIZED]: {
    message: {
      en: 'Unauthorized Action',
      tr: 'Yetkisiz İşlem'
    }
  },
  [ERROR_TYPES.MISSING_DATA]: {
    message: {
      en: 'Missing Data',
      tr: 'Eksik Bilgi'
    }
  },
  [ERROR_TYPES.UNKNOWN_ERROR]: {
    message: {
      en: 'Unknown Error',
      tr: 'Bilinmeyen Bir Hata Oluştu'
    }
  },
  [ERROR_TYPES.USER_EXISTS]: {
    message: {
      en: 'Email Already Exists',
      tr: 'Mail Adresi Kullanımda'
    }
  },
  [ERROR_TYPES.INVALID_TRANSACTION_TYPE]: {
    message: {
      en: 'Invalid Transaction Type',
      tr: 'Geçersiz İşlem Türü'
    }
  },
  [ERROR_TYPES.TRANSACTION_NOT_FOUND]: {
    message: {
      en: 'Transaction Not Found',
      tr: 'İşlem Bulunamadı'
    }
  },
  [ERROR_TYPES.BAD_GUY_ERROR]: {
    message: {
      en: 'https://www.youtube.com/watch?v=C9wCHVvVr2s',
      tr: 'https://www.youtube.com/watch?v=yyb-tAaRqiE'
    }
  },
};