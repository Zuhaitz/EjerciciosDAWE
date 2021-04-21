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
			window.location.replace('/users')
		});
	} else {
		return false;
	}


}

function editUser(){
        //confirm("Es este: "+$(this).data('id')+" "+$(this).data('first_name'));
        var url = '/users?id='+$(this).data('id')+'&first_name='+$(this).data('first_name')
        +'&last_name='+$(this).data('last_name')+'&email='+$(this).data('email');
        //var params = '{id:'+$(this).data('id')+', first_name:'+$(this).data('first_name')+'}';

        fetch(url, {
                method : 'GET',
        }).then(resp => {
                console.log(resp);
                //window.location.replace(resp.url);
                window.location.replace(url)
        });
}