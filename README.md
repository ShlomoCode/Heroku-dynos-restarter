# Heroku dynos restarter

אפליקציה לאתחול הדינו'ס של אפליקציית נוד כבדה על על הרקו, במקרה שהיא קרסה.

לא שימושי כ"כ מאז ביטול התוכניות החינמיות של Heroku.

# Config example

In `config.env` file in root directory.
```
TOKEN_API_HEROKU=fc0d678d-6b63-4b93-b7bc-19e5fbe8e3r9 #טוקן heroku
APP_NAME=madrichim #שם האפליקציה בהרקו
SITE_URL=https://madrichim.ovh #הכתובת שבה זמינה האפליקציה המנוטרת (אם יש רק דומיין חינמי של heroku ניתן להשאיר ריק)
```

# Deploy in heroku
יש ללחוץ על הכפתור 👇👇 ולמלא את הקונפיג.
<div  align='right'>

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

</div>

## מניעת "הירדמות" אוטומטית
בתוכנית Eco של heroku, [השרת נכבה מעצמו](https://devcenter.heroku.com/articles/free-dyno-hours#dyno-sleeping) אחרי 30 דקות ללא בקשה חיצונית לשרת.
כדי למנוע את זה יש לשלוח "בקשת דמה" לאפליקציה כל פחות מ-30 דקות.
 ניתן לעשות זאת בקלות באמצעות אחד האתרים הבאים:
* https://kaffeine.herokuapp.com
* https://www.downnotifier.com


## יצירת טוקן קבוע:
קודם כל יש להתקין את heroku cli ([עבור Windows 64-bit](https://cli-assets.heroku.com/heroku-x64.exe))

ואז התחברות לחשבון בheroku:
```
heroku login
```
ויצירת טוקן:
```
heroku authorizations:create
```
## מראי מקומות
* https://devcenter.heroku.com/articles/platform-api-reference#dyno-restart-all

* https://devcenter.heroku.com/articles/platform-api-quickstart#authentication
