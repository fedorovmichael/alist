
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
            message += item.name +" - " + item.count + " \n";
        });
               
        var result = window.app.sendSMS(phoneNumber, message);

    });    
}