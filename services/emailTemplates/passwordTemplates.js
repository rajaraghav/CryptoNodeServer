const keys = require("../../config/keys");
module.exports = (passwordResetToken) => `<html>
            <body> 
            <div style="margin-left: 20px;">
                <h2>Password change request from Binance.</h2>
                <p>Hello! We just noticed that you're having problems 
                using your Binance account. Click the link below to change
                your password and use services on Binance.</p>
                <div style="text-align: center;">
                    <a href="${
	keys.passwordResetRedirect
}/api/changepassword/${passwordResetToken}">Verify my account.</a>    
                    </div>   
                    <h2>Didn’t request this email?</h2>
                    <p>Oh oh! Your account might be compromised.
                    Please, contact support to ensure your safety.</p>
                            
                 </div>
            </body>
         </html>`;
