import express from 'express';
import nodemailer from 'nodemailer';
import request from 'superagent';
import bodyParser from 'body-parser';

const app = express();

const { 
	X_VIVO_API_SMTP_HOST,
	X_VIVO_API_SMTP_PORT,
	X_VIVO_API_SMTP_USERNAME,
	X_VIVO_API_SMTP_PASSWORD,
	X_VIVO_API_OAUTH_AUTHORIZE
} = process.env;

app.use(bodyParser.json());

app.put('/api/mail/booking', function(req, res){
	let transporter = nodemailer.createTransport({
        host: X_VIVO_API_SMTP_HOST,
        port: X_VIVO_API_SMTP_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
            user: X_VIVO_API_SMTP_USERNAME,
            pass: X_VIVO_API_SMTP_PASSWORD
        }
	});
	
	const { salutation, zeitraum, recipients} = req.body;

    let mailOptions = {
        from: '"X-VIVO Booking" <booking@x-vivo.de>',
        to: recipients,
        subject: 'Post Industrial Alternative Metal band aus Berlin',
        //text: 'Hello world?',
		html: `
		<table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0; background-color:#151515; width:600px;">
		<tr>
				<td><a href="https://www.x-vivo.de" style="text-decoration: none;" target="_blank"><table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0; background-color: #303030; width:100%; text-align:center;"><tr>
						<td style="width:44px; text-align:center;"><img src="https://www.x-vivo.de/wp-content/uploads/2017/05/xvivo_logo_menu.png"/></td>
						<td style="color: #0099cc; font-family: 'Open Sans', sans-serif; font-size: 30px; text-align:left;">X-VIVO</td>
						<td style="color: #0099cc; font-family: 'Open Sans', sans-serif; font-size: 18px; text-align:right; padding-right: 20px;">Industrial Metal Band aus Berlin</td>
				</tr></table></a></td>
		</tr>
		<tr>
			<td style="color:#cccccc; padding:20px 20px 0 20px; font-family: 'Open Sans', sans-serif;"><b style="color:#dddddd">${salutation}</b></td>
		</tr>
		<tr>
			<td style="color:#cccccc; padding:20px 20px 0 20px; font-family: 'Open Sans', sans-serif;">Hier schreibt Kai und ich bin für das Booking bei <b style="color:#dddddd">X-VIVO</b> zuständig.</td>
		</tr>
		<tr>
			<td style="color:#cccccc; padding:20px 20px 0 20px; font-family: 'Open Sans', sans-serif;">X-VIVO ist eine Post Industrial /
			Alternative Metal Band aus Berlin und hat am 29.04.2017 ihr neues Konzeptalbum <b>Petrichor</b>
			veröffentlicht.</td>
		</tr>
		<tr>
			<td style="color:#cccccc; padding:20px 20px 0 20px; font-family: 'Open Sans', sans-serif;">Ich frage euch an, weil ich gerade die Tour zum aktuellen Album plane und wir gerne
			im <b style="color:#dddddd">Zeitraum ${zeitraum}</b> ein Konzert bei euch spielen wollen</td>
		</tr>
		<tr>
			<td style="color:#cccccc; padding:20px 20px 0 20px; font-family: 'Open Sans', sans-serif;">Bei Bedarf können wir noch eine weitere Band
			aus Berlin mitbringen.</td>
		</tr>
		<tr>
			<td style="color:#ffffff; padding:20px 20px 0 20px;"><table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0; width:100%;"><tr>
				<td><a style="color: #0099cc; font-family: 'Open Sans', sans-serif;" href="https://youtu.be/OdlxXHIBGnM"><div style=" margin: 10px; padding:5px; border: #ffffff solid 1px;; text-align:center; background-color:#303030;">Musikvideo</div></a></td>
				<td><a style="color: #0099cc; font-family: 'Open Sans', sans-serif;" href="https://youtu.be/jeIVHxdNpE0"><div style=" margin: 10px; padding:5px; border: #ffffff solid 1px;; text-align:center; background-color:#303030;">Liveausschnitte</a></td>
				<td><a style="color: #0099cc; font-family: 'Open Sans', sans-serif;" href="http://www.x-vivo.de/press-kit/"><div style=" margin: 10px; padding:5px; border: #ffffff solid 1px;; text-align:center; background-color:#303030;">Pressemappe</div></a></td>
			</tr></table></td>
		</tr>
		<tr>
			<td style="color:#cccccc; padding:20px 20px 0 20px; font-family: 'Open Sans', sans-serif;">Ich freue mich auf deine Rückmeldung!</td>
		</tr>
		<tr>
			<td style="color:#cccccc; padding:20px 20px 20px 20px; font-family: 'Open Sans', sans-serif;">
				Viele Grüße,<br/>
				Kai  Lietzau | X-VIVO Booking<br/>
				Industrial / Alternative Metal from Berlin<br/>
				mail: <a style="color: #0099cc; font-family: 'Open Sans', sans-serif;" href="mailto:booking@x-vivo.de">booking@x-vivo.de</a><br/>
				web: <a style="color: #0099cc; font-family: 'Open Sans', sans-serif;" href="https://www.x-vivo.de">www.x-vivo.de</a><br/>
				tel: <a style="color: #0099cc; font-family: 'Open Sans', sans-serif;" href="tel:+4917647670308">0176 47670308</a><br/>
			</td>
		</tr>
	</table>
	`
    };


	request
	.get(X_VIVO_API_OAUTH_AUTHORIZE)
	.set('Authorization', req.get('Authorization'))
	.then(authResp => {
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.log(error);
			}
			console.log('Message sent: %s', info.messageId);
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
			res.end();
		});
	}, error => {
		console.log(error);
		res.status(401).send(JSON.stringify(error));
	});
});
  
app.listen(3082);