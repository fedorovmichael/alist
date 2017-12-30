            var fullList = [];            
            var selectedList = [];
            var listItems = [];
            var arrLists = [];
            var arrListItems = [];
            var socket = '';             
            
        $(document).ready(function(){
            //socket
            socket = io();//.connect('http://localhost:4000');
            fillFullList();
        
            $("#aFullList").on("click", function(event){                                        
                event.preventDefault();
                itemMenuHandler("aFullList");
                var id = $('#hdnSelectedList').val();
                var data = {};
                data.id = id;
                sendDataToServer('/lists/getListItems', data, generateAlist, '');                    
            });
            
            $("#aSelectedList").on("click", function(event){
                event.preventDefault();
                itemMenuHandler("aSelectedList");
                var id = $('#hdnSelectedList').val();                    
                var data = {};
                data.id = id;
                sendDataToServer('/lists/getSelectedItems', data, generateSelectedList, '');
            });

            $("#aClearAll").on("click", function(event){
                event.preventDefault();              
                dialogHandler(clearSelectedItem, 'Очистить выбранные поля?');
            });

            
            $("body").on("click", "#containerSelectedList a[id^='btnDelete_']", function(event){                    
                btnDeleteHandler(this, this.id);
            });

            $("body").on("click", "#containerSelectedList a[id^='btnComplite_']", function(event){              
                var dataSocket = {}, dataUpdate = {};
                $("#hdnCompleteItem").val('');
                $("#hdnCompleteItem").val(this.id);
                dataSocket.itemID = this.id;
                dataSocket.listID = '';
                dataSocket.command = 'complite';                
                socket.emit('recCommand', dataSocket);

                dataUpdate.id = this.id.split('_')[1];
                dataUpdate.complete = true;
                sendDataToServer('/lists/updateCompleteValue', dataUpdate, completeItemSuccess, '');

                return false;
            });

            $("body").on("click", "a[id^='delete_']", function(event){                   
                var id = this.id;
                deleteList(id.split('_')[1]);
            });

            $("body").on("click", "a[id^='edit_']", function(event){                   
                var id = this.id;
                editList(id.split('_')[1]);                    
            });

            $("body").on("click", "a[id^='update_']", function(event){                   
                var id = this.id;
                updateList(id.split('_')[1]);
            });

            $("body").on("click", "a[id^='list_']", function(event){                   
                var id = (this.id).split('_')[1];
                //getListItems(id.split('_')[1], generateAlist);
                $('#hdnSelectedList').val(id);
                itemMenuHandler("aSelectedList");
                getSelectedListItems(id);
                setSelectedList("ulLists", id); 
            });

            $("body").on("change", "input[id^='count_']", function(event){                   
                var id = (this.id).split('_')[1];
                changeCountItem(id);                    
            });

            $("body").on("click", "div[id^='display_']", function(event){                   
                var id = (this.id).split('_')[1];                                        
                if(event.target.nodeName == 'DIV')
                {
                    itemMenuHandler("aSelectedList");
                    $('#hdnSelectedList').val(id);
                    getSelectedListItems(id);
                    setSelectedList("ulLists", id);
                }                                    
            });
                            
            $("#aNewList").on("click", function(event){
                event.preventDefault();
                addNewList();                    
            });

            $("#aEditNewItem").on("click", function(event){
                event.preventDefault();
                addEditNewItem();                    
            });

            $("#aCollapseList").on("click", function(event){
                event.preventDefault();
                $("#divListsContainer").slideToggle();                   
            });

            $("#aSendSMS").on("click", function(event){
                event.preventDefault();
                dialogHandler(sendSMS, 'Отослать заказ по SMS?');
                //$('#dialog').dialog('open');
                //sendSMS();                   
            });
            

            $("body").on("click", "a[id^='updateItem_']", function(event){             
                updateItem(this.id);
            });

            $("body").on("click", "a[id^='deleteItem_']", function(event){                   
                removeItem(this.id);
            });

            socket.on('reqCommand', function(data){
                if(data.command == 'complite')
                {
                    btnCompliteHandler(null, data.itemID);
                }
                if(data.command == 'uncomplite')
                {
                    unCompliteHandler(data.itemID);
                }
            });

            // $("#dialog").dialog({
            //     modal: true,
            //     width: 350,
            //     height: 160,
            //     autoOpen: false,
            //     draggable: false, 
            //     resizable: false,
            //     title: "Confirmation",
            //     position: { my: "center", at: "center", of: "#divItems" },                   
            //     buttons: [
            //         {
            //             id: "Yes",
            //             text: "Yes",
            //             click: function() {
            //                     sendSMS();
            //                     $(this).dialog('close'); 
            //             }
            //         },
            //         {
            //             id: "No",
            //             text: "No",
            //             click: function () {
            //                 $(this).dialog('close');
            //             }
            //         }
            //     ]
            // });

            $("#aNewCategory").on("click", function(event){
                event.preventDefault();
                addNewCategory();
                var data = {};
                sendDataToServer("/categories/getCategories", data, createHTMLCategories, null);
            });
            
            $("body").on("click", "div[id^='category_display_']",  function(event){                   
                var id = (this.id).split('_')[2];                    
                $('#hdnSelectedCategory').val(id);                    
                getItemsByCategoryID(id);
                setSelectedList("ulCategories", "li_category_" + id); 
            });
            
            $("body").on("click", "a[id^='delete_category_']", function(event){
                event.preventDefault();
                removeCategory(this.id);
            });
            
            $("body").on("click", "a[id^='category_edit_']", function(event){
                event.preventDefault();
                categoryModeHandler(this.id, 'edit');
            });
            
            $("body").on("click", "a[id^='update_category_']", function(event){
                event.preventDefault();
                updateCategory(this.id);                
            });

            $("body").on("click", "li[id^='liCategoriList_']", "a[id^='aCategoriList_']", function(event){
                var listID = this.id.split("_")[1];
                categoryListFilter(listID);
            }); 
            
            $("body").on("click", "li[id^='liList_']", "a[id^='aList_']", function(event){
                var listID = this.id.split("_")[1];
                ddlListsHandler(listID);
            });

        });


        function fillFullList()
        {
                $.ajax({
                   url: '/lists/getFullList',
                   contentType: 'application/json',
                   type: 'POST',
                   success: function(response)
                   {
                       listItems = response.data;
                       arrLists = [];                      

                        $.each(listItems, function(index, value){
                            var id = generateId();                            
                            arrLists.push({"name": value.name, "active": value.active, "id": value.id});
                        });
                        
                        createListMenu();                      
                   }
                });
        }
 
        function generateAlist(response)
        { 
            try{
                    arrListItems = [];
                    arrListItems = response.data;
                    var countItems = response.countItems;

                    $("#containerSelectedList").hide();
                    $("#containerFullList").show();
                    var html = '';
                    html = createHTMLFullList(arrListItems, countItems);                 
                
            }
            catch(e){}
        }
            
        function checkboxHandler(obj, id)
        {
            var count, name, isChecked, ida;
            ida = $(obj).attr("id");
            isChecked = $('#' + id).is(":checked");
            name = $('#name_'+ id).text();
            count  = $('#count_' + id).val();

            var data = {};
            data.id = id;
            data.selected = isChecked;
            data.count = count;
            
            sendDataToServer('/lists/setSelectedAndCountItem', data, '', '');
                            
            if(existsInArray(selectedList, id) == false && isChecked){                
                selectedList.push({"name": name, "count": count, "select": true, "id": id});                                                   
            }
            else if(existsInArray(selectedList, id) == true && !isChecked){
                    removeFromArray(selectedList, id)
                }
            
            $.each(arrListItems, function(index, value){
                    if(value.id == id){
                            arrListItems[index].select = isChecked; 
                        }
                    });                
            
        }

        function setListActiveCheckbox(obj, fullID)
        {
            var liLists = $("#ulLists li");

            $.each(liLists, function(index, value){
                
                var objID = $(value).attr("id");

                $(value).removeClass("li-list-general-active");
                $(value).addClass("li-list-general");

                if(fullID == objID)
                {
                    $(value).addClass("li-list-general-active");
                    $(value).removeClass("li-list-general");
                }

            })
        }

        function generateId()
        {
            return Math.random().toString(36).substr(2, 9);
        }

        function createHTMLFullList(arrListItems, countItems)
        {
            try{            
                var html = '<p class="count-items">Items: '+ countItems +' </p>';
                $("#containerFullList").empty(); 
                $("#containerFullList").html('');             
                $.each(arrListItems, function(catIndex, catValue){

                    var categoryItems = catValue;
                    html += "<div style='width:100%;margin-top:5px;text-align:center;'><span style='font-weight:bold;'>"+ categoryItems[0].category_name +"</span></div></br>"

                    $.each(categoryItems, function(i, item)
                    {
                        var id = item.id;
                        var fullNameId = "name_" + id;
                        var fullCountId = "count_" + id;
                        var cbSelected = item.selected == true ? "checked" : "";
                        var measure = item.measures ? item.measures : ''; 
                        html += "<div class='div-general-entity-container'>" +
                                "<div class='div-full-entity-name'><span class='entity-general-name' id='"+ fullNameId +"' title='"+ item.name +"' data-toggle='tooltip'>"+ item.name +"</span></div>" +                                
                                "<span class='entit-general-fl-right span-full-item-select'><input id='"+ id +"' class='input-cb-count' type='checkbox' onclick='checkboxHandler(this, this.id);' value="+ item.selected +" "+ cbSelected+ "></span>"+
                                "<span class='entit-general-fl-right span-full-item-select' style='width: 30px; margin-top: 5px;'>"+  measure +"</span>" +
                                "<span class='entit-general-fl-right span-full-item-count'><input id='"+ fullCountId +"' class='input-general-entity-count' type='text' value='"+ item.count  +"'/></span>" +
                                "</div>";
                    });
                });
            }
            catch(e){
                console.log("createHTMLFullList -> error: ", e);
            }

            $("#containerFullList").html(html); 
        }
        
        function generateSelectedList(selListItems)
        {
            selectedList = [];
            selectedList = selListItems.data;
            var countItems = selListItems.countItems; 

            $("#containerFullList").hide();
            $("#containerSelectedList").show();
            var html = '';
            createHTMLSelectedList(selectedList, countItems);                
        }

        function createHTMLSelectedList(listItems, countItems)
        {            
            var html = '<p id="pSelectedCount" class="count-items"><span id="spanSelectedCount">Items: '+ countItems +'</span>&nbsp;&nbsp;<span id="spanSelectedCountComplete"></span></p>';
            var arrCompliteItems = [];
            $("#containerSelectedList").empty();
            $("#containerSelectedList").html('');                
            $.each(listItems, function(catIndex, catValue){
                
               var categoryItems = catValue;
               html += "<div style='width:100%;margin-top:5px;text-align:center;'><span style='font-weight:bold;'>"+ categoryItems[0].category_name +"</span></div></br>"
                
                $.each(categoryItems, function(i, item)
                {
                    var id = item.id;
                    var fullNameId = "name_" + id;
                    var fullCountId = "count_" + id;
                    var selectedCountId = generateId();
                    var measure = item.measures ? item.measures : '';
                    html += "<div id='div_"+ id +"' class='form-inline div-general-entity-container'>" +
                            "<div class='form-group div-selected-entity-name' style='display: inline-block;'><span class='entity-general-name-left-5' id='"+ fullNameId +"'>"+ item.name +"</span></div>" +                                     
                            "<input id='"+ fullCountId +"' selectedCountId='"+ selectedCountId +"' class='input-general-entity-count input-selected-count' type='text' value='"+ item.count  +"'/>" + 
                            "<a id='btnComplite_"+ id +"' href='#' class='entit-general-fl-right a-button-complite'><img src='/images/complete.png' class='entity-general-button' title='complite item'/></a>"+
                            "<a id='btnDelete_"+ id +"' href='#' class='entit-general-fl-right a-button-delete'><img src='/images/delete.png' class='entity-general-button' title='unselect item'/></a>"+  
                            "<span class='entit-general-fl-right span-full-item-select1' style='width: 30px; margin-top: 5px;'>"+  measure +"</span>" +
                            "</div>";
                    if(item.complete)
                    {
                        arrCompliteItems.push('btnComplite_'+ id);
                    }
                });
            });    
            
            $("#containerSelectedList").html(html);
            $("#spanSelectedCountComplete").text("Completed: " + arrCompliteItems.length);
            $.each(arrCompliteItems, function(i, item){
                btnCompliteHandler(null, item);
            });

            itemMenuHandler("aSelectedList");
        }

        function btnDeleteHandler(obj, id)
        {                
            var itemId = id.split("_")[1];
            var data = {};
            
            var isComplete = $("#"+ id).attr("disabled");

            if(isComplete)
            {
                return;
            }

            data.id = itemId;
            data.selected = false;
            data.count = $("#containerSelectedList input[id^='count_"+ itemId +"']").val();
            
            sendDataToServer('/lists/setSelectedAndCountItem', data, '', '');

            removeFromArray(selectedList, itemId);
            removeSelecttion(fullList, itemId);
            $('#div_'+ itemId).remove();
            $('#pSelectedCount').text('Count items: '+ selectedList.length);                
        }

        function btnCompliteHandler(obj, id)
        {
            var itemId = id.split("_")[1];                               
                        
            $('#containerSelectedList #count_' + itemId).prop('readonly', true);                
            $('#btnDelete_' + itemId).attr('disabled', true);
            $('#btnComplite_' + itemId).attr('disabled', true);
            $('#div_' + itemId).css("opacity", "0.2");

            $('#div_' + itemId).on('click', function(){
                $("#hdnCompleteItem").val((this.id).split("_")[1]);
                var data = {}, dataUpdate = {};
                data.itemID = itemId;
                data.listID = '';
                data.command = 'uncomplite';                
                socket.emit('recCommand', data);

                dataUpdate.id = itemId;
                dataUpdate.complete = false;
                sendDataToServer('/lists/updateCompleteValue', dataUpdate, unCompleteItemSuccess, '');
                
            });                
        }

        function unCompliteHandler(id)
        {                
            $('#containerSelectedList #count_' + id).prop('readonly', false);                
            $('#btnDelete_' + id).removeAttr('disabled');
            $('#btnComplite_' + id).removeAttr('disabled');
            $('#div_' + id).css("opacity", "1");   
        }

        function removeFromArray(arrayInput, id)
        {
            var indexForDelete = -1;

            $.each(selectedList, function(i, item){                 
                        if(item.id == id){
                            indexForDelete = i;                                                                    
                        }                            
                    });

            if(indexForDelete >= 0)
            {
                selectedList.splice(indexForDelete, 1);                
            }                        
        }

        function addToArray()
        {

        }

        function removeSelecttion(array, id)
        {
            $.each(array, function(index, value){
                    if(value.id == id){
                            array[index].select = false;                              
                        }
                    });
        }

        function existsInArray(arrayInput, id)
        {
            var exists = false;

            $.each(arrayInput, function(index, value){
                if(value.id == id)
                {
                    exists = true;
                }

            });    

            return exists;
        }

        function addNewList()
        {
            var data = {};
            data.name = $("#txtListName").val();
            data.id = generateId();

            $.ajax({
                url: '/lists/createNewList',
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify(data),
                success: function(response)
                {
                    fillFullList();
                }
            });
        }

        function createListMenu()
        {
            $("#ulLists").empty();
            $("#ulLists li").remove();                

            var lists = $("#ulLists");
            var html = '';
            var activeID = '';

            $.each(arrLists, function(index, value){
                var cbSelected = "", activeClass = "li-list-general";

                if(value.active == true)
                {
                    cbSelected = "checked";
                    activeClass = "li-list-general-active";
                    $('#hdnSelectedList').val(value.id);
                    activeID = value.id;
                }

                html += "<li id='" + value.id + "' class='"+ activeClass +"'>" +
                    "<div id='display_" + value.id + "' class='li-list-general-div'>" +
                        "<a id='list_" + value.id + "' href='#' class='entity-general-name'>" + value.name + "</a>" +
                        "<a id='delete_" + value.id + "' href='#' class='entit-general-fl-right'><img class='entity-general-button' src='/images/delete.png' title='delete list'></a>" + 
                        "<a id='edit_" + value.id + "' href='#' class='entit-general-fl-right'><img class='entity-general-button' src='/images/edit.png' title='edit list'></a>" + 
                    "</div>"+
                    "<div id='editList_" + value.id + "' class='li-list-general-div' style='display: none;'>" +
                        "<input id='" + value.id + "' class='list-new-input' value='"+ value.name +"'/>" +                                           
                        "<a id='update_" + value.id + "' href='#' class='entit-general-fl-right'><img class='entity-general-button' src='/images/edit.png' title='update list'></a>" + 
                    "</div>"+
                "</li>"; 
            })
            
            lists.append(html);
            getSelectedListItems(activeID);            

        }

        function createEditListItems()
        {
            var items = $("#ulEditItems");
            var html = '';
            items.empty();
            $.each(arrListItems, function(catIndex, catValue){
                
               var categoryItems = catValue;
               html += "<div style='width:100%;margin-top:5px;text-align:center;'><span style='font-weight:bold;'>"+ categoryItems[0].category_name +"</span></div></br>"

                $.each(categoryItems, function(index, value){

                    var cbSelected = value.selected == true ? "checked" : "";

                    html += "<li id='" + value.id + "' class='li-list-general'>" + 
                        "<div id='display_" + value.id + "' class='li-list-general-div list-padding-auto'>" +
                            "<input id='txtItemName_" + value.id + "' class='item-edit-name' value='"+ value.name +"'/>" +                    
                            "<input id='txtItemCount_"+ value.id +"' class='input-general-entity-count' type='text' value='"+ value.count  +"'>" +
                            "<input id='txtItemMeasure_"+ value.id +"' class='input-general-entity-count' type='text' value='"+ value.measures  +"'>" +
                            "<input id='cbItemSelected_"+  value.id +"' class='input-cb-count' type='checkbox' onclick='' value="+ value.name +" " + cbSelected + ">"+  
                            "<a id='deleteItem_" + value.id + "' href='#' class='entit-general-fl-right'><img class='entity-general-button' src='/images/delete.png' title='delete item'></a>" + 
                            "<a id='updateItem_" + value.id + "' href='#' class='entit-general-fl-right'><img class='entity-general-button' src='/images/edit.png' title='update item'></a>" + 
                        "</div>" +
                    "</li>"; 
                });
            });
            
            items.append(html);
        }

        function deleteList(id)
        {
            var data = {};
            data.id = id;

                $.ajax({
                url: '/lists/deleteList',
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify(data),
                success: function(response)
                {
                    fillFullList();
                }
            });
        }

        function editList(id)
        {
            if($("#hdnEditList").val() != '')
            {
                var editID = $("#hdnEditList").val();
                $("#display_" + editID).show();
                $("#editList_" + editID).hide();
            }

            $("#display_" + id).hide();
            $("#editList_" + id).show();

            $("#divItems").hide();
            $("#divEditItems").show();

            arrListItems = [];

            getListItems(id, createEditListItems);
            //createEditListItems();
            $("#hdnEditList").val(id);
        }

        function updateList(id)
        {
            var listName = $("#editList_" + id + " input").val();               

            var data = {};
            data.id = id;
            data.name = listName;           

                $.ajax({
                url: '/lists/updateList',
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify(data),
                success: function(response)
                {
                    $("#display_" + id).show();
                    $("#editList_" + id).hide();
                    $("#divItems").show();
                    $("#divEditItems").hide();
                    fillFullList();
                    getListItems(id, generateAlist);
                    //generateAlist();
                }
            });
        }

        function getListItems(id, callback)
        {
            var data = {};
            data.id = id;
            
                $.ajax({
                url: '/lists/getListItems',
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify(data),
                success: function(response)
                {                         
                    arrListItems = response.data;               
                    //fillFullList();
                    $("#hdnSelectedList").val('');
                    $("#hdnSelectedList").val(id);

                    if(callback != null || callback != '')
                    {
                        callback();
                    }
                }
            });
        }

        function  addEditNewItem()
        {
            var listID = $("#hdnSelectedList").val();

            var data = {};
            data.name = $("#txtEditNewItemName").val();
            data.measure = $("#txtEditNewItemMeasure").val();
            data.id = generateId();
            data.count = 1;
            data.selected = false;
            data.listID = listID;

            sendDataToServer('/lists/createItem', data, addEditNewItemSuccess, '');            
        }

        function addEditNewItemSuccess(){
            var listID = $("#hdnSelectedList").val();
            editList(listID);
        }

        function clearAllSelectedItems()
        {
            var id = $('#hdnSelectedList').val();
            var data = {};
            data.id = id;
            sendDataToServer('/lists/getListItems', data, generateAlist, '');     
        }

        function changeCountItem(id)
        {
            var count = '';
            var data = {};
            
            if($("#containerFullList").is(":visible"))
            {
                count = $("#containerFullList input[id^='count_"+ id +"']").val();
            }
            else if($("#containerSelectedList").is(":visible"))
            {
                count = $("#containerSelectedList input[id^='count_"+ id +"']").val();
            }
            
            data.id = id;
            data.count = count;
            sendDataToServer('/lists/updateCountItem', data, '', '');
        }

        function getSelectedListItems(listID)
        {
            try {                    
                    var data = {id: listID, selected: true };
                    
                    sendDataToServer('/lists/getListItems', data, generateAlist, '');
                    sendDataToServer('/lists/getSelectedItems', data, generateSelectedList, '');
                    sendDataToServer('/lists/setActiveList', data, '', '');
                    
            }
            catch(e){}
        }

        function setSelectedList(parentID, listID)
        {
            try {
                    var activeList = $("#" + parentID + " li");
                    $.each(activeList, function(index, value){
                        $(value).removeClass("li-list-general-active").addClass("li-list-general");
                    })

                    $("#"+ listID).removeClass("li-list-general").addClass("li-list-general-active");

            }
            catch(e){}
        }

        function removeItem(fullID)
        {
            try {
                
                var id = fullID.split('_')[1];
                var data = {};
                data.id = id;

                sendDataToServer('/lists/deleteItem', data, removeItemSuccess, '' );                   
                
            } catch (error) {
                console.error("removeItem: " + error);
            }
        }

        function removeItemSuccess(response)
        {
            try {
                var id = $("#hdnEditList").val();
                editList(id);
            } catch (error) {
                console.error("removeItemSuccess: " + error);
            }
        }

        function updateItem(fullID)
        {
            try {
                
                var id = fullID.split('_')[1];
                var data = {};
                data.id = id;
                data.name = $('#txtItemName_' + id).val();
                data.count = $('#txtItemCount_' + id).val();
                data.selected = $('#cbItemSelected_' + id).is(":checked");
                data.measure = $("#txtItemMeasure_" + id).val(); 

                sendDataToServer('/lists/updateItem', data, updateItemSuccess, '' );                   
                
            } catch (error) {
                console.error("updateItem: " + error);
            }
        }

        function updateItemSuccess(response)
        {
            try {
                var id = $("#hdnEditList").val();
                editList(id);
            } catch (error) {
                console.error("updateItemSuccess: " + error);
            }
        }

        function itemMenuHandler(activeButtonID)
        {
            try {
                $('#aSelectedList').removeClass('item-menu-active');
                $('#aFullList').removeClass('item-menu-active');
                $("#"+ activeButtonID).addClass('item-menu-active');
                
            } catch (error) {
                console.error("itemMenuHandler error: " + error);
            }
        }

        function completeItemSuccess(response)
        {
            try {
                var id = $("#hdnCompleteItem").val();
                btnCompliteHandler(null, id);
                $("#hdnCompleteItem").val('');
                var id = $('#hdnSelectedList').val();                    
                var data = {};
                data.id = id;
                sendDataToServer('/lists/getSelectedItems', data, generateSelectedList, '');
            } catch (error) {
                console.error("completeItemSuccess: " + error);
            }
        }

        function unCompleteItemSuccess(response)
        {
            try {
                var id = $("#hdnCompleteItem").val();
                unCompliteHandler(id);
                $("#hdnCompleteItem").val('');
                var id = $('#hdnSelectedList').val();                    
                var data = {};
                data.id = id;
                sendDataToServer('/lists/getSelectedItems', data, generateSelectedList, '');
            } catch (error) {
                console.error("completeItemSuccess: " + error);
            }
        }

        function addNewCategory()
        {
            var data = {};
            data.name = $("#txtCategoryName").val();
            data.id = generateId();            
            sendDataToServer("/categories/createCategory", data, successAddNewCategory, errorAddNewCategory);      
            $("#txtCategoryName").val('');
        }

        function successAddNewCategory()
        {            
            //TODO: display message on success
        }

        function errorAddNewCategory()
        {
            //TODO: display message on error
        }

        function removeCategory(categoryID)
        {
            var data = {};            
            data.id = categoryID.split('_')[2];            
            sendDataToServer("/categories/removeCategory", data, successRemoveCategory, errorRemoveCategory);     
        }

        function successRemoveCategory()
        {
            var data = {};
            sendDataToServer("/categories/getCategories", data, createHTMLCategories, null);
        }

        function errorRemoveCategory()
        {}
        
        function getItemsByCategoryID(categoryID)
        {
            var data = {}, listID = null;

            if($("#hdnSelectedCategoryList").val() != ''){
                listID = $("#hdnSelectedCategoryList").val();
            }
            
            data.id = categoryID;
            data.listID = listID;
            sendDataToServer("/categories/getItemsByCategoryID", data, successGetItemsByCategoryID, errorGetItemsByCategoryID);
        }

        function successGetItemsByCategoryID(data)
        {
            var strOptions = '';
            $("#selAvailableItems").empty();
            $("#selAvailableItems option").remove(); 

            $.each(data.select, function(i,v){
                strOptions += "<option itemID='"+ v.id +"' value='"+ v.id +"' selected>"+ v.name +"</option>"
            });

            $.each(data.deselect, function(i,v){
                strOptions += "<option itemID='"+ v.id +"' value='"+ v.id +"'>"+ v.name +"</option>"
            });

            $('#selAvailableItems').append(strOptions);
            $('#selAvailableItems').multiSelect('refresh');
        }

        function errorGetItemsByCategoryID(data)
        {
            var error = data;
        }

        function setItemCategoryID(itemID)
        {
            categoryID = $('#hdnSelectedCategory').val();
            var data = {};            
            data.categoryID = categoryID;
            data.itemID = itemID;

            sendDataToServer("/categories/setItemCategoryID", data, successSetItemCategoryID, errorSetItemCategoryID);
        }

        function successSetItemCategoryID()
        {}

        function errorSetItemCategoryID()
        {}

        function removeItemCategory(itemID)
        {            
            var data = {};            
            data.categoryID = '';
            data.itemID = itemID;

            sendDataToServer("/categories/setItemCategoryID", data, successRemoveItemCategoryID, errorRemoveItemCategoryID);
        }

        function successRemoveItemCategoryID()
        {}

        function errorRemoveItemCategoryID()
        {}

        function createHTMLCategories(data)
        {
            var strHTML = '';
            $("#ulCategories").empty();
            $("#ulCategories li").remove();

            $.each(data.categories, function(index, value){
                strHTML += '<li id="li_category_'+ value.id +'" class="li-list-general">' +
                             '<div id="category_display_'+ value.id +'" class="li-list-general-div">' +
                                '<a id="category_' + value.id +'" href="#" class="entity-general-name">'+ value.name +'</a>' +
                                '<a id="delete_category_' + value.id +'" href="#" class="entit-general-fl-right">' +
                                  '<img src="/images/delete.png" title="delete category" class="entity-general-button"/>' +
                                '</a>' +
                                '<a id="category_edit_' + value.id +'" href="#" class="entit-general-fl-right">' +
                                 '<img src="/images/edit.png" title="edit category" class="entity-general-button"/>' +
                                '</a>' +
                             '</div>' +
                             '<div id="div_category_edit_' + value.id +'" style="display: none;" class="li-list-general-div">' +
                                '<input id="input_category_edit_' + value.id +'" value="'+ value.name +'" class="list-new-input"/>' +
                                '<a id="update_category_' + value.id +'" href="#" class="entit-general-fl-right">' +
                                '<img src="/images/edit.png" title="update category" class="entity-general-button"/>' +
                                '</a>' +
                             '</div>' +
                           '</li>'
            });

            $("#ulCategories").append(strHTML);
        }

        function categoryModeHandler(categoryID, mode)
        {
            var id = categoryID.split('_')[2];

            if(mode == 'display'){
                $("#category_display_" + id).show();
                $("#div_category_edit_" + id).hide();
            }
            else if(mode == 'edit'){
                $("#category_display_" + id).hide();
                $("#div_category_edit_" + id).show();
            }
        }

        function updateCategory(categoryID)
        {
            var id = categoryID.split('_')[2];
            var name = $("#input_category_edit_" + id).val();
            var data = {id: id, name: name };            
            
            sendDataToServer("/categories/updateCategory", data, successUpdateCategory, errorUpdateCategory);
        }

        function successUpdateCategory()
        {
            var data = {};
            sendDataToServer("/categories/getCategories", data, createHTMLCategories, null);
            categoryModeHandler(this.id, 'display');
        }

        function errorUpdateCategory()
        {}

        function categoryListFilter(listID){
            try {
                 $("#hdnSelectedCategoryList").val(listID);
                 var selectedListText = $("#aCategoriList_" + listID).text();
                 $("#spanCategoryListText").text(selectedListText);
                 var data = {};
                 data.id = listID;
                 sendDataToServer('/categories/getCategoriesListByListID', data, successCategoryListFilter, '');
            } 
            catch (error) {
                
            }            
        }

        function successCategoryListFilter(response){
            var arrCategoryListItems = response.data;

            var strOptions = '';
            $("#selAvailableItems").empty();
            $("#selAvailableItems option").remove(); 

            $.each(arrCategoryListItems, function(i,v){
                strOptions += "<option itemID='"+ v.id +"' value='"+ v.id +"' >"+ v.name +"</option>"
            });            

            $('#selAvailableItems').append(strOptions);
            $('#selAvailableItems').multiSelect('refresh');

        }

        function clearSelectedItem()
        {
            try {                
                itemMenuHandler("aFullList");                
                var data = {id: $('#hdnSelectedList').val()};                
                sendDataToServer('/lists/clearSelectedItems', data, clearAllSelectedItems, '');                
            } 
            catch (error) {
                console.log("error clear selected items: ", error);
            }
        }

        function dialogHandler(handlerYesFunction, textBody)
        {
            //var runFunction = id === null || id === '' ? handlerYesFunction : handlerYesFunction(id);
            $("#dialog").dialog({
                modal: true, width: 370, height: 180, autoOpen: false, draggable: false, resizable: false, title: "Confirmation", text: "dailog text 11111",   
                position: { my: "center", at: "center", of: "#divItems" },                   
                buttons: [{ id: "Yes", text: "Yes", click: function(){ 
                            handlerYesFunction();
                            $(this).dialog('close'); } },
                          { id: "No", text: "No", click: function () { $(this).dialog('close'); }}] });
            
            
            $('#dialog').text(textBody);
            $('#dialog').dialog('open');
        }

        function ddlListsHandler(listID){
            var label = $("#aList_" + listID).text();
            var itemID = $("#liList_" + listID).attr("itemID");
            $("#spanDdlSelectedLabel_" + itemID).text(label);
        }

        function sendDataToServer(path, data, callbackSuccess, callbackError)
        {
            try {

                $.ajax({
                    url: path,
                    contentType: 'application/json',
                    type: 'POST',
                    data: JSON.stringify(data),
                    success: function(response)
                    {
                        if(callbackSuccess != null || callbackSuccess != '')
                            {  
                                callbackSuccess(response);
                            }
                    },
                    error: function(error)
                    {
                        if(callbackError != null && callbackError != '')
                        {
                            callbackError(error);
                        }
                    }
                });
                
            } catch (error) {
                
            }
        }
           