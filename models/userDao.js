const { appDataSource } = require("./appDataSource");

const signup = async (name, email, hashedPassword, address, phoneNumber) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users (
        name,
        email,
        password,
        address,
        phone_number
        ) VALUES (?, ?, ?, ?, ?);
        `,
      [name, email, hashedPassword, address, phoneNumber]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getHashedPassword = async (email) => {
  try {
    const [{ hashedPassword }] = await appDataSource.query(
      `SELECT
        password AS hashedPassword
      FROM
        users
      WHERE
        email = ?;
      `,
      [email]
    );
    return hashedPassword;
  } catch (err) {
    console.log(err);
    const error = new Error("GET_HASHED_PASSWORD_FAILED");
    error.statusCode = 401;
    throw error;
  }
};

const getUserId = async (email) => {
  try {
    const [userId] = await appDataSource.query(
      `SELECT
        id AS userId
      FROM
        users
      WHERE
        email = ?;`,
      [email]
    );
    return userId;
  } catch (err) {
    console.log(err);
    const error = new Error("GET_USER_ID_FAILED");
    error.statusCode = 401;
    throw error;
  }
};

module.exports = {
  signup,
  getHashedPassword,
  getUserId,
};
