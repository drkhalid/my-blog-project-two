$(document).ready(function () {
    $('.hideShowBtn').on('click', () => {
        $('.addUser').show(450);
        $('.hideShowBtn').hide(150);
        $('#updateBtn').hide(150);
        $('#submitBtn').show(150);
        notify();
    })

    let url = "http://localhost:3000/categories"

    function notify() {
        $('.addedTr').remove();
        $('#id').val('');
        $('#postId').val('');
        $('#category').val('');
        getDataToTable();;
    }

    function getDataToTable() {
        $.get(url, null, (data, req) => {

            const tbody = $("table tbody");
            data.forEach((el, i) => {
                let urlId = url + '/' + el.id;

                function deleteFunc() {
                    $.ajax({
                        type: "DELETE",
                        url: urlId,
                        data: {
                            _method: 'delete'
                        },
                    });
                    tr.remove();
                }
                const tr = $('<tr class="addedTr ">').append([
                    $('<td>').html(el.id),
                    $('<td>').html(el.name),
                    $('<td>').html($('<button class="btn btn-flat waves-effect btn-outline-warning">').html('Edit').on('click', () => {
                        $(window).scrollTop(0);
                        $('#updateBtn').show(450);
                        $('.addUser').show(450);
                        $('#submitBtn').hide(150);
                        $('.hideShowBtn').show(450);

                        $('#id').val(el.id);
                        $('#category').val(el.name);
                    })),
                    $('<td>').html($('<button class="btn btn-flat waves-effect btn-outline-danger">').html('Delete').on('click', () => {
                        $('#updateBtn').hide(150);
                        $('.addUser').hide(450);
                        $('.hideShowBtn').show(150);
                        deleteFunc();
                    }))
                ]);
                tbody.append(tr);
            });
        });
    }
    getDataToTable()

    // Submit button
    $('#submitBtn').on('click', () => {
        if (!$('#category').val() == "") {
            const data = {
                id: $('#id').val(),
                name: $('#category').val(),
            }
            $.ajax({
                type: 'POST',
                url,
                data,
                success: function (data) {
                    notify();
                },
            });
            $('.addUser').show();
        }
    });

    // Update button
    $('#updateBtn').on('click', () => {
        if (!$('#category').val() == "") {
            $.ajax({
                url: url + '/' + $('#id').val(),
                type: 'PUT',
                data: {
                    name: $('#category').val()
                },
                success: function (data) {
                    notify();
                    $('#updateBtn').hide(250);
                    $('#submitBtn').show(450);
                    $('.addUser').hide(450);
                    $('.hideShowBtn').show(450)
                }
            })
        }

    })

    // table sort functions
    $('.sortId').on('click', () => {
        url = "http://localhost:3000/categories?_sort=id&_order=asc ";
        notify()
    })
    $('.sortCategory').on('click', () => {
        url = "http://localhost:3000/categories?_sort=name&_order=asc ";
        notify()
    })

})