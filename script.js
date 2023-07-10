const firebaseConfig = {
    apiKey: "AIzaSyCQPO2hZWMo1Zlk1m9_fi0Gh6IRovVjHJI",
    authDomain: "datos-de-formulario-86ada.firebaseapp.com",
    projectId: "datos-de-formulario-86ada",
    storageBucket: "datos-de-formulario-86ada.appspot.com",
    messagingSenderId: "879002780862",
    appId: "1:879002780862:web:4c76927d18d0cd3405caef",
    measurementId: "G-MHC8P6LE1T"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();



document.getElementById('formulario').addEventListener('submit', (event) =>{
    event.preventDefault()

    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if(entradaNombre.value.trim() === ''){
        errorNombre.textContent = 'Introduci un nombre'
        errorNombre.classList.add('error-message')

    }else{
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')

    if(emailEntrada.value.trim() === ''){
        emailError.textContent = 'Introduci un email'
        emailError.classList.add('error-message')
    }else{
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    let contraEntrada = document.getElementById('password')
    let contraError = document.getElementById('passwordError')
    let contraPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/

    if(!contraPattern.test(contraEntrada.value)){
        contraError.textContent = 'Introduci una contraseña con mas de 8 caracteres, al menos una mayuscula, una minuscula y un caracter especial.'
        contraError.classList.add('error-message')
    }else{
        contraError.textContent = ''
        contraError.classList.remove('error-message')
    }

    if (!errorNombre.textContent && !emailError.textContent && !contraError.textContent){
        
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contraEntrada.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con exito', docRef.id)
        })
        .catch((error) => {
            alert(error)
        });

        
        document.getElementById('formulario').reset();
    }
    
})