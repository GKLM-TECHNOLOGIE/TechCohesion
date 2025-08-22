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
    const expenseQuantityInput = document.getElementById('expense-quantity');
    const expenseAmountInput = document.getElementById('expense-amount');
    const operationTypeSelect = document.getElementById('operation-type');
    const reportDateInput = document.getElementById('report-date');
    const reportMonthInput = document.getElementById('report-month');
    const reportYearInput = document.getElementById('report-year');
    const reportWeekInput = document.getElementById('report-week');
    const salesFormKeyInput = document.getElementById('sales-form-key');
    const supplyFormKeyInput = document.getElementById('supply-form-key');
    const userFormKeyInput = document.getElementById('user-form-key');
    const dailyFilter = document.getElementById('daily-filter');
    const monthlyFilter = document.getElementById('monthly-filter');
    const yearlyFilter = document.getElementById('yearly-filter');
    const weeklyFilter = document.getElementById('weekly-filter');
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

    const searchSalesInput = document.getElementById('search-sales');
    const searchExpensesInput = document.getElementById('search-expenses');
    const searchOthersInput = document.getElementById('search-others');
    const searchSupplyInput = document.getElementById('search-supply');
    const searchUsersInput = document.getElementById('search-users');
    const searchReportInput = document.getElementById('search-report');

    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    // Nouveaux éléments pour l'abonnement
    const subscriptionSection = document.getElementById('subscription-section');
    const showSubscriptionSectionButton = document.getElementById('show-subscription-section-button');
    const confirmPaymentButton = document.getElementById('confirm-payment-button');
    const subscriptionStatusDiv = document.getElementById('subscription-status');
    const subscriptionAlertBanner = document.getElementById('subscription-alert-banner');
    const goToSubscriptionButton = document.getElementById('go-to-subscription-button');
    const subscriptionLockoutOverlay = document.getElementById('subscription-lockout-overlay');
    const lockoutConfirmPaymentButton = document.getElementById('lockout-confirm-payment-button');

    // --- Configuration Firebase ---
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

    // --- Références de la base de données ---
    const salesRef = database.ref('sales');
    const othersRef = database.ref('others');
    const expensesRef = database.ref('expenses');
    const supplyRef = database.ref('supply');
    const usersRef = database.ref('users');
    const subscriptionRef = database.ref('subscription'); // Nouvelle référence
    let combinedReportData = {};

    // --- Fonctions d'Authentification et d'Abonnement ---
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
            if (!snapshot.exists()) {
                loginError.textContent = "Nom d'utilisateur introuvable.";
                loginError.style.display = 'block';
                return;
            }
            const userData = snapshot.val();
            const userKey = Object.keys(userData)[0];
            const user = userData[userKey];

            if (user.password !== password) {
                loginError.textContent = 'Mot de passe incorrect.';
                loginError.style.display = 'block';
                return;
            }
            currentUser = { username: user.username, accessLevel: user.accessLevel };
            checkSubscriptionOnLogin();
        });
    }

    function proceedWithLogin() {
        hideLoginForm();
        showUserInfo(currentUser.username, currentUser.accessLevel);
        initializeData();
        applyUserRestrictions();
    }

    function checkSubscriptionOnLogin() {
        subscriptionRef.once('value', (snapshot) => {
            const subData = snapshot.val();
            if (!subData || !subData.expiryDate) {
                const now = new Date();
                const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                const initialExpiryDate = endOfMonth.toISOString().split('T')[0];
                subscriptionRef.set({ expiryDate: initialExpiryDate }).then(proceedWithLogin);
                return;
            }
            const expiryDate = new Date(subData.expiryDate);
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            expiryDate.setHours(23, 59, 59, 999);

            if (now > expiryDate) {
                if (currentUser.accessLevel === 'Administrateur') {
                    subscriptionLockoutOverlay.style.display = 'flex';
                    hideLoginForm();
                } else {
                    loginError.textContent = "Accès suspendu. Veuillez contacter l'administrateur.";
                    loginError.style.display = 'block';
                    currentUser = null;
                }
            } else {
                proceedWithLogin();
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
        reportTableBody.innerHTML = '';
        userInfoBar.style.display = 'none';
        subscriptionAlertBanner.style.display = 'none';
        subscriptionLockoutOverlay.style.display = 'none';
        resetUserRestrictions();
    }

    // --- Fonctions Utilitaires ---
    function showSection(sectionToShow) {
        if (supplySection) supplySection.style.display = 'none';
        if (salesSection) salesSection.style.display = 'none';
        if (reportSection) reportSection.style.display = 'none';
        if (adminSection) adminSection.style.display = 'none';
        if (subscriptionSection) subscriptionSection.style.display = 'none';

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

    // ... Fonctions utilitaires existantes ...
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
    
    // --- Gestion des Restrictions et de l'Abonnement ---
    function applyUserRestrictions() {
        if (!currentUser) return;

        showSubscriptionSectionButton.style.display = 'none';
        subscriptionAlertBanner.style.display = 'none';
        disableElements([salesForm, supplyForm, userForm, generateReportButton]);
        disableButtonsByClass('edit-button');
        disableButtonsByClass('delete-button');

        if (currentUser.accessLevel === 'Administrateur') {
            enableElements([salesForm, supplyForm, userForm, generateReportButton]);
            enableButtonsByClass('edit-button');
            enableButtonsByClass('delete-button');
            showSupplySectionButton.disabled = false;
            showSalesSectionButton.disabled = false;
            showReportSectionButton.disabled = false;
            showAdminSectionButton.disabled = false;
            showSubscriptionSectionButton.style.display = 'block';
            checkForSubscriptionWarning();
        } else if (currentUser.accessLevel === 'Éditeur') {
            enableElements([salesForm, supplyForm]);
            showSupplySectionButton.disabled = false;
            showSalesSectionButton.disabled = false;
            showReportSectionButton.disabled = true;
            showAdminSectionButton.disabled = true;
        } else if (currentUser.accessLevel === 'Lecteur') {
            showSupplySectionButton.disabled = true;
            showSalesSectionButton.disabled = true;
            showReportSectionButton.disabled = true;
            showAdminSectionButton.disabled = true;
        }
    }

    function resetUserRestrictions() {
        enableElements([salesForm, supplyForm, userForm, generateReportButton]);
        enableButtonsByClass('edit-button');
        enableButtonsByClass('delete-button');
        showSalesSectionButton.disabled = false;
        showReportSectionButton.disabled = false;
        showAdminSectionButton.disabled = false;
        showSubscriptionSectionButton.style.display = 'none';
    }

    function checkForSubscriptionWarning() {
        subscriptionRef.once('value', (snapshot) => {
            if (!snapshot.exists() || !snapshot.val().expiryDate) return;
            const expiryDate = new Date(snapshot.val().expiryDate);
            const now = new Date();
            const dayOfMonth = now.getDate();
            const isSameMonthAndYear = now.getFullYear() === expiryDate.getFullYear() && now.getMonth() === expiryDate.getMonth();
            if (dayOfMonth >= 25 && isSameMonthAndYear) {
                subscriptionAlertBanner.style.display = 'flex';
            }
        });
    }

    function handleConfirmPayment() {
        if (!confirm("Confirmez-vous avoir payé le renouvellement ? Cette action mettra à jour la date d'expiration de votre abonnement.")) return;
        
        subscriptionRef.once('value', (snapshot) => {
            let currentExpiry = new Date();
            if (snapshot.exists() && snapshot.val().expiryDate) {
                currentExpiry = new Date(snapshot.val().expiryDate);
            }
            const newExpiryDate = new Date(currentExpiry.getFullYear(), currentExpiry.getMonth() + 2, 0);
            const newExpiryDateString = newExpiryDate.toISOString().split('T')[0];

            subscriptionRef.update({ expiryDate: newExpiryDateString }).then(() => {
                alert(`Paiement confirmé ! Votre abonnement est valide jusqu'au ${newExpiryDate.toLocaleDateString('fr-FR')}.`);
                subscriptionAlertBanner.style.display = 'none';
                if (subscriptionLockoutOverlay.style.display === 'flex') {
                    subscriptionLockoutOverlay.style.display = 'none';
                    proceedWithLogin();
                }
            }).catch(error => console.error("Erreur:", error));
        });
    }

    // ... Fonctions de manipulation du DOM (enable/disable, etc.)
    function disableElements(elements) {
        elements.forEach(element => {
            if (element) {
                element.disabled = true;
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
                if (element.tagName === 'FORM' || element.classList.contains('form-container')) {
                    element.querySelectorAll('input, select, textarea, button').forEach(input => input.disabled = false);
                }
            }
        });
    }

    function disableButtonsByClass(className) {
        const buttons = document.getElementsByClassName(className);
        for (let button of buttons) button.disabled = true;
    }

    function enableButtonsByClass(className) {
        const buttons = document.getElementsByClassName(className);
        for (let button of buttons) button.disabled = false;
    }

    function createActionButtons(key, dataType) {
        const actionsCell = document.createElement('td');
        actionsCell.classList.add('actions-col');
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
        if (currentUser && currentUser.accessLevel !== 'Administrateur') {
            editButton.disabled = true;
            deleteButton.disabled = true;
        }
        return actionsCell;
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // --- Fonctions CRUD (Create, Read, Update, Delete) ---
    function handleEdit(key, dataType) {
        let formKeyInput, dataRef, populateFunc;
        switch (dataType) {
            case 'sales': [formKeyInput, dataRef, populateFunc] = [salesFormKeyInput, salesRef, populateSalesForm]; break;
            case 'others': [formKeyInput, dataRef, populateFunc] = [salesFormKeyInput, othersRef, populateOthersForm]; break;
            case 'expenses': [formKeyInput, dataRef, populateFunc] = [salesFormKeyInput, expensesRef, populateExpensesForm]; break;
            case 'supply': [formKeyInput, dataRef, populateFunc] = [supplyFormKeyInput, supplyRef, populateSupplyForm]; break;
            case 'users': [formKeyInput, dataRef, populateFunc] = [userFormKeyInput, usersRef, populateUserForm]; break;
            default: return;
        }
        formKeyInput.value = key;
        dataRef.child(key).once('value', snapshot => {
            const data = snapshot.val();
            if (data) {
                populateFunc(data);
                const form = formKeyInput.closest('form');
                form.querySelector('.submit-button').textContent = `Modifier ${dataType === 'users' ? 'Compte' : 'Opération'}`;
                scrollToTop();
            }
        });
    }
    
    // ... fonctions populate (populateSalesForm, etc.) ...
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
        expenseQuantityInput.value = data.quantity;
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
        const refMap = { sales: salesRef, others: othersRef, expenses: expensesRef, supply: supplyRef, users: usersRef };
        const ref = refMap[dataType];
        if (ref && confirm(`Êtes-vous sûr de vouloir supprimer cette entrée ?`)) {
            ref.child(key).remove()
                .then(() => alert(`${dataType} supprimé avec succès !`))
                .catch(error => alert(`Erreur lors de la suppression.`));
        }
    }

    function updateTable(tableBody, ref, dataType, searchInput) {
        ref.on('value', (snapshot) => {
            tableBody.innerHTML = '';
            const data = snapshot.val() || {};
            let totalQuantity = 0, totalAmount = 0, designationCount = 0, totalUnitPrice = 0;
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

            const filteredKeys = Object.keys(data).filter(key => {
                const item = data[key];
                const searchField = dataType === 'users' ? item.username : item.designation;
                return searchField && searchField.toLowerCase().includes(searchTerm);
            });

            if (filteredKeys.length === 0) {
                const colspan = tableBody.closest('table').querySelector('thead tr').cells.length;
                displayEmptyTableMessage(tableBody, colspan, `Aucune donnée.`);
                return;
            }

            filteredKeys.forEach(key => {
                const item = data[key];
                const row = tableBody.insertRow();
                if (dataType === 'supply') {
                    salesRef.once('value', salesSnapshot => {
                        let soldQuantity = 0;
                        const salesData = salesSnapshot.val() || {};
                        for (const saleKey in salesData) {
                            if (salesData[saleKey].designation === item.designation) {
                                soldQuantity += parseFloat(salesData[saleKey].quantity);
                            }
                        }
                        const remainingQuantity = parseFloat(item.quantity) - soldQuantity;
                        row.insertCell().textContent = item.date;
                        row.insertCell().textContent = item.designation;
                        row.insertCell().textContent = item.quantity;
                        row.insertCell().textContent = soldQuantity;
                        row.insertCell().textContent = remainingQuantity;
                        row.appendChild(createActionButtons(key, dataType));
                        totalQuantity += parseFloat(item.quantity);
                        totalAmount += soldQuantity;
                        designationCount++;
                    });
                } else {
                    if (dataType === 'sales') {
                        row.insertCell().textContent = item.date;
                        row.insertCell().textContent = item.designation;
                        row.insertCell().textContent = item.quantity;
                        row.insertCell().textContent = item.unitPrice;
                        row.insertCell().textContent = item.totalCost;
                        totalQuantity += parseFloat(item.quantity);
                        totalAmount += parseFloat(item.totalCost);
                        totalUnitPrice += parseFloat(item.unitPrice);
                    } else if (dataType === 'others') {
                        row.insertCell().textContent = item.date;
                        row.insertCell().textContent = item.designation;
                        row.insertCell().textContent = item.quantity;
                        row.insertCell().textContent = item.amount;
                        totalQuantity += parseFloat(item.quantity);
                        totalAmount += parseFloat(item.amount);
                    } else if (dataType === 'expenses') {
                        row.insertCell().textContent = item.date;
                        row.insertCell().textContent = item.designation;
                        row.insertCell().textContent = item.quantity;
                        row.insertCell().textContent = item.amount;
                        totalQuantity += parseFloat(item.quantity);
                        totalAmount += parseFloat(item.amount);
                    } else if (dataType === 'users') {
                        row.insertCell().textContent = item.username;
                        row.insertCell().textContent = item.accessLevel;
                    }
                    designationCount++;
                    row.appendChild(createActionButtons(key, dataType));
                }
            });
            const totalRemaining = totalQuantity - totalAmount;
            if (dataType === 'sales') updateSalesTotals(totalQuantity, totalAmount, designationCount, totalUnitPrice);
            if (dataType === 'others') updateOthersTotals(totalQuantity, totalAmount, designationCount);
            if (dataType === 'expenses') updateExpensesTotals(totalQuantity, totalAmount, designationCount);
            if (dataType === 'supply') updateSupplyTotals(totalQuantity, totalAmount, totalRemaining, designationCount);

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

    // ... Fonctions de mise à jour des totaux ...
    function updateSalesTotals(qty, amount, count, price) {
        document.getElementById('total-sales-quantity').textContent = qty;
        document.getElementById('total-sales-amount').textContent = amount.toFixed(2);
        document.getElementById('total-sales-designation-count').textContent = `Total (${count})`;
        document.getElementById('total-sales-unit-price').textContent = price.toFixed(2);
    }
    function updateOthersTotals(qty, amount, count) {
        document.getElementById('total-others-quantity').textContent = qty;
        document.getElementById('total-others-amount').textContent = amount.toFixed(2);
        document.getElementById('total-others-designation-count').textContent = `Total (${count})`;
    }
    function updateExpensesTotals(qty, amount, count) {
        document.getElementById('total-expenses-quantity').textContent = qty;
        document.getElementById('total-expenses-amount').textContent = amount.toFixed(2);
        document.getElementById('total-expenses-designation-count').textContent = `Total (${count})`;
    }
    function updateSupplyTotals(supplied, sold, remaining, count) {
        document.getElementById('total-supply-quantity').textContent = supplied;
        document.getElementById('total-sold-quantity').textContent = sold;
        document.getElementById('total-remaining-quantity').textContent = remaining;
        document.getElementById('total-supply-designation-count').textContent = `Total (${count}):`;
    }
    
    function updateSalesTable() { updateTable(salesTableBody, salesRef, 'sales', searchSalesInput); }
    function updateOthersTable() { updateTable(othersTableBody, othersRef, 'others', searchOthersInput); }
    function updateExpensesTable() { updateTable(expensesTableBody, expensesRef, 'expenses', searchExpensesInput); }
    function updateSupplyTable() { updateTable(supplyTableBody, supplyRef, 'supply', searchSupplyInput); }
    function updateUserTable() { updateTable(userTable, usersRef, 'users', searchUsersInput); }

    function calculateTotalCost() {
        const quantity = parseFloat(saleQuantityInput.value) || 0;
        const unitPrice = parseFloat(saleUnitPriceInput.value) || 0;
        return quantity * unitPrice;
    }
    
    // ... Fonctions de soumission des formulaires ...
    function handleFormSubmit(event, operationType) {
        event.preventDefault();
        const formKey = salesFormKeyInput.value;
        let operationData, dbRef;
        const date = document.getElementById('sale-date').value;

        switch(operationType) {
            case 'Vente':
                operationData = { date, designation: saleDesignationSelect.value, quantity: parseFloat(saleQuantityInput.value), unitPrice: parseFloat(saleUnitPriceInput.value), totalCost: calculateTotalCost() };
                dbRef = salesRef;
                break;
            case 'Autre':
                operationData = { date, designation: otherDesignationInput.value, quantity: parseFloat(otherQuantityInput.value), amount: parseFloat(otherAmountInput.value) };
                dbRef = othersRef;
                break;
            case 'Dépense':
                operationData = { date, designation: expenseDesignationInput.value, quantity: parseFloat(expenseQuantityInput.value), amount: parseFloat(expenseAmountInput.value) };
                dbRef = expensesRef;
                break;
        }

        const promise = formKey ? dbRef.child(formKey).update(operationData) : dbRef.push(operationData);
        promise.then(() => {
            salesForm.reset();
            setTodaysDate();
            salesFormKeyInput.value = '';
            salesForm.querySelector('.submit-button').textContent = 'Ajouter Opération';
        }).catch(err => console.error(err));
    }

    function handleSupplyFormSubmit(event) {
        event.preventDefault();
        const formKey = supplyFormKeyInput.value;
        const designation = document.getElementById('supply-designation').value;
        const quantity = parseFloat(document.getElementById('supply-quantity').value);
        const date = document.getElementById('supply-date').value;

        if (formKey) {
            supplyRef.child(formKey).update({ date, designation, quantity }).then(resetSupplyForm);
        } else {
            supplyRef.orderByChild('designation').equalTo(designation).once('value', snapshot => {
                if (snapshot.exists()) {
                    const key = Object.keys(snapshot.val())[0];
                    const existing = snapshot.val()[key];
                    const newQty = parseFloat(existing.quantity) + quantity;
                    supplyRef.child(key).update({ quantity: newQty, date }).then(resetSupplyForm);
                } else {
                    supplyRef.push({ date, designation, quantity }).then(resetSupplyForm);
                }
            });
        }
    }
    function resetSupplyForm() {
        supplyForm.reset();
        setTodaysDate();
        supplyFormKeyInput.value = '';
        supplyForm.querySelector('.submit-button').textContent = 'Ajouter Approvisionnement';
        updateProductDesignations();
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
        const userData = { username, password, accessLevel };
        if (formKey) {
            usersRef.child(formKey).update(userData).then(resetUserForm);
        } else {
            usersRef.orderByChild('username').equalTo(username).once('value', snapshot => {
                if (snapshot.exists()) {
                    alert("Ce nom d'utilisateur existe déjà.");
                } else {
                    usersRef.push(userData).then(resetUserForm);
                }
            });
        }
    }
    function resetUserForm() {
        userForm.reset();
        userFormKeyInput.value = '';
        userForm.querySelector('.submit-button').textContent = 'Créer Compte';
    }

    // --- Fonctions d'Export et d'Impression ---
    function exportToExcel(tableId, filename) {
        const table = document.getElementById(tableId);
        const wb = XLSX.utils.table_to_book(table, {sheet: "Sheet1"});
        XLSX.writeFile(wb, `${filename}.xlsx`);
    }

    function exportToPdf(tableId, title, filename) {
        window.jsPDF = window.jspdf.jsPDF;
        const doc = new jsPDF();
        doc.autoTable({
            html: `#${tableId}`,
            headStyles: { fontStyle: 'bold', fillColor: [41, 128, 185], textColor: 255 },
            footStyles: { fontStyle: 'bold', fillColor: [240, 240, 240] },
            didDrawPage: (data) => { doc.text(title, data.settings.margin.left, 15); }
        });
        doc.save(`${filename}.pdf`);
    }
    
    // --- Fonctions de Bilan (Rapport) ---
    function showReportFilters(filterType) {
        reportFilters.style.display = 'block';
        dailyFilter.style.display = filterType === 'daily' ? 'flex' : 'none';
        weeklyFilter.style.display = filterType === 'weekly' ? 'flex' : 'none';
        monthlyFilter.style.display = filterType === 'monthly' ? 'flex' : 'none';
        yearlyFilter.style.display = filterType === 'yearly' ? 'flex' : 'none';
        reportTableSection.style.display = 'none';
    }

    function generateReport() {
        const date = reportDateInput.value;
        const week = reportWeekInput.value;
        const month = reportMonthInput.value;
        const year = reportYearInput.value;

        Promise.all([salesRef.once('value'), othersRef.once('value'), expensesRef.once('value')])
            .then(snapshots => {
                const [salesData, othersData, expensesData] = snapshots.map(s => s.val() || {});
                let filterFunc;
                if (date) filterFunc = item => item.date === date;
                else if (week) filterFunc = item => getWeekNumber(new Date(item.date)) === parseInt(week.split('-W')[1]) && new Date(item.date).getFullYear() === parseInt(week.split('-W')[0]);
                else if (month) filterFunc = item => item.date.startsWith(month);
                else if (year) filterFunc = item => item.date.startsWith(year);
                
                const filteredSales = filterData(salesData, filterFunc);
                const filteredOthers = filterData(othersData, filterFunc);
                const filteredExpenses = filterData(expensesData, filterFunc);

                updateReportTable(filteredSales, filteredOthers, filteredExpenses);
                reportTableSection.style.display = 'block';
            });
    }

    function filterData(data, filterFunction) {
        if (!filterFunction) return data;
        const filtered = {};
        for(const key in data) {
            if (filterFunction(data[key])) {
                filtered[key] = data[key];
            }
        }
        return filtered;
    }
    
    function getWeekNumber(d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1)/7);
        return weekNo;
    }

    function updateReportTable(sales, others, expenses) {
        reportTableBody.innerHTML = '';
        combinedReportData = {};
        let totalPositiveAmount = 0, totalExpensesOnlyAmount = 0, totalReportQuantity = 0, totalReportDesignationCount = 0;

        const addToReport = (item, type) => {
            const key = item.designation;
            if (!combinedReportData[key]) {
                combinedReportData[key] = { type, designation: key, quantity: 0, amount: 0 };
            }
            const quantity = parseFloat(item.quantity) || 0;
            const amount = parseFloat(item.amount || item.totalCost) || 0;
            combinedReportData[key].quantity += quantity;
            combinedReportData[key].amount += amount;

            totalReportQuantity += quantity;
            if (type === 'Vente' || type === 'Autre') totalPositiveAmount += amount;
            else if (type === 'Dépense') totalExpensesOnlyAmount += amount;
        };

        for (const key in sales) addToReport(sales[key], 'Vente');
        for (const key in others) addToReport(others[key], 'Autre');
        for (const key in expenses) addToReport(expenses[key], 'Dépense');

        for (const key in combinedReportData) {
            const data = combinedReportData[key];
            const row = reportTableBody.insertRow();
            row.insertCell().textContent = data.type;
            row.insertCell().textContent = data.designation;
            row.insertCell().textContent = data.quantity;
            row.insertCell().textContent = data.amount.toFixed(2);
            totalReportDesignationCount++;
        }

        updateReportTotals(totalReportQuantity, totalReportDesignationCount, totalPositiveAmount, totalExpensesOnlyAmount, totalPositiveAmount - totalExpensesOnlyAmount);
        if (Object.keys(combinedReportData).length === 0) displayEmptyTableMessage(reportTableBody, 4, "Aucune donnée à afficher.");
    }
    
    function updateReportTotals(qty, count, pos, exp, net) {
        document.getElementById('total-positive-amount').textContent = pos.toFixed(2);
        document.getElementById('total-expense-amount').textContent = exp.toFixed(2);
        document.getElementById('total-report-designation-count').textContent = `(${count})`;
        document.getElementById('total-report-quantity').textContent = qty;
        document.getElementById('total-net-amount').textContent = net.toFixed(2);
    }
    
    // --- Event Listeners ---
    loginForm.addEventListener('submit', handleLogin);
    logoutButton.addEventListener('click', handleLogout);
    
    showSubscriptionSectionButton.addEventListener('click', () => {
        showSection(subscriptionSection);
        subscriptionRef.once('value', snapshot => {
            const expiryDate = snapshot.exists() ? new Date(snapshot.val().expiryDate).toLocaleDateString('fr-FR') : 'Non configuré';
            subscriptionStatusDiv.innerHTML = `<p><strong>Statut :</strong> Actif<br><strong>Expire le :</strong> ${expiryDate}</p>`;
        });
    });
    goToSubscriptionButton.addEventListener('click', () => showSubscriptionSectionButton.click());
    confirmPaymentButton.addEventListener('click', handleConfirmPayment);
    lockoutConfirmPaymentButton.addEventListener('click', handleConfirmPayment);

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
    
    printSalesTableButton.addEventListener('click', () => window.print());
    printOthersTableButton.addEventListener('click', () => window.print());
    printExpensesTableButton.addEventListener('click', () => window.print());
    printSupplyTableButton.addEventListener('click', () => window.print());

    exportSalesExcelButton.addEventListener('click', () => exportToExcel('sales-table', 'Détails_Ventes'));
    exportOthersExcelButton.addEventListener('click', () => exportToExcel('others-table', 'Détails_Autres'));
    exportExpensesExcelButton.addEventListener('click', () => exportToExcel('expenses-table', 'Détails_Dépenses'));
    exportSupplyExcelButton.addEventListener('click', () => exportToExcel('supply-table', 'Détails_Approvisionnements'));
    exportReportExcelButton.addEventListener('click', () => exportToExcel('report-table', 'Bilan'));

    exportSalesPdfButton.addEventListener('click', () => exportToPdf('sales-table', 'Détails des Ventes', 'Ventes'));
    exportOthersPdfButton.addEventListener('click', () => exportToPdf('others-table', 'Détails des Autres Opérations', 'Autres'));
    exportExpensesPdfButton.addEventListener('click', () => exportToPdf('expenses-table', 'Détails des Dépenses', 'Dépenses'));
    exportSupplyPdfButton.addEventListener('click', () => exportToPdf('supply-table', 'Détails des Approvisionnements', 'Approvisionnements'));
    exportReportPdfButton.addEventListener('click', () => exportToPdf('report-table', 'Bilan', 'Bilan'));
    
    showSupplySectionButton.addEventListener('click', () => showSection(supplySection));
    showSalesSectionButton.addEventListener('click', () => showSection(salesSection));
    showReportSectionButton.addEventListener('click', () => showSection(reportSection));
    showAdminSectionButton.addEventListener('click', () => showSection(adminSection));
    showSupplyDetailsButton.addEventListener('click', toggleSupplyTable);

    document.getElementById('daily-report').addEventListener('click', () => showReportFilters('daily'));
    document.getElementById('weekly-report').addEventListener('click', () => showReportFilters('weekly'));
    document.getElementById('monthly-report').addEventListener('click', () => showReportFilters('monthly'));
    document.getElementById('yearly-report').addEventListener('click', () => showReportFilters('yearly'));
    generateReportButton.addEventListener('click', generateReport);

    searchSalesInput.addEventListener('input', updateSalesTable);
    searchExpensesInput.addEventListener('input', updateExpensesTable);
    searchOthersInput.addEventListener('input', updateOthersTable);
    searchSupplyInput.addEventListener('input', updateSupplyTable);
    searchUsersInput.addEventListener('input', updateUserTable);
    searchReportInput.addEventListener('input', () => {
        const searchTerm = searchReportInput.value.toLowerCase();
        const filteredRows = Array.from(reportTableBody.rows).filter(row => 
            row.cells[1].textContent.toLowerCase().includes(searchTerm)
        );
        reportTableBody.innerHTML = '';
        filteredRows.forEach(row => reportTableBody.appendChild(row.cloneNode(true)));
    });

    backToTopButton.addEventListener('click', (e) => { e.preventDefault(); scrollToTop(); });
    window.onscroll = () => {
        backToTopButton.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none";
    };

    menuToggle.addEventListener('click', () => mainNav.classList.toggle('menu-open'));
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', () => {
            if (window.innerWidth <= 768) mainNav.classList.remove('menu-open');
        });
    });

    showLoginForm();
});