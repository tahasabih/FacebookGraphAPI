 $.ajax({
      url:'howdb.json',
      dataType: 'json',
      type: 'get',
      cache: false,
      success: function(data) {
        var reter = JSON.parse(data);
      }
      })