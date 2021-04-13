$(document).ready(function(){
	$('.deleteUser').on('click', deleteUser);
});

$(document).ready(function(){
        $('.editUser').on('click', editUser);
});

function deleteUser(){

    var confirmation = confirm('Are You Sure?');

	if(confirmation){
		$.ajax({
			type: 'DELETE',
			url:  '/users/delete/'+$(this).data('id')
		}).done(function(response){
			window.location.replace('/')
		});
	} else {
		return false;
	}


}

function editUser(){
        //confirm("Es este: "+$(this).data('id')+" "+$(this).data('first_name'));
        var url = '/?id='+$(this).data('id')+'&first_name='+$(this).data('first_name')
        +'&last_name='+$(this).data('last_name')+'&email='+$(this).data('email');
        var params = '{id:'+$(this).data('id')+', first_name:'+$(this).data('first_name')+'}';

        /*formData.append('id', $(this).data('id'));
        formData.append('first_name', $(this).data('first_name'));

        for (var key of formData.entries()) {
                console.log(key[0] + ', ' + key[1]);
        }*/

        fetch(url, {
                method : 'GET',
        }).then(resp => {
                console.log(resp);
                //window.location.replace(resp.url);
                window.location.replace(url)
        });

        /*$.ajax({
                type: 'GET',
                url: url
        }).done(function(resp){
                console.log(resp);
                document.open();
                document.write(resp);
                document.close();
        });*/
}