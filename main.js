$(document).ready(function nanana() {
    let urlByCat = "http://localhost:3000/posts";
    let url = "http://localhost:3000/posts";

    const cards = $('.postsBoard')


    // Get data from the server to the cards
    function dataToCard() {
        $.get(urlByCat, null, function (data, req) {
            for (let i = 0; i < data.length; i++) {
                url = "http://localhost:3000/posts"
                let urlUsers = url + `/${data[i].id}/` + 'users';
                let urlComments = url + `/${data[i].id}/` + 'comments';

                $.get(urlUsers, null, (users, req) => {
                    users.forEach((user, n) => {
                        if (user.id == data[i].userId) {
                            return $(`.writerName${i}`).text(`${user.name}`)
                        } else {
                            $('.writerName').html('no user')
                        }
                    })
                })
                $.get(urlComments, null, (comments, req) => {
                    for (const comment of comments) {
                        $(`.commentCard${i}`)
                        $.get('http://localhost:3000/users', null, (users, req) => {
                            for (const user1 of users) {
                                if (user1.id == comment.userId) {
                                    $(`.commentCard${i}`).append($(`<div class="card-body card mb-1">`).append([
                                        $(`<h5>`).html(`${user1.name} says:`),
                                        $(`<p>`).html(`${comment.body}`)
                                    ]));
                                }
                                let commetApear = false
                                $(`.commentCard${i}`).hide()
                                $(`.commentTile${i}`).on(`click`, () => {
                                    if (commetApear == false) {
                                        $(`.commentCard${i}`).show();
                                        commetApear = true
                                    } else {
                                        $(`.commentCard${i}`).hide();
                                        commetApear = false
                                    }
                                })
                            }
                        })
                    }

                })
                const urlPostId = url + '/' + data[i].id

                function deleteFuncHome() {
                    $.ajax({
                        type: "DELETE",
                        url: urlPostId,
                        data: {
                            _method: 'delete'
                        },
                        success: () => {
                            $('.addedCard').remove();
                            dataToCard();
                        }
                    });
                }
                const card = $(`<div class="addedCard addedCard${i} card border-success">`)
                    .append($('<div class=" card-body ">').append([
                        $('<h3 class="postTitle" style="border-bottom: 0">').html(data[i].title),
                        $('<span>Written by:</span>'),
                        $(`<span class="writterName writerName${i}"></span>`),
                        $('<div class="mt-1 deleteEditBtn">').append(
                            [$('<button class="btn btn-flat waves-effect btn-outline-warning">')
                                .html("Edit")
                                .on("click", () => {
                                    $(window).scrollTop(0);
                                    $("#updateBtn").show(450);
                                    $(".addUser").show(450);
                                    $("#submitBtn").hide(150);
                                    $(".hideShowBtn").show(450);

                                    $("#id").val(data[i].id);
                                    $("#userId").val(data[i].userId);
                                    $("#categoryId").val(data[i].categoryId);
                                    $("#title").val(data[i].title);
                                    $("#body").val(data[i].body);
                                }),
                                $('<button class="btn btn-flat waves-effect btn-outline-danger">')
                                .html("Delete")
                                .on("click", () => {
                                    $("#updateBtn").hide(150);
                                    $(".addUser").hide(450);
                                    $(".hideShowBtn").show(150);
                                    deleteFuncHome();
                                })
                            ]),
                        $(`<br>`),
                        $(`<br>`),
                        $('<p class="card-text postBody"></p>').html(data[i].body),
                        $('<div class="card-body card">').append([
                            $(`<h3 class="btn col-6 col-lg-2 col-md-3 btn-flat waves-effect btn-outline-info commentTile${i}">Comments</h3>`),
                            $(`<div class="commentCard${i}">`)
                        ])
                    ]))
                cards.append(card)
            }
        })
    }
    dataToCard()




    // Get the categories to its place 
    function getCat() {
        const urlCat = 'http://localhost:3000/categories'
        const catBoard = $(".category");
        catBoard.append([
            $(`<h3 style="text-align: center; margin-top: 1rem">`).html(`Categories`),
            $(`<div class="catBtn">`).append($(`<button class="btn btn-flat waves-effect btn-outline-info col-12 mt-3 mb-3">`).append($(`<div class="allCats">`).append($(`<h4>All Categories</h4>`))))
        ])
        $.get(urlCat, null, (data, req) => {
            data.forEach((cats, i) => {
                const cat = $('<div class="catBtn">').append($(`<button class="btn btn-flat waves-effect btn-outline-info col-12 mt-3 mb-3">`)
                    .append($(`<div>`).html(`<h4>${cats.name}</h4>`).on('click', () => {
                        urlByCat = `http://localhost:3000/categories/${i +1}/posts`;
                        $('.addedCard').remove();
                        dataToCard();
                    })));
                catBoard.append(cat);
            });
        });
    }
    getCat()

    // All categories button function
    $('.allCats').on('click', () => {
        urlByCat = "http://localhost:3000/posts";
        $('.addedCard').remove();
        dataToCard()
    })

    // The two buttons of add post (Submit button and Update button)
    $('#submitBtn').on('click', () => {
        $('.addedCard').remove();
        dataToCard();
    });

    $('#updateBtn').on('click', () => {
        $('.addedCard').remove();
        if (!$("#userId").val() == "" &&
            !$("#title").val() == "" &&
            !$("#body").val() == ""
        ) {
            $.ajax({
                url: url + "/" + $("#id").val(),
                type: "PUT",
                data: {
                    userId: $("#userId").val(),
                    categoryId: $("#categoryId").val(),
                    title: $("#title").val(),
                    body: $("#body").val()
                },
                success: function (data) {
                    dataToCard();
                    $("#updateBtn").hide(250);
                    $("#submitBtn").show(450);
                    $(".addUser").hide(450);
                    $(".hideShowBtn").show(450);
                }
            });
        }



    });


})