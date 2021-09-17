const loadFile = (event) => {
  let output = document.getElementById("output");
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = () => {
    URL.revokeObjectURL(output.src);
  };
};
