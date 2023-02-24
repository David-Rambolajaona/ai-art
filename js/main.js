const SERVER_HOST = "https://ai-art.backend.inonary.com"
var access_token = ''

function get_extension_image(url) {
    var extension = url.split('.').pop();
    const firstQuestionMarkIndex = url.indexOf('?');
    if (firstQuestionMarkIndex !== -1) {
        extension = extension.substring(0, extension.indexOf('?'));
    }

    const extensions = ["png", "jpg", "jpeg", "gif"]
    if (extensions.includes(extension)) {
        return extension
    }
    return "jpg"
}

function generate_filename(n = 8) {
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let name = "";
  for (let i = 0; i < n; i++) {
    let randomIndex = Math.floor(Math.random() * chars.length);
    name += chars.charAt(randomIndex);
  }
  return name;
}

function download_image(url, filename) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = function() {
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(this.response);
    var tag = document.createElement('a');
    tag.href = imageUrl;
    tag.target = '_blank';
    tag.download = filename;
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  };
  xhr.onerror = err => {
    alert('Failed to download picture');
  };
  xhr.send();
}

function click_button_send_request() {
  $("#input-text").removeClass('is-invalid')
  let description = $("#input-text").val().trim()
  if (description && description.length <= 400) {
    let bloc_id = generate_filename()
    let bloc_loading = get_html_info_result_loading(description, bloc_id)
    $("#container-content").prepend(bloc_loading)
    $("#input-text").val('')
    $.ajax({
      url: SERVER_HOST + '/generate',
      type: "GET",
      dataType: "json",
      data: {
        p: description
      },
      beforeSend: function(xhr) {
        // Ajouter l'en-tête d'autorisation avec le jeton
        xhr.setRequestHeader("Authorization", "Bearer " + access_token);
      },
      success: function(data) {
        console.log(data)
        if (data.success) {
          let blocWithId = $("#"+bloc_id)
          blocWithId.find(".loading-bloc-body").remove()
          let bloc_images = get_html_bloc_images(data.images)
          blocWithId.find(".info-result").append(bloc_images)
        }
        else {
          let error_server_html = get_html_error_from_request(data.message)
          let blocWithId = $("#"+bloc_id)
          blocWithId.find(".loading-bloc-body").html(error_server_html)
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("Erreur de requête :", textStatus, errorThrown);
        let blocWithId = $("#"+bloc_id)
        let error_loading_html = get_html_error_loading()
        blocWithId.find(".loading-bloc-body").html(error_loading_html)
      },
      complete: function(jqXHR, textStatus) {
        
      }
    });
  }
  else {
    $("#input-text").addClass('is-invalid')
    $("#input-text").val('')
  }
}

$(document).ready(function() {
    $.ajax({
      url: SERVER_HOST + '/token',
      type: "GET",
      dataType: "json",
      success: function(data) {
        access_token = data.token
        $("#screen-loading").fadeOut(1000)
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("Erreur de requête :", textStatus, errorThrown);
        $("#screen-loading .container").html(get_home_error_loading())
      },
      complete: function(jqXHR, textStatus) {
        
      }
    });

    $('.svg-container-home').html(get_home_svg())

    $('body').on('click', '.img-res-container', function() {
        var description = $(this).parent().parent().parent().parent().find(".info-result-head").text().trim()
        var url = $(this).find("img").attr("src")
        $("#screen-focus-image .text-description").text(description)
        $("#screen-focus-image .image-focus img").attr("src", url)
        $("#screen-focus-image").fadeIn(300)
    });

    $('#screen-focus-image .close-btn').on('click', function() {
        $("#screen-focus-image").fadeOut(150)
        $("#screen-focus-image .image-focus img").attr("src", '')
    })

    $('#screen-focus-image .download-btn').on('click', function() {
        var url = $("#screen-focus-image .image-focus img").attr("src")
        var filename = generate_filename() + '.' + get_extension_image(url)
        download_image(url, filename)
    })

    $('button.button-send-request').on('click', function() {
      click_button_send_request()
    })

    $("#input-text").on('input', function(){
      $("#input-text").removeClass('is-invalid')
    })

    $("#input-text").on("keypress", function(event) {
      if (event.keyCode === 13) { // si la touche "Entrer" est appuyée
        $("button.button-send-request").trigger("click"); // déclencher l'événement click sur le bouton
      }
    });
  });
  