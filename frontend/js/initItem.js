var getPanelStyle = function (urgency) {
    if (urgency == "vital")
        return "panel-danger";
    else if (urgency == "important")
        return "panel-warning";
    else if (urgency == "normal")
        return "panel-info";
    else if (urgency == "finished")
        return "panel-success";
};

//create a new todo_item
var newItem = function (title, content, urgency, lastModifiedTime, id) {
    var panelStyle = getPanelStyle(urgency);
    var item =
        '<div class="panel ' + panelStyle + '" id="item_' + id + '" style="display:none">' +
        '<div class="panel-heading">' +
        '<h3 class="panel-title">' + title + '</h3>' +
        '</div>' +
        '<div class="panel-body">' +
        '<div class="content-body">' +
        '<div class="panel-content">' + content + '</div>' +
        '<p class="text-muted" id="modified_time" ><br />Last Modified: ' + lastModifiedTime + '</p>' +
        '<button class="btn btn-danger" id="delete_item_btn" style="float:right; margin:0 10px;" >Delete</button>' +
        '<button class="btn btn-info" id="edit_item_btn" style="float:right; margin:0 10px;">Edit</button>';
    if (urgency != "finished")
        item += '<button class="btn btn-success" id="check_item_btn" style="float:right; margin:0 10px;">Check</button>';
    item +=
        '</div>' +
        '</div>' +
        '</div>';
    return item;
};

var getItemById = function (id) {
    return $("#item_" + id);
};

var getIdByItem = function (item) {
    return item.attr("id").substr(5);
};

//create a new edit form for todo_item
var newEditForm = function (title, content, urgency, id) {
    var form =
        '<form class="form-horizontal" id=item_form_' + id + '>' +
        '<fieldset>' +
        '<div class="form-group" id="title_group">' +
        '<label class="col-lg-2 control-label">Title</label>' +
        '<div class="col-lg-10">' +
        '<input type="text" class="form-control" id="title" placeholder="Title" value=' + title + '>' +
        '<label class="control-label" id="warning" style="display: none;">title can\'t be empty</label>' +
        '</div>' +
        '</div>' +
        '<div class="form-group" id="content_group">' +
        '<label for="textArea" class="col-lg-2 control-label">Content</label>' +
        '<div class="col-lg-10">' +
        '<textarea class="form-control" rows="3" id="content" placeholder="Content">' + content + '</textarea>' +
        '<label class="control-label" id="warning" style="display: none;">content can\'t be empty</label>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="select" class="col-lg-2 control-label">Urgency</label>' +
        '<div class="col-lg-10">' +
        '<select class="form-control" id="urgency">';
    if (urgency == "normal")
        form += '<option value="normal" selected = "selected">normal</option>';
    else
        form += '<option value="normal">normal</option>';
    if (urgency == "important")
        form += '<option value="important" selected = "selected">important</option>';
    else
        form += '<option value="important">important</option>';
    if (urgency == "vital")
        form += '<option value="vital" selected = "selected">vital</option>';
    else
        form += '<option value="vital">vital</option>';
    form +=
        '</select>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<div class="col-lg-10 col-lg-offset-2">' +
        '<button type="button" class="btn btn-default" id="form_cancel">Cancel</button>' +
        '<button type="button" class="btn btn-primary" id="form_save">Save</button>' +
        '</div>' +
        '</div>' +
        '</fieldset>' +
        '</form>';
    return form;
};

var getFormById = function (id) {
    return $("#item_form_" + id);
};

var getIdByForm = function (form) {
    return form.attr("id").substr(10);
};

var initAllItems = function (order_by, urgency_filter) {
    $.get(url + "/items/itemlist?order_by=" + order_by + "&urgency_filter=" + urgency_filter,
        function (data, status) {
            $(".todoItems").empty();
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var new_item = newItem(item.title, item.content, item.urgency, item.last_modified_time, item.id);
                var new_form = newEditForm(item.title, item.content, item.urgency, item.id);
                $(".todoItems").append(new_item);
                var todo_item = getItemById(item.id);
                todo_item.show();
                todo_item.find(".panel-body").append(new_form);
                getFormById(item.id).hide();
                registerItemEvent(todo_item);
            }
        }
    );
};