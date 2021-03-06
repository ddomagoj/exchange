fetch('tecaj.xml')
      .then(function(resp){
        return resp.text();
      })
      .then(function(data){
        let parser = new DOMParser();
        let xml = parser.parseFromString(data, "application/xml");
        let xmlDoc = parser.parseFromString(data, 'text/xml');
          // console.log(xmlDoc.getElementsByTagName('drzava')[0].childNodes[0].nodeValue);
          // console.log(xmlDoc.documentElement.childNodes);

        var i;
        var table="<thead class=\"thead-dark\"><tr><th>Datum</th><th>Valuta</th><th>Jedinica</th><th>Kupovni</th><th>Srednji</th><th>Prodajni</th><th>Kupovni</th><th>Srednji</th><th>Prodajni</th></tr></thead>";
        var stateRow = 0;
        var selectState="";
        var x = xmlDoc.getElementsByTagName("item");
          for (i = 0; i <x.length; i++) { 
            table += "<tr><td>" +
              x[i].getElementsByTagName("datum_primjene")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("valuta")[0].childNodes[0].nodeValue +
            "</td><td>" +
              x[i].getElementsByTagName("jedinica")[0].childNodes[0].nodeValue +
            "</td><td>" +
              x[i].getElementsByTagName("kupovni_tecaj")[0].childNodes[0].nodeValue.replace(/,/g, '.') +
            "</td><td>" +
              x[i].getElementsByTagName("srednji_tecaj")[0].childNodes[0].nodeValue.replace(/,/g, '.') +
            "</td><td>" +
              x[i].getElementsByTagName("prodajni_tecaj")[0].childNodes[0].nodeValue.replace(/,/g, '.') +
            "</td><td>" +
            "0" +
            "</td><td>" +
              "0" +
            "</td><td>" +
            "0" +
            "</td></tr>";
            stateRow = stateRow + 1;
            selectState += "<option value=\"" + stateRow + "\">" + 
            x[i].getElementsByTagName("drzava")[0].childNodes[0].nodeValue + 
            "</option>";
          }
          document.getElementById("table").innerHTML = table;
          document.getElementById("state").innerHTML = selectState;
              
      })

    function updateTable() {
        var x, row;
        var amountOfMoney = document.getElementById("inputNumber").value;
        var stateName = document.getElementById("state");
        var stateNumber = stateName.options[stateName.selectedIndex].value;
        var kupovniIndex = (table.rows[stateNumber].cells[3].innerHTML);
        var kupovniNumber = new Big(kupovniIndex).times(amountOfMoney);
        var srednjiIndex = (table.rows[stateNumber].cells[4].innerHTML);
        var srednjiNumber = new Big(srednjiIndex).times(amountOfMoney);
        var prodajniIndex = (table.rows[stateNumber].cells[5].innerHTML);
        var prodajniNumber = new Big(prodajniIndex).times(amountOfMoney);
        var newKupovni;
        var newSrednji
        var newProdajni
        for (i = 1; i < 50; i++) {
          if(row = document.getElementById("table").rows[i]){
            x = row.cells;
            newKupovni = (kupovniNumber.div(new Big((x[3].innerHTML)))).times((x[2].innerHTML))  ;
            x[6].innerHTML = newKupovni.toFixed(6);
            newSrednji = (srednjiNumber.div(new Big((x[4].innerHTML)))).times((x[2].innerHTML))  ;
            x[7].innerHTML = newSrednji.toFixed(6);
            newProdajni = (prodajniNumber.div(new Big((x[5].innerHTML)))).times((x[2].innerHTML))  ;
            x[8].innerHTML = newProdajni.toFixed(6);
          }
        }
    };
