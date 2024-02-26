//------------CARGAMOS LAS PALETAS DEL JUGADOR 1 EN VARIABLES ---------------
//---------------UBICALAS EN UNA POSICION EN X y Y EN PANTALLA--------------
var paddle1 =10
var paddle1X =10
var paddle1Y=680
var paddle2=10
var paddle2X=680
var paddle2Y
//------------CARGAMOS LAS PALETAS DEL JUGADOR 2 EN VARIABLES ---------------
//---------------UBICALAS EN UNA POSICION EN X y Y EN PANTALLA--------------





// ------------------CARGA LOS VALORES DE TAMAÑO DE LAS PALETAS ----------------

var paddle1Height =110
var paddle2Height =110


//--------------CARGA LOS VALORES DE LOS PUNTOS INICIALES DE CADA JUGADOR---------------
var score1 =0
var score2 =0



//--------------CARGA LOS VALORES DEL PUNTAJE ACUMULADO DEL J1 Y LA PC------------------
var pcscore =0
var playerscore =0




//posición y velocidad x, y de la pelota y su radio

var pelota = {
    x:350/2,
    y:480/2,
    r:20,
    dx:3,
    dy:3
}



//----------------CREA LAS VARIABLES DE LA NARIZ EN X y Y, ADEMÁS EL PUNTAJE DE POSENET--------------
var narizx =0
var narizy =0
var score =0





//----------------CRE LA VARIABLE QUE DEFINE EL ESTATUS DEL JUEGO --------------
var gamestatus =""





// -----------COMPLETA LA FUNCION PRELOAD DONDE ESTARAN LOS SONIDOS DEL JUEGO-----------
 function preload() 
 {

    //---------------PRE-CARGA DE SONIDOS DEL JUEGO EN VARIABLES-----------------

     ball_touch_paddel=loadSound("ball_touch_paddel.wav") 
     missed =loadSound("missed.wav")

 }


 // -----------CREA LA FUNCION SETUP PARA CARGAR EL LIENZO, LA CAMARA Y POSENET---------------
 function setup (){
lienzo=createCanvas(700,600)
 lienzo.parent("div1")
 camara=createCapture (VIDEO)
 camara.size(700,600)
 camara.hide()
 poseNet = ml5.poseNet(camara, modelLoaded); 
  poseNet.on('pose', gotPoses);
}
 // ---------EL TAMAÑO DEL LIENZO SERA DE 700 X 600------------------
//-----------CREA LA FUNCION DE MODELO CARGADO PARA ENVIAR MENSAJE A LA CONSOLA---------------
function modelLoaded (){
    console.log ("hola")
}
//-------------- CREA LA FUNCION GOTRESULT QUE CAPTURA RESULTADOS DEL POSENET------------
 function gotPoses(results){
if(results.length>0){
    narizx=results[0].pose.nose.x
    narizy=results[0].pose.nose.y
    score=results[0].pose.keypoints[0].score
}
 }
//-----------------CREA LA FUNCION JUGAR PARA INICIAR EL JUEGO  -----------------
function jugar (){
    gamestatus="start"
    document.getElementById("status").innerHTML="el juego esta cargandose"
}
//-----------EN ESTA FUNCIÓN SE CARGA EL ESTATUS Y SE PONE EL MENSAJE EN EL ID RESPECTIVO---------------
//----------------COMPLETA LA FUNCION DE DIBUJO SOBRE LIENZO -----------

function draw()
{
    if( gamestatus=="start")
    {
        background(0); 

        //---------CARGA EL VIDEO SOBRE EL LIENZO PARA VER TU CAMARA-----------------------
       image(camara,0,0,700,600)


        //--------------ELIGE EL COLOR DE FONDO DEL LIENZO--------------
        //-------RECUERDA QUE EL LIENZO ES UN RECTANGULO, CREALO ----------------------
fill ("white")
  rect(680,0,20,700)     
  rect(0,0,20,700) 
        //-----------CREA LA CONDICION PARA RECONOCER LA NARIZ EN PANTALLA-------------------

        if(score>0)
        {

            //------------ELIGE EL COLOR DEL PUNTO QUE SALDRA SOBRE TU NARIZ----------------
            fill ("red")
            



            //------------CREA UN CIRCULO PARA EL PUNTO SOBRE TU NARIZ--------------------
circle(narizx,narizy,20)           


        }


        //Llamar a la función paddleInCanvas 
        paddleInCanvas();
        
        //-------------ELIGE UN COLOR PARA TU PALETA------------
       fill("red")
       stroke("red")



        strokeWeight(0.5);
        paddle1Y = narizy; 

        //-------------CREA LA PALETA EN FORMA DE RECTANGULO DELGADO DEL LADO IZQUIERDO----------
     rect(paddle1X,paddle1Y,paddle1,paddle1Height,100)




        //--------------ELIGE UN COLOR PARA LA PALETA DE LA COMPUTADORA-------------------
       fill("blue")
       stroke("blue")


        var paddle2Y =pelota.y-paddle2Height/2;
        rect(paddle2X,paddle2Y,paddle2,paddle2Height,100)

        //-------------CREA LA PALETA EN FORMA DE RECTANGULO DELGADO DEL LADO DERECHO----------
        



    
        //Llamar a la función  midline
        midline();
    
        //Llamar a la función drawScore
         drawScore();

        //Llamar a la función models  
        models();

         //Llamar a la función move, la cual es muy importante
        move();

    }

}



//Función reset, para cuando la pelota no entra en contacto con la paleta

function reset()
{
   pelota.x = width/2+100,
   pelota.y = height/2+100;
   pelota.dx =3;
   pelota.dy =3;   
}


//La función midline dibuja una línea en el centro
function midline()
{
    for(i=0;i<480;i+=10) 
    {
        var y = 0;
        fill("white");
        stroke(0);
        rect(width/2,y+i,10,480);
    }
}


//---------------La función drawScore muestra los puntajes en pantalla-------------------------

function drawScore()
{
textAlign(CENTER)
    textSize(30)
    fill("green")
    stroke("green")
    text("TU",175,50)
    text("BOT",525,50)
    text(playerscore,175,100)
    text(pcscore,525,100)
    // ---------------CENTRA EL TEXTO EN LA PANTALLA----------------
   

    //----------ELIGE EL TAMAÑO DEL TEXTO--------------------
    
    
    //---------------ELIGE EL COLOR DEL TEXTO-------------------
   


    //------------USANDO LA FUNCION TEXT MUESTRA LOS PUNTAJES EN PANTALLA------------
   






}


//Función muy importante para este juego
function move()
{
   fill(50,350,0);
   stroke(255,0,0);
   strokeWeight(0.5);
   ellipse(pelota.x,pelota.y,pelota.r,20)
   pelota.x = pelota.x + pelota.dx;
   pelota.y = pelota.y + pelota.dy;

    if(pelota.x + pelota.r > width - pelota.r/2)
    {
       pelota.dx = -pelota.dx - 0.5;       
    }

    if (pelota.x - 2.5 * pelota.r/2 < 0)
    {
        if (pelota.y >= paddle1Y && pelota.y <= paddle1Y + paddle1Height) 
        {
            pelota.dx = -pelota.dx+0.5; 
            ball_touch_paddel.play();
            playerscore++;
        }

        else
        {
            pcscore++;
            missed.play();
            reset();
            navigator.vibrate(100);
        }
    }

    if(pcscore ==4)
    {
        fill("#FFA500");
        stroke(0)
        rect(0,0,width,height-1);
        fill("white");
        stroke("white");
        textSize(25);


        //-------------CREA UN TEXTO EN LA MITAD DE LA PANTALLA INDICANDO QUE EL JUEGO TERMINO---------

text("el juago se acabo reinicia para jugar otra vez",350,200)

        //------------CREA OTRO TEXTO INDICANDO QUE PARA VOLVER A JUGAR DEBE PRESIONAR REINICIAR-----------
       

        noLoop();

        //--------------REINICIA EL PUNTAJE DE LA COMPUTADORA A CERO-------------------
       
pcscore=0



    }
   
    if(pelota.y+pelota.r > height || pelota.y-pelota.r <0)
    {
        pelota.dy =- pelota.dy;
    }   
}


//Ancho, altura y velocidad de la pelota escritos en el canvas
function models()
{
    textSize(18);
    fill(255);
    noStroke();
    text("Velocidad de la pelota: "+abs(pelota.dx),150,20);

}


//Esta función ayuda a que la pelota no salga del canvas
function paddleInCanvas()
{
  if(mouseY + paddle1Height > height)
  {
    mouseY = height - paddle1Height;
  }

  if(mouseY < 0)
  {
     mouseY =0;
  }
 
  
}



//----------COMPLETA LA FUNCION DE REINICIO-------------------
function restart()
{

    //-------------USA EL COMANDO DE BUCLE PARA REINICIAR EL JUEGO------
  loop()

    //----------------REINICIA LOS PUNTAJES DEL J1 Y LA COMPUTADORA A CERO-------------------
 pcscore=0
 playerscore=0
 
 

}
