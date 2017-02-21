            
            
            $(document).ready(function(){
                fillFullList();    
                //generateAlist();
            
                $("#aFullList").on("click", function(event){                                        
                    event.preventDefault();
                    var id = $('#hdnSelectedList').val();
                    var data = {};
                    data.id = id;
                    sendDataToServer('/getListItems', data, generateAlist, '');                    
                });
                
                $("#aSelectedList").on("click", function(event){
                    event.preventDefault();
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
                    var id = this.id;
                    //getListItems(id.split('_')[1], generateAlist);
                    $('#hdnSelectedList').val(id.split('_')[1]);
                    var data = {};
                    data.id = id.split('_')[1];
                    sendDataToServer('/getListItems', data, generateSelectedList, ''); 
                });

                $("body").on("change", "input[id^='count_']", function(event){                   
                    var id = (this.id).split('_')[1];
                    changeCountItem(id);                    
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
                            arrLists.push({"name": value.name, "count": "1", "select": false, "id": value.id});
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
                        $("#containerFullList").html('');
                        $("#containerFullList").html(html);                   
                    
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

            function generateId()
            {
                return Math.random().toString(36).substr(2, 9);
            }

            function createHTMLFullList(arrListItems)
            {
              var html = '';
              $.each(arrListItems, function(i, item)
               {
                    var id = item.id;
                    var fullNameId = "name_" + id;
                    var fullCountId = "count_" + id;
                    var cbSelected = item.selected == true ? "checked" : ""; 
                    html += "<div class='form-inline' style='background-color:#fffde7; border-bottom-color: #5dade2; border-bottom-width: 1px; border-bottom-style:solid; width:295px; min-width:295px;'>" +
                            "<div class='form-group' style='width:150px; min-width:150px; float: left; margin-left: 10px; padding-top: 4px;'><span id='"+ fullNameId +"'>"+ item.name +"</span></div>" +                                     
                            "<span><input id='"+ fullCountId +"' style='width:40px;' type='text' value='"+ item.count  +"'>" +
                            "<input id='"+ id +"' class='checkbox1' type='checkbox' onclick='checkboxHandler(this, this.id);' value="+ item.selected +" "+ cbSelected+ "></span>"+ 
                            "</div>";
                });
                
                return html;
            }
            
            function generateSelectedList(selListItems)
            {
                selectedList = [];
                selectedList = selListItems.data; 

                $("#containerFullList").hide();
                $("#containerSelectedList").show();
                var html = '';
                html = createHTMLSelectedList(selectedList);
                $("#containerSelectedList").html('');
                $("#containerSelectedList").html(html);
                
            }

            function createHTMLSelectedList(listItems)
            {            
              var html = '';
              $.each(listItems, function(i, item)
               {
                    var id = item.id;
                    var fullNameId = "name_" + id;
                    var fullCountId = "count_" + id;
                    var selectedCountId = generateId();
                    html += "<div id='div_"+ id +"' class='form-inline' style='background-color:#fffde7; border-bottom-color: #5dade2; border-bottom-width: 1px; border-bottom-style:solid; width:295px;'>" +
                            "<div class='form-group' style='width:150px; min-width:150px; float: left; margin-left: 10px; padding-top: 4px;'><span id='"+ fullNameId +"'>"+ item.name +"</span></div>" +                                     
                            "<input id='"+ fullCountId +"' selectedCountId='"+ selectedCountId +"' style='width:40px;' type='text' value='"+ item.count  +"'/>" +
                            "<a id='btnComplite_"+ id +"' href='#' style='margin-left:5px;'><img src='images/complete.png'/></a>"+
                            "<a id='btnDelete_"+ id +"' href='#'><img src='images/delete.png'/></a>"+  
                            "</div>";
                });
                
                return html;
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

                $.each(arrLists, function(index, value){
                    html += "<li id='" + value.id + "' style='border: solid 1px grey; border-radius:6px; height:40px; padding-top:6px; background-color:white;'>" + 
                    "<div id='display_" + value.id + "' style='width:100%'>" +
                    "<a id='list_" + value.id + "' href='#' style='margin-left:10px;'>" + value.name + "</a>" + 
                    "<a id='delete_" + value.id + "' href='#' style='float:right;'><img src='images/delete.png'></a>" + 
                    "<a id='edit_" + value.id + "' href='#' style='float:right;'><img src='images/edit.png'></a>" + 
                    "</div>"+
                    "<div id='editList_" + value.id + "' style='width:100%; display: none;'>" +
                    "<input id='" + value.id + "' style='margin-left:10px;' value='"+ value.name +"'/>" +                     
                    "<a id='update_" + value.id + "' href='#' style='float:right;'><img src='images/edit.png'></a>" + 
                    "</div>"+
                    "</li>"; 
                })
                
                lists.append(html);
            }

            function createEditListItems()
            {

                var items = $("#ulEditItems");
                var html = '';
                items.empty();

                $.each(arrListItems, function(index, value){
                    html += "<li id='" + value.id + "' style='border: solid 1px grey; border-radius:6px; height:40px; padding-top:6px; background-color:white;'>" + 
                    "<div id='display_" + value.id + "' style='width:100%'>" +
                    "<input id='txtItemName" + value.id + "' style='margin-left:10px;' value='"+ value.name +"'/>" +                    
                    "<input id='txtItemCount_"+ value.id +"' style='width:40px; margin-left:10px;' type='text' value='"+ value.count  +"'>" +
                    "<input id='cbItemSelected_"+  value.id +"' class='' type='checkbox' onclick='' value="+ value.selected +">"+  
                    "<a id='deleteItem_" + value.id + "' href='#' style='float:right;'><img src='images/delete.png'></a>" + 
                    "<a id='updateItem_" + value.id + "' href='#' style='float:right; margin-left:10px;'><img src='images/edit.png'></a>" + 
                    "</div></li>"; 
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

                var data = {};
                data.id = id;
                data.name = listName;

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
           