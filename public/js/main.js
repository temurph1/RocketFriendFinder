$(document).ready(function(){

	// May need to refactor because of other usages of table and tr
$('#search-button').on('click', function(){

	var value = $('#search-item').val().toString().toLowerCase();

	$('table tr').each(function(index){

		if (index !== 0){
			$row = $(this);
			var platform = $row.data('platform').toString().toLowerCase();
			var region = $row.data('region').toString().toLowerCase();
			var message = $row.data('message').toString().toLowerCase();

			if (platform.includes(value) || region.includes(value) || message.includes(value)){
				$row.show();
			}
			else{
				$row.hide();
			}
		}

	});

});


	

});