const keys = require("../config/keys");
var request = require("request");
module.exports = (req, res, next) => {
  if (
    typeof req.body.captchaToken === "undefined" ||
    req.body.captchaToken === "" ||
    req.body.captchaToken === null
  ) {
    return res
      .status(404)
      .json({ responseError: "Please select captcha first" });
  }
  const sec = keys.captchaSecretKey;
  const tok = req.body.captchaToken;
  const ip = req.body.remoteAddress;
  try {
    const verificationURL = "https://www.google.com/recaptcha/api/siteverify";
    request.post(
      {
        url: verificationURL,
        form: {
          secret: sec,
          response: tok
        }
      },
      (error, response, body) => {
        if (error) {
          return res.status(500).json({ responseError: "google server error" });
        }

        let resBody = JSON.parse(body);
        if (typeof resBody.success !== "undefined" && !resBody.success) {
          return res
            .status(403)
            .json({ responseError: "Failed captcha verification" });
        }
        next();
      }
    );
  } catch (err) {
    res.status(500).send(err);
  }
};
