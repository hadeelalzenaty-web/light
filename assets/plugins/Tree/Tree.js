﻿

$(document).on("keyup", ".txtPermissionSearch", function () {

    var container = $(this).data('container');
    var txtvalue = $(this).val();




    $("#divDir__" + container).find('.row').not($(this).parents('.row:first')).each(function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
    });

    $('#divDir__' + container + " ul.tree li").each(function () {

        var sel = $(this).find('div.selected_top');

        $(this).css('display', 'none');

        $(this).find('ul').each(function () {
            $(this).css('display', 'none');
        })

        $(sel).removeClass('selected_top');
        $(sel).addClass('selected_bottom');

        $(this).find('span').each(function () {
            if ($(this).hasClass('fa-minus')) {

                $(this).removeClass('fa-minus');
                $(this).addClass('fa-plus');
            }
        })
    })

    $('#divDir__' + container).find('div.selectable_node').each(function () {
        var text = $(this).find('.multiple_select').html();

        if (txtvalue != "" && text.indexOf(txtvalue) > -1) {

            var li = $(this).parents("li");
            var ul = $(this).parents("ul");
            var liParent = $(this).parents("li:first");
            var ulParent = $(this).parents("ul:first");

            li.css('display', 'block');
            li.find("ul").each(function () {
                var ele = $(this);
                ul.each(function () {
                    if (ele[0] == $(this)[0]) {
                        $(this).css('display', 'block');
                        var dv = $(this).prev().find(".selected_bottom");
                        $(dv).removeClass("selected_bottom");
                        $(dv).addClass("selected_top");
                        $(this).prev().find(".node span").removeClass("fa-plus");
                        $(this).prev().find(".node span").addClass("fa-minus");
                    }
                })
            });

            ulParent.find("li").not(liParent[0]).each(function () {
                var txt = $(this).find('.multiple_select').html();
                $(this).hide();
                if (txt.indexOf(txtvalue) > -1) {
                    $(this).show();

                }
            })
        }
        if (txtvalue == "") {
            $('#divDir__' + container + " ul.tree li").each(function () {

                var sel = $(this).find('div.selected_top');

                $(this).css('display', 'block');

                $(this).find('ul').each(function () {
                    $(this).css('display', 'none');
                })

                $(sel).each(function () {
                    $(this).removeClass('selected_top');
                })
                $(sel).each(function () {
                    $(this).addClass('selected_bottom');
                })

                $(this).find('span').each(function () {
                    if ($(this).hasClass('fa fa-minus')) {

                        $(this).removeClass('fa fa-minus');
                        $(this).addClass('fa fa-plus');
                    }
                })
            })

        }
    })
});


$(document).on('click', ".node", function () {
    if ($(this).find("span:first").hasClass("fa fa-plus")) {
        var li = $(this).parents("li:first");
        var ul = $(this).parents("ul:first");
        var div = $(this).parents(".selected_bottom");

        $(this).find("span:first").removeClass("fa fa-plus");
        $(this).find("span:first").addClass("fa fa-minus");
        $(div).removeClass("selected_bottom");
        $(div).addClass("selected_top");

        ul.children().each(function () {
            $(this).css('display', 'none');
        })
        li.css('display', 'block');
        li.find("ul:first").css('display', 'block');

        li.children("ul").each(function () {
            $(this).children().each(function () {
                $(this).css('display', 'block');
            })
        })

    }
    else {
        var li = $(this).parents("li:first");
        var ul = $(this).parents("ul:first");
        var div = $(this).parents("div.selected_top:first");

        $(this).find("span:first").removeClass("fa fa-minus");
        $(this).find("span:first").addClass("fa fa-plus");
        $(div).removeClass("selected_top");
        $(div).addClass("selected_bottom");

        ul.children().each(function () {
            $(this).css('display', 'block');
        })

        li.css('display', 'block');
        li.find("ul:first").css('display', 'none');

        li.children("ul").each(function () {
            $(this).children().each(function () {
                $(this).css('display', 'none');
            })
        })


        var sel = li.find('div.selected_top');

        li.css('display', 'block');
        li.find('ul').each(function () {
            $(this).css('display', 'none');
        })
        $(sel).each(function () {
            $(this).removeClass('selected_top');
        })
        $(sel).each(function () {
            $(this).addClass('selected_bottom');
        })
        li.find('span').each(function () {
            if ($(this).hasClass('fa fa-minus')) {

                $(this).removeClass('fa fa-minus');
                $(this).addClass('fa fa-plus');
            }
        })
    }
});


function ShowHideTree(div) {
    var treeId = div.split('__')[1];

    $(div).slideToggle();

    $(div + " ul.tree li").each(function () {

        var sel = $(this).find('div.selected_top');

        $(this).css('display', 'block');

        $(this).find('ul').each(function () {
            $(this).css('display', 'none');
        })

        $(sel).each(function () {
            $(this).removeClass('selected_top');
        })
        $(sel).each(function () {
            $(this).addClass('selected_bottom');
        })

        $(this).find('span').each(function () {
            if ($(this).hasClass('fa fa-minus')) {

                $(this).removeClass('fa fa-minus');
                $(this).addClass('fa fa-plus');
            }
        })
    })
}

function ShowHideTreeDialog(div) {
    var treeId = div.split('__')[1];

    $(div).show();
    $('#modal__' + treeId).modal('show');

    $(div + " ul.tree li").each(function () {

        var sel = $(this).find('div.selected_top');

        $(this).css('display', 'block');

        $(this).find('ul').each(function () {
            $(this).css('display', 'none');
        })

        $(sel).each(function () {
            $(this).removeClass('selected_top');
        })
        $(sel).each(function () {
            $(this).addClass('selected_bottom');
        })
        if ($(" li div.selected").length >= 1) {
            $("li div.selectable_node .glyphicon_ok").removeClass('glyphicon glyphicon-ok');
            $("li div.selected .glyphicon_ok").addClass('glyphicon glyphicon-ok');
            $("li div.selectable_node").css("background-color", "white");
            $("li div.selected").parent().css("background-color", "rgb(243, 243, 243)");
        }
        $(this).find('span').each(function () {
            if ($(this).hasClass('fa fa-minus')) {

                $(this).removeClass('fa fa-minus');
                $(this).addClass('fa fa-plus');
            }
        })
    })
}

function ShowPermissionSingleTree(div) {
    $(div).slideToggle();

    $(div + " ul.tree li").each(function () {

        var sel = $(this).find('div.selected_top');

        $(this).css('display', 'block');

        $(this).find('ul').each(function () {
            $(this).css('display', 'none');
        })

        $(sel).each(function () {
            $(this).removeClass('selected_top');
        })
        $(sel).each(function () {
            $(this).addClass('selected_bottom');
        })

        $(this).find('span').each(function () {
            if ($(this).hasClass('fa fa-minus')) {

                $(this).removeClass('fa fa-minus');
                $(this).addClass('fa fa-plus');
            }
        })
    })

    $(div).find(".selected").parents("ul.tree:first").find("li").hide();

    $(div).find(".selected").parents("ul:first").find("li").each(function () {
        $(this).show();
    })
    $(div).find(".selected").parents("ul").show();
    $(div).find(".selected").parents("li").show();
    $(div).find(".selected").parents("ul:first").parent().show();
    $(div).find(".selected").parents("ul:first").parent().find(".row:first").removeClass('selected_bottom');
    $(div).find(".selected").parents("ul:first").parent().find(".row:first").addClass('selected_top');
    $(div).find(".selected").parents("ul:first").parent().find(".row:first").find("span").removeClass("fa-plus");
    $(div).find(".selected").parents("ul:first").parent().find(".row:first").find("span").addClass("fa-minus");
}

function RepiarTreeHtml(container, divContainerId) {
    var html = $("#divAcc__" + container).html();
    if (divContainerId != "") {
        $("#divAcc__" + container).remove();
        $("#" + divContainerId).after(html);
    }
    else {
        var divContainer = $("#divAcc__" + container).parents(".row:first");
        $("#divAcc__" + container).remove();
        divContainer.after(html);
    }
}

//Permission
$(document).on("click", ".single_select", function () {
    
    if (!$(this).hasClass('parent')) {

        $(this).parents("div.directory").find('.row').not($(this).parents('.row:first')).each(function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
        });

        if ($(this).parents('.row:first').hasClass('selectable_node')) {
            $(this).parents('.row:first').toggleClass('selected');
        }

        var container = $(this).data('container');
        var value = $(this).data('value');

        if ($(this).parents('.row:first').hasClass('selected')) {
            $("#divForm__" + container).find(".txtPermissionName").val($(this).html());
            $("#divForm__" + container).find(".hdnPermissionId").val(value);
            $("#divContainer__" + container).slideToggle();
            $('#modal__' + container).modal('hide');

        }
        else {
            $("#divForm__" + container).find(".txtPermissionName").val('');
            $("#divForm__" + container).find(".hdnPermissionId").val('');
        }
    }

});

$(document).on("click", ".multiple_select", function () {
    if ($(this).parents('.row:first').hasClass('selectable_node')) {
        $(this).parents('.row:first').toggleClass('selected');
    }

    var element = $(this);
    var container = $(this).data('container');
    var name = $(this).data('name');
    var value = $(this).data('value');
    var id = $(this).attr('id');

    if ($(this).parents('.row:first').hasClass('selected') && !$(this).hasClass('parent')) {

        $("#divForm__" + container + " #divTags").append("<span class='tag' id='" + value + "'><span>" + $(this).html() + "&nbsp;&nbsp;</span><a data-container='" + container + "' data-name='" + name + "' class='removeTag' id='" + id + "' ></a><input type='hidden' value='" + value + "' name='" + name + "' id='" + value + "'></input></span>");
    }
    else {
        $("#divForm__" + container + " span#" + value).remove();
    }

    $("#divDir__" + container + " .selectable_node").find("div[data-value=" + value + "]").each(function () {
        if (!$(this).is(element) && $(this).parents('.row:first').hasClass('selectable_node')) {
            $(this).parents('.row:first').toggleClass('selected');

        }
    });
});

$(document).on("click", ".removeTag", function () {
    var id = $(this).attr('id');
    var name = $(this).data('name');
    var divId = $(this).parent().attr('id');
    var container = $(this).data('container');

    //$("#divAcc__" + container).find("div#" + id).parents('.row:first').removeClass('selected');

    $("#divDir__" + container + " .selectable_node").find("div[data-value=" + divId + "]").each(function () {
        if ($(this).parents(".row:first").length > 0 && $(this).parents(".row:first").hasClass('selectable_node')) {

            $(this).parents(".row:first").removeClass('selected');
            CheckNodeParent($(this).parents(".row:first"));
        }
    })

    //CheckNodeParent($("#divAcc__" + container).find("div#" + id).parents('.row:first'));
    $(this).parent().remove();

    if ($("#divForm__" + container).hasClass('Required') && $("#divForm__" + container + " #divTags").html() == '') {

        $("#divForm__" + container + " #divTags").append("<input type='hidden' name='" + name + "'/>");
    }
});

function TagsPopulation(container) {
    $("#divForm__" + container + " #divTags").html('');

    $("#divAcc__" + container).find('div.selected').each(function () {

        var div = $(this).find('div.multiple_select');

        if (!div.hasClass('parent')) {

            var container = div.data('container');
            var name = div.data('name');
            var value = div.data('value');
            var id = div.attr('id');
            var hasTag = false;

            $("#divForm__" + container + " #divTags").find('.tag').each(function () {
                var elementId = $(this).attr('id');
                if (value == elementId) {
                    hasTag = true;
                }
            })
            if (!hasTag) {
                $("#divForm__" + container + " #divTags").append("<span class='tag' id='" + value + "'><span>" + div.html() + "&nbsp;&nbsp;</span><a data-container='" + container + "' data-name='" + name + "' class='removeTag' id='" + id + "' ></a><input type='hidden' value='" + value + "' name='" + name + "' id='" + value + "'></input></span>");
            }

        }
        CheckNodeParent($(this));
    })
    if ($("#" + container + " .Required").length != 0 && $("#" + container + " #divTags").html() == '') {

        var propertyName = $("#" + container + " #divTags").data('name');
        $("#" + container + " #divTags").append("<input type='hidden' name='" + propertyName + "'/>");
    }
}

$(document).on("click", ".parent", function () {

    if (!$(this).hasClass('single_select')) {

        var container = $(this).data('container');
        //var parentValue = $(this).data("value");

        if ($(this).parents('.row:first').hasClass('selected')) {

            $(this).parents('li:first').find('.row').each(function () {
                if ($(this).hasClass('selectable_node')) {
                    $(this).addClass('selected');
                    var value = $(this).find(".leaf").data("value");
                    $("#divDir__" + container + " .selectable_node").find("div[data-value=" + value + "]").each(function () {
                        if ($(this).parents(".row:first").length > 0 && $(this).parents(".row:first").hasClass('selectable_node')) {

                            $(this).parents(".row:first").addClass('selected');
                            CheckNodeParent($(this).parents(".row:first"));
                        }
                    })


                }
            })

        }
        else {
            $(this).parents('li:first').find('.row').each(function () {
                if ($(this).hasClass('selectable_node')) {
                    $(this).removeClass('selected');
                    var value = $(this).find(".leaf").data("value");
                    $("#divDir__" + container + " .selectable_node").find("div[data-value=" + value + "]").each(function () {
                        if ($(this).parents(".row:first").length > 0 && $(this).parents(".row:first").hasClass('selectable_node')) {
                            $(this).parents(".row:first").removeClass('selected');
                            CheckNodeParent($(this).parents(".row:first"));
                        }
                    })
                }
            })
        }
        TagsPopulation(container);
    }

});

$(document).on("click", ".leaf", function () {
    if (!$(this).hasClass('single_select')) {

        var container = $(this).data('container');
        CheckNodeParent($(this).parents('.row:first'));
        TagsPopulation(container);
    }

});

function CheckNodeParent(node) {
    var selected = true;
    if (!node.parents("ul:first").hasClass('tree')) {


        node.parents("ul:first").find("li").each(function () {
            $(this).find("div.selectable_node").each(function () {
                if (!$(this).hasClass('selected') && $(this).hasClass('selectable_node')) {
                    selected = false;
                }
            })
        })
        if (selected) {
            node.parents("ul:first").prev().addClass('selected');
            //CheckNodeParent(node.parents("ul:first").prev());
        }
        else {
            node.parents("ul:first").prev().removeClass('selected');
            //CheckNodeParent(node.parents("ul:first").prev());
        }
    }
    else {
        node.parents("ul:first").find("li").each(function () {
            $(this).find("div.selectable_node").each(function () {
                if (!$(this).hasClass('selected') && $(this).hasClass('selectable_node')) {
                    selected = false;
                }
            })
        })
        if (selected) {
            node.parents("ul:first").prev().addClass('selected');
        }
        else {
            node.parents("ul:first").prev().removeClass('selected');
        }
    }
}

$(document).on("keyup", ".txtPermissionName", function () {
    var container = $(this).data('container');
    var txtvalue = $(this).val();




    $("#divDir__" + container).find('.row').not($(this).parents('.row:first')).each(function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
    });

    $('#divDir__' + container + " ul.tree li").each(function () {

        var sel = $(this).find('div.selected_top');

        $(this).css('display', 'none');

        $(this).find('ul').each(function () {
            $(this).css('display', 'none');
        })

        $(sel).removeClass('selected_top');
        $(sel).addClass('selected_bottom');

        $(this).find('span').each(function () {
            if ($(this).hasClass('fa-minus')) {

                $(this).removeClass('fa-minus');
                $(this).addClass('fa-plus');
            }
        })
    })

    $('#divDir__' + container).find('div.selectable_node').each(function () {
        var text = $(this).find('.single_select').html();

        if (txtvalue != "" && text.indexOf(txtvalue) > -1) {

            if ($("#divContainer__" + container).css('display') == 'none') {
                $("#divContainer__" + container).slideToggle();
                $('#modal__' + container).modal('show');

            }
            var li = $(this).parents("li");
            var ul = $(this).parents("ul");
            var liParent = $(this).parents("li:first");
            var ulParent = $(this).parents("ul:first");

            li.css('display', 'block');
            li.find("ul").each(function () {
                var ele = $(this);
                ul.each(function () {
                    if (ele[0] == $(this)[0]) {
                        $(this).css('display', 'block');
                        var dv = $(this).prev().find(".selected_bottom");
                        $(dv).removeClass("selected_bottom");
                        $(dv).addClass("selected_top");
                        $(this).prev().find(".node span").removeClass("fa-plus");
                        $(this).prev().find(".node span").addClass("fa-minus");
                    }
                })
            });

            ulParent.find("li").not(liParent[0]).each(function () {
                var txt = $(this).find('.single_select').html();
                $(this).hide();
                if (txt.indexOf(txtvalue) > -1) {
                    $(this).show();

                }
            })

        }
        if (txtvalue == "") {
            $('#divDir__' + container + " ul.tree li").each(function () {

                var sel = $(this).find('div.selected_top');

                $(this).css('display', 'block');

                $(this).find('ul').each(function () {
                    $(this).css('display', 'none');
                })

                $(sel).each(function () {
                    $(this).removeClass('selected_top');
                })
                $(sel).each(function () {
                    $(this).addClass('selected_bottom');
                })

                $(this).find('span').each(function () {
                    if ($(this).hasClass('fa fa-minus')) {

                        $(this).removeClass('fa fa-minus');
                        $(this).addClass('fa fa-plus');
                    }
                })
            })

        }
    })

    if (!hasValue) {
        $("#divForm__" + container).find(".hdnPermissionId").val('');

        $("#divDir__" + container).find('.row').not($(this).parents('.row:first')).each(function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
        });
    }

});
function AppendText(container) {

    var text = $('#divDir__' + container).find('div.selected').find(".single_select").html();
    var id = $('#divDir__' + container).find('div.selected').find(".single_select").data('value');

    $("#divForm__" + container).find(".txtPermissionName").val(text);
    $("#divForm__" + container).find('.hdnPermissionId').val(id);

}
//

//Depatments
function AppendDepartmentText(container) {

    var value = $("#divDir__" + container).find('div.selected').find(".hdnDepartmentNumber").val();
    var text = $('#divDir__' + container).find('div.selected').find(".single_select_dept").html();
    var id = $('#divDir__' + container).find('div.selected').find(".single_select_dept").data('value');

    $("#divForm__" + container).find(".txtDepartmentNumber").val(value);
    $("#divForm__" + container).find(".txtDepartmentName").val(text);
    $("#divForm__" + container).find('.hdnDepartmentId').val(id);

}

function FillDepartmentTreeControlsById(container, id) {

    var options = {
        type: "GET",
        url: __ExternalPartyDataByIdAction,
        data: { partyId: id }
    };

    jqXHR = $.ajax(options).done(function (data) {
        if (data.isExist) {
            $("#divForm__" + container).find('.hdnDepartmentId').val(id);
            $("#divForm__" + container).find(".txtDepartmentName").val(data.Party.Name[0].Text);
            $("#divForm__" + container).find('.txtDepartmentNumber').val(data.Party.PartyNumber);
        }
    }).fail(function (jqXHR, textStatus, error) {
    });
}

function FillOrgUnitsTreeControls(container, id) {

    var options = {
        type: "GET",
        url: __OrgUnitDataByIdAction,
        data: { orgUnitId: id },
        async : false
    };

    jqXHR = $.ajax(options).done(function (data) {
        if (data.isExist) {
            $("#divForm__" + container).find('.hdnDepartmentId').val(id);
            $("#divForm__" + container).find(".txtDepartmentNumber").val(data.Party.Number);
            $("#divForm__" + container).find(".txtDepartmentName").val(data.Party.Name);
        }
    }).fail(function (jqXHR, textStatus, error) {
    });
}

$(document).on("click", ".single_select_dept", function () {
    $(this).parents("div.directory").find('.row').not($(this).parents('.row:first')).each(function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
    });

    if ($(this).parents('.row:first').hasClass('selectable_node')) {
        $(this).parents('.row:first').toggleClass('selected');
    }

    var container = $(this).data('container');
    var id = $(this).data('value');

    if ($(this).parents('.row:first').hasClass('selected')) {
        var value = $(this).parents('.row:first').find(".hdnDepartmentNumber").val();

        $("#divForm__" + container).find(".txtDepartmentName").val($(this).html());
        $("#divForm__" + container).find(".hdnDepartmentId").val(id);
        $('#divForm__' + container).find(".txtDepartmentNumber").val(value);
        $("#divContainer__" + container).slideToggle();
        $('#modal__' + container).modal('hide');
    }
    else {
        $("#divForm__" + container).find(".txtDepartmentName").val('');
        $("#divForm__" + container).find(".hdnDepartmentId").val('');
        $('#divForm__' + container).find(".txtDepartmentNumber").val('');
    }


    var funtion = $(this).data('func');
    if (funtion != '' && funtion != undefined) {
        window[funtion]();
    }
});

$(document).on("click", ".multiple_select_dept", function () {

    if ($(this).parents('.row:first').hasClass('selectable_node')) {
        $(this).parents('.row:first').toggleClass('selected');
    }

    var container = $(this).data('container');
    var name = $(this).data('name');
    var value = $(this).data('value');
    var id = $(this).attr('id');

    if ($("#divForm__" + container + " .__hdnDepartment").length != 0) {
        $("#divForm__" + container + " .__hdnDepartment").remove();
    }

    if ($(this).parents('.row:first').hasClass('selected')) {
        $("#divForm__" + container + " #divTags").append("<span class='tag' id='" + value + "'><span>" + $(this).html() + "&nbsp;&nbsp;</span><a data-container='" + container + "' data-name='" + name + "' class='removeDepartmentTag' id='" + id + "' ></a><input type='hidden' value='" + value + "' name='" + name + "' id='" + value + "'></input></span>");
    }
    else {
        $("#divForm__" + container + " span#" + value).remove();
    }

    if ($("#divForm__" + container).hasClass('Required') && $("#divForm__" + container + " #divTags").html() == '') {

        var propertyName = $("#divForm__" + container + " #divTags").data('name');
        $("#divForm__" + container + " #divTags").append("<input type='hidden' class='__hdnDepartment' name='" + propertyName + "'/>");
    }


    var funtion = $(this).data('func');
    if (funtion != '' && funtion != undefined) {
        window[funtion]();
    }
});
var jqXHR = null;
$(document).on("keyup", ".txtDepartmentNumber", function () {
    var container = $(this).data('container');
    var txtvalue = $(this).val();
    var funtion = $(this).data('func');

    $("#divDir__" + container).find('.row').not($(this).parents('.row:first')).each(function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
    });
    var hasValue = false;
    if ($(this).parents(".externalParties").length == 0) {
        var options = {
            type: "GET",
            url: __OrgUnitsAutoCompleteAction,
            data: { searchQuery: txtvalue }
        };

        if (jqXHR != null)
            jqXHR.abort();

        jqXHR = $.ajax(options).done(function (data) {
            if (data.RowsCount > 0) {
                hasValue = true;
                var text = data.Parties[0].Name;
                var id = data.Parties[0].Id;

                selectViaAutoComplete(id, text, txtvalue, container, funtion);
            }
        }).fail(function (jqXHR, textStatus, error) {
        });

    } else {

        var options = {
            type: "GET",
            url: __ExternalPartyAutoCompleteAction,
            data: { searchQuery: txtvalue }
        };

        if (jqXHR != null)
            jqXHR.abort();

        jqXHR = $.ajax(options).done(function (data) {
            if (data.RowsCount > 0) {
                hasValue = true;
                var text = data.Parties[0].LocalName;
                var id = data.Parties[0].Id;

                selectViaAutoComplete(id, text, txtvalue, container, funtion);
            }
        }).fail(function (jqXHR, textStatus, error) {
        });
    }

    if (!hasValue) {
        $("#divForm__" + container).find(".txtDepartmentName").val('');
        $("#divForm__" + container).find('.hdnDepartmentId').val('');

        $("#divDir__" + container).find('.row').not($(this).parents('.row:first')).each(function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
        });
    }
});

$(document).on("keyup", ".txtDepartmentName", function () {
    var container = $(this).data('container');
    var txtvalue = $(this).val();
    var funtion = $(this).data('func');

    if (txtvalue.length < 3) {
        if ($("#divAutoComplateMenu") && $("#divAutoComplateMenu") != undefined) {
            $("#divAutoComplateMenu").remove();
        }
        return;
    }
    $("#divDir__" + container).find('.row').not($(this).parents('.row:first')).each(function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
    });

    $('#divDir__' + container + " ul.tree li").each(function () {

        var sel = $(this).find('div.selected_top');

        $(this).css('display', 'none');

        $(this).find('ul').each(function () {
            $(this).css('display', 'none');
        })

        $(sel).removeClass('selected_top');
        $(sel).addClass('selected_bottom');

        $(this).find('span').each(function () {
            if ($(this).hasClass('fa-minus')) {

                $(this).removeClass('fa-minus');
                $(this).addClass('fa-plus');
            }
        })
    })

    if ($(this).parents(".externalParties").length == 0) {
        var options = {
            type: "GET",
            url: __OrgUnitsAutoCompleteAction,
            data: { searchQuery: txtvalue }
        };

        if (jqXHR != null)
            jqXHR.abort();

        jqXHR = $.ajax(options).done(function (data) {
            if (data.RowsCount > 0) {
                $("#divContainer__" + container).css('display', 'none');
                $("#divAutoComplateMenu").remove();
                $("#divForm__" + container).after("<div id='divAutoComplateMenu' class='panel-popup' style='height: 100px; overflow-y: auto;'></div>");
                var ul = "";
                $(data.Parties).each(function (index, item) {
                    ul += "<div onclick=\"selectViaAutoComplete(" + item.Id + ", '" + item.Name + "', '" + item.Number + "', '" + container + "', '" + funtion + "')\" style=\"cursor:pointer\">" + item.Name + "</div>"
                });

                $("#divAutoComplateMenu").html(ul);
            }
            else {
                $("#divAutoComplateMenu").remove();
            }
        }).fail(function (jqXHR, textStatus, error) {
        });
    }
    else {
        var options = {
            type: "GET",
            url: __ExternalPartyAutoCompleteAction,
            data: { searchQuery: txtvalue }
        };

        if (jqXHR != null)
            jqXHR.abort();

        jqXHR = $.ajax(options).done(function (data) {
            if (data.RowsCount > 0) {
                $("#divContainer__" + container).css('display', 'none');
                $("#divAutoComplateMenu").remove();
                $("#divForm__" + container).after("<div id='divAutoComplateMenu' class='panel-popup' style='height: 100px; overflow-y: auto;'></div>");
                var ul = "";
                $(data.Parties).each(function (index, item) {
                    ul += "<div onclick=\"selectViaAutoComplete(" + item.Id + ", '" + item.LocalName + "', '" + item.Number + "', '" + container + "', '" + funtion + "')\" style=\"cursor:pointer\">" + item.LocalName + "</div>"
                });

                $("#divAutoComplateMenu").html(ul);
            }
            else {
                $("#divAutoComplateMenu").remove();
            }
        }).fail(function (jqXHR, textStatus, error) {
        });
    }

});

function selectViaAutoComplete(id, name, number, container, funtion) {
    $('#divForm__' + container + ' .hdnDepartmentId').val(id);
    $('#divForm__' + container + ' .hdnDepartmentId').trigger('change');
    $("#divForm__" + container).find(".txtDepartmentName").val(name);
    $("#divForm__" + container).find('.txtDepartmentNumber').val(number);
    $("#divAutoComplateMenu").remove();

    if (funtion != '' && funtion != undefined) {
        window[funtion]();
    }
}

$(document).on("change", ".hdnDepartmentId", function () {
    var container = $(this).data('container');
    var hdn = $(this);

    $("#divDir__" + container).find('.row').not($(this).parents('.row:first')).each(function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
    });

    var hasValue = false;

    $('#divDir__' + container).find('div.selectable_node').each(function () {
        var id = $(this).find('.single_select_dept').data('value');
        var text = $(this).find(".single_select_dept").html();
        var number = $(this).find(".hdnDepartmentNumber").val();

        if (hdn.val() == id) {
            hasValue = true;
            $(this).addClass('selected');

            $("#divForm__" + container).find(".txtDepartmentName").val(text);
            $("#divForm__" + container).find('.txtDepartmentNumber').val(number);
        }
    })

    if (!hasValue) {
        $("#divForm__" + container).find(".txtDepartmentName").val('');

        $("#divDir__" + container).find('.row').not($(this).parents('.row:first')).each(function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
        });
    }

    var funtion = $(this).data('func');
    if (funtion != '' && funtion != undefined) {
        window[funtion]();
    }
});

$(document).on("click", ".removeDepartmentTag", function () {

    var id = $(this).attr('id');
    var name = $(this).data('name');
    var divId = $(this).parent().attr('id');
    var container = $(this).data('container');

    if ($("#divAcc__" + container + " .__hdnDepartment").length != 0) {
        $("#divAcc__" + container + " .__hdnDepartment").remove();
    }

    $("#divAcc__" + container).find("div#" + id).parents('.row:first').removeClass('selected');
    $(this).parent().remove();

    if ($("#divForm__" + container).hasClass('Required') && $("#divForm__" + container + " #divTags").html() == '') {

        var propertyName = $("#divForm__" + container + " #divTags").data('name');
        $("#divForm__" + container + " #divTags").append("<input type='hidden' class='__hdnDepartment' name='" + propertyName + "'/>");
    }
});

function TagsPopulationDept(container) {
    $("#divForm__" + container + " #divTags").html('');

    $("#divDir__" + container).find('div.selected').each(function () {

        var div = $(this).find('div.multiple_select_dept');

        var container = div.data('container');
        var name = div.data('name');
        var value = div.data('value');
        var id = div.attr('id');

        $("#divForm__" + container + " #divTags").append("<span class='tag' id='" + value + "'><span>" + div.html() + "&nbsp;&nbsp;</span><a data-container='" + container + "' data-name='" + name + "' class='removeTag' id='" + id + "' ></a><input type='hidden' value='" + value + "' name='" + name + "' id='" + value + "'></input></span>");
    });

    if ($("#divForm__" + container).hasClass('Required') && $("#" + container + " #divTags").html() == '') {

        var propertyName = $("#divForm__" + container + " #divTags").data('name');
        $("#divForm__" + container + " #divTags").append("<input type='hidden' name='" + propertyName + "'/>");
    }
}
function GenerateGuid() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function TagsPopulationDeptByIds(container, orgUnitIds) {
    $("#divForm__" + container + " #divTags").html('');
    var token = $('form:first').find("input[name='__RequestVerificationToken']").val();

    var options = {
        type: "POST",
        url: __OrgUnitsDataByIdsAction,
        data: { orgUnitIds: orgUnitIds, __RequestVerificationToken: token }
    };

    jqXHR = $.ajax(options).done(function (data) {
        if (data.isExist) {
            $.each(data.Party, function (key, value) {
                var name = value.Name;
                var id = value.Id;
                var guid = (GenerateGuid() + GenerateGuid() + "-" + GenerateGuid() + "-4" + GenerateGuid().substr(0, 3) + "-" + GenerateGuid() + "-" + GenerateGuid() + GenerateGuid() + GenerateGuid()).toLowerCase();
                $("#divForm__" + container + " #divTags").append("<span class='tag' id='" + id + "'><span>" + name + "&nbsp;&nbsp;</span><a data-container='" + container + "' data-name='" + name + "' class='removeTag' id='" + guid + "' ></a><input type='hidden' value='" + id + "' name='" + name + "' id='" + id + "'></input></span>");
            });
        }
    }).fail(function (jqXHR, textStatus, error) {
    });


    if ($("#divForm__" + container).hasClass('Required') && $("#" + container + " #divTags").html() == '') {

        var propertyName = $("#divForm__" + container + " #divTags").data('name');
        $("#divForm__" + container + " #divTags").append("<input type='hidden' name='" + propertyName + "'/>");
    }
}
//



function RefreshTree(treeName, parentId, newId, newName) {

    var propertyName = $("#divContainer__" + treeName).attr("data-Name");
    var funcName = $("#divContainer__" + treeName).attr("data-func");

    if ($("#divContainer__" + treeName + " #li_" + newId).length == 0) {

        if (parentId == 0) {

            $("#divContainer__" + treeName + " .tree").append("<li id='li_" + newId + "'><div class='row row_directory " + "selectable_node" + " " + "" + "'></div></li>");

            $("#divContainer__" + treeName + " .tree" + " #li_" + newId + " .row").append("<div class='col-md-1'></div>");

            $("#divContainer__" + treeName + " .tree" + " #li_" + newId + " .row").append("<div data-container='" + treeName + "' data-Name='" + propertyName + "' data-value='" + newId + "' data-func='" + funcName + "' class='col-md-8 " + "single_select_dept" + "'>" + newName + "</div>");

            $("#divContainer__" + treeName + " .tree" + " #li_" + newId + " .row").append("<input type='hidden' value='" + newId + "'  class='hdnDepartmentNumber __hdnSticky'/>");

            $("#divContainer__" + treeName + " .tree" + " #li_" + newId + " .row").append("<div class='col-md-1'><i class='glyphicon glyphicon-ok'></i></div>");
        }
        else {

            if ($("#divContainer__" + treeName + " #ul_" + parentId + treeName).length == 0) {

                $("#divContainer__" + treeName + " #li_" + parentId + " .row").removeClass("last");

                $("#divContainer__" + treeName + " #li_" + parentId + " .row").addClass("selected_bottom");

                $("#divContainer__" + treeName + " #li_" + parentId + " .row .col-md-1:first-child").append("<a class='node'  ><span id='span_" + parentId + treeName + "' class='fa fa-plus'></span></a>");

                $("#divContainer__" + treeName + " #li_" + parentId).append("<ul id='ul_" + parentId + treeName + "' style='display:none'></ul>");
            }

            $("#divContainer__" + treeName + " #ul_" + parentId + treeName).append("<li id='li_" + newId + "'><div class='row row_directory " + "selectable_node" + " " + "" + "'></div></li>");

            $("#divContainer__" + treeName + " #ul_" + parentId + treeName + " #li_" + newId + " .row").append("<div class='col-md-1'></div>");

            $("#divContainer__" + treeName + " #ul_" + parentId + treeName + " #li_" + newId + " .row").append("<div data-container='" + treeName + "' data-Name='" + propertyName + "' data-value='" + newId + "' data-func='" + funcName + "' class='col-md-8 " + "single_select_dept" + "'>" + newName + "</div>");

            $("#divContainer__" + treeName + " #ul_" + parentId + treeName + " #li_" + newId + " .row").append("<input type='hidden' value='" + newId + "'  class='hdnDepartmentNumber __hdnSticky'/>");

            $("#divContainer__" + treeName + " #ul_" + parentId + treeName + " #li_" + newId + " .row").append("<div class='col-md-1'><i class='glyphicon glyphicon-ok'></i></div>");
        }
    }
    else {

        $("#divContainer__" + treeName + " #li_" + newId + " .single_select_dept").html(newName);
    }

    SelectTreeNode(treeName, newId);
}

function SelectTreeNode(treeName, nodeId) {

    $("#divDir__" + treeName).find('.row').not($(this).parents('.row:first')).each(function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
    });

    var hasValue = false;

    $('#divDir__' + treeName).find('div.selectable_node').each(function () {
        var id = $(this).find('.single_select_dept').data('value');
        var text = $(this).find(".single_select_dept").html();
        var number = $(this).find(".hdnDepartmentNumber").val();

        if (nodeId == id) {
            hasValue = true;
            $(this).addClass('selected');

            $("#divForm__" + treeName).find(".txtDepartmentName").val(text);
            $("#divForm__" + treeName).find('.txtDepartmentNumber').val(number);
            $("#divForm__" + treeName).find('.hdnDepartmentId').val(id);
        }
    })

    if (!hasValue) {
        $("#divForm__" + treeName).find(".txtDepartmentName").val('');
        $("#divForm__" + treeName).find('.txtDepartmentNumber').val('');
        $("#divForm__" + treeName).find('.hdnDepartmentId').val('');

        $("#divDir__" + treeName).find('.row').not($(this).parents('.row:first')).each(function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
        });
    }

    var funtion = $("#divContainer__" + treeName).attr("data-func");

    if (funtion != '' && funtion != undefined) {
        window[funtion]();
    }
}

function SelectMultiTreeNode(treeName, nodeIds) {
    $('#divDir__' + treeName).find('div.selectable_node').each(function () {
        var id = $(this).find('.multiple_select_dept').data('value');
        var text = $(this).find(".multiple_select_dept").html();
        var number = $(this).find(".hdnDepartmentNumber").val();
        if (nodeIds != "" && nodeIds != undefined) {
            var str_array = nodeIds.split(',');
            for (var nodeId in str_array) {
                if (str_array[nodeId] == id) {
                    $(this).addClass('selected');
                    $("#divForm__" + treeName).find(".txtDepartmentName").val(text);
                    $("#divForm__" + treeName).find('.txtDepartmentNumber').val(number);
                    $("#divForm__" + treeName).find('.hdnDepartmentId').val(id);
                }
            }
        }
    });
    var funtion = $("#divContainer__" + treeName).attr("data-func");
    if (funtion != '' && funtion != undefined) {
        window[funtion]();
    }
}

$(document).on("keyup", ".txtDepartmentSearch", function () {

    var container = $(this).data('container');
    var txtvalue = $(this).val();

    $("#divDir__" + container).find('.row').not($(this).parents('.row:first')).each(function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
    });

    $('#divDir__' + container + " ul.tree li").each(function () {

        var sel = $(this).find('div.selected_top');

        $(this).css('display', 'none');

        $(this).find('ul').each(function () {
            $(this).css('display', 'none');
        })

        $(sel).removeClass('selected_top');
        $(sel).addClass('selected_bottom');

        $(this).find('span').each(function () {
            if ($(this).hasClass('fa-minus')) {

                $(this).removeClass('fa-minus');
                $(this).addClass('fa-plus');
            }
        })
    })

    $('#divDir__' + container).find('div.selectable_node').each(function () {
        var text = $(this).find('.multiple_select_dept').html();

        if (txtvalue != "" && text.indexOf(txtvalue) > -1) {

            var li = $(this).parents("li");
            var ul = $(this).parents("ul");
            var liParent = $(this).parents("li:first");
            var ulParent = $(this).parents("ul:first");

            li.css('display', 'block');
            li.find("ul").each(function () {
                var ele = $(this);
                ul.each(function () {
                    if (ele[0] == $(this)[0]) {
                        $(this).css('display', 'block');
                        var dv = $(this).prev().find(".selected_bottom");
                        $(dv).removeClass("selected_bottom");
                        $(dv).addClass("selected_top");
                        $(this).prev().find(".node span").removeClass("fa-plus");
                        $(this).prev().find(".node span").addClass("fa-minus");
                    }
                })
            });

            ulParent.find("li").not(liParent[0]).each(function () {
                var txt = $(this).find('.multiple_select_dept').html();
                $(this).hide();
                if (txt.indexOf(txtvalue) > -1) {
                    $(this).show();

                }
            })
        }
        if (txtvalue == "") {
            $('#divDir__' + container + " ul.tree li").each(function () {

                var sel = $(this).find('div.selected_top');

                $(this).css('display', 'block');

                $(this).find('ul').each(function () {
                    $(this).css('display', 'none');
                })

                $(sel).each(function () {
                    $(this).removeClass('selected_top');
                })
                $(sel).each(function () {
                    $(this).addClass('selected_bottom');
                })

                $(this).find('span').each(function () {
                    if ($(this).hasClass('fa fa-minus')) {

                        $(this).removeClass('fa fa-minus');
                        $(this).addClass('fa fa-plus');
                    }
                })
            })

        }
    })
});

$(document).on("keyup", ".txtPermissionSearch", function () {

    var container = $(this).data('container');
    var txtvalue = $(this).val();




    $("#divDir__" + container).find('.row').not($(this).parents('.row:first')).each(function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
    });

    $('#divDir__' + container + " ul.tree li").each(function () {

        var sel = $(this).find('div.selected_top');

        $(this).css('display', 'none');

        $(this).find('ul').each(function () {
            $(this).css('display', 'none');
        })

        $(sel).removeClass('selected_top');
        $(sel).addClass('selected_bottom');

        $(this).find('span').each(function () {
            if ($(this).hasClass('fa-minus')) {

                $(this).removeClass('fa-minus');
                $(this).addClass('fa-plus');
            }
        })
    })

    $('#divDir__' + container).find('div.selectable_node').each(function () {
        var text = $(this).find('.multiple_select').html();

        if (txtvalue != "" && text.indexOf(txtvalue) > -1) {

            var li = $(this).parents("li");
            var ul = $(this).parents("ul");
            var liParent = $(this).parents("li:first");
            var ulParent = $(this).parents("ul:first");

            li.css('display', 'block');
            li.find("ul").each(function () {
                var ele = $(this);
                ul.each(function () {
                    if (ele[0] == $(this)[0]) {
                        $(this).css('display', 'block');
                        var dv = $(this).prev().find(".selected_bottom");
                        $(dv).removeClass("selected_bottom");
                        $(dv).addClass("selected_top");
                        $(this).prev().find(".node span").removeClass("fa-plus");
                        $(this).prev().find(".node span").addClass("fa-minus");
                    }
                })
            });

            ulParent.find("li").not(liParent[0]).each(function () {
                var txt = $(this).find('.multiple_select').html();
                $(this).hide();
                if (txt.indexOf(txtvalue) > -1) {
                    $(this).show();

                }
            })
        }
        if (txtvalue == "") {
            $('#divDir__' + container + " ul.tree li").each(function () {

                var sel = $(this).find('div.selected_top');

                $(this).css('display', 'block');

                $(this).find('ul').each(function () {
                    $(this).css('display', 'none');
                })

                $(sel).each(function () {
                    $(this).removeClass('selected_top');
                })
                $(sel).each(function () {
                    $(this).addClass('selected_bottom');
                })

                $(this).find('span').each(function () {
                    if ($(this).hasClass('fa fa-minus')) {

                        $(this).removeClass('fa fa-minus');
                        $(this).addClass('fa fa-plus');
                    }
                })
            })

        }
    })


});

$(document).on("click", ".glyphicon_ok", function (e) {
    $(this).prev().trigger("click");
})

function GetExternalPartyOnDemand(url, elemnt) {
    if ($(this).hasClass('fa-plus') && $(this).hasClass('LoadedData')) {
        $.ajax({
            type: 'get',
            url: url,
            data: { parentId: $(this).data("node-id"), letterId: $("#hdnOutboundExternalDocumentType").val() },
            success:
                function (data) {


                    $(elemnt).closest('li').children('ul').last().empty();

                    $(elemnt).closest('li').children('ul').last().append(data);

                    if ($(elemnt).attr('data-isRefreshEnabled').toLowerCase() == 'false') {

                        $(elemnt).removeClass("LoadedData");

                    }

                }
        });
    }
}

function StartInlinePopup(container) {
    
    $('#divForm__' + container).inlinePopup({
        itemSelector: ".article",
        closeinnerelem: "X"
    });

    $('#divForm__' + container).find('.chkGroupPermission.parent').each(function () {
        $(this).prop('checked', $(this).parents('.article:first').find('.ip-details').find('.chkGroupPermission.child').length == $(this).parents('.article:first').find('.ip-details').find('.chkGroupPermission.child:checked').length);
        $(this).parents('.article').find('.badge:first').html($(this).parents('.article').find('.badge:first').html().split('/')[0] + '/' + $(this).parents('.article').find('.chkGroupPermission.child:checked').length);
    });
    $('#divForm__' + container).find('.chkGroupPermission.superParent').prop('checked', $('#divAcc__' + container).find('.chkGroupPermission.parent').length == $('#divAcc__' + container).find('.chkGroupPermission.parent:checked').length);

}

$(document).on("change", ".chkGroupPermission", function (e) {
    e.preventDefault();
    var element = $(this);
    var container = $(this).data('container');
    var name = $(this).data('name');
    var value = $(this).data('value');
    var id = $(this).attr('id');
    var parentGroupElement = $('#' + id).parents('.article').find('.chkGroupPermission.parent');

    if (this.checked) {
        if (element.hasClass('parent')) {
            $('#divForm__' + container).find('.inlinepopup').find('.chkGroupPermission.child').prop('checked', true);
            $('#divForm__' + container).find('.inlinepopup').find('.chkGroupPermission.child').change();
        }
        else if (element.hasClass('superParent')) {
            $('#divForm__' + container).find('.inlinepopup').find('.chkGroupPermission.child').prop('checked', true);
            $('#divForm__' + container).find('.inlinepopup').find('.chkGroupPermission.child').change();

            $('#divAcc__' + container).find('.chkGroupPermission.child').prop('checked', true);
            $('#divAcc__' + container).find('.chkGroupPermission.child').change();
        }
        else {
            $('#' + id).attr('checked', this.checked);
            $('#' + id).prop('checked', this.checked);
            if ($('#' + id).parent().find('span#' + value).length == 0)
                $('#' + id).parent().append("<span id='" + value + "'><input type='hidden' value='" + value + "' name='" + name + "' id='" + value + "'></input></span>");
        }
    }
    else {
        if (element.hasClass('parent')) {
            $('#divForm__' + container).find('.inlinepopup').find('.chkGroupPermission.child').prop('checked', false);
            $('#divForm__' + container).find('.inlinepopup').find('.chkGroupPermission.child').change();
        }
        else if (element.hasClass('superParent')) {
            $('#divForm__' + container).find('.inlinepopup').find('.chkGroupPermission.child').prop('checked', false);
            $('#divForm__' + container).find('.inlinepopup').find('.chkGroupPermission.child').change();

            $('#divAcc__' + container).find('.chkGroupPermission.child').prop('checked', false);
            $('#divAcc__' + container).find('.chkGroupPermission.child').change();
        }
        else {
            $('#' + id).attr('checked', this.checked);
            $('#' + id).prop('checked', this.checked);
            $('#' + id).parent().find('span#' + value).remove();
        }
    }
    if (!element.hasClass('parent') && !element.hasClass('superParent')) {
        parentGroupElement.prop('checked', $('#' + id).parents('.article').find('.chkGroupPermission.child').length == $('#' + id).parents('.article').find('.chkGroupPermission.child:checked').length);

        $('#' + id).parents('.article').find('.badge:first').html($('#' + id).parents('.article').find('.badge:first').html().split('/')[0] + '/' + $('#' + id).parents('.article').find('.chkGroupPermission.child:checked').length);
    }
    $('#divForm__' + container).find('.chkGroupPermission.superParent').prop('checked', $('#divAcc__' + container).find('.chkGroupPermission.parent').length == $('#divAcc__' + container).find('.chkGroupPermission.parent:checked').length);

});