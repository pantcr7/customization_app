frappe.ui.form.on('Issue', {
	after_save:function(frm) {
		// your code here
		 if (frm.doc.status === 'Closed') { //&& frm.doc.resolution_date === undefined
            frm.set_value('resolution_date', frappe.datetime.get_today());
            frm.set_value('resolution_time', frappe.datetime.now_time());
            frm.save();
        }
	},
	refresh:function(frm){
	    frappe.call({
            method: 'frappe.client.get_value',
            args: {
                doctype: 'User',
                filters: { name: frappe.session.user },
                fieldname: 'full_name'
            },
            callback: function(response) {
                var full_name = response.message.full_name;

                // Set the value to a field
                frm.set_value('opened_by', full_name);
                frm.set_df_property('opened_by', 'read_only', 1);
            }
        });
	},
		status:function(frm){
		    
		var fields = frm.fields_dict;
		
        if(frm.doc.status == "Closed"){
        // Iterate through the fields
            for (var fieldname in fields) {
            // Set all fields as read-only except for the specific field
                if (fieldname !== 'status') {
                   frm.set_df_property(fieldname, 'read_only', 1);
                    
                }
            }
        }
        else{
            for (var fieldname in fields) {
            // Set all fields as read-only 0 except for the specific field
                if(fieldname == 'opening_date' || fieldname == 'opening_time'){
                   frm.set_df_property(fieldname, 'read_only', 1)}
                else{
                    frm.set_df_property(fieldname, 'read_only', 0)
                }
                    
            }
        }
		
		    
	    frappe.call({
            method: 'frappe.client.get_value',
            args: {
                doctype: 'User',
                filters: { name: frappe.session.user },
                fieldname: 'full_name'
            },
            callback: function(response) {
                var full_name = response.message.full_name;

                // Set the value to a field
                frm.set_value('closed_by', full_name);
                frm.set_df_property('closed_by', 'read_only', 1);
            }
        });
	}
	
})
