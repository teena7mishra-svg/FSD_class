const form = document.getElementById("studentForm");
const messageBox = document.getElementById("messageBox");
const studentList = document.getElementById("studentList");

let students = [];

function showMessage(text, type = "success") {
    messageBox.textContent = text;
    messageBox.className = `message ${type}`;
}

function clearErrors() {
    document.querySelectorAll(".error-text").forEach(el => el.textContent = "");
    document.querySelectorAll("input, select").forEach(el => {
        el.classList.remove("input-invalid");
    });
}

function validateField(field, value) {

    switch (field) {

        case "name":
            if (!value.trim() || value.trim().length < 3 || !/^[A-Za-z\s]+$/.test(value)) {
                return "Name must contain at least 3 letters.";
            }
            break;

        case "email":
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return "Invalid Email";
            }
            break;

        case "mobile":
            if (!/^\d{10}$/.test(value)) {
                return "Mobile must contain 10 digits";
            }
            break;

        case "password":
            if (value.length < 6) {
                return "Password must be at least 6 characters";
            }
            break;

        case "branch":
            if (!value) {
                return "Please select branch";
            }
            break;
    }

    return "";
}

function renderStudents() {

    if (students.length === 0) {
        studentList.innerHTML = "<li>No students registered yet.</li>";
        return;
    }

    studentList.innerHTML = "";

    students.forEach(student => {

        studentList.innerHTML += `
            <li>
                <strong>${student.name}</strong> -
                ${student.email} |
                ${student.mobile} |
                ${student.branch}
            </li>
        `;

    });

}

async function loadStudents() {

    try {

        const response = await fetch("/students");

        const data = await response.json();

        students = data.students || [];

        renderStudents();

    } catch (err) {

        console.error(err);

    }

}

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    clearErrors();

    const formData = new FormData(form);

    const student = Object.fromEntries(formData.entries());

    let valid = true;

    ["name","email","mobile","password","branch"].forEach(field => {

        const error = validateField(field, student[field]);

        if (error) {

            valid = false;

            document.getElementById(field + "Error").textContent = error;

            document.getElementById(field).classList.add("input-invalid");

        }

    });

    if (!valid) {

        showMessage("Registration Failed", "error");

        return;

    }

    try {

        const response = await fetch("/register", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(student)

        });

        const result = await response.json();

        showMessage(result.message, "success");

        form.reset();

        loadStudents();

    }
    catch (err) {

        console.error(err);

        showMessage("Registration Failed", "error");

    }

});

window.onload = loadStudents;

   
