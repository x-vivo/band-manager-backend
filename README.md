Sends emails with nice template from booking@band-website.com

## Prerequisites

You need to have docker and docker-compose installed on your computer

## Environment variables

`X_VIVO_API_SMTP_HOST`: SMTP host
`X_VIVO_API_SMTP_PORT`: SMTP port
`X_VIVO_API_SMTP_USERNAME`: SMTP username
`X_VIVO_API_SMTP_PASSWORD`: SMTP password
`X_VIVO_API_OAUTH_AUTHORIZE`: url of api for tokeninfo. If token info is returned and promise is resolved, email will be sent.

## Example of using api in terminal

curl  -H 'Content-Type: application/json' -H 'Authorization: Bearer ya29.Gl0HBrMj9jI3Bic00Jb6fsUizrsmEnICguV4nbqyPBCxcw4sn21MYXZ0Wd8vjMw9Zu4ddGJuiFHUBudfBn8Dv1ZoFEsOZPc0wKBAU6bkGfkHPEf_87coFjvCV9XbCWw' -XPUT http://localhost:3082/api/mail/booking --data '{"salutation":"Lieber zedd,", "zeitraum":"October, 2019 - November, 2019", "recipients":"zedd.malam@gmail.com"}'

## Build

```
docker-compose build
```

## Run

```
docker-compose run
```

## Authorization

This application uses Google oauth2 authorization which can be passed in HTTP headers: `Authorization: Bearer <JWT>`
You can use [google-oauth](https://github.com/zeddmalam/google-oauth) project for authorization example