$(document).ready(() => {

    const inputEmail = document.querySelector("#email");
    const inputPhone = document.querySelector("#phone");
    const inputFile = document.querySelector("#file");
    const inputNumber = document.querySelector("#number");
    const inputReg1 = document.querySelector("#agree1");
    const inputReg2 = document.querySelector("#agree2");
    const message = document.querySelector(".error-message");

    $("#file").change((e) => {
            let files = event.target.files;
            let height;
            let width;
            let _URL = window.URL || window.webkitURL;
            for (let i = 0; i < files.length; i++) {
                let img = new Image();
                img.onload = function () {
                    height = img.height;
                    width = img.width;
                    if (width > 1000 || height > 1000) {
                        $("#image-error").html("Plik przekracza wymiary 1000x1000px")
                    } else {
                        if (inputFile.files && inputFile.files[0]) {
                            let reader = new FileReader();
                            reader.onload = function (e) {
                                document.getElementById(
                                    'image-preview').innerHTML =
                                    '<img src="' + e.target.result
                                    + '"/>';
                            };
                            $("#image-error").html("");
                            reader.readAsDataURL(inputFile.files[0]);
                        }
                    }
                };
                img.src = _URL.createObjectURL(files[i]);
            }
        }
    );

    const toBase64 = file => new Promise((resolve, reject) => {

    });

    $("#my-form").submit((e) => {
            e.preventDefault();

            function downloadCSV(csv, filename) {
                let csvFile;
                let downloadLink;
                csvFile = new Blob([csv], {type: "text/csv"});
                downloadLink = document.createElement("a");
                downloadLink.download = filename;
                downloadLink.href = window.URL.createObjectURL(csvFile);
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
                downloadLink.click();
            }

            function exportFormToCSV(filename) {
                var formData = $("#my-form").serializeArray();
                let csv = "data:text/csv;charset=utf-8,";

                formData.forEach(function (item) {
                    csv += item.value + ";";
                });

                const reader = new FileReader();

                reader.addEventListener("load", function () {
                    inputFile.src = reader.result;
                    csv += inputFile.src;

                    var encodedUri = encodeURI(csv);

                    var downloadLink = document.createElement("a");
                    downloadLink.setAttribute("download", "server.csv");
                    downloadLink.setAttribute("href", encodedUri);
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    downloadLink.remove();

                    window.location.reload();
                }, false);
                reader.readAsDataURL(inputFile.files[0]);
            }

            const formErrors = [];
            const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
            const regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            const fileSize = $('#file')[0].files[0].size;
            const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
            const allowedNumbers = /^[0-9]+$/;
            const numberLenght = inputNumber.value;

            if (!regEmail.test(inputEmail.value)) {
                formErrors.push("Wpisany email jest niepoprawny");
            }
            if (!regPhone.test(inputPhone.value)) {
                formErrors.push("Wpisany numer telefonu jest niepoprawny");
            }
            if (numberLenght.length < 4 || numberLenght.length > 6) {
                formErrors.push("Wpisany numer jest niepoprawny");
            }
            if (fileSize > 10000000) {
                formErrors.push("Wybrany plik przekracza rozmiar 10MB");
            }
            if (!allowedExtensions.exec(inputFile.value)) {
                formErrors.push('Niewłaściwy rodzaj pliku');
            }
            if (!inputReg1.checked) {
                formErrors.push("Zapoznaj się z regulaminem");
            }
            if (!allowedNumbers.test(inputNumber.value)) {
                formErrors.push("Wpisana liczba jest nieprawidłowa");
            }
            if (!inputReg2.checked) {
                formErrors.push("Musisz zaakceptować warunki");
            }

            if (formErrors.length === 0) {
                $.ajax({
                    url: "server.csv",
                    result: $("#my-form").serialize(),
                    success: function (result) {
                        message.innerHTML = "";
                        $(".success-message").html('Formularz został wysłany');
                    }
                });
                exportFormToCSV('form.csv')

            }
            else {
                message.innerHTML = "";
                for (const err of formErrors) {
                    const p = document.createElement('p');
                    p.innerText = err;
                    message.appendChild(p);
                }
            }
        }
    );
});

