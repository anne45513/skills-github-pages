function saveOrder() {
    if (orderedItems.length > 0) {
        // Create the order object with key codes, items, cashier name, total, and date/time
        const order = {
            transactionDate: new Date().toLocaleString(),
            cashierName: cashierName,
            items: orderedItems,
            total: total.toFixed(2)
        };

        // Save the order as a separate Excel file
        saveTransactionToExcel(order);

        alert('Order has been saved successfully!');

        // Optionally, clear current order data
        resetOrder();
    } else {
        alert('No items in the order to save.');
    }
}
function saveTransactionToExcel(transaction) {
    // Create the header for the Excel file
    const orderData = [
        ["Transaction Date", "Cashier", "Key Code", "Description", "Price", "Total"] // Header
    ];

    // Flatten the transaction's items into rows
    transaction.items.forEach(item => {
        orderData.push([
            transaction.transactionDate, 
            transaction.cashierName, 
            item.keyCode, 
            item.description, 
            item.price,
            transaction.total
        ]);
    });

    // Create a workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(orderData);
    XLSX.utils.book_append_sheet(wb, ws, "Transaction");

    // Generate Excel file and trigger download
    const fileName = `Transaction_${transaction.transactionDate.replace(/[\/: ]/g, "_")}.xlsx`;
    XLSX.writeFile(wb, fileName);
}
