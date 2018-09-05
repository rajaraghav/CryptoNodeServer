const keys = require("../../config/keys");
module.exports = (userId, emailVerificationKey) => `<html>
            <body> 
            <div style="margin-left: 20px;">
                <h2>Confirm your email address on Binance</h2>
                <p>Hello! We just need to verify that this 
                is your email address,and then we’ll help 
                you trade and use services on Binance.</p>
                <div style="text-align: center;">
                    <a href="${
	keys.redirectClickUrl
}/api/verifyemail/${userId}/${emailVerificationKey}">Verify my account.</a>    
                    </div>   
                    <h2>Didn’t request this email?</h2>
                    <p>No worries! Your address may have 
                    been entered by mistake. If you ignore or delete 
                    this email, nothing further will happen.</p>
                            
                 </div>
            </body>
         </html>`;
