function loadusers() { 
  $.post('http://communitytv.org/VolCreds/mobile.php', { command:test } , 
    function(data) {
		var ins = "<p" + data + "</p>";
		$('#rightpanel3').append(ins);
	}
}
