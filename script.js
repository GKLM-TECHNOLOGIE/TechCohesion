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

    // Supply Export Buttons - Now explicitly retrieved
    const printSupplyTableButton = document.getElementById('print-supply-table');
    const exportSupplyExcelButton = document.getElementById('export-supply-excel');
    const exportSupplyPdfButton = document.getElementById('export-supply-pdf');
     const supplyExportButtonsDiv = document.getElementById('supply-export-buttons'); // Get the div container

    // Other Export Buttons
    const printSalesTableButton = document.getElementById('print-sales-table');
    const printOthersTableButton = document.getElementById('print-others-table');
    const printExpensesTableButton = document.getElementById('print-expenses-table');
    const exportSalesExcelButton = document.getElementById('export-sales-excel');
    const exportOthersExcelButton = document.getElementById('export-others-excel');
    const exportExpensesExcelButton = document.getElementById('export-expenses-excel');
    const exportReportExcelButton = document.getElementById('export-report-excel');
    const exportSalesPdfButton = document.getElementById('export-sales-pdf');
    const exportOthersPdfButton = document.getElementById('export-others-pdf');
    const exportExpensesPdfButton = document.getElementById('export-expenses-pdf');
    const exportReportPdfButton = document.getElementById('export-report-pdf');

    const backToTopButton = document.getElementById('back-to-top');
    const showSupplyDetailsButton = document.getElementById('show-supply-details'); // Button to toggle table visibility

    const loginOverlay = document.getElementById('login-overlay');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const userInfoBar = document.getElementById('user-info-bar');
    const userInfoUsername = document.getElementById('user-info-username');
    const userInfoStatus = document.getElementById('user-info-status');
    const logoutButton = document.getElementById('logout-button');

    // New DOM elements for user display in forms
    const currentUserDisplayInput = document.getElementById('current-user-display');


    let currentUser = null;

     // Champs de recherche
    const searchSalesInput = document.getElementById('search-sales');
    const searchExpensesInput = document.getElementById('search-expenses');
    const searchOthersInput = document.getElementById('search-others');
    const searchSupplyInput = document.getElementById('search-supply');
    const searchUsersInput = document.getElementById('search-users');
    const searchReportInput = document.getElementById('search-report');


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

    // New function to update user display in forms
    function updateLoggedInUserDisplay() {
        if (currentUser && currentUserDisplayInput) {
            currentUserDisplayInput.value = currentUser.username;
        } else if (currentUserDisplayInput) {
            currentUserDisplayInput.value = '';
        }
    }

    // Modified handleLogin
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
                    updateLoggedInUserDisplay(); // Update user display in forms
                    initializeData(); // Load data based on new user? Or just update tables. Let's assume update tables.
                    applyUserRestrictions(); // Apply restrictions based on level

                     // Optionally redirect or show a default section after login
                     showSection(salesSection); // Or another default section
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

    // Modified handleLogout
    function handleLogout() {
        currentUser = null;
        showLoginForm();
        showSection(); // Hide all sections
        updateLoggedInUserDisplay(); // Clear user display in forms

         // Clear all tables
        salesTableBody.innerHTML = '';
        othersTableBody.innerHTML = '';
        expensesTableBody.innerHTML = '';
        supplyTableBody.innerHTML = '';
        userTable.innerHTML = '';
        reportTableBody.innerHTML = '';

        userInfoBar.style.display = 'none';
        resetUserRestrictions(); //Reset restrictions
    }

    // --- Fonctions Utilitaires ---
    function showSection(sectionToShow) {
        // Hide all main sections
        if (supplySection) supplySection.style.display = 'none';
        if (salesSection) salesSection.style.display = 'none';
        if (reportSection) reportSection.style.display = 'none';
        if (adminSection) adminSection.style.display = 'none';

        // Hide all detail tables and filters
        if (salesDetails) salesDetails.style.display = 'none';
        if (othersDetails) othersDetails.style.display = 'none';
        if (expensesDetails) expensesDetails.style.display = 'none';
        if (reportFilters) reportFilters.style.display = 'none';
        if (reportTableSection) reportTableSection.style.display = 'none';
        if (supplyTableElement) supplyTableElement.style.display = 'none'; // Hide supply table
        if (supplyExportButtonsDiv) supplyExportButtonsDiv.style.display = 'none'; // Hide supply buttons
         if (searchSupplyInput.parentElement) searchSupplyInput.parentElement.style.display = 'none'; // Hide supply search
         if (document.getElementById('supply-table-title')) document.getElementById('supply-table-title').style.display = 'none';


        // Show the requested section
        if (sectionToShow) {
            sectionToShow.style.display = 'block';
            // If showing sales, initialize state for its details
             if (sectionToShow === salesSection) {
                 operationTypeSelect.value = 'Vente';
                 venteDetails.style.display = 'block';
                 autreDetails.style.display = 'none';
                 depenseDetails.style.display = 'none';
             } else if (sectionToShow === supplySection) {
                  // When showing supply section, the table and buttons are initially hidden, shown by toggle
             } else if (sectionToShow === reportSection) {
                 // When showing report, hide filters by default until a report type is clicked
                 reportFilters.style.display = 'none';
             }
        }
         updateLoggedInUserDisplay(); // Ensure user display is updated when section changes
         applyUserRestrictions(); // Re-apply restrictions just in case
    }

    function updateProductDesignations() {
        supplyRef.once('value', snapshot => {
            const supplyData = snapshot.val() || {};
            // Only get designations from items where quantity is > 0
            const designations = Object.values(supplyData)
                .filter(item => (parseFloat(item.quantity) || 0) > 0)
                .map(item => item.designation);
            const uniqueDesignations = Array.from(new Set(designations));

             saleDesignationSelect.innerHTML = '<option value="">-- Sélectionner --</option>' + // Add a default option
                uniqueDesignations.map(designation => `<option value="${designation}">${designation}</option>`).join('');
        });
    }

    function setTodaysDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('sale-date').value = today;
        document.getElementById('supply-date').value = today;
    }

    function toggleSection(section) {
        // Helper to toggle visibility of sales/others/expenses details within the sales section
        const sections = [salesDetails, othersDetails, expensesDetails];
        sections.forEach(sec => {
            if (sec && sec !== section) {
                sec.style.display = 'none';
            }
        });
        if (section) {
             section.style.display = section.style.display === 'none' ? 'block' : 'none';
        }
         // Hide export buttons and search for sales/others/expenses when detail sections are hidden
         if(salesDetails && salesDetails.style.display === 'none' &&
            othersDetails && othersDetails.style.display === 'none' &&
            expensesDetails && expensesDetails.style.display === 'none')
            {
                if(searchSalesInput.parentElement) searchSalesInput.parentElement.style.display = 'none';
                if(searchOthersInput.parentElement) searchOthersInput.parentElement.style.display = 'none';
                if(searchExpensesInput.parentElement) searchExpensesInput.parentElement.style.display = 'none';
                salesDetails.querySelector('.button-group').style.display = 'none';
                othersDetails.querySelector('.button-group').style.display = 'none';
                expensesDetails.querySelector('.button-group').style.display = 'none';

             } else {
                if(salesDetails && salesDetails.style.display === 'block') {
                     if(searchSalesInput.parentElement) searchSalesInput.parentElement.style.display = 'block';
                     salesDetails.querySelector('.button-group').style.display = 'flex';
                 } else if (othersDetails && othersDetails.style.display === 'block') {
                      if(searchOthersInput.parentElement) searchOthersInput.parentElement.style.display = 'block';
                      othersDetails.querySelector('.button-group').style.display = 'flex';
                 } else if (expensesDetails && expensesDetails.style.display === 'block') {
                     if(searchExpensesInput.parentElement) searchExpensesInput.parentElement.style.display = 'block';
                     expensesDetails.querySelector('.button-group').style.display = 'flex';
                 }
             }
    }


    function toggleSupplyTable() {
        const isVisible = supplyTableElement.style.display !== 'none';
        supplyTableElement.style.display = isVisible ? 'none' : 'table';
        supplyExportButtonsDiv.style.display = isVisible ? 'none' : 'flex';
        searchSupplyInput.parentElement.style.display = isVisible ? 'none' : 'block';
        document.getElementById('supply-table-title').style.display = isVisible ? 'none' : 'block';
    }


    function initializeData() {
        updateProductDesignations();
        updateSalesTable();
        updateOthersTable();
        updateExpensesTable();
        updateSupplyTable();
        updateUserTable(); // Only available to Admin, but table structure is there
        setTodaysDate();
         updateLoggedInUserDisplay(); // Ensure display on first load after login
    }


    // --- Gestion des Restrictions ---
    function applyUserRestrictions() {
        if (!currentUser) {
             // Default restrictions if no user is logged in (should be handled by login overlay)
             disableElements([salesForm, supplyForm, userForm, generateReportButton, showSupplySectionButton, showSalesSectionButton, showReportSectionButton, showAdminSectionButton]);
              disableButtonsByClass('edit-button');
             disableButtonsByClass('delete-button');
             return;
        }

        // Enable/Disable Sections and Forms based on access level
        showSupplySectionButton.disabled = !(currentUser.accessLevel === 'Administrateur' || currentUser.accessLevel === 'Éditeur');
        salesForm.querySelectorAll('input, select, button.submit-button').forEach(el => el.disabled = !(currentUser.accessLevel === 'Administrateur' || currentUser.accessLevel === 'Éditeur'));
        showSalesSectionButton.disabled = !(currentUser.accessLevel === 'Administrateur' || currentUser.accessLevel === 'Éditeur');
        supplyForm.querySelectorAll('input, select, button.submit-button').forEach(el => el.disabled = !(currentUser.accessLevel === 'Administrateur' || currentUser.accessLevel === 'Éditeur'));
        showReportSectionButton.disabled = !(currentUser.accessLevel === 'Administrateur' || currentUser.accessLevel === 'Lecteur'); // Editor cannot see reports
        reportFilters.querySelectorAll('input, select, button').forEach(el => el.disabled = !(currentUser.accessLevel === 'Administrateur' || currentUser.accessLevel === 'Lecteur'));
        generateReportButton.disabled = !(currentUser.accessLevel === 'Administrateur' || currentUser.accessLevel === 'Lecteur');
        showAdminSectionButton.disabled = !(currentUser.accessLevel === 'Administrateur');
        userForm.querySelectorAll('input, select, button.submit-button').forEach(el => el.disabled = !(currentUser.accessLevel === 'Administrateur'));


        // Enable/Disable Action Buttons (Edit/Delete) in Tables based on access level
        const editButtons = document.getElementsByClassName('edit-button');
        const deleteButtons = document.getElementsByClassName('delete-button');

        for (let button of editButtons) {
             button.disabled = !(currentUser.accessLevel === 'Administrateur'); // Only Admin can edit/delete
        }
         for (let button of deleteButtons) {
             button.disabled = !(currentUser.accessLevel === 'Administrateur'); // Only Admin can edit/delete
        }

         // Read-only user input is always disabled
         if (currentUserDisplayInput) currentUserDisplayInput.disabled = true;
    }


    function resetUserRestrictions() {
        // Re-enable all elements (as if no user is logged in, prepares for login form)
        enableElements([salesForm, supplyForm, userForm, generateReportButton, showSupplySectionButton, showSalesSectionButton, showReportSectionButton, showAdminSectionButton]);
        enableButtonsByClass('edit-button');
        enableButtonsByClass('delete-button');

        // Disable the readonly user input
         if (currentUserDisplayInput) currentUserDisplayInput.disabled = true;
    }


    function disableElements(elements) {
        elements.forEach(element => {
            if (element) {
                element.disabled = true;
                // Also disable children of forms or form containers
                if (element.tagName === 'FORM' || element.classList.contains('form-container')) {
                     element.querySelectorAll('input, select, textarea, button').forEach(input => input.disabled = true);
                }
            }
        });
    }

    function enableElements(elements) {
        elements.forEach(element => {
            if (element) {
                element.disabled = false;
                 // Also enable children of forms or form containers
                if (element.tagName === 'FORM' || element.classList.contains('form-container')) {
                    element.querySelectorAll('input, select, textarea, button').forEach(input => input.disabled = false);
                }
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

        // Apply initial restrictions (important!)
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
        if (currentUser && currentUser.accessLevel !== 'Administrateur') {
             alert("Vous n'avez pas l'autorisation de modifier ou supprimer des entrées.");
             return;
         }

        if (dataType === 'sales') {
            salesFormKeyInput.value = key;
            salesRef.child(key).once('value', snapshot => {
                const saleData = snapshot.val();
                if (saleData) {
                    populateSalesForm(saleData);
                    salesForm.querySelector('.submit-button').textContent = 'Modifier Opération';
                    scrollToTop();
                     showSection(salesSection); // Ensure sales section is visible
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
                    showSection(salesSection); // Ensure sales section is visible
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
                    showSection(salesSection); // Ensure sales section is visible
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
                     showSection(supplySection); // Ensure supply section is visible
                }
            });
        } else if (dataType === 'users') {
             if (currentUser && currentUser.accessLevel !== 'Administrateur') return; // Double check restriction

            userFormKeyInput.value = key;
            usersRef.child(key).once('value', snapshot => {
                const userData = snapshot.val();
                if (userData) {
                    populateUserForm(userData);
                    userForm.querySelector('.submit-button').textContent = 'Modifier Compte';
                    scrollToTop();
                     showSection(adminSection); // Ensure admin section is visible
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
        // No need to populate currentUserDisplayInput here, it's read-only
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
         // No need to populate currentUserDisplayInput here
    }

    function populateExpensesForm(data) {
        document.getElementById('sale-date').value = data.date;
        document.getElementById('operation-type').value = 'Dépense';
        venteDetails.style.display = 'none';
        autreDetails.style.display = 'none';
        depenseDetails.style.display = 'block';
        expenseDesignationInput.value = data.designation;
        expenseQuantityInput.value = data.quantity;
        expenseAmountInput.value = data.amount;
         // No need to populate currentUserDisplayInput here
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
        if (currentUser && currentUser.accessLevel !== 'Administrateur') {
             alert("Vous n'avez pas l'autorisation de modifier ou supprimer des entrées.");
             return;
         }

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
                 if (currentUser && currentUser.accessLevel !== 'Administrateur') return; // Double check restriction
                 ref = usersRef;
                // Prevent deleting the currently logged-in user
                if (currentUser && key === firebase.database().ref('users').orderByChild('username').equalTo(currentUser.username).key) { // This key comparison might be complex, simplified check
                     alert("Vous ne pouvez pas supprimer votre propre compte.");
                     return;
                 }
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
            let totalAmount = 0; // Financial total
            let designationCount = 0;
            let totalUnitPrice = 0; // For Sales
            let filteredData = {};

            // Filtrage
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
                for (const key in data) {
                    const item = data[key];
                     // Determine the field to search based on data type
                    let searchField = '';
                     if (dataType === 'supply' && item.designation) searchField = item.designation;
                    else if (dataType === 'users' && item.username) searchField = item.username;
                    else if ((dataType === 'others' || dataType === 'expenses') && item.motif) searchField = item.motif;
                    else if (dataType === 'sales' && item.designation) searchField = item.designation;


                    if (searchField && searchField.toLowerCase().includes(searchTerm)) {
                        filteredData[key] = item;
                    }
                }


            if (Object.keys(filteredData).length === 0) {
                let colspan = 5;
                 if (dataType === 'sales') colspan = 6;
                else if (dataType === 'users') colspan = 3;
                 else if (dataType === 'others' || dataType === 'expenses') colspan = 5;

                displayEmptyTableMessage(tableBody, colspan, `Aucune ${dataType} enregistrée.`);
                 // Réinitialiser les totaux quand le tableau est vide
                if (dataType === 'sales') updateSalesTotals(0, 0, 0, 0);
                if (dataType === 'others') updateOthersTotals(0, 0, 0);
                if (dataType === 'expenses') updateExpensesTotals(0, 0, 0);
                if (dataType === 'supply') updateSupplyTotals(0, 0, 0, 0);

                return;
            }

            for (const key in filteredData) {
                const item = filteredData[key];
                const row = tableBody.insertRow();

               if (dataType === 'supply') {
                    // Supply table rows are populated within updateSupplyTable due to async sales data fetch
                    // No action needed here for 'supply' row creation
               } else {
                    // For 'sales', 'others', 'expenses', and 'users'
                    if (dataType === 'sales') {
                        row.insertCell().textContent = item.date;
                        row.insertCell().textContent = item.designation;
                         // Format currency fields, keep quantity as number
                        row.insertCell().textContent = parseFloat(item.quantity) || 0;
                        row.insertCell().textContent = (parseFloat(item.unitPrice) || 0).toFixed(0) + ' FCFA';
                        row.insertCell().textContent = (parseFloat(item.totalCost) || 0).toFixed(0) + ' FCFA';

                         // Accumulate raw numbers for totals
                         totalQuantity += parseFloat(item.quantity) || 0;
                         totalAmount += parseFloat(item.totalCost) || 0;
                         totalUnitPrice += parseFloat(item.unitPrice) || 0;
                         designationCount++;
                    } else if (dataType === 'others') {
                        row.insertCell().textContent = item.date;
                        row.insertCell().textContent = item.motif;
                         // Format currency fields, keep quantity as number
                        row.insertCell().textContent = parseFloat(item.quantity) || 0;
                        row.insertCell().textContent = (parseFloat(item.amount) || 0).toFixed(0) + ' FCFA';

                         // Accumulate raw numbers for totals
                        totalQuantity += parseFloat(item.quantity) || 0;
                        totalAmount += parseFloat(item.amount) || 0;
                        designationCount++;
                    } else if (dataType === 'expenses') {
                        row.insertCell().textContent = item.date;
                        row.insertCell().textContent = item.motif;
                         // Format currency fields, keep quantity as number
                        row.insertCell().textContent = parseFloat(item.quantity) || 0;
                        row.insertCell().textContent = (parseFloat(item.amount) || 0).toFixed(0) + ' FCFA';

                         // Accumulate raw numbers for totals
                         totalQuantity += parseFloat(item.quantity) || 0;
                         totalAmount += parseFloat(item.amount) || 0;
                         designationCount++;

                    } else if (dataType === 'users') {
                        row.insertCell().textContent = item.username;
                        row.insertCell().textContent = item.accessLevel;
                        // No totaux for 'users'
                    }
                     // Add action buttons for non-supply tables here
                    if (dataType !== 'supply') {
                         row.appendChild(createActionButtons(key, dataType));
                     }
                }
            }

            // Mettre à jour les totaux pour 'sales', 'others', et 'expenses' (en dehors de la boucle)
              if (dataType === 'sales') {
                    updateSalesTotals(totalQuantity, totalAmount, designationCount, totalUnitPrice);
                } else if (dataType === 'others') {
                    updateOthersTotals(totalQuantity, totalAmount, designationCount);
                } else if (dataType === 'expenses') {
                    updateExpensesTotals(totalQuantity, totalAmount, designationCount);
                }
             // Supply totals are handled differently inside updateSupplyTable

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
        document.getElementById('total-sales-amount').textContent = totalAmount.toFixed(0) + ' FCFA'; // Format total amount
        document.getElementById('total-sales-designation-count').textContent = `Total (${designationCount})`;
        document.getElementById('total-sales-unit-price').textContent = totalUnitPrice.toFixed(0) + ' FCFA'; // Format total unit price (less common, but requested)
    }

    function updateOthersTotals(totalQuantity, totalAmount, designationCount) {
        document.getElementById('total-others-quantity').textContent = totalQuantity;
        document.getElementById('total-others-amount').textContent = totalAmount.toFixed(0) + ' FCFA'; // Format total amount
        document.getElementById('total-others-designation-count').textContent = `Total (${designationCount})`;
    }

    function updateExpensesTotals(totalQuantity, totalAmount, designationCount) {
        document.getElementById('total-expenses-quantity').textContent = totalQuantity;
        document.getElementById('total-expenses-amount').textContent = totalAmount.toFixed(0) + ' FCFA'; // Format total amount
        document.getElementById('total-expenses-designation-count').textContent = `Total (${designationCount})`;
    }

    function updateSupplyTotals(totalQuantity, totalSold, totalRemaining, designationCount) {
        document.getElementById('total-supply-quantity').textContent = totalQuantity;
        document.getElementById('total-sold-quantity').textContent = totalSold;
        document.getElementById('total-remaining-quantity').textContent = totalQuantity - totalSold; // Calculation remains numeric
        document.getElementById('total-supply-designation-count').textContent = `Total (${designationCount}):`;
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

     // Modified updateSupplyTable to calculate totals correctly after the async call
    function updateSupplyTable() {
        supplyRef.on('value', (snapshot) => {
            supplyTableBody.innerHTML = '';
            const data = snapshot.val() || {};
            let filteredData = {};
            const searchTerm = searchSupplyInput ? searchSupplyInput.value.toLowerCase() : '';

            let totalQuantity = 0;
            let totalSold = 0;
            let totalRemaining = 0; // This total is calculated later
            let designationCount = 0;

            for (const key in data) {
                const item = data[key];
                if (item.designation && item.designation.toLowerCase().includes(searchTerm)) {
                    filteredData[key] = item;
                }
            }

             if (Object.keys(filteredData).length === 0) {
                displayEmptyTableMessage(supplyTableBody, 6, "Aucun approvisionnement enregistré.");
                updateSupplyTotals(0, 0, 0, 0); // Réinitialiser les totaux si vide
                return;
            }


            const promises = [];
            for (const key in filteredData) {
                 promises.push(
                    salesRef.once('value').then((salesSnapshot) => {
                        const item = filteredData[key];
                        const salesData = salesSnapshot.val() || {};
                        let soldQuantity = 0;
                        for (const saleKey in salesData) {
                            const sale = salesData[saleKey];
                            if (sale.designation === item.designation) {
                                soldQuantity += parseFloat(sale.quantity) || 0;
                            }
                        }
                        const remainingQuantity = (parseFloat(item.quantity) || 0) - soldQuantity;

                        const row = supplyTableBody.insertRow();
                        row.insertCell().textContent = item.date;
                        row.insertCell().textContent = item.designation;
                        row.insertCell().textContent = parseFloat(item.quantity) || 0;
                        row.insertCell().textContent = soldQuantity;
                        row.insertCell().textContent = remainingQuantity;
                        row.appendChild(createActionButtons(key, 'supply'));

                        // Accumulate the raw numbers for totals
                        totalQuantity += parseFloat(item.quantity) || 0;
                        totalSold += soldQuantity;
                         // totalRemaining is calculated in updateSupplyTotals

                        designationCount++;


                    })
                 );
            }

            // Wait for all promises to resolve before updating totals
            Promise.all(promises).then(() => {
                // Calculate totalRemaining here after totalQuantity and totalSold are finalized
                totalRemaining = totalQuantity - totalSold;
                updateSupplyTotals(totalQuantity, totalSold, totalRemaining, designationCount);
                 applyUserRestrictions(); // Apply restrictions after rows are added
            });
        });
    }


    function updateUserTable() {
        updateTable(userTable, usersRef, 'users', searchUsersInput);
    }

    function calculateTotalCost() {
        const quantity = parseFloat(saleQuantityInput.value) || 0;
        const unitPrice = parseFloat(saleUnitPriceInput.value) || 0;
        // Store raw number
        return quantity * unitPrice;
    }


   function handleFormSubmit(event, operationType) {
        event.preventDefault();
        const formKey = salesFormKeyInput.value;
        let operationData;
        let dbRef;

        // Ensure user is logged in
        if (!currentUser) {
             alert("Veuillez vous connecter pour enregistrer des opérations.");
             return;
        }

        const username = currentUser.username; // Get logged-in username

        if (operationType === 'Vente') {
            operationData = {
                date: document.getElementById('sale-date').value,
                designation: saleDesignationSelect.value,
                quantity: parseFloat(saleQuantityInput.value) || 0,
                unitPrice: parseFloat(saleUnitPriceInput.value) || 0, // Store raw number
                totalCost: calculateTotalCost(), // Store raw number
                username: username // Save username
            };
             if (!operationData.designation || operationData.quantity <= 0 || operationData.unitPrice < 0) {
                 alert("Veuillez remplir tous les champs de vente correctement.");
                 return;
             }
            dbRef = salesRef;
        } else if (operationType === 'Autre') {
            operationData = {
                date: document.getElementById('sale-date').value,
                designation: otherDesignationInput.value, // Using designation field for 'Autre' motif
                motif: otherDesignationInput.value, // Explicitly saving motif
                quantity: parseFloat(otherQuantityInput.value) || 0,
                amount: parseFloat(otherAmountInput.value) || 0, // Store raw number
                username: username // Save username
            };
             if (!operationData.motif || operationData.quantity <= 0 || operationData.amount < 0) {
                 alert("Veuillez remplir tous les champs 'Autre Opération' correctement.");
                 return;
             }
            dbRef = othersRef;
        } else if (operationType === 'Dépense') {
            operationData = {
                date: document.getElementById('sale-date').value,
                 designation: expenseDesignationInput.value, // Using designation field for 'Dépense' motif
                 motif: expenseDesignationInput.value, // Explicitly saving motif
                quantity: parseFloat(expenseQuantityInput.value) || 0,
                amount: parseFloat(expenseAmountInput.value) || 0, // Store raw number
                username: username // Save username
            };
             if (!operationData.motif || operationData.quantity <= 0 || operationData.amount < 0) {
                  alert("Veuillez remplir tous les champs 'Dépense' correctement.");
                 return;
             }
            dbRef = expensesRef;
        } else {
             alert("Type d'opération inconnu.");
             return;
         }

         if (!operationData.date) {
             alert("Veuillez sélectionner une date.");
             return;
         }


        const isEditMode = !!formKey;
        const updateFunction = isEditMode ? dbRef.child(formKey).update(operationData) : dbRef.push(operationData);
        updateFunction.then(() => {
            salesForm.reset();
            setTodaysDate();
            salesFormKeyInput.value = '';
            salesForm.querySelector('.submit-button').textContent = 'Ajouter Opération';
             updateLoggedInUserDisplay(); // Restore username display after reset
             alert("Opération enregistrée !");

        })
        .catch(error => {
            console.error("Erreur lors de l'opération:", error);
            alert("Une erreur s'est produite lors de l'enregistrement. Veuillez vérifier votre connexion et réessayer.");
        });
    }


    function handleSupplyFormSubmit(event) {
        event.preventDefault();
        const formKey = supplyFormKeyInput.value;
        const supplyDesignation = document.getElementById('supply-designation').value;
        const supplyQuantity = parseFloat(document.getElementById('supply-quantity').value) || 0;
         const supplyDate = document.getElementById('supply-date').value;

        // Ensure user is logged in
        if (!currentUser) {
             alert("Veuillez vous connecter pour enregistrer des approvisionnements.");
             return;
        }
         const username = currentUser.username; // Get logged-in username


        if (!supplyDesignation || supplyQuantity <= 0 || !supplyDate) {
             alert("Veuillez remplir la date, la désignation et la quantité (doit être supérieure à 0).");
             return;
         }


        supplyRef.orderByChild('designation').equalTo(supplyDesignation).once('value', (snapshot) => {
            const existingSupplies = snapshot.val();
            let existingKey = null;
            if (existingSupplies) {
                 for(const key in existingSupplies) {
                     if (existingSupplies[key].designation === supplyDesignation) {
                         existingKey = key;
                         break;
                     }
                 }
            }


            if (existingKey && !formKey) { // If exists and not in edit mode, update quantity
                let currentQuantity = parseFloat(existingSupplies[existingKey].quantity) || 0;
                let totalQuantity = currentQuantity + supplyQuantity;

                supplyRef.child(existingKey).update({
                    quantity: totalQuantity,
                    date: supplyDate, // Update date to the latest
                    username: username // Save username on update
                }).then(() => {
                    supplyForm.reset();
                    setTodaysDate();
                    updateProductDesignations(); // Update sales select options
                    alert("Quantité d'approvisionnement mise à jour !");
                }).catch(handleError);

            } else if (formKey) { // If in edit mode, update specific entry
                 const supplyData = {
                    date: supplyDate,
                    designation: supplyDesignation,
                    quantity: supplyQuantity,
                    username: username // Save username on edit
                };
                 supplyRef.child(formKey).update(supplyData).then(() => {
                    supplyForm.reset();
                    setTodaysDate();
                    supplyFormKeyInput.value = '';
                    supplyForm.querySelector('.submit-button').textContent = 'Ajouter Approvisionnement';
                    updateProductDesignations();
                    alert("Approvisionnement modifié avec succès !");
                 }).catch(handleError);

            }
            else { // New supply entry
                 const supplyData = {
                    date: supplyDate,
                    designation: supplyDesignation,
                    quantity: supplyQuantity,
                    username: username // Save username on creation
                };
                 supplyRef.push(supplyData).then(() => {
                    supplyForm.reset();
                    setTodaysDate();
                    updateProductDesignations();
                    alert("Approvisionnement ajouté avec succès !");
                 }).catch(handleError);
            }
        });

        function handleError(error) {
            console.error("Erreur lors de l'opération:", error);
            alert("Une erreur s'est produite lors de l'enregistrement de l'approvisionnement. Veuillez vérifier votre connexion et réessayer.");
        }
    }


    function handleUserFormSubmit(event) {
        event.preventDefault();
        const formKey = userFormKeyInput.value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const accessLevel = document.getElementById('access-level').value;

        if (currentUser && currentUser.accessLevel !== 'Administrateur') {
             alert("Vous n'avez pas l'autorisation de gérer les utilisateurs.");
             userForm.reset(); // Reset form if unauthorized
             return;
         }


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
             // Prevent editing the currently logged-in admin user's own access level
             // This check is simplified; relies on currentUser object
             if (currentUser && currentUser.accessLevel === 'Administrateur' && formKey === firebase.database().ref('users').orderByChild('username').equalTo(currentUser.username).key) {
                 // Need to find the actual key of the current user
                 usersRef.orderByChild('username').equalTo(currentUser.username).once('value', snapshot => {
                     const currentAdminUserKey = Object.keys(snapshot.val() || {})[0];
                      if (formKey === currentAdminUserKey && accessLevel !== currentUser.accessLevel) {
                         alert("Vous ne pouvez pas modifier votre propre niveau d'accès administrateur.");
                         return; // Stop the update process
                      } else {
                          // Proceed with update for self or other users
                           performUserUpdate(formKey, userData);
                      }
                 });
             } else {
                  // Allow editing for non-admin users (handled by initial restriction) or if admin is editing another user
                 performUserUpdate(formKey, userData);
             }

        } else { // Create new user
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
                     alert("Nouvel utilisateur créé !");
                }).catch((error) => {
                    console.error("Erreur lors de la création de l'utilisateur:", error);
                    alert("Erreur lors de la création de l'utilisateur.");
                });
            });
        }
    }

    // Helper function for user update
    function performUserUpdate(key, data) {
        usersRef.child(key).update(data)
            .then(() => {
                userForm.reset();
                userFormKeyInput.value = '';
                userForm.querySelector('.submit-button').textContent = 'Créer Compte';
                alert("Compte utilisateur modifié !");
                // If the username was changed for the current user, prompt re-login
                 if (currentUser && data.username !== currentUser.username) {
                      // Need to find the actual key of the user being edited to compare
                      usersRef.orderByChild('username').equalTo(data.username).once('value', snapshot => {
                          const editedUserKey = Object.keys(snapshot.val() || {})[0];
                           // Compare the key of the edited user with the current user's original key
                          usersRef.orderByChild('username').equalTo(currentUser.username).once('value', currentSnapshot => {
                              const currentAdminUserKey = Object.keys(currentSnapshot.val() || {})[0];
                               if (editedUserKey === currentAdminUserKey) {
                                  alert("Votre nom d'utilisateur a été modifié. Veuillez vous reconnecter.");
                                  handleLogout(); // Force re-login
                               }
                          });
                      });
                  } else if (currentUser && key === firebase.database().ref('users').orderByChild('username').equalTo(currentUser.username).key) { // Simplified check for password/level change on self
                        // If access level or password changed for the current admin user, maybe also prompt re-login for safety
                        alert("Votre compte a été modifié. Veuillez vous reconnecter pour appliquer les changements.");
                        handleLogout(); // Force re-login
                  }
             })
            .catch((error) => {
                console.error("Erreur lors de la modification de l'utilisateur:", error);
                alert("Erreur lors de la modification de l'utilisateur.");
            });
    }


    // --- Event Listeners ---
    loginForm.addEventListener('submit', handleLogin);
    logoutButton.addEventListener('click', handleLogout);

    // No need to calculateTotalCost on input change, it's calculated on submit.
    // Let's keep the inputs numeric for better user experience when typing decimals
    // saleQuantityInput.addEventListener('input', () => { calculateTotalCost(); });
    // saleUnitPriceInput.addEventListener('input', () => { calculateTotalCost(); });


    operationTypeSelect.addEventListener('change', function () {
        venteDetails.style.display = this.value === 'Vente' ? 'block' : 'none';
        autreDetails.style.display = this.value === 'Autre' ? 'block' : 'none';
        depenseDetails.style.display = this.value === 'Dépense' ? 'block' : 'none';
        // Reset values when switching type to avoid accidental data submission
        saleDesignationSelect.value = saleDesignationSelect.options.length > 0 ? saleDesignationSelect.options[0].value : '';
        saleQuantityInput.value = '';
        saleUnitPriceInput.value = '';
        otherDesignationInput.value = '';
        otherQuantityInput.value = '';
        otherAmountInput.value = '';
        expenseDesignationInput.value = '';
        expenseQuantityInput.value = '';
        expenseAmountInput.value = '';
         salesFormKeyInput.value = ''; // Clear form key
         salesForm.querySelector('.submit-button').textContent = 'Ajouter Opération'; // Reset button text

    });

    salesForm.addEventListener('submit', (event) => handleFormSubmit(event, operationTypeSelect.value));
    supplyForm.addEventListener('submit', handleSupplyFormSubmit);
    userForm.addEventListener('submit', handleUserFormSubmit);

    // Detail section toggle buttons
    document.getElementById('show-sales-details').addEventListener('click', () => toggleSection(salesDetails));
    showOthersDetailsButton.addEventListener('click', () => toggleSection(othersDetails));
    showExpensesDetailsButton.addEventListener('click', () => toggleSection(expensesDetails));

    // Supply table and export buttons toggle
     showSupplyDetailsButton.addEventListener('click', toggleSupplyTable);
     searchSupplyInput.parentElement.style.display = 'none'; // Hide supply search initially
     document.getElementById('supply-table-title').style.display = 'none'; // Hide supply title initially
     supplyExportButtonsDiv.style.display = 'none'; // Hide supply buttons initially

    // Export/Print listeners - Now linked to specific buttons
    printSalesTableButton.addEventListener('click', () => window.print()); // Print uses CSS media query
    printOthersTableButton.addEventListener('click', () => window.print());
    printExpensesTableButton.addEventListener('click', () => window.print());
    printSupplyTableButton.addEventListener('click', () => window.print()); // Print uses CSS media query

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


    // Navigation button listeners
    showSupplySectionButton.addEventListener('click', () => showSection(supplySection));
    showSalesSectionButton.addEventListener('click', () => showSection(salesSection));
    showReportSectionButton.addEventListener('click', () => showSection(reportSection));
    showAdminSectionButton.addEventListener('click', () => showSection(adminSection));

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

// Function to show/hide report filters and reset inputs/table
function showReportFilters(filterType) {
    reportFilters.style.display = 'block';
    dailyFilter.style.display = filterType === 'daily' ? 'flex' : 'none';
    weeklyFilter.style.display = filterType === 'weekly' ? 'flex' : 'none';
    monthlyFilter.style.display = filterType === 'monthly' ? 'flex' : 'none';
    yearlyFilter.style.display = filterType === 'yearly' ? 'flex' : 'none';

    // Reset all report filter inputs when switching type
    reportDateInput.value = '';
    reportWeekInput.value = '';
    reportMonthInput.value = '';
    reportYearInput.value = '';

    reportTableSection.style.display = 'none'; // Hide the table until generated
    searchReportInput.parentElement.style.display = 'none'; // Hide report search initially
    searchReportInput.value = '';
    reportTableBody.innerHTML = ''; // Clear previous report data
    updateReportTotals(0, 0, 0); // Reset totals
}


    generateReportButton.addEventListener('click', function () {
         if (currentUser && currentUser.accessLevel === 'Éditeur') { // Double check restriction
             alert("Vous n'avez pas l'autorisation de générer des bilans.");
             return;
         }

    const selectedDate = reportDateInput.value;
    const selectedWeek = reportWeekInput.value;
    const selectedMonth = reportMonthInput.value;
    const selectedYear = reportYearInput.value;

     // Déterminer le type de bilan sélectionné et vérifier si un filtre est renseigné
    let reportType = null;
    let filterValue = null; // Store the actual value used for filtering

    if (dailyFilter.style.display === 'flex' && selectedDate) {
        reportType = 'daily';
        filterValue = selectedDate;
    } else if (weeklyFilter.style.display === 'flex' && selectedWeek) {
         reportType = 'weekly';
         filterValue = selectedWeek;
    } else if (monthlyFilter.style.display === 'flex' && selectedMonth) {
        reportType = 'monthly';
        filterValue = selectedMonth;
    } else if (yearlyFilter.style.display === 'flex' && selectedYear) {
        reportType = 'yearly';
        filterValue = selectedYear;
    }

    if (!reportType) {
         alert("Veuillez sélectionner un filtre de date (jour, semaine, mois ou année) et le renseigner.");
         return;
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
            filteredSales = filterDataByWeek(salesData, filterValue);
            filteredOthers = filterDataByWeek(othersData, filterValue);
            filteredExpenses = filterDataByWeek(expensesData, filterValue);
            filteredSupply = filterDataByWeek(supplyData, filterValue);
        } else { // daily, monthly, yearly
            // Pass all relevant date filters to the general function
            filteredSales = filterDataByDate(salesData, selectedDate, selectedMonth, selectedYear);
            filteredOthers = filterDataByDate(othersData, selectedDate, selectedMonth, selectedYear);
            filteredExpenses = filterDataByDate(expensesData, selectedDate, selectedMonth, selectedYear);
            filteredSupply = filterDataByDate(supplyData, selectedDate, selectedMonth, selectedYear);
        }

            // Check if there is any data to display
            const hasData = Object.keys(filteredSales).length > 0 || Object.keys(filteredOthers).length > 0 || Object.keys(filteredExpenses).length > 0 || Object.keys(filteredSupply).length > 0;

            // Mettre à jour et afficher le tableau de bilan
            updateReportTable(filteredSales, filteredOthers, filteredExpenses, filteredSupply);

             if (hasData) {
                reportTableSection.style.display = 'block';
                 searchReportInput.parentElement.style.display = 'block'; // Show search bar
             } else {
                 reportTableSection.style.display = 'block'; // Still show section to display "no data" message
                 searchReportInput.parentElement.style.display = 'none'; // Keep search hidden if no data
             }

        });
    });

//Fonction pour filtrer les données par semaine
function filterDataByWeek(data, weekString) {
    if (!weekString || !data) return {};

    const [year, weekNum] = weekString.split('-W').map(Number);
    const filteredData = {};

    for (const key in data) {
        const item = data[key];
        if (!item || !item.date) continue; // Ensure item and date exist

        const itemDate = new Date(item.date + 'T00:00:00'); // Add T00:00:00 for consistent parsing
         if (isNaN(itemDate.getTime())) continue; // Skip invalid dates


        const itemYear = itemDate.getFullYear();
        const itemWeek = getWeekNumber(itemDate);


        if (itemYear === year && itemWeek === weekNum) {
            filteredData[key] = item;
        }
    }
    return filteredData;
}


// Fonction pour obtenir le numéro de semaine (ISO 8601)
function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // If Sunday need to go back 6 days, not 0, so use 7 instead of 0
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    return weekNo;
}


    function filterDataByDate(data, date, month, year) {
        const filteredData = {};
        for (const key in data) {
            const item = data[key];
            const itemDate = item.date;
            if (!item || !itemDate) continue; // Ensure item and date exist


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

// Mettre à jour updateReportTable (Displays rows and calculates totals)
function updateReportTable(sales, others, expenses, supply) {
    reportTableBody.innerHTML = '';
    combinedReportData = {}; // Reset combined data for this specific report run

    // Calculate totals from raw data first
    let totalGrossIncome = 0;
    let totalExpenses = 0;
    let totalReportQuantity = 0; // Total quantity across all types (except supply?) Let's clarify scope. Assume total quantity is just for Vente/Autre/Depense items with quantity.
    let totalDesignationCount = 0; // Total number of unique items/motifs displayed

    const processItems = (items, type) => {
         for (const key in items) {
             const item = items[key];
             if (!item || !item.date) continue; // Skip invalid items

             const itemKey = item.motif || item.designation; // Consistent key for grouping
             if (!itemKey) continue;

             const quantity = parseFloat(item.quantity) || 0;
             const amount = parseFloat(item.amount || item.totalCost) || 0;

             // Accumulate for combined data display
             if (!combinedReportData[itemKey]) {
                 combinedReportData[itemKey] = {
                     type: type,
                     designation: itemKey,
                     quantity: 0,
                     amount: 0 // Stores sum of raw amounts
                 };
                  totalDesignationCount++; // Count unique items/motifs
             }
             combinedReportData[itemKey].quantity += quantity;
             combinedReportData[itemKey].amount += amount; // Accumulate raw amount

             // Accumulate for separate totals
             if (type === 'Vente' || type === 'Autre') {
                 totalGrossIncome += amount;
             } else if (type === 'Dépense') {
                 totalExpenses += amount;
             }
             // Supply does not contribute to financial totals
             totalReportQuantity += quantity; // Accumulate quantity for items that have it
         }
     };

     processItems(sales, 'Vente');
     processItems(others, 'Autre');
     processItems(expenses, 'Dépense');
     processItems(supply, 'Approvisionnement');


    // Populate table rows from combined data
    for (const key in combinedReportData) {
         if (combinedReportData.hasOwnProperty(key)) {
            const data = combinedReportData[key];
            const row = reportTableBody.insertRow();

            // Add class for expense rows
             if (data.type === 'Dépense') {
                 row.classList.add('expense-row');
             }

            row.insertCell().textContent = data.type;
            row.insertCell().textContent = data.designation;
            row.insertCell().textContent = data.quantity; // Quantity is not currency
            row.insertCell().textContent = data.amount.toFixed(0) + ' FCFA'; // Display formatted amount
         }
    }

    // Calculate net balance
    const netBalance = totalGrossIncome - totalExpenses;

    // Update the footer totals using the calculated values
    updateReportTotals(totalReportQuantity, totalDesignationCount, totalExpenses, netBalance);

    // Display "no data" message if needed
    if (Object.keys(combinedReportData).length === 0) {
        displayEmptyTableMessage(reportTableBody, 4, "Aucune donnée à afficher pour ce bilan.");
    }
}


//Function to update the report footer totals.
function updateReportTotals(totalQuantity, totalDesignationCount, totalExpenses, netBalance) {
    document.getElementById('total-report-quantity').textContent = totalQuantity;
    document.getElementById('total-report-designation-count').textContent = `Total (${totalDesignationCount})`; // Count items

    // Update the new footer cells
    document.getElementById('total-report-expenses').textContent = totalExpenses.toFixed(0) + ' FCFA'; // Display total expenses
    document.getElementById('total-report-balance').textContent = netBalance.toFixed(0) + ' FCFA'; // Display net balance

     // The 'total-report-amount' cell in the first footer row is not used for a specific total anymore.
     // We can potentially hide it or repurpose it, but let's leave it empty for now as per HTML structure.
     // Or, it could show Total Income (Sales + Others) if needed. Let's show Total Income here.
     // Total Income = Net Balance + Total Expenses
      const totalIncome = netBalance + totalExpenses;
      // Find the correct cell for the total amount in the first row
      const firstTotalRowCells = document.getElementById('report-table').querySelector('tfoot tr:first-child').cells;
       if (firstTotalRowCells.length > 3) { // Assuming there's an amount cell at index 3 (0, 1, 2, 3)
            firstTotalRowCells[3].textContent = totalIncome.toFixed(0) + ' FCFA'; // Display Total Income
       } else {
           // Fallback or log error if the cell structure is unexpected
           console.warn("Report table footer structure unexpected for Total Income cell.");
       }
}


    //Bilan Excel
    exportReportExcelButton.addEventListener('click', function () {
    const wb = XLSX.utils.book_new();

    // Prepare data for worksheet using raw numbers
    const exportData = Object.values(combinedReportData).map(item => ({
        "Type d'Opération": item.type,
        "Désignation": item.designation,
        "Quantité": item.quantity, // Raw number
        "Montant/Coût total": item.amount // Raw number
    }));

     // Calculate totals using raw numbers from the current combinedReportData
     const totalReportQuantity = Object.values(combinedReportData).reduce((sum, item) => sum + (item.quantity || 0), 0);
     let totalGrossIncome = 0;
     let totalExpenses = 0;
     let totalReportDesignationCount = Object.keys(combinedReportData).length;

     for (const key in combinedReportData) {
         const data = combinedReportData[key];
          if (data.type === 'Vente' || data.type === 'Autre') {
              totalGrossIncome += (data.amount || 0);
          } else if (data.type === 'Dépense') {
             totalExpenses += (data.amount || 0);
          }
     }
     const netBalance = totalGrossIncome - totalExpenses;


     // Add total rows to the export data
     exportData.push({
         "Type d'Opération": "Total:",
         "Désignation": `(${totalReportDesignationCount})`,
         "Quantité": totalReportQuantity,
         "Montant/Coût total": totalGrossIncome // Display Total Income in the first total row position
     });
      exportData.push({
         "Type d'Opération": "Total Dépenses:",
         "Désignation": "", // Empty cell
         "Quantité": "", // Empty cell
         "Montant/Coût total": totalExpenses // Display Total Expenses
      });
      exportData.push({
         "Type d'Opération": "Solde (Total - Dépenses):",
         "Désignation": "", // Empty cell
         "Quantité": "", // Empty cell
         "Montant/Coût total": netBalance // Display Net Balance
      });


    const ws = XLSX.utils.json_to_sheet(exportData);

     // Add header row explicitly if json_to_sheet didn't do it right or needs adjusting
     const headerRow = ["Type d'Opération", "Désignation", "Quantité", "Montant/Coût total"];
     XLSX.utils.sheet_add_aoa(ws, [headerRow], { origin: "A1" });


    // Apply bold style to the total rows
    let startTotalRowIndex = exportData.length - 3 + 1; // Index of "Total:" row (1-based)
     if (startTotalRowIndex >= 0) {
         for (let r = startTotalRowIndex; r <= exportData.length; ++r) {
            for(let c = XLSX.utils.decode_col('A'); c <= XLSX.utils.decode_col('D'); ++c) { // Assuming 4 columns
                 const cellAddress = XLSX.utils.encode_cell({r: r, c: c});
                 if (ws[cellAddress]) {
                     ws[cellAddress].s = { font: { bold: true } };
                 }
             }
         }
     }

     // Add a title at the top
    XLSX.utils.sheet_add_aoa(ws, [["Bilan"]], { origin: "A1" });
    const titleCell = ws['A1'];
    if (titleCell) {
        titleCell.s = {
            font: { bold: true, sz: 16 }
        };
    }

    XLSX.utils.book_append_sheet(wb, ws, "Bilan");
    XLSX.writeFile(wb, "Bilan.xlsx");
});


    //Bilan PDF
 exportReportPdfButton.addEventListener('click', function () {
    window.jsPDF = window.jspdf.jsPDF;
    const doc = new jsPDF();
    const table = document.getElementById('report-table');

    // Get headers (formatted text from table)
     let headers = [];
     if (table.tHead && table.tHead.rows.length > 0) {
         headers = Array.from(table.tHead.rows[0].cells).map(cell => cell.textContent);
     }

    // Get body data (formatted text from table)
    const body = Array.from(table.querySelectorAll('tbody tr'))
        .map(row => Array.from(row.querySelectorAll('td')).map(td => td.textContent));

    // Get footer data (formatted text from table)
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
        head: [headers], // Use extracted headers (formatted text)
        body: body, // Use extracted body (formatted text)
        foot: foot, // Use extracted footer (formatted text)
        didParseCell: function (data) {
            if (data.section === 'head') {
                data.cell.styles.fontStyle = 'bold';
            }
             // Apply bold style to footer cells
            if (data.section === 'foot') {
                 data.cell.styles.fontStyle = 'bold';
             }
              // Apply red color to expense rows in PDF body
             if (data.section === 'body' && combinedReportData && combinedReportData[body[data.row.index][1]] && combinedReportData[body[data.row.index][1]].type === 'Dépense') {
                  data.cell.styles.textColor = [255, 0, 0]; // Red color
             }
        },
        footStyles: {  // Style for tfoot
                fillColor: [240, 240, 240] // Background color
        },
        theme: 'grid',
        styles: {
            fontSize: 10,
            cellPadding: 3,
            overflow: 'linebreak',
        },
        headStyles: {
            fillColor: [41, 128, 185],
            textColor: 255,
            fontSize: 11,
            fontStyle: 'bold'
        },
        title: 'Bilan', // This adds a title outside the table, jspdf-autotable v3+
        filename: 'Bilan.pdf',
        lang: 'fr'
    });

    if (doc.getNumberOfPages() > 0) {
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

    // Vider le tbody actuel
    reportTableBody.innerHTML = '';

    // Calculate totals based on filtered data (using raw numbers)
    let filteredTotalQuantity = 0;
    let filteredTotalGrossIncome = 0;
    let filteredTotalExpenses = 0;
    let filteredDesignationCount = 0;

    // Iterate through the combinedReportData (which was generated by the last report run)
    // and display only items matching the search term
    for (const key in combinedReportData) {
        if (combinedReportData.hasOwnProperty(key)) {
            const item = combinedReportData[key];
            const nameToSearch = item.designation || ''; // Search by designation

            if (nameToSearch.toLowerCase().includes(searchTerm)) {
                const row = reportTableBody.insertRow();

                 // Add class for expense rows
                if (item.type === 'Dépense') {
                    row.classList.add('expense-row');
                }

                row.insertCell().textContent = item.type;
                row.insertCell().textContent = item.designation;
                row.insertCell().textContent = item.quantity; // Quantity is not currency
                row.insertCell().textContent = item.amount.toFixed(0) + ' FCFA'; // Display formatted amount

                filteredTotalQuantity += item.quantity;
                filteredDesignationCount++;

                // Apply subtraction logic for the filtered total amount (using raw numbers)
                 if (item.type === 'Vente' || item.type === 'Autre') {
                      filteredTotalGrossIncome += item.amount;
                 } else if (item.type === 'Dépense') {
                     filteredTotalExpenses += item.amount;
                 }
                 // Supply does not affect financial totals
            }
        }
    }

     // Calculate filtered net balance
     const filteredNetBalance = filteredTotalGrossIncome - filteredTotalExpenses;

    // Mettre à jour les totaux avec les données filtrées (will format the total amount)
    updateReportTotals(filteredTotalQuantity, filteredDesignationCount, filteredTotalExpenses, filteredNetBalance);

     if (filteredDesignationCount === 0 && searchTerm !== '') {
         displayEmptyTableMessage(reportTableBody, 4, `Aucune désignation/motif trouvé pour "${searchTerm}".`);
     } else if (Object.keys(combinedReportData).length === 0 && searchTerm === '') {
          displayEmptyTableMessage(reportTableBody, 4, "Aucune donnée à afficher pour ce bilan.");
     }
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

    // Add event listener to each navigation button
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', () => {
            // Close the menu on small screens
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('menu-open');
            }
        });
    });
    // Global variable to store combined report data for search/export
    let combinedReportData = {};

});