document.addEventListener('DOMContentLoaded', function () {
    const salesForm = document.getElementById('sales-form');
    const supplyForm = document.getElementById('supply-form');
    const salesTable = document.getElementById('sales-table').querySelector('tbody');
    const othersTable = document.getElementById('others-table').querySelector('tbody');
    const supplyTable = document.getElementById('supply-table').querySelector('tbody');
    const showOthersDetailsButton = document.getElementById('show-others-details');
    const salesDetails = document.getElementById('sales-details');
    const othersDetails = document.getElementById('others-details');
    const exportSalesExcelButton = document.getElementById('export-sales-excel');
    const exportSalesPdfButton = document.getElementById('export-sales-pdf');
    const exportOthersExcelButton = document.getElementById('export-others-excel');
    const exportOthersPdfButton = document.getElementById('export-others-pdf');
    const saleDesignationSelect = document.getElementById('sale-designation');
    const saleUnitPriceInput = document.getElementById('sale-unit-price');
    const saleQuantityInput = document.getElementById('sale-quantity');
    const otherDesignationInput = document.getElementById('other-designation');
    const otherQuantityInput = document.getElementById('other-quantity');
    const otherAmountInput = document.getElementById('other-amount');
    const operationTypeSelect = document.getElementById('operation-type');
    const venteDetails = document.getElementById('vente-details');
    const autreDetails = document.getElementById('autre-details');
    const showSupplySectionButton = document.getElementById('show-supply-section');
    const supplySection = document.getElementById('supply-section');
    const dailyReportButton = document.getElementById('daily-report');
    const monthlyReportButton = document.getElementById('monthly-report');
    const yearlyReportButton = document.getElementById('yearly-report');
    const reportFilters = document.getElementById('report-filters');
    const dailyFilter = document.getElementById('daily-filter');
    const monthlyFilter = document.getElementById('monthly-filter');
    const yearlyFilter = document.getElementById('yearly-filter');
    const reportDateInput = document.getElementById('report-date');
    const reportMonthInput = document.getElementById('report-month');
    const reportYearInput = document.getElementById('report-year');
    const generateReportButton = document.getElementById('generate-report');
    const reportSection = document.getElementById('report-section');
    const reportTableSection = document.getElementById('report-table-section');
    const reportTable = document.getElementById('report-table').querySelector('tbody');
    const exportReportExcelButton = document.getElementById('export-report-excel');
    const exportReportPdfButton = document.getElementById('export-report-pdf');
    const exportSupplyExcelButton = document.getElementById('export-supply-excel');
    const exportSupplyPdfButton = document.getElementById('export-supply-pdf');
    const printSupplyTableButton = document.getElementById('print-supply-table'); // Bouton Imprimer pour Approvisionnements
    const printSalesTableButton = document.getElementById('print-sales-table'); // Bouton Imprimer pour Ventes
    const printOthersTableButton = document.getElementById('print-others-table'); // Bouton Imprimer pour Autres Opérations


    // Initialiser Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyBU6VVRgSCh5gcV7xXnnHr6rxIASTcBpLc",
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

    // Fonction pour mettre à jour la liste déroulante des désignations de produits
    function updateProductDesignations() {
        supplyRef.once('value', snapshot => {
            const supplyData = snapshot.val() || {};
            const designations = Object.values(supplyData).map(item => item.designation);
            const uniqueDesignations = Array.from(new Set(designations));
            saleDesignationSelect.innerHTML = uniqueDesignations.map(designation => `<option value="${designation}">${designation}</option>`).join('');
        });
    }

    // Mettre à jour les prix et le total lors du changement de désignation ou de quantité
    saleDesignationSelect.addEventListener('change', calculateTotalCost);
    saleQuantityInput.addEventListener('input', calculateTotalCost);
    saleUnitPriceInput.addEventListener('input', calculateTotalCost);

    // Mettre à jour la date du jour dans les champs de date
    function setTodaysDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('sale-date').value = today;
        document.getElementById('supply-date').value = today;
    }

    function initializeData() {
        // Mettre à jour la liste des produits
        updateProductDesignations();

        // Mettre à jour les tableaux
        updateSalesTable();
        updateOthersTable();
        updateSupplyTable();

        // Mettre à jour la date du jour
        setTodaysDate();
    }

    // Mettre à jour le tableau des ventes
    function updateSalesTable() {
        salesTable.innerHTML = '';
        salesRef.on('value', (snapshot) => {
            const salesData = snapshot.val() || {};
            for (const key in salesData) {
                const sale = salesData[key];
                const row = salesTable.insertRow();
                row.insertCell().textContent = sale.date;
                row.insertCell().textContent = sale.designation;
                row.insertCell().textContent = sale.quantity;
                row.insertCell().textContent = sale.unitPrice;
                row.insertCell().textContent = sale.totalCost;
            }
            if (Object.keys(salesData).length === 0) {
                const row = salesTable.insertRow();
                let cell = row.insertCell();
                cell.colSpan = 5;
                cell.textContent = "Aucune vente enregistrée.";
                cell.style.textAlign = "center";
            }
        });
    }

    // Mettre à jour le tableau des autres opérations
    function updateOthersTable() {
        othersTable.innerHTML = '';
        othersRef.on('value', (snapshot) => {
            const othersData = snapshot.val() || {};
            for (const key in othersData) {
                const other = othersData[key];
                const row = othersTable.insertRow();
                row.insertCell().textContent = other.date;
                row.insertCell().textContent = other.designation;
                row.insertCell().textContent = other.quantity;
                row.insertCell().textContent = other.amount;
            }
            if (Object.keys(othersData).length === 0) {
                const row = othersTable.insertRow();
                let cell = row.insertCell();
                cell.colSpan = 4;
                cell.textContent = "Aucune autre opération enregistrée.";
                cell.style.textAlign = "center";
            }
        });
    }

    // Mettre à jour le tableau des approvisionnements
    function updateSupplyTable() {
        supplyTable.innerHTML = '';
        supplyRef.on('value', (snapshot) => {
            const supplyData = snapshot.val() || {};
            salesRef.once('value', (salesSnapshot) => {
                const salesData = salesSnapshot.val() || {};
                for (const key in supplyData) {
                    const supply = supplyData[key];
                    let soldQuantity = 0;
                    for (const saleKey in salesData) {
                        const sale = salesData[saleKey];
                        if (sale.designation === supply.designation) {
                            soldQuantity += parseFloat(sale.quantity);
                        }
                    }
                    const remainingQuantity = parseFloat(supply.quantity) - soldQuantity;

                    const row = supplyTable.insertRow();
                    row.insertCell().textContent = supply.date;
                    row.insertCell().textContent = supply.designation;
                    row.insertCell().textContent = supply.quantity;
                    row.insertCell().textContent = soldQuantity;
                    row.insertCell().textContent = remainingQuantity;
                }
                if (Object.keys(supplyData).length === 0) {
                    const row = supplyTable.insertRow();
                    let cell = row.insertCell();
                    cell.colSpan = 5;
                    cell.textContent = "Aucun approvisionnement enregistré.";
                    cell.style.textAlign = "center";
                }
            });
        });
    }


    // Fonction pour calculer le coût total (non utilisée directement dans l'affichage, mais pourrait l'être ailleurs)
    function calculateTotalCost() {
        const quantity = parseFloat(saleQuantityInput.value) || 0;
        const unitPrice = parseFloat(saleUnitPriceInput.value) || 0;
        const totalCost = quantity * unitPrice;
        return totalCost; // Retourner le coût total pour une utilisation potentielle
    }


    // Afficher/masquer les champs en fonction du type d'opération
    operationTypeSelect.addEventListener('change', function () {
        if (operationTypeSelect.value === 'Vente') {
            venteDetails.style.display = 'block';
            autreDetails.style.display = 'none';
        } else {
            venteDetails.style.display = 'none';
            autreDetails.style.display = 'block';
        }
    });

    // Gestion du formulaire de vente et autres opérations
    salesForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const operationType = operationTypeSelect.value;
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
                motif: otherDesignationInput.value // Ajout du motif pour "Autres" opérations
            };
            dbRef = othersRef;
        }

        dbRef.push(operationData).then(() => {
            salesForm.reset();
            setTodaysDate();
            if (operationType === 'Vente') {
                updateSalesTable();
            } else {
                updateOthersTable();
            }
            alert('Opération ajoutée avec succès!');
        }).catch((error) => {
            console.error(`Erreur lors de l'ajout de l'opération (${operationType}):`, error);
            alert('Erreur lors de l\'ajout de l\'opération.');
        });
    });


    // Gestion du formulaire d'approvisionnement
    supplyForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const supply = {
            date: document.getElementById('supply-date').value,
            designation: document.getElementById('supply-designation').value,
            quantity: parseFloat(document.getElementById('supply-quantity').value)
        };
        supplyRef.push(supply).then(() => {
            supplyForm.reset();
            setTodaysDate();
            updateProductDesignations();
            updateSupplyTable();
            alert('Approvisionnement ajouté avec succès!');
        }).catch((error) => {
            console.error("Erreur lors de l'ajout de l'approvisionnement:", error);
            alert('Erreur lors de l\'ajout de l\'approvisionnement.');
        });
    });

    // Affichage des détails des ventes
    document.getElementById('show-sales-details').addEventListener('click', function () {
        othersDetails.style.display = 'none';
        salesDetails.style.display = salesDetails.style.display === 'none' ? 'block' : 'none';
    });

    // Affichage des détails des autres opérations
    showOthersDetailsButton.addEventListener('click', function () {
        salesDetails.style.display = 'none';
        othersDetails.style.display = othersDetails.style.display === 'none' ? 'block' : 'none';
    });

    // Imprimer le tableau des ventes
    printSalesTableButton.addEventListener('click', function () {
        window.print();
    });

    // Imprimer le tableau des autres opérations
    printOthersTableButton.addEventListener('click', function () {
        window.print();
    });

    // Export Excel pour les ventes
    exportSalesExcelButton.addEventListener('click', function () {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.table_to_sheet(document.getElementById('sales-table'));
        XLSX.utils.book_append_sheet(wb, ws, "Détails des Ventes");
        XLSX.writeFile(wb, "Détails des Ventes.xlsx");
    });

    // Export Excel pour les autres opérations
    exportOthersExcelButton.addEventListener('click', function () {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.table_to_sheet(document.getElementById('others-table'));
        XLSX.utils.book_append_sheet(wb, ws, "Détails des Autres Opérations");
        XLSX.writeFile(wb, "Détails des Autres Opérations.xlsx");
    });

    // Export PDF pour les ventes
    exportSalesPdfButton.addEventListener('click', function () {
        window.jsPDF = window.jspdf.jsPDF;
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Date', 'Désignation', 'Quantité', 'Prix unitaire', 'Coût total']],
            body: Array.from(document.getElementById('sales-table').querySelectorAll('tbody tr')).map(row => Array.from(row.querySelectorAll('td')).map(td => td.textContent)),
            didParseCell: function (data) {
                if (data.section === 'head') {
                    data.cell.styles.fontStyle = 'bold';
                }
            },
            title: 'Détails des Ventes', // Titre pour le PDF
            filename: 'Détails des Ventes.pdf',
            Lang: 'fr'
        });
        doc.save("Détails des Ventes.pdf");
    });

    // Export PDF pour les autres opérations
    exportOthersPdfButton.addEventListener('click', function () {
        window.jsPDF = window.jspdf.jsPDF;
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Date', 'Motif', 'Quantité', 'Montant']],
            body: Array.from(document.getElementById('others-table').querySelectorAll('tbody tr')).map(row => Array.from(row.querySelectorAll('td')).map(td => td.textContent)),
            didParseCell: function (data) {
                if (data.section === 'head') {
                    data.cell.styles.fontStyle = 'bold';
                }
            },
            title: 'Détails des Autres Opérations', // Titre pour le PDF
            filename: 'Détails des Autres Opérations.pdf',
            Lang: 'fr'
        });
        doc.save("Détails des Autres Opérations.pdf");
    });

    // Export Excel pour les approvisionnements
    exportSupplyExcelButton.addEventListener('click', function () {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.table_to_sheet(document.getElementById('supply-table'));
        // Ajouter un titre dans la feuille Excel (première ligne)
        XLSX.utils.sheet_insert_row(ws, 0, 1); // Insert an empty row at the top
        XLSX.utils.sheet_add_aoa(ws, [["Détails des Approvisionnements et Stocks"]], { origin: "A1" }); // Add title in A1
        // Apply style to the title cell (optional, example: bold font)
        const titleCell = ws['A1'];
        if (titleCell) {
            titleCell.s = { font: { bold: true, sz: 14 } };
        }
        XLSX.utils.book_append_sheet(wb, ws, "Approvisionnements");
        XLSX.writeFile(wb, "Détails des Approvisionnements.xlsx");
    });


    // Export PDF pour les approvisionnements
    exportSupplyPdfButton.addEventListener('click', function () {
        window.jsPDF = window.jspdf.jsPDF;
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Date', 'Désignation', 'Quantité approvisionnée', 'Vendues', 'Restantes']],
            body: Array.from(document.getElementById('supply-table').querySelectorAll('tbody tr')).map(row => Array.from(row.querySelectorAll('td')).map(td => td.textContent)),
            didParseCell: function (data) {
                if (data.section === 'head') {
                    data.cell.styles.fontStyle = 'bold';
                }
            },
            title: 'Détails des Approvisionnements et Stocks', // Titre pour le PDF
            filename: 'Détails des Approvisionnements.pdf',
            Lang: 'fr',
        });
        doc.save("Détails des Approvisionnements.pdf");
    });

    // Imprimer le tableau des approvisionnements
    printSupplyTableButton.addEventListener('click', function () {
        window.print();
    });

    // Imprimer le tableau des ventes
    printSalesTableButton.addEventListener('click', function () {
        window.print();
    });

    // Imprimer le tableau des autres opérations
    printOthersTableButton.addEventListener('click', function () {
        window.print();
    });


    // Afficher la section d'approvisionnement
    showSupplySectionButton.addEventListener('click', function () {
        supplySection.style.display = 'block';
        document.getElementById('supply-table').style.display = 'block';
    });


    // Gestion des bilans (journalier, mensuel, annuel)
    dailyReportButton.addEventListener('click', function () {
        showReportFilters('daily');
    });

    monthlyReportButton.addEventListener('click', function () {
        showReportFilters('monthly');
    });

    yearlyReportButton.addEventListener('click', function () {
        showReportFilters('yearly');
    });

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
            othersRef.once('value')
        ]).then((snapshots) => {
            const salesData = snapshots[0].val() || {};
            const othersData = snapshots[1].val() || {};

            const filteredSales = filterDataByDate(salesData, selectedDate, selectedMonth, selectedYear);
            const filteredOthers = filterDataByDate(othersData, selectedDate, selectedMonth, selectedYear);

            updateReportTable(filteredSales, filteredOthers);
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


    function updateReportTable(sales, others) {
        reportTable.innerHTML = '';
        const combinedData = {};

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

        for (const key in others) {
            const other = others[key];
            const combinedKey = other.designation;
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

        for (const key in combinedData) {
            const data = combinedData[key];
            const row = reportTable.insertRow();
            row.insertCell().textContent = data.type;
            row.insertCell().textContent = data.designation;
            row.insertCell().textContent = data.quantity;
            row.insertCell().textContent = data.amount.toFixed(2);
        }
        if (Object.keys(combinedData).length === 0) {
            const row = reportTable.insertRow();
            let cell = row.insertCell();
            cell.colSpan = 4;
            cell.textContent = "Aucune donnée à afficher pour ce bilan.";
            cell.style.textAlign = "center";
        }
    }


    exportReportExcelButton.addEventListener('click', function () {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.table_to_sheet(document.getElementById('report-table'));
        // Ajouter un titre dans la feuille Excel (première ligne)
        XLSX.utils.sheet_insert_row(ws, 0, 1); // Insert an empty row at the top
        XLSX.utils.sheet_add_aoa(ws, [["Bilan"]], { origin: "A1" }); // Add title in A1
        // Apply style to the title cell (optional, example: bold font)
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
        doc.autoTable({
            head: [['Type d\'Opération', 'Désignation', 'Quantité', 'Montant/Coût total']],
            body: Array.from(document.getElementById('report-table').querySelectorAll('tbody tr')).map(row => Array.from(row.querySelectorAll('td')).map(td => td.textContent)),
            didParseCell: function (data) {
                if (data.section === 'head') {
                    data.cell.styles.fontStyle = 'bold';
                }
            },
            title: 'Bilan', // Titre pour le PDF
            filename: 'Bilan.pdf',
            Lang: 'fr'
        });
        doc.save("Bilan.pdf");
    });

    initializeData();
});