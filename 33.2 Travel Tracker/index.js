import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  database: "world",
  user: "postgres",
  password: "demo123",
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

let countries = [];
const selectText = "SELECT country_code FROM visited_countries";
const selectAllCountryCodes = "SELECT country_code FROM countries";
const insertText = "INSERT INTO visited_countries (country_code) VALUES ($1)";

async function getDatabaseInfo(queryText) {
  const client = await pool.connect();
  const result = await client.query(queryText);
  client.release();
  return result;
}

function populateCountryArray(queryResult) {
  countries = [];
  queryResult.rows.forEach((item) => {
    countries.push(item.country_code);
  });
  console.log(countries);
  console.log("The length of all countries: " + countries.length);
}

async function checkAlreadyVisited(newCountryInput) {
  const result = await getDatabaseInfo(selectText);
  populateCountryArray(result);
  return countries.indexOf(newCountryInput) > -1;
}

async function checkCodeValidity(newCountryInput) {
  const result = await getDatabaseInfo(selectAllCountryCodes);
  populateCountryArray(result);
  return countries.indexOf(newCountryInput) > -1;
}

async function renderHomePage(res, keyValuePairs) {
  res.render("index.ejs", keyValuePairs);
}

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET home page
app.get("/", async (req, res) => {
  const result = await getDatabaseInfo(selectText);
  populateCountryArray(result);
  renderHomePage(res, { countries: countries, total: countries.length });
});

// INSERT new country
app.post("/add", async (req, res) => {
  const newCountryInput = req.body["country"].trim().toUpperCase();
  console.log("newCountryInput: " + newCountryInput);

  // Check if the country code is valid or not
  const isValidCode = await checkCodeValidity(newCountryInput);
  if (isValidCode === false) {
    const result = await getDatabaseInfo(selectText);
    populateCountryArray(result);
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country code does not exist, try again.",
    });
  } else {
    // Check if the country has been marked or not
    const hasBeenMarked = await checkAlreadyVisited(newCountryInput);
    if (hasBeenMarked) {
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country code alreay exists, try again.",
      });
    } else {
      // OK to insert
      const values = [newCountryInput];
      const client = await pool.connect();
      await client.query(insertText, values);
      client.release();
      res.redirect("/");
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
