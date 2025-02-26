const form = document.getElementById('form')
const required = document.querySelectorAll('.required')

const inputs = document.querySelectorAll(".input, .typeCheck");

const inputRadio = document.querySelectorAll('.radio')
const inputGeneralRadio = document.getElementById('radiogeneral')
const inputSupportRadio = document.getElementById('radiosupport') 
const radioDiv = document.querySelectorAll('.radio-option')

required.forEach(msg => {
    msg.classList.add('hide')
})

inputRadio.forEach(radio => {
    radio.addEventListener('change', () => {
        if(inputGeneralRadio.checked){
            radioDiv[0].classList.add('radio-style')
            radioDiv[0].classList.add('active')
            radioDiv[1].classList.remove('radio-style')
            radioDiv[1].classList.remove('active')
        } else if(inputSupportRadio.checked){
            radioDiv[1].classList.add('radio-style')
            radioDiv[1].classList.add('active')
            radioDiv[0].classList.remove('radio-style')
            radioDiv[0].classList.remove('active')
        }
    })
})

document.addEventListener("DOMContentLoaded", function () {

    inputs.forEach(input => {
        if (input.type === "radio") {
            input.addEventListener("change", () => {
                const radioGroupError = document.querySelector(".errCheck");
                if (radioGroupError) {
                    radioGroupError.style.display = "none";
                }
            });
        } else if (input.type === "checkbox") {
            input.addEventListener("change", () => {
                const checkboxError = input.closest(".consent")?.querySelector(".errCheck");
                if (checkboxError) {
                    checkboxError.style.display = "none";
                }
            });
        } else {
            input.addEventListener("input", () => {
                const errorMessage = input.nextElementSibling;
                if (errorMessage.classList.contains("err")) {
                    errorMessage.style.display = "none";
                }

                input.classList.remove("error");
                input.classList.add("active");
            });
        }
    });
});

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const firstName = document.getElementById('name').value.trim()
    const lastName = document.getElementById('lastname').value.trim()
    const email = document.getElementById('email').value.trim()
    const message = document.getElementById('textarea').value.trim()
    const consent = document.getElementById('consent').checked


    // FIRST NAME VALIDATION
    if(firstName === '') {
        required[0].classList.remove('hide')
        document.querySelector('#name').classList.add('error')
    } else {
        required[0].classList.add('hide')
        document.querySelector('#name').classList.add('active')
    }

    // LAST NAME VALIDATION
    if(lastName === '') {
        required[1].classList.remove('hide')
        document.querySelector('#lastname').classList.add('error')
    } else {
        required[1].classList.add('hide')
        document.querySelector('#lastname').classList.add('active')
    }

    // EMAIL VALIDATION
    if(email === '') {
        required[2].classList.remove('hide')
        document.querySelector('#email').classList.add('error')
    } else {
        required[2].classList.add('hide')
        document.querySelector('#email').classList.add('active')
    }

    // QUERY TYPE VALIDATION
    if(inputRadio[0].checked === false && inputRadio[1].checked === false) {
        required[3].classList.remove('hide')
    } else {
        required[3].classList.add('hide')
    }

    // MESSAGE VALIDATION
    if(message === '') {
        required[4].classList.remove('hide')
        document.querySelector('#textarea').classList.add('error')
    } else {
        required[4].classList.add('hide')
        document.querySelector('#textarea').classList.add('active')
    }

    // CONSENT VALIDATION
    if(!consent) {
        required[5].classList.remove('hide')
    } else {
        required[5].classList.add('hide')
    }

    // SUCCESS MESSAGE

    let isValid = true

    inputs.forEach(input => {
        if(input.type === "checkbox" && !input.checked) {
            isValid = false
        } else if (input.type !== "checkbox" && input.type !== "radio" && input.value.trim() === '') {
            isValid = false
        }
    })

    // RADIO SUCCESS MESSAGE VALIDATION
    if(!inputGeneralRadio.checked && !inputSupportRadio.checked) {
        isValid = false
    }

    //SUCCESS MESSAGE FINAL
    function showSuccessMessage(){
        let succcessMessage = document.getElementById('success-div')

        succcessMessage.classList.add('animation')
        setTimeout(() => {
            succcessMessage.classList.remove('animation')
        }, 4000);
    }

    if(isValid) {
        showSuccessMessage()
    }
})







