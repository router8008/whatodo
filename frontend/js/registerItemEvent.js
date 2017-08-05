var url = "http://127.0.0.1:8000";

//send a request to server to change item
var changeItem = function (id) {
    var itemForm = getFormById(id);
    //check title & content not empty
    var title = itemForm.find("#title").val();
    var content = itemForm.find("#content").val();
    var urgency = itemForm.find("#urgency").val();
    if (title == "") {
        itemForm.find("#title_group").attr("class", "form-group has-error");
        itemForm.find("#title_group").find("#warning").show();
        return;
    }
    else {
        itemForm.find("#title_group").attr("class", "form-group");
        itemForm.find("#title_group").find("#warning").hide();
    }
    //post data
    $.post(url + "/items/changeitem/", {
            "id": id,
            "title": title,
            "content": content,
            "urgency": urgency
        },
        function (data, status) {
            if (status == "success") {
                var item = getItemById(id);
                item.find(".panel-title").text(title);
                item.find(".panel-content").text(content);
                item.attr("class", "panel " + getPanelStyle(urgency));

                item.find("#modified_time").text("Last Modified: " + data.last_modified_time);
                item.find("#modified_time").prepend("<br />");
                itemForm.find("#title").val(title);
                itemForm.find("#content").val(content);
                itemForm.find("#urgency").val(urgency);
                itemForm.hide("slow");
                item.find(".content-body").show("fast");
            }
        }
    )

};

var registerItemEvent = function (item) {
    var itemForm = getFormById(getIdByItem(item));
    //register todo_item edit button
    item.find("#edit_item_btn").click(function () {
        var todoItem = $(this).parent().parent().parent();
        var contentBody = todoItem.find(".content-body");
        contentBody.hide("fast");
        itemForm.show("slow");
    });
    //register todo_item delete button
    item.find("#delete_item_btn").click(function () {
        var todoItem = $(this).parent().parent().parent();
        $.post(url + "/items/deleteitem/",
            {"id": getIdByItem(todoItem)},
            function (data, status) {
                if (status == "success") {
                    todoItem.hide("slow");
                }
            })
    });
    //register todo_item check button
    if (item.attr("class") != "panel panel-success") {
        item.find("#check_item_btn").click(function () {
            var todoItem = $(this).parent().parent().parent();
            $.post(url + "/items/checkitem/",
                {"id": getIdByItem(todoItem)},
                function (data, status) {
                    if (status == "success") {
                        todoItem.hide("slow");
                    }
                })
        });
    }
    //register item edit form cancel button
    itemForm.find("#form_cancel").click(function () {
        var todoItem = getItemById(getIdByForm(itemForm));
        var contentBody = todoItem.find(".content-body");
        itemForm.hide("slow");
        contentBody.show("fast");
    });
    //register item edit form save button
    itemForm.find("#form_save").click(function () {
        changeItem(getIdByForm(itemForm));
    })
};


