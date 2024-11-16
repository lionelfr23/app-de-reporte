// Abre los modales
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Cierra los modales
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Guardar el reporte en localStorage
document.getElementById('reportForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const dni = document.getElementById('dni').value;
    const direccion = document.getElementById('direccion').value;
    const descripcion = document.getElementById('descripcion').value;
    const fecha = new Date().toLocaleDateString();
    const hora = new Date().toLocaleTimeString();

    const reporte = {
        fecha: fecha,
        hora: hora,
        descripcion: descripcion
    };

    const savedReports = JSON.parse(localStorage.getItem('reports')) || [];
    savedReports.push(reporte);
    localStorage.setItem('reports', JSON.stringify(savedReports));

    const reportesList = document.getElementById('reportesList');
    const reporteItem = document.createElement('div');
    reporteItem.classList.add('reporte-item');
    reporteItem.innerHTML = `
        <p><strong>${reporte.fecha} ${reporte.hora}</strong> - ${reporte.descripcion} <span class="check-icon">✔</span></p>
    `;
    reportesList.appendChild(reporteItem);

    closeModal('reportarModal');
    showSuccessMessage();
    document.getElementById('reportForm').reset();
});

// Mostrar el mensaje de éxito
function showSuccessMessage() {
    const successMessageModal = document.getElementById('successMessageModal');
    successMessageModal.style.display = 'block';
    setTimeout(() => {
        successMessageModal.style.display = 'none';
    }, 3000);
}

// Ver Reportes
function openVerReportes() {
    const reportesList = document.getElementById('reportesList');
    if (reportesList.childElementCount > 0) {
        openModal('verReportesModal');
    } else {
        alert("No hay reportes disponibles.");
    }
}

// Cargar los reportes guardados
function loadReports() {
    const savedReports = JSON.parse(localStorage.getItem('reports'));
    const reportesList = document.getElementById('reportesList');

    if (savedReports) {
        savedReports.forEach(reporte => {
            const reporteItem = document.createElement('div');
            reporteItem.classList.add('reporte-item');
            reporteItem.innerHTML = `
                <p><strong>${reporte.fecha} ${reporte.hora}</strong> - ${reporte.descripcion} <span class="check-icon">✔</span></p>
            `;
            reportesList.appendChild(reporteItem);
        });
    }
}
