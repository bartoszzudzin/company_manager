const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const docxConverter = require("docx-pdf");

const fs = require("fs");
const path = require("path");

function generator(app) {
  app.post("/generate-offer", async (req, res) => {
    // Load the docx file as binary content
    const content = fs.readFileSync(
      path.resolve(__dirname, "./docs/offer_template.docx"),
      "binary"
    );

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });
    doc.render({
      data: req.body.date,
      nazwa_firmy: req.body.companyName,
      kod_pocztowy: req.body.postalCode,
      miejscowosc: req.body.city,
      ulica: req.body.street,
      opis: req.body.description,
      element1: req.body.el1,
      element2: req.body.el2,
      element3: req.body.el3,
      element4: req.body.el4,
      element5: req.body.el5,
      element6: req.body.el6,
      element7: req.body.el7,
      element8: req.body.el8,
      element9: req.body.el9,
      element10: req.body.el10,
      informacja: req.body.comments,
    });

    const buf = doc.getZip().generate({
      type: "nodebuffer",
      // compression: DEFLATE adds a compression step.
      // For a 50MB output document, expect 500ms additional CPU time
      compression: "DEFLATE",
    });

    const docxPath = path.resolve(
        __dirname,
        `company_manager_${req.body.companyName}_${req.body.date}.docx`
    );

    // Zapisz plik do docxPath
    fs.writeFileSync(docxPath, buf);

    // Wysyłanie pliku do przeglądarki jako odpowiedź
    res.download(docxPath, (err) => {
      if (err) {
        // Obsłuż ewentualne błędy
        console.error("Błąd podczas pobierania pliku:", err);
      } else {
        // Usuń plik po pomyślnym pobraniu
        fs.unlinkSync(docxPath);
      }
    });
  });
}

module.exports = generator;
