$(document).ready(function () {
  $(".hideShowBtn").on("click", () => {
    $(".addUser").show(450);
    $(".hideShowBtn").hide(150);
    $("#updateBtn").hide(150);
    $("#submitBtn").show(150);
    notify();
  });
  let url = "http://localhost:3000/posts";

  function notify() {
    $(".addedTr").remove();
    $("#id").val("");
    $("#userId").val("");
    $("#categoryId").val("");
    $("#title").val("");
    $("#body").val("");
    getDataToTable();
  }

  function getDataToTable() {
    $.get(url, null, (data, req) => {
      const tbody = $("table tbody");
      data.forEach((el, i) => {
        let urlId = url + "/" + el.id;

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
          $("<td>").html(el.id),
          $("<td>").html(el.userId),
          $("<td>").html(el.categoryId),
          $("<td>").html(el.title),
          $('<td style="max-height: 150px;overflow:auto;display:block;border-bottom:white;border-left:white">').html(el.body),
          $("<td>").html(
            $('<button class="btn btn-flat waves-effect btn-outline-warning">')
            .html("Edit")
            .on("click", () => {
              $(window).scrollTop(0);
              $("#updateBtn").show(450);
              $(".addUser").show(450);
              $("#submitBtn").hide(150);
              $(".hideShowBtn").show(450);

              $("#id").val(el.id);
              $("#userId").val(el.userId);
              $("#categoryId").val(el.categoryId);
              $("#title").val(el.title);
              $("#body").val(el.body);
            })
          ),
          $("<td>").html(
            $('<button class="btn btn-flat waves-effect btn-outline-danger">')
            .html("Delete")
            .on("click", () => {
              $("#updateBtn").hide(150);
              $(".addUser").hide(450);
              $(".hideShowBtn").show(150);
              return deleteFunc();
            })
          )
        ]);
        tbody.append(tr);
      });
    });
  }
  getDataToTable();

  // Submit button
  $("#submitBtn").on("click", () => {
    if (!$("#userId").val() == "" &&
      !$("#title").val() == "" &&
      !$("#body").val() == "" &&
      !$("#categoryId").val() == ""
    ) {
      const data = {
        id: $("#id").val(),
        userId: $("#userId").val(),
        categoryId: $("#categoryId").val(),
        title: $("#title").val(),
        body: $("#body").val()
      };
      $.ajax({
        type: "POST",
        url,
        data,
        success: function (data) {
          notify();
        }
      });
      $(".addUser").show();
    }
  });
  // Update button      
  $("#updateBtn").on("click", () => {
    if (!$("#userId").val() == "" &&
      !$("#title").val() == "" &&
      !$("#body").val() == "" &&
      !$("#categoryId").val() == ""
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
          notify();
          $("#updateBtn").hide(250);
          $("#submitBtn").show(450);
          $(".addUser").hide(450);
          $(".hideShowBtn").show(450);
        }
      });
    }
  });

  // Table sort function
  $('.sortId').on('click', () => {
    url = "http://localhost:3000/posts?_sort=id&_order=asc ";
    notify()
  })
  $('.sortUser').on('click', () => {
    url = "http://localhost:3000/posts?_sort=userId&_order=asc ";
    notify()
  })
  $('.sortTitle').on('click', () => {
    url = "http://localhost:3000/posts?_sort=title&_order=asc ";
    notify()
  })
  $('.sortBody').on('click', () => {
    url = "http://localhost:3000/posts?_sort=body&_order=asc ";
    notify()
  })
  $('.sortCategoryId').on('click', () => {
    url = "http://localhost:3000/posts?_sort=categoryId&_order=asc ";
    notify()
  })




});