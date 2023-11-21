const STATUS_CODES = {

    OK: 200, // הבקשה הצליחה
    CREATED: 201, // נוצר משאב חדש
    NO_CONTENT: 204, // הבקשה הצליחה אך אין תוכן להחזיר 
  
    BAD_REQUEST: 400, // בקשה שגויה  
    UNAUTHORIZED: 401, // נדרש אימות  
    FORBIDDEN: 403, // גישה אסורה למשאב 
    NOT_FOUND: 404, // משאב לא נמצא
  
    INTERNAL_SERVER_ERROR: 500, // שגיאת שרת פנימית  
    NOT_IMPLEMENTED: 501, // השיטה לא מומשה  
    BAD_GATEWAY: 502, // שגיאת שער שגוי 
    SERVICE_UNAVAILABLE: 503, // השירות לא זמין כרגע  
    GATEWAY_TIMEOUT: 504, // פג זמן ההמתנה לשער
  
    MULTIPLE_CHOICES: 300, // מספר אפשרויות למשאב
    MOVED_PERMANENTLY: 301, // המשאב הועבר למיקום חדש 
    FOUND: 302, // המשאב הועבר זמנית 
    SEE_OTHER: 303, // ראה משאב אחר 
    NOT_MODIFIED: 304, // לא שונה מאז בקשה אחרונה
    TEMPORARY_REDIRECT: 307, // הפניה זמנית למשאב אחר
  
    PAYMENT_REQUIRED: 402, // נדרשת תשלום עבור הבקשה 
    PRECONDITION_FAILED: 412, // תנאי מוקדם נכשל
    UNPROCESSABLE_ENTITY: 422, // הגוף של הבקשה לא ניתן לעיבוד  
    TOO_MANY_REQUESTS: 429, // יותר מדי בקשות, צריך להאט
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431 // הכותרות גדולות מדי
  
  };

export default STATUS_CODES;