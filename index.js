let userdata = document.getElementById("user-data");

const getdata = () => {
  let displaydataget = localStorage.getItem("user_entries");

  if (displaydataget) {
    displaydataget = JSON.parse(displaydataget);
  } else {
    displaydataget = [];
  }

  return displaydataget;
};

let user_entries = getdata();

const displaydata = () => {
  const displaydataget = getdata();

  const tabledata = displaydataget
    .map((entrydata) => {
      const namefield = `<td >${entrydata.name}</td>`;
      const emailfield = `<td >${entrydata.email}</td>`;
      const passwordfield = `<td >${entrydata.password}</td>`;
      const dobfield = `<td >${entrydata.dob}</td>`;
      const tcfield = `<td >${entrydata.tc}</td>`;

      const rowfield = `<tr> ${namefield} ${emailfield} ${passwordfield} ${dobfield} ${tcfield} </tr>`;

      return rowfield;
    })
    .join("\n");

  const table = `<table  class = "table-auto w-full" ><tr>
  
  <th >Name</th>
  <th >Email</th>
  <th >Password</th>
  <th >Dob</th>
  <th >Accepted terms?</th>

  </tr> ${tabledata} 
  </table>`;

  let details = document.getElementById("output");
  details.innerHTML = table;
};

const saveuserdata = (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  const dob = document.getElementById("dob").value;

  const tc = document.getElementById("tc").checked;

  const entry = {
    name,
    email,
    password,
    dob,
    tc,
  };

  user_entries.push(entry);

  localStorage.setItem("user_entries", JSON.stringify(user_entries));

  displaydata();
};

userdata.addEventListener("submit", saveuserdata);
displaydata();

const email = document.getElementById("email");

email.addEventListener("input", () => valid(email));

const sub = document.getElementById("sbutton");

sub.addEventListener("click", () => valid(email));

function valid(element) {
  const checkemail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  if (email.value == "" || !checkemail.test(email.value)) {
    element.setCustomValidity("The Email is not correct ");
    element.reportValidity();
  } else {
    element.setCustomValidity("");
  }
}

const dob = document.getElementById("dob");

dob.addEventListener("input", () => validatedob(dob));

sub.addEventListener("click", () => validatedob(dob));

function validatedob(element) {
  const newtoday = new Date();
  const dobDatenew = new Date(dob.value);
  const ageinms = newtoday - dobDatenew;
  const agey = ageinms / 1000 / 60 / 60 / 24 / 365.25;

  if (agey < 18 || agey > 55) {
    element.setCustomValidity(
      "Age should be Greater than 18 and less than 55 "
    );
    element.reportValidity();
  } else {
    element.setCustomValidity("");
  }
}
