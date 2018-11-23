$(function() {
    $('.loader').hide();
    
    // Chamado ao clicar no Toogle (On/Off)
    $(".handleToogle").on("change", function() {
        var input = $(this)
        var status = input.is(":checked") ? '1' : '0';
        var dataFromServer;  //declare the variable first
        
        try {
            $.ajax({
                type: 'POST',
                url: '/requisicao',
                dataType: "json",
                data: {id: $(this).attr("data-pin"), status: status},
                
                success: function(data) {
                    if (!data.status)
                    alertify.error(data.message)
                    else 
                    alertify.success("Operação realizada!")
                },
                
                // Antes de enviar a requisicao
                beforeSend: function(){
                    input.prop('disabled', true)
                    $('.loader').show();
                },
                
                // Apos completar a requisicao
                complete: function(){
                    $('.loader').hide();
                    input.prop('disabled', false)
                }
                
                // timeout: 000 // sets timeout to 3 seconds
                
            });
            
        } catch (e) {
            console.log(e);
            alertify.error("Error ao enviar a requisição!")
        }
    }); // handleToogle
    
});


