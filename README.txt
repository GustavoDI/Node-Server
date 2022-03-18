
usualmente no se envia un string en una peticion get, si no que un json que es un objeto


Separando las rutas y el controlador de la clase.
	para lograr mayor un mejor perfomance y que el codigo se vea mas ordenado es creado 
 	un archivo llamado router, dentro del crearemos un archivo con las rutas (routes)
	dentro del user.routes.js agremaremos las rutas creadas según mi necesidad
	get post put etc... para esto se utiliza de express Router (https://expressjs.com/es/guide/routing.html)
	
	router.get('/api', (req, res) => {
	res.json({
	        ok:true,
        	msg:"get api"
    		})
    
	});

	En este punto al comprobar si nuestro path funciona debe arrojar un error o bien no funcionar
	debido que ahora nuestro path cambio de nombre en nuestro server de rutas.
	 debido que nuestro server usaremos un middleware.
	this.app.use('/api/usuarios', require('../routes/user.routes'));
	al tener este path nuestro router.get no debe arrojar error debido que este tiene otra ruta
	en este caso dice /api, debemos eliminar esta.
	y solo utilizar el path indicado en el server.

	Para tener aun más ordenado nuestro codigo  vamos a crear nuestros controller que sera el encargado
	de lograr que se vea aún más ordenado nuestro codigo.
	usuarios.contoller.js
	
	este es quien tomara las req y las res en nuestro archivo de usuarios.route.js debemos enviar
	referencia no la función 

Obtener datos desde un POST
	se requiere utilizar un objeto json valido desde express utilizaremos un middleware llamado json
	en este caso es app.use(express.json());

	para que en el caso de un post se logre recibir la request (https://expressjs.com/es/api.html#req)
	podemos crear un const body que recibira (req) la solicitud con los parametros enviados.
	para evitar recibir parametro que no quiero en mi BD es que se puede destructurar la solicitud del
	body "req.body" 
	const {algo, algo1} =  req.body;
	y para que esto sea visualizado debemos agregarlo en la response como un objeto el cual ya esta 
	previamente parseado por nuestro servidor. 
	res.json({
	algo,
	algo1
	})

Parametros del segmento y la query.
	para agrega paramentros al segmento en un PUT y en  DELETE debemos agregar un dato que tiene la cadena
	necesaria para los datos.
	en este caso express ya tiene una forma para obtener el id y es atraves de params.id

	para el caso de querer obtener con GET y dentro de la solicitud contenga una query con datos como:
	(api/usuarios?q=hola&nombre=gustavo&apikey=123456).
	para obtener solo lo que se necesita podriamos destructurar la información desde la query que llega
	desde la solicitud.
	si por alguna razón la query viene sin datos necesarios podemos indicar que contenga un valor por 
	defecto.
	Ejemplo:
	(const {q, nombre = 'No name', apikey, page = 1} = req.query;)

Creación BD en Mongo y Conexion a BD
	la BD a utilizar es mongoDB  con mongo atlas y mongo compas. Crear un cluster un administrador 
	luego crear la conexión a mongo compas.

	Conexión desde el modelo para esto debemos utilizaremos mongoose ODM 
	instalar mongoose (revisar documentación ).
	crear una carpeta llamada database que se encargara de nuestra configuración de la BD 
	crear un archivo con nombre representativo y requerir mongoose
	const mongoose = require ('mongoose');

	luego debemos crear nuestra conección y esta debe ser async y ademas debe llevar un 
	try y catch esto se debe no por nuestra parte es compleicado por agarrar el error en la BD
	en el catch debemos agregar el throw  new Error('')


	


  
	

	