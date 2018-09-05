const keys = require("../../Config/keys");
module.exports = (user) => `<html>
            <body> 
            <div style="text-align: center;">
                <h3>Click link below to verify your account</h3>
                <p></p>
                <div>
                    <a href="${keys.redirectClickUrl}/api/surveys/${user.id}/${
	user.emailVerifier
}">Yes</a>    
                    </div>            
                 </div>
            </body>
         </html>`;
