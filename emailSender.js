import ElasticEmail from "@elasticemail/elasticemail-client";
import "dotenv/config";

const defaultClient = ElasticEmail.ApiClient.instance;

const { ELASTIC_EMAIL_FROM, ELASTIC_EMAIL_API_KEY } = process.env;

const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTIC_EMAIL_API_KEY;

const api = new ElasticEmail.EmailsApi();

const email = ElasticEmail.EmailMessageData.constructFromObject({
  Recipients: [new ElasticEmail.EmailRecipient("bifitil940@armablog.com")],
  Content: {
    Body: [
      ElasticEmail.BodyPart.constructFromObject({
        ContentType: "HTML",
        Content: "<strong>Test email</strong>",
      }),
    ],
    Subject: "Test email",
    From: ELASTIC_EMAIL_FROM,
  },
});

const callback = function (error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log("API called successfully.");
  }
};
api.emailsPost(email, callback);
