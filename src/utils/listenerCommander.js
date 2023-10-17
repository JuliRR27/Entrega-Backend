process.on("exit", (code) => {
  console.log("Antes de salir del proceso", code);
});

process.on("uncaughtException", (exception) => {
  console.log("Excepciones no controladas", exception);
});
