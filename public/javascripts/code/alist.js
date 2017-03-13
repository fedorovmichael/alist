            
            
            $(document).ready(function(){
                fillFullList();    
                //generateAlist();
            
                $("#aFullList").on("click", function(event){                                        
                    event.preventDefault();
                    itemMenuHandler("aFullList");
                    var id = $('#hdnSelectedList').val();
                    var data = {};
                    data.id = id;
                    sendDataToServer('/getListItems', data, generateAlist, '');                    
                });
                
                $("#aSelectedList").on("click", function(event){
                    event.preventDefault();
                    itemMenuHandler("aSelectedList");
                    var id = $('#hdnSelectedList').val();                    
                    var data = {};
                    data.id = id;
                    sendDataToServer('/getSelectedItems', data, generateSelectedList, '');
                });

                $("#aClearAll").on("click", function(event){
                    event.preventDefault();
                    var id = $('#hdnSelectedList').val();
                    var data = {};
                    data.id = id;
                    sendDataToServer('/clearSelectedItems', data, clearAllSelectedItems, '');
                });

                
                $("body").on("click", "#containerSelectedList a[id^='btnDelete_']", function(event){                    
                    btnDeleteHandler(this, this.id);
                });

                $("body").on("click", "#containerSelectedList a[id^='btnComplite_']", function(event){                   
                    btnCompliteHandler(this, this.id);
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
                    setSelectedList(id); 
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
                        setSelectedList(id);
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

                $("body").on("click", "a[id^='updateItem_']", function(event){             
                    updateItem(this.id);
                });

                $("body").on("click", "a[id^='deleteItem_']", function(event){                   
                    removeItem(this.id);
                });

                                                
            });          
            
            var fullList = [];            
            var selectedList = [];
            var listItems = [];//["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9", "item10"];
            var arrLists = [];
            var arrListItems = []; 

           function fillFullList()
           {
                $.ajax({
                   url: '/getFullList',
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

                        $("#containerSelectedList").hide();
                        $("#containerFullList").show();
                        var html = '';
                        html = createHTMLFullList(arrListItems);                 
                    
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

                var path = '/setSelectedAndCountItem';
                sendDataToServer(path, data, '', '');
                                
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
                // var isChecked = $('#' + fullID).is(":checked");
                // var id = fullID.split('_')[1]; 
                // var data = {};
                // data.id = id;
                // data.selected = isChecked;
                
                // var path = '/setActiveList';
                // sendDataToServer(path, data, '', '');
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

            function createHTMLFullList(arrListItems)
            {
              var html = '';
              $("#containerFullList").empty(); 
              $("#containerFullList").html('');             

              $.each(arrListItems, function(i, item)
               {
                    var id = item.id;
                    var fullNameId = "name_" + id;
                    var fullCountId = "count_" + id;
                    var cbSelected = item.selected == true ? "checked" : ""; 
                    html += "<div class='form-inline div-general-entity-container'>" +
                            "<div class='form-group div-full-entity-name'><span class='entity-general-name' id='"+ fullNameId +"'>"+ item.name +"</span></div>" +
                            "<span class='entit-general-fl-right span-full-item-select'><input id='"+ id +"' class='input-cb-count' type='checkbox' onclick='checkboxHandler(this, this.id);' value="+ item.selected +" "+ cbSelected+ "></span>"+
                            "<span class='entit-general-fl-right span-full-item-count'><input id='"+ fullCountId +"' class='input-general-entity-count' type='text' value='"+ item.count  +"'/></span>" +
                            "</div>";
                });
                
                $("#containerFullList").html(html); 
            }
            
            function generateSelectedList(selListItems)
            {
                selectedList = [];
                selectedList = selListItems.data; 

                $("#containerFullList").hide();
                $("#containerSelectedList").show();
                var html = '';
                createHTMLSelectedList(selectedList);                
            }

            function createHTMLSelectedList(listItems)
            {            
                var html = '';
                $("#containerSelectedList").empty();
                $("#containerSelectedList").html('');                

              $.each(listItems, function(i, item)
               {
                    var id = item.id;
                    var fullNameId = "name_" + id;
                    var fullCountId = "count_" + id;
                    var selectedCountId = generateId();
                    html += "<div id='div_"+ id +"' class='form-inline div-general-entity-container'>" +
                            "<div class='form-group div-selected-entity-name'><span class='entity-general-name' id='"+ fullNameId +"'>"+ item.name +"</span></div>" +                                     
                            "<input id='"+ fullCountId +"' selectedCountId='"+ selectedCountId +"' class='input-general-entity-count input-selected-count' type='text' value='"+ item.count  +"'/>" +
                            "<a id='btnComplite_"+ id +"' href='#' class='entit-general-fl-right a-button-complite'><img src='images/complete.png' class='entity-general-button' title='complite item'/></a>"+
                            "<a id='btnDelete_"+ id +"' href='#' class='entit-general-fl-right a-button-delete'><img src='images/delete.png' class='entity-general-button' title='unselect item'/></a>"+  
                            "</div>";
                });
                
                $("#containerSelectedList").html(html);
            }

            function btnDeleteHandler(obj, id)
            {                
                var itemId = id.split("_")[1];
                var data = {};
                data.id = itemId;
                data.selected = false;
                data.count = $("#containerSelectedList input[id^='count_"+ itemId +"']").val();

                var path = '/setSelectedAndCountItem';
                sendDataToServer(path, data, '', '');

                removeFromArray(selectedList, itemId);
                removeSelecttion(fullList, itemId);
                $('#div_'+ itemId).remove();                
            }

            function btnCompliteHandler(obj, id)
            {
                var itemId = id.split("_")[1];                
                           
                $('#containerSelectedList #count_' + itemId).prop('readonly', true);                
                $('#btnDelete_' + itemId).attr('disabled', true);
                $('#btnComplite_' + itemId).attr('disabled', true);
                $('#div_' + itemId).css("opacity", "0.2");

                $('#div_' + itemId).on('click', function(){
                    unCompliteHandler(itemId);
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
                   url: '/createNewList',
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
                        activeClass = "li-list-general-active"
                        $('#hdnSelectedList').val(value.id);
                        activeID = value.id;
                    }

                    html += "<li id='" + value.id + "' class='"+ activeClass +"'>" +
                        "<div id='display_" + value.id + "' class='li-list-general-div'>" +
                            "<a id='list_" + value.id + "' href='#' class='entity-general-name'>" + value.name + "</a>" +
                            "<a id='delete_" + value.id + "' href='#' class='entit-general-fl-right'><img class='entity-general-button' src='images/delete.png' title='delete list'></a>" + 
                            "<a id='edit_" + value.id + "' href='#' class='entit-general-fl-right'><img class='entity-general-button' src='images/edit.png' title='edit list'></a>" + 
                        "</div>"+
                        "<div id='editList_" + value.id + "' class='li-list-general-div' style='display: none;'>" +
                            "<input id='" + value.id + "' class='list-new-input' value='"+ value.name +"'/>" +
                            "<input id='cb_"+ value.id +"' class='input-cb-count' type='checkbox' onclick='setListActiveCheckbox(this, this.id);' value='' "+ cbSelected+ ">" +                    
                            "<a id='update_" + value.id + "' href='#' class='entit-general-fl-right'><img class='entity-general-button' src='images/edit.png' title='update list'></a>" + 
                        "</div>"+
                    "</li>"; 
                })
                
                lists.append(html);
                getSelectedListItems(activeID);
                itemMenuHandler("aSelectedList");

            }

            function createEditListItems()
            {
                var items = $("#ulEditItems");
                var html = '';
                items.empty();

                $.each(arrListItems, function(index, value){

                    var cbSelected = value.selected == true ? "checked" : "";

                    html += "<li id='" + value.id + "' class='li-list-general'>" + 
                        "<div id='display_" + value.id + "' class='li-list-general-div list-padding-auto'>" +
                            "<input id='txtItemName_" + value.id + "' class='item-edit-name' value='"+ value.name +"'/>" +                    
                            "<input id='txtItemCount_"+ value.id +"' class='input-general-entity-count' type='text' value='"+ value.count  +"'>" +
                            "<input id='cbItemSelected_"+  value.id +"' class='input-cb-count' type='checkbox' onclick='' value="+ value.name +" " + cbSelected + ">"+  
                            "<a id='deleteItem_" + value.id + "' href='#' class='entit-general-fl-right'><img img class='entity-general-button' src='images/delete.png' title='delete item'></a>" + 
                            "<a id='updateItem_" + value.id + "' href='#' class='entit-general-fl-right'><img img class='entity-general-button' src='images/edit.png' title='update item'></a>" + 
                        "</div>" +
                    "</li>"; 
                })
                
                items.append(html);
            }

            function deleteList(id)
            {
                var data = {};
                data.id = id;

                 $.ajax({
                   url: '/deleteList',
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
                var active = $('#cb_' + id).is(":checked");

                var data = {};
                data.id = id;
                data.name = listName;
                data.active = active;

                 $.ajax({
                   url: '/updateList',
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
                   url: '/getListItems',
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
                data.id = generateId();
                data.count = 1;
                data.selected = false;
                data.listID = listID;

                $.ajax({
                   url: '/createItem',
                   contentType: 'application/json',
                   type: 'POST',
                   data: JSON.stringify(data),
                   success: function(response)
                   {
                       editList(listID);
                   }
                });
            }

            function clearAllSelectedItems()
            {
                var id = $('#hdnSelectedList').val();
                var data = {};
                data.id = id;
                sendDataToServer('/getListItems', data, generateAlist, '');     
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
                sendDataToServer('/updateCountItem', data, '', '');
            }

            function getSelectedListItems(listID)
            {
                try {
                        var data = {};
                        data.id = listID;
                        sendDataToServer('/getListItems', data, generateAlist, '');
                        sendDataToServer('/getSelectedItems', data, generateSelectedList, '');
                        
                }
                catch(e){}
            }

            function setSelectedList(listID)
            {
                try {
                        var activeList = $("#ulLists li");
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

                    sendDataToServer('/deleteItem', data, removeItemSuccess, '' );                   
                    
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

                    sendDataToServer('/updateItem', data, updateItemSuccess, '' );                   
                    
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
           