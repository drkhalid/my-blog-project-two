$(document).ready(function () {


    $('.hideShowBtn').on('click', () => {
        $('.addUser').show(450);
        $('.hideShowBtn').hide(150);
        $('#updateBtn').hide(150);
        $('#submitBtn').show(150);
        notify();



    })

    let url = "http://localhost:3000/comments"

    function notify() {
        $('.addedTr').remove();
        $('#id').val('');
        $('#postId').val('');
        $('#userId').val('');
        $('#body').val('');
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
                    $('<td>').html(el.postId),
                    $('<td>').html(el.userId),
                    $('<td>').html(el.body),
                    $('<td>').html($('<button class="btn btn-flat waves-effect btn-outline-warning">').html('Edit').on('click', () => {
                        $(window).scrollTop(0);
                        $('#updateBtn').show(450);
                        $('.addUser').show(450);
                        $('#submitBtn').hide(150);
                        $('.hideShowBtn').show(450);

                        $('#id').val(el.id);
                        $('#postId').val(el.postId);
                        $('#userId').val(el.userId);
                        $('#body').val(el.body);

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
        if (!$('#postId').val() == "" && !$('#body').val() == "" && !$('#userId').val() == "") {
            const data = {
                id: $('#id').val(),
                postId: $('#postId').val(),
                userId: $('#userId').val(),
                body: $('#body').val(),
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
        if (!$('#postId').val() == "" && !$('#body').val() == "" && !$('#userId').val() == "") {

            $.ajax({
                url: url + '/' + $('#id').val(),
                type: 'PUT',
                data: {
                    postId: $('#postId').val(),
                    userId: $('#userId').val(),
                    body: $('#body').val(),


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
    $('.sortId').on('click', () => {
        url = "http://localhost:3000/comments?_sort=id&_order=asc ";
        notify()
    })
    $('.sortPostId').on('click', () => {
        console.log('clicked')
        url = "http://localhost:3000/comments?_sort=postId&_order=asc ";
        notify()
    })
    $('.sortUserId').on('click', () => {
        url = "http://localhost:3000/comments?_sort=userId&_order=asc ";
        notify()
    })
    $('.sortBody').on('click', () => {
        url = "http://localhost:3000/comments?_sort=body&_order=asc ";
        notify()
    })

})