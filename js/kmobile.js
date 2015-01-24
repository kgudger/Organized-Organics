function loadusers() { 
	$.get( "http://communitytv.tk/VolCreds/mobile.php", 
		{ command: "test" } )
		.done(function( data ) {
			var obj = jQuery.parseJSON(data);
			var output ="";
			for ( i = 0; i < obj.length; i++ ) { 
				output += "User: " + obj[i].name + "<br>";
			}
			$('#rightpaneltest').empty().append(output);
		});
}
