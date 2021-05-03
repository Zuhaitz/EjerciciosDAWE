export function setupSockets() {
    const serverURL = window.location.hostname + ":" +  window.location.port;

    const socket = io.connect(serverURL, {secure: true});
    socket.emit('desktop-connect');

    socket.on("connect", () => {
        console.log("OPEN");
    });


    socket.on("phone-move", data => {
        //console.log(data);
        switch(true){
            case data>10:
                console.log("DERECHA");
                document.dispatchEvent(new KeyboardEvent('keydown',
                    {code: 'ArrowRight'})
                );

                break;
            case data<-10:
                console.log("Izquierda");
                document.dispatchEvent(new KeyboardEvent('keydown',
                    {code: 'ArrowLeft'})
                );

                break;
        }


    });
}