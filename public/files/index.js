function countRow(id) {
    var table = document.getElementById('dataTable')
     var tbody = table.getElementsByTagName('tbody')[0]
     var rows = tbody.getElementsByTagName('tr');
     for (i = 0; i < rows.length; i++) {
         rows[i].onclick = function() {
            var n = this.rowIndex;
            let todo = {
              click: n
     };

     fetch("/pokemons", {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(todo)
         }).then((res) => res.json())
         .catch((err) => console.log(err))
             }   
         }
     }