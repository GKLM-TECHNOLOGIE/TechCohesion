document.addEventListener('DOMContentLoaded', function () {
    // --- Éléments du DOM ---
    const salesForm = document.getElementById('sales-form');
    const supplyForm = document.getElementById('supply-form');
    const userForm = document.getElementById('user-form');
    const salesTableBody = document.getElementById('sales-table').querySelector('tbody');
    const othersTableBody = document.getElementById('others-table').querySelector('tbody');
    const expensesTableBody = document.getElementById('expenses-table').querySelector('tbody');
    const supplyTableBody = document.getElementById('supply-table').querySelector('tbody');
    const reportTableBody = document.getElementById('report-table').querySelector('tbody');
    const userTable = document.getElementById('user-table').querySelector('tbody');
    const salesSection = document.getElementById('sales-section');
    const supplySection = document.getElementById('supply-section');
    const reportSection = document.getElementById('report-section');
    const adminSection = document.getElementById('admin-section');
    const salesDetails = document.getElementById('sales-details');
    const othersDetails = document.getElementById('others-details');
    const expensesDetails = document.getElementById('expenses-details');
    const venteDetails = document.getElementById('vente-details');
    const autreDetails = document.getElementById('autre-details');
    const depenseDetails = document.getElementById('depense-details');
    const reportFilters = document.getElementById('report-filters');
    const reportTableSection = document.getElementById('report-table-section');
    const supplyTableElement = document.getElementById('supply-table');
    const saleDesignationSelect = document.getElementById('sale-designation');
    const saleUnitPriceInput = document.getElementById('sale-unit-price');
    const saleQuantityInput = document.getElementById('sale-quantity');
    const otherDesignationInput = document.getElementById('other-designation');
    const otherQuantityInput = document.getElementById('other-quantity');
    const otherAmountInput = document.getElementById('other-amount');
    const expenseDesignationInput = document.getElementById('expense-designation');
    const expenseQuantityInput = document.getElementById('expense-quantity'); // Champ quantité pour dépense
    const expenseAmountInput = document.getElementById('expense-amount');
    const operationTypeSelect = document.getElementById('operation-type');
    const reportDateInput = document.getElementById('report-date');
    const reportMonthInput = document.getElementById('report-month');
    const reportYearInput = document.getElementById('report-year');
   const reportWeekInput = document.getElementById('report-week'); // Ajout de l'input pour la semaine
    const salesFormKeyInput = document.getElementById('sales-form-key');
    const supplyFormKeyInput = document.getElementById('supply-form-key');
    const userFormKeyInput = document.getElementById('user-form-key');
    const dailyFilter = document.getElementById('daily-filter');
    const monthlyFilter = document.getElementById('monthly-filter');
    const yearlyFilter = document.getElementById('yearly-filter');
   const weeklyFilter = document.getElementById('weekly-filter'); // Ajout du filtre hebdomadaire
    const showOthersDetailsButton = document.getElementById('show-others-details');
    const showExpensesDetailsButton = document.getElementById('show-expenses-details');
    const showSupplySectionButton = document.getElementById('show-supply-section-button');
    const showSalesSectionButton = document.getElementById('show-sales-section-button');
    const showReportSectionButton = document.getElementById('show-report-section-button');
    const showAdminSectionButton = document.getElementById('show-admin-section-button');
    const generateReportButton = document.getElementById('generate-report');
    const printSupplyTableButton = document.getElementById('print-supply-table');
    const printSalesTableButton = document.getElementById('print-sales-table');
    const printOthersTableButton = document.getElementById('print-others-table');
    const printExpensesTableButton = document.getElementById('print-expenses-table');
    const exportSalesExcelButton = document.getElementById('export-sales-excel');
    const exportOthersExcelButton = document.getElementById('export-others-excel');
    const exportExpensesExcelButton = document.getElementById('export-expenses-excel');
    const exportSupplyExcelButton = document.getElementById('export-supply-excel');
    const exportReportExcelButton = document.getElementById('export-report-excel');
    const exportSalesPdfButton = document.getElementById('export-sales-pdf');
    const exportOthersPdfButton = document.getElementById('export-others-pdf');
    const exportExpensesPdfButton = document.getElementById('export-expenses-pdf');
    const exportSupplyPdfButton = document.getElementById('export-supply-pdf');
    const exportReportPdfButton = document.getElementById('export-report-pdf');
    const backToTopButton = document.getElementById('back-to-top');
    const showSupplyDetailsButton = document.getElementById('show-supply-details');
    const loginOverlay = document.getElementById('login-overlay');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const userInfoBar = document.getElementById('user-info-bar');
    const userInfoUsername = document.getElementById('user-info-username');
    const userInfoStatus = document.getElementById('user-info-status');
    const logoutButton = document.getElementById('logout-button');
    let currentUser = null;

     // Champs de recherche
    const searchSalesInput = document.getElementById('search-sales');
    const searchExpensesInput = document.getElementById('search-expenses');
    const searchOthersInput = document.getElementById('search-others');
    const searchSupplyInput = document.getElementById('search-supply');
    const searchUsersInput = document.getElementById('search-users');
    const searchReportInput = document.getElementById('search-report'); // Ajout du champ de recherche pour le bilan


    //  Éléments pour le menu hamburger
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    // --- Configuration Firebase ---
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

    // --- Références de la base de données ---
    const salesRef = database.ref('sales');
    const othersRef = database.ref('others');
    const expensesRef = database.ref('expenses');
    const supplyRef = database.ref('supply');
    const usersRef = database.ref('users');


    // --- Fonctions d'Authentification ---
    function showLoginForm() {
        loginOverlay.style.display = 'flex';
        userInfoBar.style.display = 'none';
    }

    function hideLoginForm() {
        loginOverlay.style.display = 'none';
    }

    function showUserInfo(username, accessLevel) {
        userInfoUsername.textContent = "Utilisateur: " + username;
        userInfoStatus.textContent = "Connecté";
        userInfoBar.style.display = 'block';
    }

       function handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        loginError.style.display = 'none';
        loginError.textContent = '';

        usersRef.orderByChild('username').equalTo(username).once('value', (snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const userKey = Object.keys(userData)[0];
                const user = userData[userKey];

                if (user.password === password) {
                    currentUser = {
                        username: user.username,
                        accessLevel: user.accessLevel
                    };
                    hideLoginForm();
                    showUserInfo(user.username, user.accessLevel);
                    initializeData();
                    applyUserRestrictions(); // Appliquer les restrictions
                } else {
                    loginError.textContent = 'Mot de passe incorrect.';
                    loginError.style.display = 'block';
                }
            } else {
                loginError.textContent = "Nom d'utilisateur introuvable.";
                loginError.style.display = 'block';
            }
        });
    }

    function handleLogout() {
        currentUser = null;
        showLoginForm();
        showSection();
        salesTableBody.innerHTML = '';
        othersTableBody.innerHTML = '';
        expensesTableBody.innerHTML = '';
        supplyTableBody.innerHTML = '';
        userTable.innerHTML = '';
        reportTableBody.innerHTML = ''; // Réinitialise le tableau des bilans

        userInfoBar.style.display = 'none';
        resetUserRestrictions(); //Réinitialiser les restrictions
    }

    // --- Fonctions Utilitaires ---
    function showSection(sectionToShow) {
        if (supplySection) supplySection.style.display = 'none';
        if (salesSection) salesSection.style.display = 'none';
        if (reportSection) reportSection.style.display = 'none';
        if (adminSection) adminSection.style.display = 'none';

        if (sectionToShow) {
            sectionToShow.style.display = 'block';
        }

        if (salesDetails) salesDetails.style.display = 'none';
        if (othersDetails) othersDetails.style.display = 'none';
        if (expensesDetails) expensesDetails.style.display = 'none';
        if (reportFilters) reportFilters.style.display = 'none';
        if (reportTableSection) reportTableSection.style.display = 'none';
        if (supplyTableElement) supplyTableElement.style.display = 'none';
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

    function toggleSection(section) {
        if (section.style.display === 'none') {
            section.style.display = 'block';
            if (section !== salesDetails) salesDetails.style.display = 'none';
            if (section !== othersDetails) othersDetails.style.display = 'none';
            if (section !== expensesDetails) expensesDetails.style.display = 'none';
        } else {
            section.style.display = 'none';
        }
    }

    function toggleDetails(showDetails, hideDetails) {
        hideDetails.style.display = 'none';
        showDetails.style.display = showDetails.style.display === 'none' ? 'block' : 'none';
    }

    function toggleSupplyTable() {
        supplyTableElement.style.display = supplyTableElement.style.display === 'none' ? 'table' : 'none';
    }

    function initializeData() {
        updateProductDesignations();
        updateSalesTable();
        updateOthersTable();
        updateExpensesTable();
        updateSupplyTable();
        updateUserTable();
        setTodaysDate();
    }


    // --- Gestion des Restrictions ---
    function applyUserRestrictions() {
        if (!currentUser) return;

        // Désactiver les éléments par défaut (pour tous les utilisateurs non-admin)
        disableElements([salesForm, supplyForm, userForm, generateReportButton]);
        disableButtonsByClass('edit-button');
        disableButtonsByClass('delete-button');

        // Activer les éléments en fonction du niveau d'accès
        if (currentUser.accessLevel === 'Administrateur') {
            enableElements([salesForm, supplyForm, userForm, generateReportButton]);
            enableButtonsByClass('edit-button');
            enableButtonsByClass('delete-button');

            //Réactiver les sections
            showSupplySectionButton.disabled = false;
            showSalesSectionButton.disabled = false;
            showReportSectionButton.disabled = false;
            showAdminSectionButton.disabled = false;


        } else if (currentUser.accessLevel === 'Éditeur') {
            enableElements([salesForm, supplyForm]);

             // Activer/désactiver les sections spécifiques à l'éditeur
            showSupplySectionButton.disabled = false;
            showSalesSectionButton.disabled = false;
            showReportSectionButton.disabled = true;  // Pas de bilans pour l'éditeur
            showAdminSectionButton.disabled = true;  // Pas d'administration pour l'éditeur

        } else if (currentUser.accessLevel === 'Lecteur') {

            //Désactiver les sections
            showSupplySectionButton.disabled = true;
            showSalesSectionButton.disabled = true;
            showReportSectionButton.disabled = true;
            showAdminSectionButton.disabled = true;
        }
    }


    function resetUserRestrictions() {
        // Réactiver tous les éléments (comme si aucun utilisateur n'était connecté)
        enableElements([salesForm, supplyForm, userForm, generateReportButton]);
        enableButtonsByClass('edit-button');
        enableButtonsByClass('delete-button');

        //Réactiver les sections
        showSalesSectionButton.disabled = false;
        showReportSectionButton.disabled = false;
        showAdminSectionButton.disabled = false;

    }


    function disableElements(elements) {
        elements.forEach(element => {
            if (element) element.disabled = true;
            // Gérer les cas où l'élément est un formulaire
            if (element && (element.tagName === 'FORM' || element.classList.contains('form-container'))) {
                const inputs = element.querySelectorAll('input, select, textarea, button');
                inputs.forEach(input => input.disabled = true);
            }
        });
    }

    function enableElements(elements) {
        elements.forEach(element => {
            if (element) element.disabled = false;
            // Gérer les cas où l'élément est un formulaire
            if (element && (element.tagName === 'FORM' || element.classList.contains('form-container'))) {
                const inputs = element.querySelectorAll('input, select, textarea, button');
                inputs.forEach(input => input.disabled = false);
            }
        });
    }

    function disableButtonsByClass(className) {
        const buttons = document.getElementsByClassName(className);
        for (let button of buttons) {
            button.disabled = true;
        }
    }

    function enableButtonsByClass(className) {
        const buttons = document.getElementsByClassName(className);
        for (let button of buttons) {
            button.disabled = false;
        }
    }

    function createActionButtons(key, dataType) {
       const actionsCell = document.createElement('td');
       actionsCell.classList.add('actions-col');

        // Bouton Modifier
        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.setAttribute('data-key', key);
        editButton.setAttribute('data-type', dataType);
        editButton.addEventListener('click', () => handleEdit(key, dataType));
        actionsCell.appendChild(editButton);

        // Bouton Supprimer
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.setAttribute('data-key', key);
        deleteButton.setAttribute('data-type', dataType);
        deleteButton.addEventListener('click', () => handleDelete(key, dataType));
        actionsCell.appendChild(deleteButton);

        // Appliquer les restrictions initiales (important !)
        if (currentUser && currentUser.accessLevel !== 'Administrateur') {
            editButton.disabled = true;
            deleteButton.disabled = true;
        }

        return actionsCell;
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
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
                    scrollToTop();
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
        } else if (dataType === 'expenses') {
            salesFormKeyInput.value = key;
            expensesRef.child(key).once('value', snapshot => {
                const expenseData = snapshot.val();
                if (expenseData) {
                    populateExpensesForm(expenseData);
                    salesForm.querySelector('.submit-button').textContent = 'Modifier Dépense';
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
                    scrollToTop();
                }
            });
        } else if (dataType === 'users') {
            userFormKeyInput.value = key;
            usersRef.child(key).once('value', snapshot => {
                const userData = snapshot.val();
                if (userData) {
                    populateUserForm(userData);
                    userForm.querySelector('.submit-button').textContent = 'Modifier Compte';
                    scrollToTop();
                }
            });
        }
    }

    function populateSalesForm(data) {
        document.getElementById('sale-date').value = data.date;
        document.getElementById('operation-type').value = 'Vente';
        venteDetails.style.display = 'block';
        autreDetails.style.display = 'none';
        depenseDetails.style.display = 'none';
        saleDesignationSelect.value = data.designation;
        saleQuantityInput.value = data.quantity;
        saleUnitPriceInput.value = data.unitPrice;
    }

    function populateOthersForm(data) {
        document.getElementById('sale-date').value = data.date;
        document.getElementById('operation-type').value = 'Autre';
        venteDetails.style.display = 'none';
        autreDetails.style.display = 'block';
        depenseDetails.style.display = 'none';
        otherDesignationInput.value = data.designation;
        otherQuantityInput.value = data.quantity;
        otherAmountInput.value = data.amount;
    }

    function populateExpensesForm(data) {
        document.getElementById('sale-date').value = data.date;
        document.getElementById('operation-type').value = 'Dépense';
        venteDetails.style.display = 'none';
        autreDetails.style.display = 'none';
        depenseDetails.style.display = 'block';
        expenseDesignationInput.value = data.designation;
        expenseQuantityInput.value = data.quantity; // Populate quantity
        expenseAmountInput.value = data.amount;
    }

    function populateSupplyForm(data) {
        document.getElementById('supply-date').value = data.date;
        document.getElementById('supply-designation').value = data.designation;
        document.getElementById('supply-quantity').value = data.quantity;
    }

    function populateUserForm(data) {
        document.getElementById('username').value = data.username;
        document.getElementById('access-level').value = data.accessLevel;
    }

    function handleDelete(key, dataType) {
        let ref;
        switch (dataType) {
            case 'sales':
                ref = salesRef;
                break;
            case 'others':
                ref = othersRef;
                break;
            case 'expenses':
                ref = expensesRef;
                break;
            case 'supply':
                ref = supplyRef;
                break;
            case 'users':
                ref = usersRef;
                break;
            default:
                console.error("Type de données inconnu:", dataType);
                return;
        }

        if (confirm(`Êtes-vous sûr de vouloir supprimer cette entrée de ${dataType} ?`)) {
            ref.child(key).remove()
                .then(() => {
                    alert(`${dataType} supprimé avec succès !`);
                })
                .catch(error => {
                    console.error(`Erreur lors de la suppression de ${dataType}:`, error);
                    alert(`Erreur lors de la suppression de ${dataType}.`);
                });
        }
    }

// Fonction générique pour mettre à jour les tableaux avec totaux
    function updateTable(tableBody, ref, dataType, searchInput) {
        ref.on('value', (snapshot) => {
            tableBody.innerHTML = '';
            const data = snapshot.val() || {};

            let totalQuantity = 0;
            let totalAmount = 0;
            let designationCount = 0;
            let totalUnitPrice = 0;
            let filteredData = {};

            // Filtrage
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
                for (const key in data) {
                    const item = data[key];
                    if (dataType === 'supply') {
                        if (item.designation.toLowerCase().includes(searchTerm)) {
                            filteredData[key] = item;
                        }
                    } else if (dataType === 'users') {
                         if (item.username.toLowerCase().includes(searchTerm)) {
                            filteredData[key] = item;
                         }
                    }
                    else {
                        if (item.designation.toLowerCase().includes(searchTerm)) {
                           filteredData[key] = item;
                        }
                    }
                }

            if (Object.keys(filteredData).length === 0) {
                let colspan = 5;
                 if (dataType === 'sales') colspan = 6;
                else if (dataType === 'users') colspan = 3;
                displayEmptyTableMessage(tableBody, colspan, `Aucune ${dataType} enregistrée.`);
                return;
            }

            for (const key in filteredData) {
                const item = filteredData[key];
                const row = tableBody.insertRow();

               if (dataType === 'supply') {
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

                        // Mettre à jour les totaux pour 'supply'
                        totalQuantity += parseFloat(item.quantity);
                        totalAmount += soldQuantity; // Utilisez soldQuantity pour le total "vendu"
                        designationCount++;
                        updateSupplyTotals(totalQuantity, totalAmount, remainingQuantity, designationCount); // Mettre à jour après chaque ligne

                    });
                } else {
                    // Pour 'sales', 'others', 'expenses', et 'users'
                    if (dataType === 'sales') {
                        row.insertCell().textContent = item.date;
                        row.insertCell().textContent = item.designation;
                        row.insertCell().textContent = item.quantity;
                        row.insertCell().textContent = item.unitPrice;
                        row.insertCell().textContent = item.totalCost;
                         totalQuantity += parseFloat(item.quantity);
                         totalAmount += parseFloat(item.totalCost);
                         totalUnitPrice += parseFloat(item.unitPrice); // Ajouter le prix unitaire au total
                         designationCount++;
                    } else if (dataType === 'others') {
                        row.insertCell().textContent = item.date;
                        row.insertCell().textContent = item.designation;
                        row.insertCell().textContent = item.quantity;
                        row.insertCell().textContent = item.amount;
                        totalQuantity += parseFloat(item.quantity);
                        totalAmount += parseFloat(item.amount);
                        designationCount++;
                    } else if (dataType === 'expenses') {
                        row.insertCell().textContent = item.date;
                        row.insertCell().textContent = item.designation;
                        row.insertCell().textContent = item.quantity; // Affiche la quantité
                        row.insertCell().textContent = item.amount;
                         totalQuantity += parseFloat(item.quantity); // Ajouter à totalQuantity
                         totalAmount += parseFloat(item.amount);
                         designationCount++;

                    } else if (dataType === 'users') {
                        row.insertCell().textContent = item.username;
                        row.insertCell().textContent = item.accessLevel;
                        // Pas de totaux pour 'users'
                    }
                    row.appendChild(createActionButtons(key, dataType));

                }
            }

            // Mettre à jour les totaux pour 'sales', 'others', et 'expenses' (en dehors de la boucle)
              if (dataType === 'sales') {
                    updateSalesTotals(totalQuantity, totalAmount, designationCount, totalUnitPrice);
                } else if (dataType === 'others') {
                    updateOthersTotals(totalQuantity, totalAmount, designationCount);
                } else if (dataType === 'expenses') {
                    updateExpensesTotals(totalQuantity, totalAmount, designationCount); // Utilisez totalQuantity
                }

              applyUserRestrictions();

        });
    }


    function displayEmptyTableMessage(table, colspan, message) {
        const row = table.insertRow();
        const cell = row.insertCell();
        cell.colSpan = colspan;
        cell.textContent = message;
        cell.style.textAlign = "center";
    }


   // Fonctions spécifiques pour mettre à jour les totaux de chaque tableau
    function updateSalesTotals(totalQuantity, totalAmount, designationCount, totalUnitPrice) {
    document.getElementById('total-sales-quantity').textContent = totalQuantity;
    document.getElementById('total-sales-amount').textContent = totalAmount.toFixed(2);
    document.getElementById('total-sales-designation-count').textContent = `Total (${designationCount})`; // Simplifié
    document.getElementById('total-sales-unit-price').textContent = totalUnitPrice.toFixed(2);
}

function updateOthersTotals(totalQuantity, totalAmount, designationCount) {
    document.getElementById('total-others-quantity').textContent = totalQuantity;
    document.getElementById('total-others-amount').textContent = totalAmount.toFixed(2);
    document.getElementById('total-others-designation-count').textContent = `Total (${designationCount})`; // Simplifié
}

function updateExpensesTotals(totalQuantity, totalAmount, designationCount) {
    document.getElementById('total-expenses-quantity').textContent = totalQuantity;
    document.getElementById('total-expenses-amount').textContent = totalAmount.toFixed(2);
    document.getElementById('total-expenses-designation-count').textContent = `Total (${designationCount})`; // Simplifié
}

function updateSupplyTotals(totalQuantity, totalSold, totalRemaining, designationCount) {
    document.getElementById('total-supply-quantity').textContent = totalQuantity;
    document.getElementById('total-sold-quantity').textContent = totalSold;
    document.getElementById('total-remaining-quantity').textContent = totalQuantity - totalSold;
    document.getElementById('total-supply-designation-count').textContent = `Total (${designationCount}):`; // Simplifié
}

    function updateSalesTable() {
        updateTable(salesTableBody, salesRef, 'sales', searchSalesInput);
    }

    function updateOthersTable() {
        updateTable(othersTableBody, othersRef, 'others', searchOthersInput);
    }

    function updateExpensesTable() {
        updateTable(expensesTableBody, expensesRef, 'expenses', searchExpensesInput);
    }

    function updateSupplyTable() {
        updateTable(supplyTableBody, supplyRef, 'supply', searchSupplyInput);
    }

    function updateUserTable() {
        updateTable(userTable, usersRef, 'users', searchUsersInput);
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
        } else if (operationType === 'Autre') {
            operationData = {
                date: document.getElementById('sale-date').value,
                designation: otherDesignationInput.value,
                quantity: parseFloat(otherQuantityInput.value),
                amount: parseFloat(otherAmountInput.value),
                motif: otherDesignationInput.value
            };
            dbRef = othersRef;
        } else if (operationType === 'Dépense') {
            operationData = {
                date: document.getElementById('sale-date').value,
                designation: expenseDesignationInput.value,
                quantity: parseFloat(expenseQuantityInput.value), // Save quantity
                amount: parseFloat(expenseAmountInput.value),
                motif: expenseDesignationInput.value
            };
            dbRef = expensesRef;
        }

        const isEditMode = !!formKey;
        const updateFunction = isEditMode ? dbRef.child(formKey).update(operationData) : dbRef.push(operationData);
        updateFunction.then(() => {
            salesForm.reset();
            setTodaysDate();
            salesFormKeyInput.value = '';
            salesForm.querySelector('.submit-button').textContent = 'Ajouter Opération';
        })
        .catch(error => {
            console.error("Erreur lors de l'opération:", error);
            alert("Une erreur s'est produite. Veuillez vérifier votre connexion et réessayer.");
        });
    }

    function handleSupplyFormSubmit(event) {
        event.preventDefault();
        const formKey = supplyFormKeyInput.value;
        const supplyDesignation = document.getElementById('supply-designation').value;
        const supplyQuantity = parseFloat(document.getElementById('supply-quantity').value);

        supplyRef.orderByChild('designation').equalTo(supplyDesignation).once('value', (snapshot) => {
            const existingSupplies = snapshot.val();
            if (existingSupplies && !formKey) {
                let totalQuantity = supplyQuantity;
                let existingKey = null;
                for (const key in existingSupplies) {
                    totalQuantity += parseFloat(existingSupplies[key].quantity);
                    existingKey = key;
                }

                supplyRef.child(existingKey).update({
                    quantity: totalQuantity,
                    date: document.getElementById('supply-date').value
                }).then(() => {
                    supplyForm.reset();
                    setTodaysDate();
                }).catch(handleError);

            } else {
                const supplyData = {
                    date: document.getElementById('supply-date').value,
                    designation: supplyDesignation,
                    quantity: supplyQuantity
                };
                const updateFunction = formKey ? supplyRef.child(formKey).update(supplyData) : supplyRef.push(supplyData);
                updateFunction.then(() => {
                    supplyForm.reset();
                    setTodaysDate();
                    supplyFormKeyInput.value = '';
                    supplyForm.querySelector('.submit-button').textContent = 'Ajouter Approvisionnement';
                    updateProductDesignations();

                }).catch(handleError);
            }
        });

        function handleError(error) {
            console.error("Erreur lors de l'opération:", error);
            alert("Une erreur s'est produite. Veuillez vérifier votre connexion et réessayer.");
        }
    }


    function handleUserFormSubmit(event) {
        event.preventDefault();
        const formKey = userFormKeyInput.value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const accessLevel = document.getElementById('access-level').value;

        if (!username || !password || !accessLevel) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        if (formKey) {
            const userData = {
                username,
                password,
                accessLevel
            };
            usersRef.child(formKey).update(userData)
                .then(() => {
                    userForm.reset();
                    userFormKeyInput.value = '';
                    userForm.querySelector('.submit-button').textContent = 'Créer Compte';
                })
                .catch((error) => {
                    console.error("Erreur lors de la modification de l'utilisateur:", error);
                    alert("Erreur lors de la modification de l'utilisateur.");
                });

        } else {
            usersRef.orderByChild('username').equalTo(username).once('value', (snapshot) => {
                if (snapshot.exists()) {
                    alert("Ce nom d'utilisateur existe déjà.");
                    return;
                }

                usersRef.push({
                    username,
                    password,
                    accessLevel
                }).then(() => {
                    userForm.reset();
                }).catch((error) => {
                    console.error("Erreur lors de la création de l'utilisateur:", error);
                    alert("Erreur lors de la création de l'utilisateur.");
                });
            });
        }
    }

    // --- Event Listeners ---
    loginForm.addEventListener('submit', handleLogin);
    logoutButton.addEventListener('click', handleLogout);

    saleDesignationSelect.addEventListener('change', calculateTotalCost);
    saleQuantityInput.addEventListener('input', calculateTotalCost);
    saleUnitPriceInput.addEventListener('input', calculateTotalCost);

    operationTypeSelect.addEventListener('change', function () {
        venteDetails.style.display = this.value === 'Vente' ? 'block' : 'none';
        autreDetails.style.display = this.value === 'Autre' ? 'block' : 'none';
        depenseDetails.style.display = this.value === 'Dépense' ? 'block' : 'none';
    });

    salesForm.addEventListener('submit', (event) => handleFormSubmit(event, operationTypeSelect.value));
    supplyForm.addEventListener('submit', handleSupplyFormSubmit);
    userForm.addEventListener('submit', handleUserFormSubmit);

    document.getElementById('show-sales-details').addEventListener('click', () => toggleSection(salesDetails));
    showOthersDetailsButton.addEventListener('click', () => toggleSection(othersDetails));
    showExpensesDetailsButton.addEventListener('click', () => toggleSection(expensesDetails));

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

        if (body.length === 0) {
            alert("Aucune donnée à exporter.");
            return;
        }

         // Ajouter le pied de tableau (tfoot) à l'export PDF, s'il existe
        const foot = [];
        const tfoot = document.getElementById(tableId).querySelector('tfoot');
        if (tfoot) {
            Array.from(tfoot.rows).forEach(row => {
                const rowData = Array.from(row.cells).map(cell => cell.textContent);
                foot.push(rowData);
            });
        }


        doc.autoTable({
            head: [headers],
            body: body,
            foot: foot, // Ajout du pied de page
            didParseCell: data => {
                if (data.section === 'head') data.cell.styles.fontStyle = 'bold';
            },
             footStyles: {  // Style pour le tfoot
                fontStyle: 'bold',
                fillColor: [240, 240, 240]
            },
            title: title,
            filename: filename + '.pdf',
            Lang: 'fr'
        });

        if (doc.getNumberOfPages() > 0) {
            doc.save(filename + ".pdf");
        } else {
            alert("Erreur lors de la création du PDF : Aucune page générée.");
        }
    }

    printSalesTableButton.addEventListener('click', () => window.print());
    printOthersTableButton.addEventListener('click', () => window.print());
    printExpensesTableButton.addEventListener('click', () => window.print());
    printSupplyTableButton.addEventListener('click', () => window.print());

    exportSalesExcelButton.addEventListener('click', () => exportToExcel('sales-table', 'Détails des Ventes'));
    exportOthersExcelButton.addEventListener('click', () => exportToExcel('others-table', 'Détails des Autres Opérations'));
    exportExpensesExcelButton.addEventListener('click', () => exportToExcel('expenses-table', 'Détails des Dépenses'));
    exportSupplyExcelButton.addEventListener('click', () => exportToExcel('supply-table', 'Détails des Approvisionnements'));
    exportReportExcelButton.addEventListener('click', () => exportToExcel('report-table', 'Bilan'));

    exportSalesPdfButton.addEventListener('click', () => exportToPdf('sales-table', 'Détails des Ventes', 'Détails des Ventes'));
    exportOthersPdfButton.addEventListener('click', () => exportToPdf('others-table', 'Détails des Autres Opérations', 'Détails des Autres Opérations'));
    exportExpensesPdfButton.addEventListener('click', () => exportToPdf('expenses-table', 'Détails des Dépenses', 'Détails des Dépenses'));
    exportSupplyPdfButton.addEventListener('click', () => exportToPdf('supply-table', 'Détails des Approvisionnements et Stocks', 'Détails des Approvisionnements'));
    exportReportPdfButton.addEventListener('click', () => exportToPdf('report-table', 'Bilan', 'Bilan'));

    showSupplySectionButton.addEventListener('click', () => showSection(supplySection));
    showSalesSectionButton.addEventListener('click', () => showSection(salesSection));
    showReportSectionButton.addEventListener('click', () => showSection(reportSection));
    showAdminSectionButton.addEventListener('click', () => showSection(adminSection));
    showSupplyDetailsButton.addEventListener('click', toggleSupplyTable);

     const reportButtons = {
        'daily-report': 'daily',
        'weekly-report': 'weekly',
        'monthly-report': 'monthly',
        'yearly-report': 'yearly',
    };
    // Gestionnaire d'événements pour les boutons de bilan
    for (const id in reportButtons) {
    document.getElementById(id).addEventListener('click', () => showReportFilters(reportButtons[id]));
}

// Fonction pour afficher/masquer les filtres de rapport
function showReportFilters(filterType) {
    reportFilters.style.display = 'block';
    dailyFilter.style.display = filterType === 'daily' ? 'flex' : 'none';
    weeklyFilter.style.display = filterType === 'weekly' ? 'flex' : 'none';
    monthlyFilter.style.display = filterType === 'monthly' ? 'flex' : 'none';
    yearlyFilter.style.display = filterType === 'yearly' ? 'flex' : 'none';
    reportTableSection.style.display = 'none';
}


    generateReportButton.addEventListener('click', function () {
    const selectedDate = reportDateInput.value;
    const selectedWeek = reportWeekInput.value;
    const selectedMonth = reportMonthInput.value;
    const selectedYear = reportYearInput.value;

    // Déterminer le type de bilan sélectionné
    let reportType = 'daily'; // Valeur par défaut
    if (selectedWeek) {
        reportType = 'weekly';
    } else if (selectedMonth) {
        reportType = 'monthly';
    } else if (selectedYear) {
        reportType = 'yearly';
    }

    Promise.all([
        salesRef.once('value'),
        othersRef.once('value'),
        expensesRef.once('value'),
        supplyRef.once('value')
    ]).then(snapshots => {
        const salesData = snapshots[0].val() || {};
        const othersData = snapshots[1].val() || {};
        const expensesData = snapshots[2].val() || {};
        const supplyData = snapshots[3].val() || {};

        // Filtrer les données en fonction du type de bilan
        let filteredSales, filteredOthers, filteredExpenses, filteredSupply;

        if (reportType === 'weekly') {
            // Filtrer par semaine
            filteredSales = filterDataByWeek(salesData, selectedWeek);
            filteredOthers = filterDataByWeek(othersData, selectedWeek);
            filteredExpenses = filterDataByWeek(expensesData, selectedWeek);
            filteredSupply = filterDataByWeek(supplyData, selectedWeek);
        }  else {
            // Utiliser la fonction de filtrage existante pour les autres types de bilan
            filteredSales = filterDataByDate(salesData, selectedDate, selectedMonth, selectedYear);
            filteredOthers = filterDataByDate(othersData, selectedDate, selectedMonth, selectedYear);
            filteredExpenses = filterDataByDate(expensesData, selectedDate, selectedMonth, selectedYear);
            filteredSupply = filterDataByDate(supplyData, selectedDate, selectedMonth, selectedYear);
        }


            // Mettre à jour et afficher le tableau de bilan
            updateReportTable(filteredSales, filteredOthers, filteredExpenses, filteredSupply);
            reportTableSection.style.display = 'block';
        });
    });

//Fonction pour filtrer les données par semaine
function filterDataByWeek(data, week) {
    if (!week) return {}; // Retourner un objet vide si aucune semaine n'est sélectionnée

    const [year, weekNum] = week.split('-W');
    const filteredData = {};

    for (const key in data) {
        const item = data[key];
        if (!item.date) continue;

        const itemDate = new Date(item.date);
        const itemYear = itemDate.getFullYear();
        const itemWeek = getWeekNumber(itemDate);

        if (itemYear === parseInt(year) && itemWeek === parseInt(weekNum)) {
            filteredData[key] = item;
        }
    }
    return filteredData;
}


// Fonction pour obtenir le numéro de semaine (utiliser la même que pour l'export Excel)
function getWeekNumber(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
}

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
// Mettre à jour updateReportTable
function updateReportTable(sales, others, expenses, supply) {
    reportTableBody.innerHTML = '';
    combinedReportData = {}; // Réinitialiser les données combinées à chaque mise à jour
    let totalReportQuantity = 0;
    let totalReportAmount = 0;
    let totalReportDesignationCount = 0;

    const addToReport = (item, type) => {
      const combinedKey = item.designation;
        if (!combinedReportData[combinedKey]) {
            combinedReportData[combinedKey] = {
                type: type,
                designation: item.designation,
                quantity: 0,
                amount: 0
            };
        }
        const quantity = parseFloat(item.quantity) || 0;
        const amount = (type === 'Approvisionnement') ? 0 : (parseFloat(item.amount || item.totalCost) || 0);
        combinedReportData[combinedKey].quantity += quantity;
        combinedReportData[combinedKey].amount += amount;
        totalReportQuantity += quantity; // Mettre à jour les totaux globaux
        totalReportAmount += amount;

    };

    for (const key in sales) addToReport(sales[key], 'Vente');
    for (const key in others) addToReport(others[key], 'Autre');
    for (const key in expenses) addToReport(expenses[key], 'Dépense');
    for (const key in supply) addToReport(supply[key], 'Approvisionnement');

    for (const key in combinedReportData) {
        const data = combinedReportData[key];
        const row = reportTableBody.insertRow();
        row.insertCell().textContent = data.type;
        row.insertCell().textContent = data.designation;
        row.insertCell().textContent = data.quantity;
        row.insertCell().textContent = data.amount.toFixed(2);
        totalReportDesignationCount++; // Incrémenter pour chaque désignation/motif
    }

    updateReportTotals(totalReportQuantity, totalReportAmount, totalReportDesignationCount);

    if (Object.keys(combinedReportData).length === 0) {
        displayEmptyTableMessage(reportTableBody, 4, "Aucune donnée à afficher pour ce bilan.");
    }
}

//Fonction pour mettre à jour les totaux du bilan.
function updateReportTotals(totalQuantity, totalAmount, designationCount) {
    document.getElementById('total-report-quantity').textContent = totalQuantity;
    document.getElementById('total-report-amount').textContent = totalAmount.toFixed(2);
    document.getElementById('total-report-designation-count').textContent = `(${designationCount})`; // Simplifié ici
}

    //Bilan Excel
    exportReportExcelButton.addEventListener('click', function () {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(document.getElementById('report-table'));

    // Ajout de la ligne de total au worksheet (pour Excel)
    const totalRow = {
        "Type d'Opération": "Total:",
        "Désignation": `(${document.getElementById('total-report-designation-count').textContent})`,
        "Quantité": parseFloat(document.getElementById('total-report-quantity').textContent),
        "Montant/Coût total": parseFloat(document.getElementById('total-report-amount').textContent)
    };
    XLSX.utils.sheet_add_json(ws, [totalRow], { skipHeader: true, origin: -1 });

     // Style pour la ligne de total (gras)
    const lastRowIndex = ws['!ref'].split(':')[1].replace(/[A-Z]/g, ''); // Obtenir l'index de la dernière ligne
     for (let col in ws) {
        if (ws.hasOwnProperty(col) && col.startsWith('A') && col.replace(/[A-Z]/g, '') === lastRowIndex ) {

            ws[col].s = { font: { bold: true } };
        }
    }

    XLSX.utils.sheet_insert_row(ws, 0, 1); // Insère une ligne vide en haut
    XLSX.utils.sheet_add_aoa(ws, [["Bilan"]], { origin: "A1" }); // Ajoute le titre "Bilan" en A1
    const titleCell = ws['A1'];
    if (titleCell) {
        titleCell.s = {  // Applique le style au titre
            font: { bold: true, sz: 14 } // Gras, taille 14
        };
    }
    XLSX.utils.book_append_sheet(wb, ws, "Bilan");
    XLSX.writeFile(wb, "Bilan.xlsx");
});


    //Bilan PDF
 exportReportPdfButton.addEventListener('click', function () {
    window.jsPDF = window.jspdf.jsPDF;
    const doc = new jsPDF();

    // Récupérer les en-têtes du tableau (y compris si la thead est implicite)
    const table = document.getElementById('report-table');
    let headers = [];
    if (table.tHead && table.tHead.rows.length > 0) {
        headers = Array.from(table.tHead.rows[0].cells).map(cell => cell.textContent);
    } else if (table.rows.length > 0) {
        // Si pas de thead, prendre la première ligne comme en-tête
        headers = Array.from(table.rows[0].cells).map(cell => cell.textContent);
    }

    // Récupérer les données du tableau (tbody)
    const body = Array.from(table.querySelectorAll('tbody tr'))
        .map(row => Array.from(row.querySelectorAll('td')).map(td => td.textContent));

    // Récupérer les données du pied de tableau (tfoot)
    const foot = [];
    const tfoot = table.querySelector('tfoot');
    if (tfoot) {
      Array.from(tfoot.rows).forEach(row => {
        foot.push(Array.from(row.cells).map(cell => cell.textContent));
      });
    }
     if (body.length === 0 && foot.length === 0) {
        alert("Aucune donnée à exporter.");
        return;
    }



    doc.autoTable({
        head: [headers], // Utilise les en-têtes extraits
        body: body,
        foot: foot, // Ajout du pied de table
        didParseCell: function (data) {
            if (data.section === 'head') {
                data.cell.styles.fontStyle = 'bold';
            }
        },
        footStyles: {  // Style pour le tfoot
                fontStyle: 'bold',
                fillColor: [240, 240, 240] // Couleur de fond
        },
        theme: 'grid', // Plus lisible pour les données
        styles: {
            fontSize: 10,       // Réduit légèrement la taille de police
            cellPadding: 3,     // Réduit l'espacement
            overflow: 'linebreak', // Gère le texte long
        },
        headStyles: {
            fillColor: [41, 128, 185], // Couleur d'en-tête
            textColor: 255,         // Texte en blanc
            fontSize: 11,
            fontStyle: 'bold'
        },
        title: 'Bilan',
        filename: 'Bilan.pdf',
        lang: 'fr' // Important pour les accents, etc.
    });

    if (doc.getNumberOfPages() > 0) { //Toujours vérifier avant de save
        doc.save("Bilan.pdf");
    } else {
        alert("Erreur lors de la création du PDF : Aucune page générée.");
    }
});

  // Ajout des event listeners pour la recherche
    searchSalesInput.addEventListener('input', updateSalesTable);
    searchExpensesInput.addEventListener('input', updateExpensesTable);
    searchOthersInput.addEventListener('input', updateOthersTable);
    searchSupplyInput.addEventListener('input', updateSupplyTable);
    searchUsersInput.addEventListener('input', updateUserTable);
    searchReportInput.addEventListener('input', () => {
    const searchTerm = searchReportInput.value.toLowerCase();

    // Filtrer les données du bilan (qui sont déjà combinées dans combinedReportData)
    const filteredReportData = {};
        for (const key in combinedReportData) {
            if (combinedReportData.hasOwnProperty(key)) {
                const item = combinedReportData[key];
                if (item.designation && item.designation.toLowerCase().includes(searchTerm)) {
                    filteredReportData[key] = item;
                }
            }
        }

        // Vider le tbody actuel
        reportTableBody.innerHTML = '';

        // Afficher les données filtrées et recalculer les totaux
        let filteredTotalQuantity = 0;
        let filteredTotalAmount = 0;
        let filteredDesignationCount = 0;

        for (const key in filteredReportData) {
            if (filteredReportData.hasOwnProperty(key)) {
                const item = filteredReportData[key];
                const row = reportTableBody.insertRow();
                row.insertCell().textContent = item.type;
                row.insertCell().textContent = item.designation;
                row.insertCell().textContent = item.quantity;
                row.insertCell().textContent = item.amount.toFixed(2);

                filteredTotalQuantity += item.quantity;
                filteredTotalAmount += item.amount;
                filteredDesignationCount++;
            }
        }

        // Mettre à jour les totaux avec les données filtrées
    updateReportTotals(filteredTotalQuantity, filteredTotalAmount, filteredDesignationCount);
});



    showLoginForm(); // Affiche la fenêtre de connexion au chargement initial.

    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    }

    // Animer le défilement vers le haut
    backToTopButton.addEventListener('click', function (event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    //  Écouteur d'événements pour le bouton de menu et les boutons de navigation
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('menu-open');
    });

    // Ajout de l'écouteur d'événements pour chaque bouton de navigation
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', () => {
            // Fermer le menu sur les petits écrans
            if (window.innerWidth <= 768) {  // Vérifier la largeur de l'écran
                mainNav.classList.remove('menu-open');
            }
        });
    });
     let combinedReportData = {}; // Déclarer la variable ici
});