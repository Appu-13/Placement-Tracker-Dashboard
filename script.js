let companies = JSON.parse(localStorage.getItem("companies")) || [];

function saveToLocalStorage() {
  localStorage.setItem("companies", JSON.stringify(companies));
}

function addCompany() {
  const name = document.getElementById("companyName").value;
  const status = document.getElementById("status").value;
  const pkg = document.getElementById("package").value;
  const notes = document.getElementById("notes").value;

  if (name === "") {
    alert("Company name required");
    return;
  }

  const company = {
    id: Date.now(),
    name,
    status,
    package: pkg,
    notes,
  };

  companies.push(company);
  saveToLocalStorage();
  displayCompanies();
  clearForm();
}

function clearForm() {
  document.getElementById("companyName").value = "";
  document.getElementById("package").value = "";
  document.getElementById("notes").value = "";
}

function deleteCompany(id) {
  companies = companies.filter((c) => c.id !== id);
  saveToLocalStorage();
  displayCompanies();
}

function displayCompanies() {
  const list = document.getElementById("companyList");
  list.innerHTML = "";

  companies.forEach((company) => {
    const div = document.createElement("div");
    div.className = "company-card";

    div.innerHTML = `
      <strong>${company.name}</strong><br>
      Status: ${company.status}<br>
      Package: ${company.package || "-"} LPA<br>
      Notes: ${company.notes || "-"}<br>
      <button onclick="deleteCompany(${company.id})">Delete</button>
    `;

    list.appendChild(div);
  });
}

function filterCompanies() {
  const filter = document.getElementById("filterStatus").value;
  const list = document.getElementById("companyList");
  list.innerHTML = "";

  const filtered =
    filter === "All" ? companies : companies.filter((c) => c.status === filter);

  filtered.forEach((company) => {
    const div = document.createElement("div");
    div.className = "company-card";

    div.innerHTML = `
      <strong>${company.name}</strong><br>
      Status: ${company.status}<br>
      Package: ${company.package || "-"} LPA<br>
      Notes: ${company.notes || "-"}<br>
      <button onclick="deleteCompany(${company.id})">Delete</button>
    `;

    list.appendChild(div);
  });
}

displayCompanies();
