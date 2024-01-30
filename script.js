// Функция для получения JSON
async function getFormData(path) {
    const response = await fetch(path);
    return await response.json();
}
function generateFieldHTML(field) {
    let fieldHTML = '';

    if (field.attrs.type === 'text' || field.attrs.type === 'textarea') {
        fieldHTML += `<label for="${field.attrs.name}">${field.label}</label>`;
        if (field.attrs.type === 'text') {
            fieldHTML += `<input type="text" name="${field.attrs.name}">`;
        } else if (field.attrs.type === 'textarea') {
            fieldHTML += `<textarea name="${field.attrs.name}"></textarea>`;
        }
    } else if (field.attrs.type === 'select') {
        fieldHTML += `<label for="${field.attrs.name}">${field.label}</label>`;
        fieldHTML += `<select name="${field.attrs.name}">`;
        for (const variant of field.attrs.variants) {
            fieldHTML += `<option value="${variant.value}">${variant.label}</option>`;
        }
        fieldHTML += `</select>`;
    } else if (field.attrs.type === 'radio') {
        fieldHTML += `<label>${field.label}: </label>`;


        for (const variant of field.attrs.variants) {
            fieldHTML += `<input type="radio" name="${field.attrs.name}" value="${variant.value}"> ${variant.label}`;
        }

    } else if (field.attrs.type === 'checkbox') {
        fieldHTML += `<fieldset>`;
        fieldHTML += `<legend>${field.label}</legend>`;
        for (const variant of field.attrs.variants) {
            fieldHTML += `<label>`;
            fieldHTML += `<input type="checkbox" name="${field.attrs.name}" value="${variant.value}">`;
            fieldHTML += `${variant.label}`;
            fieldHTML += `</label>`;
        }
        fieldHTML += `</fieldset>`;
    }

    return fieldHTML;
}

// Функция для генерации HTML-кода кнопок формы
function generateButtonsHTML(buttons) {
    let buttonsHTML = '';

    for (const button of buttons) {
        buttonsHTML += `<button type="submit">${button}</button>`;
    }

    return buttonsHTML;
}

// Функция для генерации формы на основе JSON данных
function generateForm(form) {

    // Вставляем заголовок формы
    const formTitleElement = document.getElementById('formTitle');
    formTitleElement.textContent = form.title;

    // Вставляем описание формы
    const formDescriptionElement = document.getElementById('formDescription');
    if (form.description) {
        console.log(form.description)
        formDescriptionElement.textContent = form.description;
    }


    // Вставляем поля формы
    const formFieldsElement = document.getElementById('formFields');
    let formFieldsHTML = '';

    for (const field of form.fields) {
        formFieldsHTML += generateFieldHTML(field);
    }

    formFieldsElement.innerHTML = formFieldsHTML;

    // Вставляем кнопки формы
    const formButtonsElement = document.getElementById('formButtons');
    const formButtonsHTML = generateButtonsHTML(form.buttons);
    formButtonsElement.innerHTML = formButtonsHTML;


}

document.querySelectorAll('input[name="test"]').forEach((radio) => {
    radio.addEventListener("change", async function() {
        const selectedTest = this.value;

        switch (this.value) {
            case "formOne":
                const form1Data = await getFormData("data/form-test-1.json");
                generateForm(form1Data);
                break;
            case "formTwo":
                const form2Data = await getFormData("data/form-test-2.json");
                generateForm(form2Data);
                break;
            case "formThree":
                const form3Data = await getFormData("data/form-test-3.json");
                generateForm(form3Data);
                break;
        }
    });
});

// Получаем JSON данные и генерируем форму
getFormData("data/form-test-1.json").then(formData2 => {
    generateForm(formData2);
});
getFormData("data/form-test-2.json").then(formData2 => {
    generateForm(formData2)
});
getFormData("data/form-test-3.json").then(formData2 => {
    generateForm(formData2)
});