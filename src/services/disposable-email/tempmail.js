import axios from "axios";
import dotenv from "dotenv";
import logger from "../../utils/logger.js";
dotenv.config();

class Tempmail {
  constructor() {
    this.BASE_URL = "https://privatix-temp-mail-v1.p.rapidapi.com";
  }

  async listDomain() {
    try {
      const response = await axios.get(`${this.BASE_URL}/request/domains/`, {
        headers: {
          "x-rapidapi-key": process.env.TEMPMAIL_API_KEY,
          "x-rapidapi-host": "privatix-temp-mail-v1.p.rapidapi.com",
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(
          `TempMail API request failed with status ${response.status}: ${response.statusText}. Error details: ${err.message}`,
        );
      }
    } catch (err) {
      logger.error(err.message);
      throw new Error(err);
    }
  }

  async listEmail(hash) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/request/mail/id/${hash}/`,
        {
          headers: {
            "x-rapidapi-key": process.env.TEMPMAIL_API_KEY,
            "x-rapidapi-host": "privatix-temp-mail-v1.p.rapidapi.com",
          },
        },
      );
      if (response.status === 200) {
        // console.log(response.data);
        return response.data;
      } else {
        throw new Error(
          `TempMail API request failed with status ${response.status}: ${response.statusText}. Error details: ${err.message}`,
        );
      }
    } catch (err) {
      logger.error(err.message);
      throw new Error(err);
    }
  }

  async getMessage(messageId) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/request/one_mail/id/${messageId}`,
        {
          headers: {
            "x-rapidapi-key": process.env.TEMPMAIL_API_KEY,
            "x-rapidapi-host": "privatix-temp-mail-v1.p.rapidapi.com",
          },
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(
          `TempMail API request failed with status ${response.status}: ${response.statusText}. Error details: ${err.message}`,
        );
      }
    } catch (err) {
      logger.error(err.message);
      throw new Error(err);
    }
  }

  async deleteMessage(messageId) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/request/delete/id/${messageId}`,
        {
          headers: {
            "x-rapidapi-key": process.env.TEMPMAIL_API_KEY,
            "x-rapidapi-host": "privatix-temp-mail-v1.p.rapidapi.com",
          },
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(
          `TempMail API request failed with status ${response.status}: ${response.statusText}. Error details: ${err.message}`,
        );
      }
    } catch (err) {
      logger.error(err.message);
      throw new Error(err);
    }
  }
}

export default new Tempmail();
