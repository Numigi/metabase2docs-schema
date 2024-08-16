const fs = require("fs");
const ajv = require("ajv");

// Read the schema from a file
const schemaPath = "./schema.json";
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));

// Create an AJV instance
const validator = new ajv();

// Compile the schema
const validate = validator.compile(schema);

// Read all JSON files in the 'data' directory
fs.readdir("./data", (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  files.forEach((file) => {
    // Skip files that are not JSON
    if (!file.endsWith(".json")) {
      return;
    }

    // Read the JSON data from the file
    const filePath = `./data/${file}`;
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Validate the JSON data against the schema
    const isValid = validate(jsonData);

    // Check if the validation was successful and print results
    if (isValid) {
      console.log(`${file} is valid.`);
    } else {
      console.error(
        `${file} is invalid:\\n${validate.errors
          .map((error) => error.message)
          .join("\\n")}`
      );
    }
  });
});
