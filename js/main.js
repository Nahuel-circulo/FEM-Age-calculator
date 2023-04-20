const dayRegEx = /^(0?[1-9]|[1-2][0-9]|3[0-1])$/;
const monthRegEx = /^(0?[1-9]|1[0-2])$/;
const yearRegEx = /^(19|20)\d{2}$/;

const emptyError = "This field is required";
const rangeError = "Must be a valid date";

function setError(field, errorType) {
  field.children[0].style.color = "red";
  field.children[1].style.borderColor = "red";

  if (errorType === "empty") {
    field.children[2].textContent = emptyError;
  } else {
    field.children[2].textContent = rangeError;
  }
}

function resetError(field) {
  field.children[0].style.color = "hsl(0, 0%, 8%)";
  field.children[1].style.borderColor = "hsl(0, 0%, 8%)";
  field.children[2].textContent = "";
}

document.querySelector("form").addEventListener("submit", function (evt) {
  evt.preventDefault();

  let dayElement = document.getElementById("day");
  let monthElement = document.getElementById("month");
  let yearElement = document.getElementById("year");

  let dayResult = document.getElementById("dayResult");
  let monthResult = document.getElementById("monthResult");
  let yearResult = document.getElementById("yearResult");

  dayResult.textContent = "--";

  monthResult.textContent = "--";

  yearResult.textContent = "--";

  let dayValue = dayElement.children[1].value;
  let monthValue = monthElement.children[1].value;
  let yearValue = yearElement.children[1].value;

  let dayFlag = false;
  let monthFlag = false;
  let yearFlag = false;

  if (dayValue) {
    if (dayRegEx.test(dayValue)) {
      resetError(dayElement);
      dayFlag = true;
    } else {
      dayFlag = false;
      setError(dayElement, "range");
    }
  } else {
    dayFlag = false;
    setError(dayElement, "empty");
  }

  if (monthValue) {
    if (monthRegEx.test(monthValue)) {
      monthFlag = true;
      resetError(monthElement);
    } else {
      monthFlag = false;
      setError(monthElement, "range");
    }
  } else {
    monthFlag = false;
    setError(monthElement, "empty");
  }

  if (yearValue) {
    if (yearRegEx.test(yearValue)) {
      yearFlag = true;
      resetError(yearElement);
    } else {
      yearFlag = false;
      setError(yearElement, "range");
    }
  } else {
    yearFlag = false;
    setError(yearElement, "empty");
  }

  if (dayFlag && monthFlag && yearFlag) {
    let fullDate = new Date(`${monthValue}/${dayValue}/${yearValue}`);

    if (
      fullDate.getDate() === +dayValue &&
      fullDate.getMonth() === +monthValue - 1 &&
      fullDate.getFullYear() === +yearValue
    ) {
      const { age, month, day } = calculateAge(fullDate.getTime());
      dayResult.textContent = age;
      monthResult.textContent = month;
      yearResult.textContent = day;
    } else {
      setError(yearElement, "range");
      setError(monthElement, "range");
      setError(dayElement, "range");
    }
  }
});

function calculateAge(dateOfBirth) {
  let today = new Date();
  let birthDate = new Date(dateOfBirth);

  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return {
    age,
    month: 12 - Math.abs(m),
    day:  Math.abs(today.getDate() - birthDate.getDate()),
  };
}
