// Copyright (c) 2023, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.ui.form.on('Issue', {
	refresh(frm) {
		// your code here
		if (frm.doc.status === 'Closed') {
            frm.set_value('resolution_date', frappe.datetime.get_today());
            frm.save();
        }
	}
})
