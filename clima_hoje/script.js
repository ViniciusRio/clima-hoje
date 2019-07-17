$(".chosen-select").chosen({ no_results_text: "Ops, nada encontrado!" });
//select cidade
var $select_cidade = $("#select_cidade");
//select estado
var $select_estado = $("#select_estado");
//div cidade
var $div_cidade = $("#div_cidade");
var $div_estado = $("#div_estado").hide();
//esconte por padrão a listagem do clima
var $clima = $("#ul_desc_clima").hide();

function mapaBackground(lat, lon) {
  var key = 'API_KEY';
  var url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=11&size=500x500&scale=1&sensor=false&key=${key}`;
  return url
}

function exibirDados(clima) {
  $("#h1_title_cidade").html(clima.location.name);
  $("#img_icon").attr("src", "http:" + clima.current.condition.icon);
  $("#h1_title_estado").html(clima.location.country);
  $("#li_desc_clima").html(clima.current.condition.text);
  $("#li_desc_temp").html(clima.current.temp_c);
  $("#li_sensacao").html(clima.current.feelslike_c);
  $("#li_umidade").html(clima.current.humidity);
  $("#li_atualizacao").prettydate({
    date: clima.current.last_updated,
    messages: {
      minutes: "Última atualização: %s minutos atrás"
    }
  });

  var bg_map = mapaBackground(clima.location.lat, clima.location.lon);
  $("body").css('background-image', 'url('+bg_map+')');

  $($clima).show();
}

$(function() {
  $("#btn_estado_cidade").on("click", function() {
    $($div_estado).show();
  });
  $("#btn_localizacao").on("click", function() {
    navigator.geolocation.getCurrentPosition(function success(position) {
      localStorage.setItem("lat", position.coords.latitude);
      localStorage.setItem("long", position.coords.longitude);
      $.ajax({
        url:
          "http://api.apixu.com/v1/forecast.json?key=API_KEY&q=" +
          localStorage.getItem("lat") +
          "," +
          localStorage.getItem("long"),
        error: function() {
          alert("Não foi possível obter a previsão do tempo para " + ds_cidade);
        }
        //preenchimento das informações pertinentes do clima
      }).then(function(clima) {
        exibirDados(clima);
      });
      
    });
  });
});
//requisição do json de estados
$.getJSON("https://br-cidade-estado-nodejs.glitch.me/estados", function(
  estados
) {
  //limpa o atual select
  $select_estado.html("");
  //texto padrão
  $("#select_estado")
    .append("<option>Informe um estado</option>")
    .attr("selected", "selected", "disabled");

  //preenchimento de fato
  $.each(estados, function(key, val) {
    $select_estado.append(
      '<option id="' + val.id + '">' + val.estado + "</option>"
    );
  });
  // é preciso atualizar o div
  $($select_estado).trigger("chosen:updated");
});
// caso ocorra mudanças no select do estado, é mostrado o select da cidade
$(function() {
  $($div_cidade).hide();
  $($select_estado).on("change", function() {
    //id do estado
    var id = $(this)
      .find("option:selected")
      .attr("id");
    //url alterada para buscar cidades do estado
    var link_cidade = "https://br-cidade-estado-nodejs.glitch.me/estados/ID/cidades".replace(
      "ID",
      id
    );

    $.getJSON(link_cidade, function(cidade) {
      $select_cidade.html("");

      $.each(cidade, function(key, val) {
        $select_cidade.append(
          '<option id="' + val.estadoId + '">' + val.cidade + "</option>"
        );
      });
      $($select_cidade).trigger("chosen:updated");
    });

    $($div_cidade).show();
  });
});

//quando a cidade muda o clima surge
$(function() {
  $($select_cidade).on("change", function() {
    var ds_cidade = $("#select_cidade")
      .find("option:selected")
      .val();
    //requisição do clima
    $.ajax({
      url: "http://api.apixu.com/v1/forecast.json?key=API_KEY&q=ds_cidade&lang=pt".replace(
        "ds_cidade",
        ds_cidade
      ),
      error: function() {
        alert("Não foi possível obter a previsão do tempo para " + ds_cidade);
      }
      //preenchimento das informações pertinentes do clima
    }).then(function(clima) {
      exibirDados(clima)
    });
  });
});
