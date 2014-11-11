/* 
 Created on : Sep 22, 2014, 7:03:25 PM
 Author     : Eliza Krajewska
 */

// Simple API for table
var oojs = (function(oojs) {
    //region Objects 

    //region Row
    var Row = function(rowElement) {
        Object.defineProperty(this, "__el", {
            value: rowElement
        });
    };

    Object.defineProperties(Row.prototype, {
        toggleSelection: {
            value: function() {
                return this.selected = !this.selected;
            },
            enumerable: true
        },
        disableSelection: {
            value: function() {
                this.selected = false;
            },
            enumerable: true
        },
        selected: {
            get: function() {
                return this.__el.classList.contains("selected-row");
            },
            set: function(value) {
                if (value) {
                    return this.__el.classList.add("selected-row");
                }
                else {
                    return this.__el.classList.remove("selected-row");
                }

            }
        }
    });

    //endregion Row

    //region Column
    var Column = function(columnElement) {
        Object.defineProperty(this, "__el", {
            value: columnElement
        });
    };

    Object.defineProperties(Column.prototype, {
        showColumn: {
            value: function() {
                this.hidden = false;
            },
            enumerable: true
        },
        hideColumn: {
            value: function() {
                this.hidden = true;
            },
            enumerable: true
        },
        hidden: {
            set: function(value) {
                if (value) {
                    return this.__el.hide();
                }
                else {
                    return this.__el.show();
                }

            }
        }
    });

    //endregion Column

    oojs.selectedRows = [];
    //endregion Objects

    //region Functions

    //region Selection
    /* Selections : In Angularjs framework it will be 3 changes in Html's 
     * structure(using directives like ng-disabled, ng-checked, ng-model), 
     * but I would like to show that I know how to write API in "clear" js*/

    oojs.selectRow = function(index) {
        //Toogle selection and store selected rows
        var rows = document.querySelectorAll("tr");
        var row = new Row(rows[index]);
        row.toggleSelection() ? oojs.selectedRows.push(row) : oojs.selectedRows.pop(row);
        //Don't disable button if more than one checkbox is selected
        var numberOfCheckedInputs = $("input:checked").length;
        document.getElementById("removeSelectionBtn").disabled = numberOfCheckedInputs < 1;
    };

    oojs.removeAllSelection = function() {
        if (!!oojs.selectedRows) {
            var checkedInputs = $("input:checked");
            //If you find any checked input
            if (!!checkedInputs) {
                //Disable selections
                oojs.selectedRows.forEach(function(row, i) {
                    checkedInputs[i].checked = false;
                    row.disableSelection();
                });
                document.getElementById("removeSelectionBtn").disabled = true;
                //Cleaning
                oojs.selectedRows = [];
            }
        }
    };

    //endregion Selection

    //region TableTransformation

    oojs.createAndAddNewColumn = function(nameOfElement, afterElement) {
        if (!!nameOfElement) {
            //Create header - I read that is faster than concatenating strings, a specially on IE8 
            var header = [];
            header.push('<th>', nameOfElement, '</th>');
            header = header.join('');
            $(header).insertAfter("#" + afterElement);
            //Create content 
            var rows = document.querySelectorAll("tr");
            for (i = 0; i < rows.length; i++) {
                var currentElementName = '<td><a href="#" onclick="oojs.createDetailsOverlay('
                        + i + ')">' + nameOfElement + '</a></td>';
                var predecessorElementName = "#" + afterElement + i;
                $(currentElementName).insertAfter(predecessorElementName);
            }

        }
    };

    oojs.hideLessImportantColumn = function(index) {
        //Create query
        var query = [];
        query.push('tbody tr td:nth-child(', index,
                '), thead tr th:nth-child(', index, ')');
        query = query.join('');
        var columnElement = $(query);
        //Hide column
        var column = new Column(columnElement);
        column.hideColumn();
    };

    oojs.createDetailsOverlay = function(index) {
        //Show panel
        var details = document.getElementById("detailsContainer");
        details.classList.remove("hidden");
        //Show data for current row
        angular.element(details).scope().$apply(function(scope) {
            scope.details = scope.contents[index];
        });
    };

    oojs.closeDetailsOverlay = function() {
        //Hide panel
        var details = document.getElementById("detailsContainer");
        details.classList.add("hidden");
    };

    oojs.hideColumns = function() {
        //hideLessImportantColumn(param - index of column)
        oojs.hideLessImportantColumn(4);
        oojs.hideLessImportantColumn(6);
        oojs.hideLessImportantColumn(8);
    };
    oojs.showDetailsColumn = function() {
        //createAndAddNewColumn(param1 - new column (content), 
        //param2 - after column (headerId) )
        oojs.createAndAddNewColumn('Details', 'title');
    };

    //region TableTransformation

    //endregion Functions
    return oojs;

}(oojs || {}));


//Call API functions
$(document).ready(function() {
    oojs.hideLessImportantColumn(8);
});
