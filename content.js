// Preloader
let totalPreloaderTime = 0;
let preloaderStartTime; 
function showPreloader() {
    document.querySelector('.preloader').style.display = 'flex';
    preloaderStartTime = new Date();
}
function hidePreloader() {
    document.querySelector('.preloader').style.display = 'none';
    const currentTime = new Date();
    const elapsedTime = currentTime - preloaderStartTime;
    totalPreloaderTime += elapsedTime;
    console.log("Preloader elapsed time: " + elapsedTime + " milliseconds");
    console.log("Total preloader time: " + totalPreloaderTime + " milliseconds");
    localStorage.setItem('totalPreloaderTime', totalPreloaderTime);
    document.getElementById('elapsed').innerText =  totalPreloaderTime + " ms";
}

window.addEventListener('load', function() {
    showPreloader();
    setTimeout(function() {
        hidePreloader();
    }, 2710);
});

//Smooth Scolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const headerOffset = document.querySelector('header').offsetHeight
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const additionalOffset = -68; 
        const offsetPosition = elementPosition - headerOffset - additionalOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Image Display
function onscreen(){
    let fileType = file.type;
    console.log(fileType);
let validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp']
if(validExtensions.includes(fileType)){
    let reader = new FileReader();
    reader.onload = () => {
        let fileURL = reader.result;
        console.log(fileURL);
        let tag = `<img src="${fileURL}">`;
        area.innerHTML = tag;
    };
    reader.readAsDataURL(file);
}else{
    alert("that the file is in an unsupported format.");
    window.location.reload(true);
}
}

// Smooth Anchor Scrolling
document.addEventListener('DOMContentLoaded', function() {
    const navigationLinks = document.querySelectorAll('header ul li a');
    navigationLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            navigationLinks.forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            const targetId = this.getAttribute('href').substring(1);
            if (targetId === 'home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

//Browse Button
let button = document.querySelector('.button');
let input = document.querySelector('.openbutton');
let file;
button.onclick = () => { input.click(); };
input.addEventListener('change', function(){
    file = this.files[0];
    area.classList.add('active');
    onscreen();
});

//Enter Button
const enB = document.querySelector('.enter');
enB.addEventListener('click', function() {
    if(area.querySelector('img')) {
        const data = area.querySelector('img').src;
        localStorage.setItem('imageSrc', data); 
        window.location.href = 'result.html';
       // sendImageToBackend(data);  
    }else{
        alert("that there is no image to send.")
    }
});

//Backend
function sendImageToBackend(data){
    fetch('backend_endpoint_url',{        // Change backend_endpoint_url with the actual one. 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({image: data})
    })
    .then(response => {
        if(response.ok){
            alert("Image successfully submitted.");
            console.log('Success.');
        } else{
            alert("Process unsuccessful. Retry.");
            window.location.reload(true);
            console.error('Error during submission:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Submission Error:', error);
    });
}

//Accordion
const acc = document.getElementsByClassName('showBox');
function toggleSection(section) {
    section.classList.toggle('active');
}
function closeOthers(current) {
    for (let i = 0; i < acc.length; i++) {
        if (acc[i] !== current && acc[i].classList.contains('active')) {
            acc[i].classList.remove('active');
        }
    }
}
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', function() {
        const isActive = this.classList.contains('active');
        closeOthers(this);
        if (!isActive || (isActive && this.classList.contains('active'))) {
            toggleSection(this);
        }
    });
}

//Character Count
    document.addEventListener('DOMContentLoaded', function () {
        const textarea = document.getElementById('sendmessage');
        const charCountElement = document.getElementById('charCount');
        const maxLength = 400;
        function updateCharCount() {
            const currentLength = textarea.value.length;
            charCountElement.textContent = `${currentLength} / ${maxLength}`;
            if (currentLength > maxLength) {
                textarea.value = textarea.value.substring(0, maxLength);
                charCountElement.textContent = `${maxLength} / ${maxLength}`;
            }
        }
        textarea.addEventListener('input', updateCharCount);
        updateCharCount();
    });

//Icon colour toggle
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('#formname, #formemail, #formphonenumber, #sendmessage');
    function toggleIconActiveState(inputElement, isActive) {
        let iconClass;
        switch (inputElement.id) {
            case 'formname':
                iconClass = '.ri-user-fill';
                break;
            case 'formemail':
                iconClass = '.ri-at-fill';
                break;
            case 'formphonenumber':
                iconClass = '.ri-hashtag';
                break;
            case 'sendmessage':
                iconClass = '.ri-quill-pen-fill';
                break;
            default:
                return; // No icon found for this input
        }
        const icon = document.querySelector(iconClass);
        if (isActive) {
            icon.classList.add('active');
        } else {
            icon.classList.remove('active');
        }
    }
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            toggleIconActiveState(this, true);
        });
        input.addEventListener('blur', function() {
            toggleIconActiveState(this, false);
        });
    });
});

//E-Mail ID Validation
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('formemail');
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    emailInput.addEventListener('blur', function() {
        const isValid = validateEmail(this.value);
        if (!isValid && this.value) {
            alert('that the email address is invalid.');
            this.value = ''; //Reset the input-field
        }
    });
});

var teleinput = document.querySelector("#formphonenumber");
window.intlTelInput(teleinput, {});

// Allowing numbers only and blocking zero at the first position 
document.getElementById('formphonenumber').addEventListener('keydown', function(event) {
    var keyCode = event.keyCode || event.which;
    var phoneNumberField = document.getElementById('formphonenumber');
    var phoneNumber = phoneNumberField.value;
    var allowedKeys = [8, 9, 35, 36, 37, 38, 39, 40, 46]; // Add arrow keys: 38 (up), 40 (down)

    if (phoneNumber.length === 0 && keyCode === 48) {
      event.preventDefault();
      return false;
    }

    if (phoneNumber.length >= 10 && allowedKeys.indexOf(keyCode) === -1) {
      event.preventDefault();
      return false;
    }

    if (allowedKeys.indexOf(keyCode) === -1 && (keyCode < 48 || keyCode > 57)) {
      event.preventDefault();
      return false;
    }
});

// Drop or Input Image
const area = document.querySelector('.dragarea');
const text = document.querySelector('.holdtext');
area.addEventListener('dragover', (event) => {
    event.preventDefault();
    console.log("File inside.");
    text.textContent = "Release to upload this."
    area.classList.add('active');
})
area.addEventListener('dragleave', () => {
    console.log("File out.");
    text.textContent = "Drag & drop or browse."
    area.classList.remove('active');
})
area.addEventListener('drop', (event) => {
    event.preventDefault();
    console.log("File dropped.");
    file = event.dataTransfer.files[0];
    console.log(file);
    onscreen();
});

//Form
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById("onemoment");
    const submitButton = form.querySelector("button");
    const onTheWayMessage = document.getElementById("ontheway");
    const sentMessage = document.querySelector(".sent");
    const textarea = document.getElementById('sendmessage');
    const charCountElement = document.getElementById('charCount');
    const maxLength = 400;
    sentMessage.style.display = "none";
    submitButton.disabled = true;

    function updateCharCount() {
        const currentLength = textarea.value.length;
        charCountElement.textContent = `${currentLength} / ${maxLength}`;
        if (currentLength > maxLength) {
            textarea.value = textarea.value.substring(0, maxLength);
            charCountElement.textContent = `${maxLength} / ${maxLength}`;
        }
        toggleSubmitButton();
    }

    function toggleSubmitButton() {
        const inputs = form.querySelectorAll("input, textarea");
        const isFormValid = Array.from(inputs).every(input => input.value.trim());
        submitButton.disabled = !isFormValid;
    }

    textarea.addEventListener('input', updateCharCount);

    form.onsubmit = (e) => {
        e.preventDefault();
        onTheWayMessage.style.display = "block";
        form.querySelectorAll("input, textarea").forEach(input => {
            input.disabled = true;
            input.style.cursor = "not-allowed";
        });
        textarea.style.backgroundColor = "#fff";
        setTimeout(() => {
            onTheWayMessage.style.display = "none";
            sentMessage.style.display = "block";
            setTimeout(() => {
                sentMessage.style.display = "none";
                clearFormFields();
            }, 500);
        }, 4000);
    };

    function clearFormFields() {
        form.reset();
        form.querySelectorAll("input, textarea").forEach(input => {
            input.disabled = false;
            input.style.cursor = "auto";
        });
        updateCharCount();
    }
});

const failedMessage = document.querySelector(".failure");
failedMessage.style.display = "none";