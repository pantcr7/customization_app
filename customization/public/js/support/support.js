frappe.ui.form.on('Issue', {
	after_save:function(frm) {
		// your code here
		if(frm.doc.status == "Closed"){
                frm.set_value('resolution_date', frappe.datetime.now_datetime());
                 frm.set_value('starting_date', frm.doc.opening_date+ " "+ frm.doc.opening_time);
                var closed_date = frm.doc.resolution_date;
                var opened_date = frm.doc.starting_date;
                var new_closedDate = new Date(closed_date);
                var new_openedOpened = new Date(opened_date);
       
                
                
                 var timeDifference = new_closedDate.getTime() - new_openedOpened.getTime();
              
                 
                 var days = Math.floor(timeDifference / (1000 * 3600 * 24));
                 var hours = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 *60*60));
                 var mins = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 *60));
                 var secs =Math.floor((timeDifference % (1000 * 60 )) / (1000 ));

        // Display the days difference in the console
                
            frm.set_value('work_duration_', days + " "+ hours + ":"+mins+":"+secs);
               // frm.set_value('user_resolution_time', "10 1:20:55");
               if (!frm._saving) {
            // Set the flag to indicate that the save process has started
                    frm._saving = true;
            // Call the save function
                    frm.save();
                }
                
                
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
            for (var fieldname2 in fields) {
            // Set all fields as read-only 0 except for the specific field
                if(fieldname2 == 'opening_date' || fieldname2 == 'opening_time'){
                   frm.set_df_property(fieldname2, 'read_only', 1)}
                else{
                    frm.set_df_property(fieldname2, 'read_only', 0)
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
