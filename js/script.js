$(".chosen-select").chosen({ no_results_text: "Ops, nada encontrado!" });
var $select_estado = $("#select_estado");
var $select_cidade = $("#select_cidade");
var $cidade = $("#cidade");
//por padrão esconde estados e clima
var $estado = $("#estado").hide();
var $clima = $("#clima").hide();

function mapaBackground(lat, lon) {
  var url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=11&size=500x500&scale=1&sensor=false&key=${googleMapsApiKey}`;
  return url
}

function exibirDados(clima) {
  $("#title_cidade").html(clima.location.name);
  $("#img_icon").attr("src", "http:" + clima.current.condition.icon);
  $("#ds_clima").html(clima.current.condition.text);
  $("#temperatura").html(clima.current.temp_c);
  $("#sensacao").html(clima.current.feelslike_c);
  $("#umidade").html(clima.current.humidity);
  $("#atualizacao").prettydate({
    date: clima.current.last_updated,
    messages: {
      minutes: "Última atualização: %s minutos atrás"
    }
  });
  //atribui dinamicamente o estilo ao body, adicionando o BG
  var bg_map = mapaBackground(clima.location.lat, clima.location.lon);
  $("body").css('background-image', 'url('+bg_map+')');

  $($clima).show();
}

$(function() {
  $("#btn_estado_cidade").on("click", function() {
    $($estado).show();
  });
  $("#btn_localizacao").on("click", function() {
    navigator.geolocation.getCurrentPosition(function success(position) {
      localStorage.setItem("lat", position.coords.latitude);
      localStorage.setItem("long", position.coords.longitude);
      
      $.ajax({
        url:
          `http://api.apixu.com/v1/forecast.json?key=${apixuKey}&q=` + localStorage.getItem("lat") + "," + localStorage.getItem("long"),
        error: function() {
          alert("Não foi possível obter a previsão do tempo para " + cidade);

        }
      }).then(function(clima) {
        exibirDados(clima);
      });
      
    });
  });
});

//requisição do json de estados
$.getJSON("https://br-cidade-estado-nodejs.glitch.me/estados", function(estados) {
  //limpa o atual select
  $select_estado.html("");
  //texto padrão
  $("#select_estado").append("<option>Informe um estado</option>").attr("selected", "selected", "disabled");

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
  $($cidade).hide();
  $($select_estado).on("change", function() {
    //id do estado
    var id = $(this).find("option:selected").attr("id");
    //url alterada para buscar cidades do estado
    var link_cidade = "https://br-cidade-estado-nodejs.glitch.me/estados/ID/cidades".replace("ID", id);

    $.getJSON(link_cidade, function(cidade) {
      $select_cidade.html("");

      $.each(cidade, function(key, val) {
        $select_cidade.append(
          '<option id="' + val.estadoId + '">' + val.cidade + "</option>"
        );
      });
      $($select_cidade).trigger("chosen:updated");
    });

    $($cidade).show();
  });
});

//quando a cidade muda o clima surge
$(function() {
  $($select_cidade).on("change", function() {
    var ds_cidade = $("#select_cidade").find("option:selected").val();
    //requisição do clima
    $.ajax({
      url: `http://api.apixu.com/v1/forecast.json?key=${apixuKey}&q=ds_cidade&lang=pt`.replace("ds_cidade", ds_cidade),
      error: function() {
        alert("Não foi possível obter a previsão do tempo para " + ds_cidade);
      }
      //preenchimento das informações pertinentes do clima
    }).then(function(clima) {
      exibirDados(clima)
    });
  });
});
