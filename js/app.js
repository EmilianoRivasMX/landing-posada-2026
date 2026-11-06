const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxLry5Acnt_HF9gVRHybAhAQEwPQW2dtawjXHibAdvtFZ8zCGP-KfVu_mraS83FERzr_w/exec";

function mostrarModalNombre() {
    const modal = document.getElementById('modal-nombre');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function cerrarModalNombre() {
    const modal = document.getElementById('modal-nombre');
    if (modal) {
        modal.style.display = 'none';
    }
    const nombreInput = document.getElementById('nombre');
    if (nombreInput) {
        nombreInput.focus();
        nombreInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function enviarRespuesta(estado, cantidadPersonas) {
    const nombreInput = document.getElementById('nombre');
    const nombre = nombreInput ? nombreInput.value.trim() : "";

    // El nombre es obligatorio para cualquiera de las tres cartas
    if (!nombre) {
        mostrarModalNombre();
        return;
    }

    document.getElementById('form-container').classList.add('hidden');
    document.getElementById('success-container').classList.remove('hidden');

    const iconEl = document.getElementById('success-icon');
    const titleEl = document.getElementById('success-title');
    const messageEl = document.getElementById('success-message');
    const esAusente = estado.includes('No');

    if (esAusente) {
        if (iconEl) iconEl.innerText = "🫏";
        if (titleEl) {
            titleEl.innerText = "¡Ni hablar, mi burrito sabanero!";
            titleEl.className = "font-rotulo text-3xl md:text-4xl text-purple-700 leading-tight";
        }
        if (messageEl) {
            messageEl.innerText = `Enterados, ${nombre}. Qué tristeza que no nos puedas acompañar, pero nos comeremos un buen tamalito y nos echaremos un shot en tu honor. ¡Te vamos a extrañar en la posada! 🫔🥃`;
        }
    } else {
        if (iconEl) iconEl.innerText = "🎊";
        if (titleEl) {
            titleEl.innerText = "¡Ya rugiste, león!";
            titleEl.className = "font-rotulo text-4xl text-pink-600";
        }
        if (messageEl) {
            messageEl.innerText = `¡Sobres, ${nombre}! Apuntado con ${cantidadPersonas} lugar(es). Vete afinando la garganta para los villancicos. 🎶`;
        }
    }

    if (SCRIPT_URL !== "TU_WEB_APP_URL_DE_GOOGLE_AQUÍ") {
        fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: nombre,
                estatus: estado,
                personas: cantidadPersonas,
                fecha: new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })
            })
        }).catch(err => console.log('Error', err));
    }
}

function enviarRespuestaConAcompanantes() {
    const select = document.getElementById('num-acompanantes');
    const total = parseInt(select.value);
    enviarRespuesta(`Sí, voy con ${total} personas`, total);
}
