document.addEventListener('DOMContentLoaded', function () {
    // Formulaires et Tableaux
    const salesForm = document.getElementById('sales-form');
    const supplyForm = document.getElementById('supply-form');
    const salesTable = document.getElementById('sales-table').querySelector('tbody');
    const othersTable = document.getElementById('others-table').querySelector('tbody');
    const supplyTable = document.getElementById('supply-table').querySelector('tbody');
    const reportTable = document.getElementById('report-table').querySelector('tbody');

    // Sections PRINCIPALES (celles qu'on affiche/masque avec les gros boutons)
    const salesSection = document.getElementById('sales-section');
    const supplySection = document.getElementById('supply-section');
    const reportSection = document.getElementById('report-section');

    // Sections (détails, etc.)
    const salesDetails = document.getElementById('sales-details');
    const othersDetails = document.getElementById('others-details');
    const venteDetails = document.getElementById('vente-details');
    const autreDetails = document.getElementById('autre-details');
    const reportFilters = document.getElementById('report-filters');
    const reportTableSection = document.getElementById('report-table-section');
    const supplyTableElement = document.getElementById('supply-table');

    // Champs de formulaire
    const saleDesignationSelect = document.getElementById('sale-designation');
    const saleUnitPriceInput = document.getElementById('sale-unit-price');
    const saleQuantityInput = document.getElementById('sale-quantity');
    const otherDesignationInput = document.getElementById('other-designation');
    const otherQuantityInput = document.getElementById('other-quantity');
    const otherAmountInput = document.getElementById('other-amount');
    const operationTypeSelect = document.getElementById('operation-type');
    const reportDateInput = document.getElementById('report-date');
    const reportMonthInput = document.getElementById('report-month');
    const reportYearInput = document.getElementById('report-year');
    const salesFormKeyInput = document.getElementById('sales-form-key');
    const supplyFormKeyInput = document.getElementById('supply-form-key');
    const dailyFilter = document.getElementById('daily-filter');
    const monthlyFilter = document.getElementById('monthly-filter');
    const yearlyFilter = document.getElementById('yearly-filter');

    // Boutons
    const showOthersDetailsButton = document.getElementById('show-others-details');
    const showSupplySectionButton = document.getElementById('show-supply-section'); // Pour le bouton "Approvisionner"
    const showSalesSectionButton = document.getElementById('show-sales-section-button'); // Bouton "Ventes"
    const showReportSectionButton = document.getElementById('show-report-section-button'); // Bouton "Bilan"
    const generateReportButton = document.getElementById('generate-report');
    const printSupplyTableButton = document.getElementById('print-supply-table');
    const printSalesTableButton = document.getElementById('print-sales-table');
    const printOthersTableButton = document.getElementById('print-others-table');
    const exportSalesExcelButton = document.getElementById('export-sales-excel');
    const exportOthersExcelButton = document.getElementById('export-others-excel');
    const exportSupplyExcelButton = document.getElementById('export-supply-excel');
    const exportReportExcelButton = document.getElementById('export-report-excel');
    const exportSalesPdfButton = document.getElementById('export-sales-pdf');
    const exportOthersPdfButton = document.getElementById('export-others-pdf');
    const exportSupplyPdfButton = document.getElementById('export-supply-pdf');
    const exportReportPdfButton = document.getElementById('export-report-pdf');
    const backToTopButton = document.getElementById('back-to-top');
    //Nouveau bouton
    const showSupplyDetailsButton = document.getElementById('show-supply-details');


    // Initialiser Firebase (votre configuration)
    const firebaseConfig = {
        apiKey: "AIzaSyBU6VVRgSCh5gcV7xXnnHr6rxIASTcBpLc",  // Remplacez par votre clé API
        authDomain: "tech-cohesion.firebaseapp.com",
        databaseURL: "https://tech-cohesion-default-rtdb.firebaseio.com",
        projectId: "tech-cohesion",
        storageBucket: "tech-cohesion.firebasestorage.app",
        messagingSenderId: "863736447145",
        appId: "1:863736447145:web:18ffa286704f8e081069b8",
        measurementId: "G-9Z309FQ77E"
    };

    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    // Références de la base de données
    const salesRef = database.ref('sales');
    const othersRef = database.ref('others');
    const supplyRef = database.ref('supply');

    // --- Fonctions Utilitaires ---

    // Fonction pour afficher une section principale et masquer les autres
    function showSection(sectionToShow) {
        // Masque toutes les sections principales
        supplySection.style.display = 'none';
        salesSection.style.display = 'none';
        reportSection.style.display = 'none';

        // Affiche la section demandée
        sectionToShow.style.display = 'block';

        // Masque les sous-sections potentiellement ouvertes
        salesDetails.style.display = 'none';
        othersDetails.style.display = 'none';
        reportFilters.style.display = 'none';
        reportTableSection.style.display = 'none';
        supplyTableElement.style.display = 'none'; //Masquer le tableau au chargement initial
    }

    function updateProductDesignations() {
        supplyRef.once('value', snapshot => {
            const supplyData = snapshot.val() || {};
            const designations = Object.values(supplyData).map(item => item.designation);
            const uniqueDesignations = Array.from(new Set(designations));
            saleDesignationSelect.innerHTML = uniqueDesignations.map(designation => `<option value="${designation}">${designation}</option>`).join('');
        });
    }

    function setTodaysDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('sale-date').value = today;
        document.getElementById('supply-date').value = today;
    }

    // Fonction pour afficher/masquer une section (utilisée pour les détails, etc.)
    function toggleSection(section) {
        section.style.display = section.style.display === 'none' ? 'block' : 'none';
    }

    // Fonction pour afficher/masquer les détails
    function toggleDetails(showDetails, hideDetails) {
        hideDetails.style.display = 'none';
        showDetails.style.display = showDetails.style.display === 'none' ? 'block' : 'none';
    }

      // Afficher/masquer le tableau des approvisionnements
    function toggleSupplyTable() {
        supplyTableElement.style.display = supplyTableElement.style.display === 'none' ? 'table' : 'none'; // Use 'table' to properly display a table element
    }


    function initializeData() {
        updateProductDesignations();
        updateSalesTable();
        updateOthersTable();
        updateSupplyTable();
        setTodaysDate();
    }


    function createActionButtons(key, dataType) {
        const actionsCell = document.createElement('td');

        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.setAttribute('data-key', key);
        editButton.setAttribute('data-type', dataType);
        editButton.addEventListener('click', () => handleEdit(key, dataType));
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.setAttribute('data-key', key);
        deleteButton.setAttribute('data-type', dataType);
        deleteButton.addEventListener('click', () => handleDelete(key, dataType));
        actionsCell.appendChild(deleteButton);

        return actionsCell;
    }
    //Fontion pour remonter en haut
     function scrollToTop() {
        window.scrollTo({
            top: 0,          // Position cible (haut de la page)
            behavior: 'smooth' // Défilement fluide
        });
    }

    function handleEdit(key, dataType) {
        if (dataType === 'sales') {
            salesFormKeyInput.value = key;
            salesRef.child(key).once('value', snapshot => {
                const saleData = snapshot.val();
                if (saleData) {
                    populateSalesForm(saleData);
                    salesForm.querySelector('.submit-button').textContent = 'Modifier Opération';
                      scrollToTop(); // Appel à la function
                }
            });
        } else if (dataType === 'others') {
            salesFormKeyInput.value = key;
            othersRef.child(key).once('value', snapshot => {
                const otherData = snapshot.val();
                if (otherData) {
                    populateOthersForm(otherData);
                    salesForm.querySelector('.submit-button').textContent = 'Modifier Opération';
                    scrollToTop();
                }
            });
        } else if (dataType === 'supply') {
            supplyFormKeyInput.value = key;
            supplyRef.child(key).once('value', snapshot => {
                const supplyData = snapshot.val();
                if (supplyData) {
                    populateSupplyForm(supplyData);
                    supplyForm.querySelector('.submit-button').textContent = 'Modifier Approvisionnement';
                     // Remonter en haut de la page après la modification
                   scrollToTop(); // Appel à la fonction
                }
            });
        }
    }

    function populateSalesForm(data) {
        document.getElementById('sale-date').value = data.date;
        document.getElementById('operation-type').value = 'Vente';
        venteDetails.style.display = 'block';
        autreDetails.style.display = 'none';
        saleDesignationSelect.value = data.designation;
        saleQuantityInput.value = data.quantity;
        saleUnitPriceInput.value = data.unitPrice;
    }

    function populateOthersForm(data) {
        document.getElementById('sale-date').value = data.date;
        document.getElementById('operation-type').value = 'Autre';
        venteDetails.style.display = 'none';
        autreDetails.style.display = 'block';
        otherDesignationInput.value = data.designation;
        otherQuantityInput.value = data.quantity;
        otherAmountInput.value = data.amount;
    }

    function populateSupplyForm(data) {
        document.getElementById('supply-date').value = data.date;
        document.getElementById('supply-designation').value = data.designation;
        document.getElementById('supply-quantity').value = data.quantity;
    }

    function handleDelete(key, dataType) {
        if (confirm(`Êtes-vous sûr de vouloir supprimer cette entrée de ${dataType} ?`)) {
            const ref = dataType === 'sales' ? salesRef : (dataType === 'others' ? othersRef : supplyRef);
            ref.child(key).remove()
                .then(() => alert(`${dataType} supprimé avec succès !`))
                .catch(error => {
                    console.error(`Erreur lors de la suppression de ${dataType}:`, error);
                    alert(`Erreur lors de la suppression de ${dataType}.`);
                });
        }
    }

    function updateTable(table, ref, dataType) {
        table.innerHTML = '';
        ref.on('value', (snapshot) => {
            const data = snapshot.val() || {};
            for (const key in data) {
                                const item = data[key];
                const row = table.insertRow();

                if (dataType === 'supply') {
                    // Traitement spécifique pour les approvisionnements
                    salesRef.once('value', (salesSnapshot) => {
                        const salesData = salesSnapshot.val() || {};
                        let soldQuantity = 0;
                        for (const saleKey in salesData) {
                            const sale = salesData[saleKey];
                            if (sale.designation === item.designation) {
                                soldQuantity += parseFloat(sale.quantity);
                            }
                        }
                        const remainingQuantity = parseFloat(item.quantity) - soldQuantity;

                        row.insertCell().textContent = item.date;
                        row.insertCell().textContent = item.designation;
                        row.insertCell().textContent = item.quantity;
                        row.insertCell().textContent = soldQuantity;
                        row.insertCell().textContent = remainingQuantity;
                        row.appendChild(createActionButtons(key, dataType));

                        if (Object.keys(data).length === 0) {
                            displayEmptyTableMessage(table, 6, `Aucun ${dataType} enregistré.`);
                        }
                    });
                } else {
                    // Traitement commun pour ventes et autres opérations
                    if (dataType === 'sales') {
                        row.insertCell().textContent = item.date;
                        row.insertCell().textContent = item.designation;
                        row.insertCell().textContent = item.quantity;
                        row.insertCell().textContent = item.unitPrice;
                        row.insertCell().textContent = item.totalCost;
                    } else if (dataType === 'others') {
                        row.insertCell().textContent = item.date;
                        row.insertCell().textContent = item.designation;
                        row.insertCell().textContent = item.quantity;
                        row.insertCell().textContent = item.amount;
                    }
                    row.appendChild(createActionButtons(key, dataType));
                }
            }
            if (Object.keys(data).length === 0 && dataType !== 'supply') {
                displayEmptyTableMessage(table, dataType === 'sales' ? 6 : 5, `Aucune ${dataType} enregistrée.`);
            }
        });
    }


    function displayEmptyTableMessage(table, colspan, message) {
        const row = table.insertRow();
        const cell = row.insertCell();
        cell.colSpan = colspan;
        cell.textContent = message;
        cell.style.textAlign = "center";
    }

    function updateSalesTable() {
        updateTable(salesTable, salesRef, 'sales');
    }

    function updateOthersTable() {
        updateTable(othersTable, othersRef, 'others');
    }

    function updateSupplyTable() {
        updateTable(supplyTable, supplyRef, 'supply');
    }

    function calculateTotalCost() {
        const quantity = parseFloat(saleQuantityInput.value) || 0;
        const unitPrice = parseFloat(saleUnitPriceInput.value) || 0;
        return quantity * unitPrice;
    }

    function handleFormSubmit(event, operationType) {
        event.preventDefault();
        const formKey = salesFormKeyInput.value;
        let operationData;
        let dbRef;

        if (operationType === 'Vente') {
            operationData = {
                date: document.getElementById('sale-date').value,
                designation: saleDesignationSelect.value,
                quantity: parseFloat(saleQuantityInput.value),
                unitPrice: parseFloat(saleUnitPriceInput.value),
                totalCost: calculateTotalCost()
            };
            dbRef = salesRef;
        } else {
            operationData = {
                date: document.getElementById('sale-date').value,
                designation: otherDesignationInput.value,
                quantity: parseFloat(otherQuantityInput.value),
                amount: parseFloat(otherAmountInput.value),
                motif: otherDesignationInput.value // Note: 'motif' est utilisé ici, mais il pourrait être redondant avec 'designation'.
            };
            dbRef = othersRef;
        }

        const isEditMode = !!formKey;
        const updateFunction = isEditMode ? dbRef.child(formKey).update(operationData) : dbRef.push(operationData);

        updateFunction
            .then(() => {
                alert(`Opération ${isEditMode ? 'modifiée' : 'ajoutée'} avec succès !`);
                salesForm.reset();
                setTodaysDate();
                salesFormKeyInput.value = '';
                salesForm.querySelector('.submit-button').textContent = 'Ajouter Opération';
                if (operationType === 'Vente') {
                    updateSalesTable();
                } else {
                    updateOthersTable();
                }
            })
            .catch(error => {
                console.error(`Erreur lors de l'${isEditMode ? 'modification' : 'ajout'} de l'opération (${operationType}):`, error);
                alert(`Erreur lors de l'${isEditMode ? 'modification' : 'ajout'} de l'opération.`);
            });
    }

    function handleSupplyFormSubmit(event) {
        event.preventDefault();
        const formKey = supplyFormKeyInput.value;
        const supplyData = {
            date: document.getElementById('supply-date').value,
            designation: document.getElementById('supply-designation').value,
            quantity: parseFloat(document.getElementById('supply-quantity').value)
        };
        const isEditMode = !!formKey;

        const updateFunction = isEditMode ? supplyRef.child(formKey).update(supplyData) : supplyRef.push(supplyData);

        updateFunction
            .then(() => {
                alert(`Approvisionnement ${isEditMode ? 'modifié' : 'ajouté'} avec succès !`);
                supplyForm.reset();
                setTodaysDate();
                supplyFormKeyInput.value = '';
                supplyForm.querySelector('.submit-button').textContent = 'Ajouter Approvisionnement';
                updateProductDesignations();
                updateSupplyTable();
            })
            .catch(error => {
                console.error(`Erreur lors de l'${isEditMode ? 'modification' : 'ajout'} de l'approvisionnement:`, error);
                alert(`Erreur lors de l'${isEditMode ? 'modification' : 'ajout'} de l'approvisionnement.`);
            });
    }

    // --- Event Listeners ---

    // Mettre à jour le total (ventes)
    saleDesignationSelect.addEventListener('change', calculateTotalCost);
    saleQuantityInput.addEventListener('input', calculateTotalCost);
    saleUnitPriceInput.addEventListener('input', calculateTotalCost);

    // Afficher/masquer les champs en fonction du type d'opération (ventes/autres)
    operationTypeSelect.addEventListener('change', function () {
        if (operationTypeSelect.value === 'Vente') {
            venteDetails.style.display = 'block';
            autreDetails.style.display = 'none';
        } else {
            venteDetails.style.display = 'none';
            autreDetails.style.display = 'block';
        }
    });

    // Soumission des formulaires
    salesForm.addEventListener('submit', (event) => handleFormSubmit(event, operationTypeSelect.value));
    supplyForm.addEventListener('submit', handleSupplyFormSubmit);

    // Afficher/masquer les détails des ventes/autres
    document.getElementById('show-sales-details').addEventListener('click', () => toggleDetails(salesDetails, othersDetails));
    showOthersDetailsButton.addEventListener('click', () => toggleDetails(othersDetails, salesDetails));

    // Impression et Exportation (fonctions et event listeners)
     function exportToExcel(tableId, filename) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.table_to_sheet(document.getElementById(tableId));
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, filename + ".xlsx");
    }


    function exportToPdf(tableId, title, filename) {
         window.jsPDF = window.jspdf.jsPDF;
        const doc = new jsPDF();
        const headers = Array.from(document.getElementById(tableId).querySelectorAll('thead th')).map(th => th.textContent);
        const body = Array.from(document.getElementById(tableId).querySelectorAll('tbody tr'))
            .map(row => Array.from(row.querySelectorAll('td')).map(td => td.textContent));
         // Vérifie si le tableau est vide
        if (body.length === 0) {
            alert("Aucune donnée à exporter."); // Affiche une alerte si le tableau est vide
            return; // Arrête la fonction pour ne pas générer un PDF vide
        }
        doc.autoTable({
            head: [headers],
            body: body,
            didParseCell: data => { if (data.section === 'head') data.cell.styles.fontStyle = 'bold'; },
            title: title,
            filename: filename + '.pdf', //Correction: Ajout de l'extension .pdf
            Lang: 'fr'
        });
         // Vérifie si le document a des pages avant de sauvegarder.
        if(doc.getNumberOfPages() > 0){
             doc.save(filename + ".pdf");
        } else {
            alert("Erreur lors de la création du PDF : Aucune page générée.")
        }

    }

    printSalesTableButton.addEventListener('click', () => window.print());
    printOthersTableButton.addEventListener('click', () => window.print());
    printSupplyTableButton.addEventListener('click', () => window.print());

    exportSalesExcelButton.addEventListener('click', () => exportToExcel('sales-table', 'Détails des Ventes'));
    exportOthersExcelButton.addEventListener('click', () => exportToExcel('others-table', 'Détails des Autres Opérations'));
    exportSupplyExcelButton.addEventListener('click', () => exportToExcel('supply-table', 'Détails des Approvisionnements'));

    exportSalesPdfButton.addEventListener('click', () => exportToPdf('sales-table', 'Détails des Ventes', 'Détails des Ventes'));
    exportOthersPdfButton.addEventListener('click', () => exportToPdf('others-table', 'Détails des Autres Opérations', 'Détails des Autres Opérations'));
    exportSupplyPdfButton.addEventListener('click', () => exportToPdf('supply-table', 'Détails des Approvisionnements et Stocks', 'Détails des Approvisionnements'));

    // Boutons section principales (Appro, Ventes, Bilan)
    showSupplySectionButton.addEventListener('click', () => showSection(supplySection));
    showSalesSectionButton.addEventListener('click', () => showSection(salesSection));
    showReportSectionButton.addEventListener('click', () => showSection(reportSection));

    //Bouton pour afficher/masquer le tableau des approvisionnements
    showSupplyDetailsButton.addEventListener('click', toggleSupplyTable);


    // Bilan (filtres et génération)
    const reportButtons = {
        'daily-report': 'daily',
        'monthly-report': 'monthly',
        'yearly-report': 'yearly',
    };

    for (const id in reportButtons) {
        document.getElementById(id).addEventListener('click', () => showReportFilters(reportButtons[id]));
    }

    function showReportFilters(filterType) {
        reportFilters.style.display = 'block';
        dailyFilter.style.display = filterType === 'daily' ? 'flex' : 'none';
                monthlyFilter.style.display = filterType === 'monthly' ? 'flex' : 'none';
        yearlyFilter.style.display = filterType === 'yearly' ? 'flex' : 'none';
        reportTableSection.style.display = 'none';
    }

    generateReportButton.addEventListener('click', function () {
        const selectedDate = reportDateInput.value;
        const selectedMonth = reportMonthInput.value;
        const selectedYear = reportYearInput.value;

        Promise.all([
            salesRef.once('value'),
            othersRef.once('value'),
            supplyRef.once('value') // Ajout de supplyRef
        ]).then(snapshots => {
            const salesData = snapshots[0].val() || {};
            const othersData = snapshots[1].val() || {};
            const supplyData = snapshots[2].val() || {}; // Récupération des données d'approvisionnement

            const filteredSales = filterDataByDate(salesData, selectedDate, selectedMonth, selectedYear);
            const filteredOthers = filterDataByDate(othersData, selectedDate, selectedMonth, selectedYear);
            const filteredSupply = filterDataByDate(supplyData, selectedDate, selectedMonth, selectedYear); // Filtrage des approvisionnements

            updateReportTable(filteredSales, filteredOthers, filteredSupply); // Ajout de filteredSupply
            reportTableSection.style.display = 'block';
        });
    });

    function filterDataByDate(data, date, month, year) {
        const filteredData = {};
        for (const key in data) {
            const item = data[key];
            const itemDate = item.date;
            if (!itemDate) continue;

            if (date && itemDate === date) {
                filteredData[key] = item;
            } else if (month && itemDate.startsWith(month.substring(0, 7))) {
                                filteredData[key] = item;
            } else if (year && itemDate.startsWith(year)) {
                filteredData[key] = item;
            }
        }
        return filteredData;
    }

    function updateReportTable(sales, others, supply) { // Ajout du paramètre supply
        reportTable.innerHTML = '';
        const combinedData = {};

        // Traitement des ventes
        for (const key in sales) {
            const sale = sales[key];
            const combinedKey = sale.designation;
            if (!combinedData[combinedKey]) {
                combinedData[combinedKey] = {
                    type: 'Vente',
                    designation: sale.designation,
                    quantity: 0,
                    amount: 0
                };
            }
            combinedData[combinedKey].quantity += parseFloat(sale.quantity);
            combinedData[combinedKey].amount += parseFloat(sale.totalCost);
        }

        // Traitement des autres opérations
        for (const key in others) {
            const other = others[key];
            const combinedKey = other.designation;  // Utilisez 'designation' comme clé, car 'motif' peut être différent.
            if (!combinedData[combinedKey]) {
                combinedData[combinedKey] = {
                    type: 'Autre',
                    designation: other.designation,
                    quantity: 0,
                    amount: 0
                };
            }
            combinedData[combinedKey].quantity += parseFloat(other.quantity);
            combinedData[combinedKey].amount += parseFloat(other.amount);
        }

        // Traitement des approvisionnements
        for (const key in supply) {
            const supplyItem = supply[key];
            const combinedKey = supplyItem.designation;
            if (!combinedData[combinedKey]) {
                combinedData[combinedKey] = {
                    type: 'Approvisionnement', // Type spécifique pour l'approvisionnement
                    designation: supplyItem.designation,
                    quantity: 0,
                    amount: 0, // Les approvisionnements n'ont pas de montant/coût direct dans ce contexte.  On pourrait ajouter un coût unitaire à l'appro.
                };
            }
            combinedData[combinedKey].quantity += parseFloat(supplyItem.quantity);
            // Pas d'ajout de 'amount' pour les approvisionnements (sauf si vous ajoutez un champ coût).
        }


        // Affichage des données combinées
        for (const key in combinedData) {
            const data = combinedData[key];
            const row = reportTable.insertRow();
            row.insertCell().textContent = data.type;
            row.insertCell().textContent = data.designation;
            row.insertCell().textContent = data.quantity;
            // Affiche le montant pour les ventes/autres, et une valeur par défaut (0 ou '-') pour les approvisionnements.
            row.insertCell().textContent = data.type === 'Approvisionnement' ? '-' : data.amount.toFixed(2);
        }

        if (Object.keys(combinedData).length === 0) {
            const row = reportTable.insertRow();
            let cell = row.insertCell();
            cell.colSpan = 4;
            cell.textContent = "Aucune donnée à afficher pour ce bilan.";
            cell.style.textAlign = "center";
        }
    }
        // Export Bilan Excel/PDF (fonctions et event listeners)
    exportReportExcelButton.addEventListener('click', function () {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.table_to_sheet(document.getElementById('report-table'));
        XLSX.utils.sheet_insert_row(ws, 0, 1);
        XLSX.utils.sheet_add_aoa(ws, [["Bilan"]], { origin: "A1" });
        const titleCell = ws['A1'];
        if (titleCell) {
            titleCell.s = { font: { bold: true, sz: 14 } };
        }
        XLSX.utils.book_append_sheet(wb, ws, "Bilan");
        XLSX.writeFile(wb, "Bilan.xlsx");
    });


    exportReportPdfButton.addEventListener('click', function () {
        window.jsPDF = window.jspdf.jsPDF;
        const doc = new jsPDF();
         // Récupérer les en-têtes du tableau
        const headers = Array.from(document.getElementById('report-table').querySelectorAll('thead th')).map(th => th.textContent);
         // Récupérer les données du tableau
        const body = Array.from(document.getElementById('report-table').querySelectorAll('tbody tr'))
            .map(row => Array.from(row.querySelectorAll('td')).map(td => td.textContent));

        // Vérifie si le tableau est vide
        if (body.length === 0) {
            alert("Aucune donnée à exporter."); // Affiche une alerte si le tableau est vide
            return; // Arrête la fonction pour ne pas générer un PDF vide
        }

        doc.autoTable({
            head: [headers], // Utiliser les en-têtes récupérés
            body: body,     // Utiliser les données récupérées
            didParseCell: function (data) {
                if (data.section === 'head') {
                    data.cell.styles.fontStyle = 'bold';
                }
            },
            title: 'Bilan',
            filename: 'Bilan.pdf', //Correction: ajout de l'extension
            Lang: 'fr'
        });
        // Vérifie si le document a des pages avant de sauvegarder.
        if(doc.getNumberOfPages() > 0){
             doc.save("Bilan.pdf");
        } else {
             alert("Erreur lors de la création du PDF : Aucune page générée.")
        }

    });

      // Afficher/masquer le bouton "Retour en haut"
        window.onscroll = function() {scrollFunction()};

        function scrollFunction() {
          if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = "block";
          } else {
            backToTopButton.style.display = "none";
          }
        }

        // Animer le défilement vers le haut
        backToTopButton.addEventListener('click', function(event) {
          event.preventDefault(); // Empêche le comportement par défaut du lien
            window.scrollTo({
            top: 0,         // Position cible (haut de la page)
            behavior: 'smooth' // Défilement fluide
          });

        });

    initializeData();
});