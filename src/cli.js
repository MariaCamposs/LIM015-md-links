#!/usr/bin/env node

const { statistics, broken } = require("./stats.js");
const mdlinks = require("./index.js");

// Grab provided args.
const [, , ...args] = process.argv.slice(2);
const textHelp = "Intente con --stats, --validate o ambos (--stats --validate).\nEn caso de necesitar ayuda, intente con --help.";

if (args.length === 1) {
  mdlinks(args[0], { validate: false })
    .then((res) =>
      console.log(
        res
          .map((obj) => {
            return `\nfile: ${obj.file}\nhref: ${obj.href}\ntext: ${obj.text}`;
          })
          .join("\n\n")
      )
    )
    .catch((err) => console.log(err));
}

if (args.length === 2) {
  switch (args[1]) {
    case "--validate":
      mdlinks(args[0], { validate: true })
        .then((res) =>
          console.log(
            res
              .map((obj) => {
                if (obj.text.length > 50) {
                  return (newText = obj.text.slice(0, 50));
                }
                return `\nfile: ${obj.file}\nhref: ${obj.href}\nmessage: ${obj.message}\nstatus: ${obj.status}\ntext: ${obj.text}`;
              })
              .join("\n\n")
          )
        )
        .catch((err) => console.log(err));
      break;

    case "--stats":
      mdlinks(args[0], { validate: true })
        .then((res) => console.log(statistics(res)))
        .catch((err) => console.log(err));
      break;

    case "--help":
      const help = `
            ***************************************************************************************************************************************
            Las opciones son las siguientes:
            '--validate' para validar cada link dentro del archivo, obtiene ruta del archivo, href, mensaje de OK o FAIL, estado del link y texto.
            '--stats' para obtener el total de links y cantidad de links únicos.
            '--validate --stats' al ingresar ambas opciones obtiene el total de links, cantidad de links únicos y links rotos.
            ***************************************************************************************************************************************`;
      console.log(help);
      break;
    default:
      console.log(textHelp);
  }
}

if (args.length === 3) {
  if (
    (args[1] === "--stats" && args[2] === "--validate") ||
    (args[1] === "--validate" && args[2] === "--stats")
  ) {
    mdlinks(args[0], { validate: true })
      .then((res) => console.log(statistics(res) + broken(res)))
      .catch((err) => console.log(err));
  } else {
    console.log("El comando no es válido.");
  }
}
