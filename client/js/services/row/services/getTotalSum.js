export default async (totalSum) => {
  var td = document.createElement("td");
  td.style.color = "red";
  td.style.fontSize = "20px";
  td.append(totalSum || "");

  return td;
};
