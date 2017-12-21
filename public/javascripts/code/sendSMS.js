
function sendSMS()
{
    var id = $('#hdnSelectedList').val();
    var data = {};
    data.id = id;
    sendDataToServer('/lists/getSelectedItemsAndPhones', data, sendSMSDataHandler, '');
}

function sendSMSDataHandler(response)
{    
    var selectedItems = response.selectedItems;
    var phoneNumbers = response.phoneNumbers;    

    $.each(phoneNumbers, function(indexPhone, phone){

        var message = '';
        var phoneNumber = phone.number;    
        message += "שלום\n";

        $.each(selectedItems, function(indexItem, item){
            var meas = item.measures != null ? item.measures : ''; 
            message += item.name +" - " + item.count + " " + meas + " \n";
        });
               
        var result = window.app.sendSMS(phoneNumber, message);

    });

    // var id = $('#hdnSelectedList').val();
    // var data = {};
    // data.id = id;

    // sendDataToServer('/lists/updateGoogleSheets', data, googleUpdateSuccess, '');
       
}

function googleUpdateSuccess()
{

}